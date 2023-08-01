#pragma once
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h> 
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <err.h>
#include <string.h>

#include <wchar.h>
#include <math.h>
#include <time.h>

#include <locale.h>

#include "main.h"
#include "tbl.h"
#include "tbl.c"
#include "ws.c"
//#include "main.h"

ptb *pgtb_emps =NULL;
ptb *pgtb_pwd   =NULL;

struct prc_data {
  int prc_count;
  int prc_stop;
} prc_data;

void F_SHA1(unsigned char *hash_out, unsigned char *hash_in);

int self_proc(void *args)
{
    struct prc_data *i_data=(struct prc_data *) args;
    while(i_data->prc_stop==0)
    {
        i_data->prc_stop++;
        usleep(1000000);
    }
    return SUCCESS;
}
int load_some_tbl(ptb **pmt,char *data_folder,char *data_file, int force_)
{
  int ret=0;
  char tstr[512]={'\0',};
  if(*pmt==NULL || force_==1)
  {
    if(*pmt==NULL)
    {
      *pmt = create_tbl();
    }
    strcpy(tstr,data_folder);
    strcat(tstr,data_file);
    read_csv_file(*pmt,tstr,1,',','"');
    ret =0;
  }
  else
  {
    ret=1;
  }
  if(*pmt==NULL)
  {
    return -1;
  }
  if((*pmt)->cq==0)
  {
    return -2;
  }
  return ret;
}
int load_global_data(char *data_folder)
{
  int res_conv=0;

  int ret=0;
  ret=load_some_tbl(&pgtb_emps,data_folder,"/emps.csv",0);
  if(ret==0){res_conv=conver_to_num(pgtb_emps,0,L'.');}
  ret=load_some_tbl(&pgtb_pwd,data_folder,"/pwd.csv",0);
  if(ret==0){res_conv=conver_to_num(pgtb_pwd,0,L'.');}
  
  return res_conv;
}

int change_pwd(double emp_id, char * new_pwd)
{
  //show(pgtb_users,100,0,0);
  int N=pgtb_pwd->zq;
  for(int n=0; n<N; n++)
  {
    if(((((pgtb_pwd->cc)+0)->pv)+n)->p_d==emp_id)
    {
      unsigned char buf[SHA_DIGEST_LENGTH*2] = {0,};
      F_SHA1(buf,(unsigned char *)new_pwd);
      wchar_t n_wpwd[256];
      mbstowcs(n_wpwd, (char *)buf, 256);
      set_cell_str(pgtb_pwd,1,n,n_wpwd,0);
      
      char tstr[512]={'\0',};
      strcpy(tstr,"./data");
      strcat(tstr,"/pwd_t.csv");
      save_csv_file(pgtb_pwd,tstr,1,L",",L"\"");
      return 0;
    }
  }
  //set_cell_str(pgtb_users,)
  //show(pgtb_users,100,0,0);
  return 1;
}

double test_pwd(char * c_usr, char * c_pwd)
{
  //show(pgtb_users,100,0,0);
  wchar_t w_usr[256];
  mbstowcs(w_usr, c_usr, 256);

  unsigned char buf[SHA_DIGEST_LENGTH*2] = {0,};    
  F_SHA1(buf,(unsigned char *)c_pwd);
  wchar_t w_pwd[256];
  mbstowcs(w_pwd, (char *)buf, 256);

  int N=pgtb_emps->zq;
  int K=pgtb_pwd->zq;
  double emp_id=-1.0;
  for(int n=0; n<N; n++)
  {
    if(wcscmp(((((pgtb_emps->cc)+1)->pv)+n)->p_w, w_usr)==0)
    {
      emp_id=((((pgtb_emps->cc)+0)->pv)+n)->p_d;
      for(int k=0; k<K; k++)
      {
        if(((((pgtb_pwd->cc)+0)->pv)+k)->p_d==emp_id)
        {
          if(wcscmp(((((pgtb_pwd->cc)+1)->pv)+n)->p_w, w_pwd)==0)
          {
            return emp_id;
          }
          else
          {
            return -1;
          }
        }
      }
    
    }
  }
  //set_cell_str(pgtb_users,)
  //show(pgtb_users,100,0,0);
  return -2;
}