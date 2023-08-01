#pragma once
#include "ws.c"
#include "ws.h"
#include <string.h>
#include <time.h>
#include "main.h"

#include "my_json.c"
#include "proc_mgr.c"
#include "tbl.c"
#include "work_proc.c"

extern ptb *pgtb_emps;
extern ptb *pgtb_pwd;
extern double test_pwd(char * c_usr, char * c_pwd);

void F_SHA1(unsigned char *hash_out, unsigned char *hash_in);
void send_static(int client_fd, char *full_path);
int send_TXT_R(int client_fd, unsigned char *messag,int mode);
void send_TXT(int client_fd, unsigned char *messag,int mode);
void pack_data1(char *messag_out, char *m_type,int m_add, int m_dis_js, char* m_back_id, char* m_html);

//extern int create_new_thread(int *p_id, int s_id, void *(*pfunc)(void*), int thr_detach, void *pdata);

struct tag_test_prc_data {
  //int prc_count;
  //int prc_stop;
  int client_fd;
  char m_back_id[256];
};
typedef struct tag_test_prc_data test_prc_data;

extern ptb *pgtb_users;

char global_str_GL[1024]={0,};
int  last_client_id=-1;

void *test_ws_proc(void *args)
{
  char tbuff1[100];
  char tbuff2[100];
  char tbuff3[100];
  char tbuff_usec[10];
  char messag_out[256];
  char messag_out2[512];
  //usleep(2000000);
  clock_t t1, t2;
  float time1;
  time_t t_old;
  time_t t;

  //time1 = ( 1.f * ( t2 - t1 ) ) / CLOCKS_PER_SEC * 1000;

    //wprintf(L"end, executed in %.2f ms\n\r", time1 );

  thr_elem *ppp=(thr_elem*) args;
  ppp->thread_stat=1;

  pthread_t thread_local=ppp->thread;
  test_prc_data *i_data=(test_prc_data *)ppp->pdata;
  int client_fd_loc=i_data->client_fd;
  char html_back_id[256]={'\0',};
  strcpy(html_back_id,i_data->m_back_id);
  
  //test_prc_data *i_data=(test_prc_data *) args;
  //i_data->prc_stop=-5;
  //while(i_data->prc_stop<0)
  time(&t_old);
  time(&t);
  t2 = clock();
  t1=t2;

  int x=0;
  while(ppp->thread_stop!=1&&thread_local==ppp->thread&&client_fd_loc==i_data->client_fd)
  {
      //i_data->prc_stop++;
      time(&t);
      if(t==t_old)
      {
        t2 = clock();
        //time1 = ( 1.f * ( t2 - t1 ) ) / CLOCKS_PER_SEC * 1000;
        time1 = ( 1.f * ( t2 - t1 ) ) / CLOCKS_PER_SEC * 1000;
      }
      else
      {
        time1=0.0;
        t1=t2;
      }
  
      ctime_r(&t,tbuff1);
      strncpy(tbuff2,&tbuff1[11],8);
      tbuff2[8]='\0';
      strcpy(messag_out, "test1 ");
      sprintf(tbuff3,"p_id [%d][%lu]:[",ppp->id,ppp->thread);
      sprintf(tbuff_usec,"%.2f",time1);
      strcat(messag_out, tbuff3);
      strcat(messag_out, tbuff2);
      strcat(messag_out, "|");
      strcat(messag_out, tbuff_usec);
      strcat(messag_out, "]");
      pack_data1(messag_out2, "HTML",0, 1, html_back_id, messag_out);
      if(send_TXT_R(client_fd_loc, (unsigned char*) messag_out2,0)<0)
      {
        break;
      }
      x=x+1;
      //i_data->prc_stop=1;
      if(x>10000)
      {
        break;
      }
      t_old=t;
      //t1=t2;
      usleep(10000);
  }
  if(ppp->thread_stop==1)
  {
    sprintf(tbuff3,"stopped p_id [%d][%lu]",ppp->id,ppp->thread);
    pack_data1(messag_out2, "HTML",0, 1, html_back_id, tbuff3);
    send_TXT(i_data->client_fd, (unsigned char*) messag_out2,0);
  }
  //ppp->thread_stat=0;
  //usleep(2000000);
  sem_wait(&sem_mgr);
  if(i_data)
  {
    free(i_data);
    if(thread_local==ppp->thread&&client_fd_loc==i_data->client_fd)
    {
      ppp->pdata=NULL;
    }
  }
  if(thread_local==ppp->thread&&client_fd_loc==i_data->client_fd)
  {
    ppp->thread_stat=10;
  }
  //ppp->pdata=NULL;
  //i_data->m_self=0;
  //ppp->thread_stat=10;
  sem_post(&sem_mgr);
  return SUCCESS;
}

void *ws_proc_GL01(void *args)
{
  char tbuff1[100];
  char tbuff2[100];
  char tbuff3[100];
  char tbuff_usec[10];
  char messag_out[256];
  char messag_out2[512];
  char messag_out3[1024]={0,};
  char messag_out3_[1024]={0,};
  //usleep(2000000);
  clock_t t1, t2;
  float time1;
  time_t t_old;
  time_t t;


  //time1 = ( 1.f * ( t2 - t1 ) ) / CLOCKS_PER_SEC * 1000;

    //wprintf(L"end, executed in %.2f ms\n\r", time1 );

  thr_elem *ppp=(thr_elem*) args;
  ppp->thread_stat=1;

  pthread_t thread_local=ppp->thread;
  test_prc_data *i_data=(test_prc_data *)ppp->pdata;
  int client_fd_loc=i_data->client_fd;
  char html_back_id[256]={'\0',};
  strcpy(html_back_id,i_data->m_back_id);
  
  //test_prc_data *i_data=(test_prc_data *) args;
  //i_data->prc_stop=-5;
  //while(i_data->prc_stop<0)
  time(&t_old);
  time(&t);
  t2 = clock();
  t1=t2;

  int x=0;
  while(ppp->thread_stop!=1&&thread_local==ppp->thread&&client_fd_loc==i_data->client_fd)
  {
      //i_data->prc_stop++;
      time(&t);
      if(t==t_old)
      {
        t2 = clock();
        //time1 = ( 1.f * ( t2 - t1 ) ) / CLOCKS_PER_SEC * 1000;
        time1 = ( 1.f * ( t2 - t1 ) ) / CLOCKS_PER_SEC * 1000;
      }
      else
      {
        time1=0.0;
        t1=t2;
      }
      /*
      ctime_r(&t,tbuff1);
      strncpy(tbuff2,&tbuff1[11],8);
      tbuff2[8]='\0';
      strcpy(messag_out, "test1 ");
      sprintf(tbuff3,"p_id [%d][%lu]:[",ppp->id,ppp->thread);
      sprintf(tbuff_usec,"%.2f",time1);
      strcat(messag_out, tbuff3);
      strcat(messag_out, tbuff2);
      strcat(messag_out, "|");
      strcat(messag_out, tbuff_usec);
      strcat(messag_out, "]");
      pack_data1(messag_out2, "HTML",0, 1, html_back_id, messag_out);
      */
      strcpy(messag_out3,global_str_GL);
      if(client_fd_loc!=last_client_id)
      {
        if(strcmp(messag_out3_,messag_out3))
        {
          strcpy(messag_out3_,messag_out3);
          if(send_TXT_R(client_fd_loc, (unsigned char*) messag_out3,0)<0)
          {
            break;
          }
        }
      }
      x=x+1;
      //i_data->prc_stop=1;
      if(x>60000) // 10 min
      {
        break;
      }
      t_old=t;
      //t1=t2;
      usleep(10000);
  }
  if(ppp->thread_stop==1)
  {
    //sprintf(tbuff3,"stopped p_id [%d][%lu]",ppp->id,ppp->thread);
    //pack_data1(messag_out2, "HTML",0, 1, html_back_id, tbuff3);
    //send_TXT(i_data->client_fd, (unsigned char*) messag_out2,0);
  }
  //ppp->thread_stat=0;
  //usleep(2000000);
  sem_wait(&sem_mgr);
  if(i_data)
  {
    free(i_data);
    if(thread_local==ppp->thread&&client_fd_loc==i_data->client_fd)
    {
      ppp->pdata=NULL;
    }
  }
  if(thread_local==ppp->thread&&client_fd_loc==i_data->client_fd)
  {
    ppp->thread_stat=10;
  }
  //ppp->pdata=NULL;
  //i_data->m_self=0;
  //ppp->thread_stat=10;
  sem_post(&sem_mgr);
  return SUCCESS;
}

void pack_data1(char *messag_out, char *m_type,int m_add, int m_dis_js, char* m_back_id, char* m_html)
{
  char b1[10]={'\0',};
  char b2[10]={'\0',};
  sprintf(b1,"%d",m_add);
  sprintf(b2,"%d",m_dis_js);
  strcpy(messag_out,"{\"type\":\"");
  strcat(messag_out,m_type);
  strcat(messag_out,"\",\"add\":");
  strcat(messag_out,b1);
  strcat(messag_out,",\"dis_js\":");
  strcat(messag_out,b2);
  strcat(messag_out,",\"back_id\":\"");
  strcat(messag_out,m_back_id);
  strcat(messag_out,"\",\"html_data\":\"");
  strcat(messag_out,m_html);
  strcat(messag_out,"\"}");
}

void ws_list(int client_fd, unsigned char *messag, int * p_thr_id)
{
  //{"type":"message","text":"json_msg","id":555,"date":1680173809304}
  //{"type":"message","text":"json_\"msg_\\ABCФBC","id":555,"date":1680174275359}
  //unsigned long message_size = strlen((char*)messag);
  char rret[1024];
  strcpy(rret, (char*)messag);
  int L=strlen((char*)messag);

  if(!strcmp(( char *)messag, "ABC"))
  {
    
    unsigned char ret[] = "<table border=1><tr><td>A1</td><td>B1</td></tr>\
<tr><td>A2</td><td>B2</td></tr></table>";
    send_TXT(client_fd, ret,1);
    sleep(6);
    unsigned char ret2[] = "<table border=1><tr><td>A1--</td><td>B1--</td></tr>\
<tr><td>A2--</td><td>B2--</td></tr></table>";
    send_TXT(client_fd, ret2,3);

  }
  else if(*(messag+0)=='s' && *(messag+1)=='h' && *(messag+2)=='a' && *(messag+3)=='1')
  {
    //abc
    //a9993e364706816aba3e25717850c26c9cd0d89d
    unsigned char buf[SHA_DIGEST_LENGTH*2] = {0,};    
    F_SHA1(buf,(messag+4));
    printf("\nSHA1_hash:%s\n", buf); 
    send_TXT(client_fd, buf,0);
  }
  else if(!strcmp(( char *)messag, "test_json_1"))
  {
    
    unsigned char ret[] = "JSON";
    send_TXT(client_fd, ret,0);

  }
  else if(*(messag+0)=='{' && *(messag+L-1)=='}')
  {
    //test_json(messag);

    int L=0;
    js_row js_data[128];
    get_js_data((char*)messag, js_data, 128, &L);

    show_json(js_data);

    char *temp_val;
    int b_ret=0; // business response; 0==OK
    char *pback_id="null";

    if(get_str_n(js_data,"type","static_page")>=0) // var: return static HTML
    {
      if(get_str(js_data,"page",&temp_val)>=0)
      {
        //char back_id[128]="null";
        char *pback_id="null";
        if(get_str(js_data,"back_id",&pback_id)<0)
        {
          ;//pback_id=back_id;
        }

        //unsigned char null_ret[]="{\"x0\":0}";
        char ws_buff[2048];
        memset(ws_buff,0,2048);

        //FILE *fp;
        //char buff[1024];
        //size_t nread;

        char f_name[1024];
        memset(f_name,0,1024);
        strcpy(f_name,"./static/html_static/");
        strcat(f_name,temp_val);

        char messag_out[512]={0,};
        strcpy(messag_out,"{\"type\":\"HTML\",\"add\":0,\"dis_js\":0,\"back_id\":\"");
        strcat(messag_out,pback_id);
        strcat(messag_out,"\",\"html_data\":\"");

        send_TXT(client_fd, (unsigned char*) messag_out,1);

        send_static(client_fd, f_name);

        send_TXT(client_fd, (unsigned char*) "\"}",3);

        
        //unsigned char *ret;
        //send_TXT(client_fd, ret,0);
      }
      
    }
    else if(get_str_n(js_data,"type","cmd")>=0) // var: send "CMD" message
    {
      //if(get_str(js_data,"cmd_str",&temp_val)>=0)
      if(get_str_n(js_data,"cmd_str","timer")>=0)
      {
        //char back_id[128]="null";
        char *pback_id="null";
        if(get_str(js_data,"back_id",&pback_id)<0)
        {
          ;//pback_id=back_id;
        }

        //unsigned char null_ret[]="{\"x0\":0}";
        char ws_buff[2048];
        memset(ws_buff,0,2048);

        //FILE *fp;
        //char buff[1024];
        //size_t nread;

        //char f_name[1024];
        //memset(f_name,0,1024);
        //strcpy(f_name,"./static/html_static/");
        //strcat(f_name,temp_val);

        //pthread_t *pthread;
        int cmd_int=0;
        if(get_int(js_data,"cmd_int",&cmd_int)>=0)
        {
          cmd_int=cmd_int;
        }

        //if()
        char s_info[50]={'\0',};
        //if()
        int l_stat=get_thr_status(*p_thr_id);
        if(l_stat <= 0 || l_stat >= 10)
        {
          *p_thr_id=-1;
        }
        else
        {
          if(((th_list.thr_arr)+(*p_thr_id))->s_id != client_fd)
          {
            *p_thr_id=-1;
          }
        }
        if(*p_thr_id>=0)
        {
          
          if(cmd_int==10)
          {
            strcpy(s_info,"- notify for kill");
            //((th_list.thr_arr)+(*p_thr_id))->thread_cmd=10;
            send_stop(*p_thr_id,client_fd);
          }
          else
          {
            strcpy(s_info,"- exist...");
          }
          
          
        }
        else
        {
          if(cmd_int==10)
          {
            strcpy(s_info,"- not exist");
          }
          if(cmd_int==1)
          {
          //int thr_id=-1;
          strcpy(s_info,"- create");

          //test_prc_data *p_data=NULL;
          test_prc_data *p_data=(test_prc_data*)malloc(sizeof(test_prc_data));
          p_data->client_fd=client_fd;
          strcpy(p_data->m_back_id,pback_id);
          //p_data->prc_stop=0;
          
          //int status = pthread_create(p_sub_thr, NULL, test_ws_proc, p_data);
          //int status = 
          create_new_thread(p_thr_id, client_fd, test_ws_proc, 1, p_data);
          //pthread_detach(*p_sub_thr);
          //*p_sub_thr=1;
          //test_ws_proc(p_data);
          //free(p_data);
          //return;
          }
        }
        

        char messag_out[512]={0,};
        strcpy(messag_out,"{\"type\":\"HTML\",\"add\":0,\"dis_js\":0,\"back_id\":\"");
        strcat(messag_out,pback_id);
        strcat(messag_out,"\",\"html_data\":\"");
        //strcat(messag_out,temp_val);
        strcat(messag_out,"timer");
        strcat(messag_out,s_info);
        strcat(messag_out,"\"}");

        if(send_TXT_R(client_fd, (unsigned char*) messag_out,0)<0)
        {
          send_stop(*p_thr_id,client_fd);
        }

                
        //unsigned char *ret;
        //send_TXT(client_fd, ret,0);
      }
      else if(get_str_n(js_data,"cmd_str","gl_data_distr")>=0)
      {
        //char back_id[128]="null";
        char *pback_id="null";
        if(get_str(js_data,"back_id",&pback_id)<0)
        {
          ;//pback_id=back_id;
        }

        //unsigned char null_ret[]="{\"x0\":0}";
        char ws_buff[2048];
        memset(ws_buff,0,2048);

        //FILE *fp;
        //char buff[1024];
        //size_t nread;

        //char f_name[1024];
        //memset(f_name,0,1024);
        //strcpy(f_name,"./static/html_static/");
        //strcat(f_name,temp_val);

        //pthread_t *pthread;
        int cmd_int=0;
        if(get_int(js_data,"cmd_int",&cmd_int)>=0)
        {
          cmd_int=cmd_int;
        }

        //if()
        char s_info[50]={'\0',};
        //if()
        int l_stat=get_thr_status(*p_thr_id);
        if(l_stat <= 0 || l_stat >= 10)
        {
          *p_thr_id=-1;
        }
        else
        {
          if(((th_list.thr_arr)+(*p_thr_id))->s_id != client_fd)
          {
            *p_thr_id=-1;
          }
        }
        if(*p_thr_id>=0)
        {
          
          if(cmd_int==10)
          {
            strcpy(s_info,"- notify for kill");
            //((th_list.thr_arr)+(*p_thr_id))->thread_cmd=10;
            send_stop(*p_thr_id,client_fd);
          }
          else
          {
            strcpy(s_info,"- exist...");
          }
          
          
        }
        else
        {
          if(cmd_int==10)
          {
            strcpy(s_info,"- not exist");
          }
          if(cmd_int==1)
          {
          //int thr_id=-1;
          strcpy(s_info,"- create");

          //test_prc_data *p_data=NULL;
          test_prc_data *p_data=(test_prc_data*)malloc(sizeof(test_prc_data));
          p_data->client_fd=client_fd;
          strcpy(p_data->m_back_id,pback_id);
          //p_data->prc_stop=0;
          
          //int status = pthread_create(p_sub_thr, NULL, test_ws_proc, p_data);
          //int status = 
          create_new_thread(p_thr_id, client_fd, ws_proc_GL01, 1, p_data);
          //pthread_detach(*p_sub_thr);
          //*p_sub_thr=1;
          //test_ws_proc(p_data);
          //free(p_data);
          //return;
          }
        }
        
        /*

        char messag_out[512]={0,};
        strcpy(messag_out,"{\"type\":\"HTML\",\"add\":0,\"dis_js\":0,\"back_id\":\"");
        strcat(messag_out,pback_id);
        strcat(messag_out,"\",\"html_data\":\"");
        //strcat(messag_out,temp_val);
        strcat(messag_out,"timer");
        strcat(messag_out,s_info);
        strcat(messag_out,"\"}");

        if(send_TXT_R(client_fd, (unsigned char*) messag_out,0)<0)
        {
          send_stop(*p_thr_id,client_fd);
        }
        */

                
        //unsigned char *ret;
        //send_TXT(client_fd, ret,0);
      }
      else if(get_str_n(js_data,"cmd_str","change_pwd")>=0)
      {
        int emp_id=-1;
        if(get_int(js_data,"emp_id",&emp_id)>=0)
        {
          char *n_pwd;
          if(get_str(js_data,"new_pwd",&n_pwd)>=0)
          {
            //wchar_t n_wpwd[256];
            //mbstowcs(n_wpwd, n_pwd, 256);
            b_ret=change_pwd(emp_id, n_pwd);
          }
        }
      }
      else if(get_str_n(js_data,"cmd_str","test_pwd")>=0)
      {
        char *m_usr;
        char *m_pwd;
        char *cmd_str;
        get_str(js_data,"back_id",&pback_id);
        if(get_str(js_data,"m_usr",&m_usr)>=0)
        {
          //char *n_pwd;
          if(get_str(js_data,"m_pwd",&m_pwd)>=0)
          {
            //wchar_t n_wpwd[256];
            //mbstowcs(n_wpwd, n_pwd, 256);
            get_str(js_data,"cmd_str",&cmd_str);

            char c_ret[256]={'\0',};
            b_ret=test_pwd(m_usr, m_pwd);
            if(b_ret>=0) {strcpy(c_ret,"OK");}
            else if(b_ret==-1) {strcpy(c_ret,"err pwd");}
            else if(b_ret==-2) {strcpy(c_ret,"err user");}
            else {strcpy(c_ret,"???");}
            char messag_out[512]={0,};
            strcpy(messag_out,"{\"type\":\"HTML\",\"add\":0,\"dis_js\":1,\"back_id\":\"");
            strcat(messag_out,pback_id);
            strcat(messag_out,"\",\"cmd_str\":\"");
            strcat(messag_out,cmd_str);
            strcat(messag_out,"\",\"html_data\":\"");
            strcat(messag_out,c_ret);
            strcat(messag_out,"\"}");

            send_TXT(client_fd, (unsigned char*) messag_out,0);
          }
        }
      }
      
    }
    
    else if(get_str_n(js_data,"type","data")>=0) // var: return TBL-HTML data
    {
      if(get_str(js_data,"cmd_str",&temp_val)>=0)
      {
        //char back_id[128]="null";
        
        if(get_str(js_data,"back_id",&pback_id)<0)
        {
          strcpy(pback_id,"local3_1");
        }

        //unsigned char null_ret[]="{\"x0\":0}";
        //char ws_buff[2048];
        //memset(ws_buff,0,2048);

        //FILE *fp;
        //char buff[1024];
        //size_t nread;

        //char f_name[1024];
        //memset(f_name,0,1024);
        //strcpy(f_name,"./static/html_static/");
        //strcat(f_name,temp_val);

        char messag_out[512]={0,};
        strcpy(messag_out,"{\"type\":\"HTML\",\"add\":0,\"dis_js\":1,\"back_id\":\"");
        strcat(messag_out,pback_id);
        strcat(messag_out,"\",\"html_data\":\"");

        send_TXT(client_fd, (unsigned char*) messag_out,1);

        //send_static(client_fd, f_name);
        char *html_data=NULL;
        if(strcmp(temp_val, "emps")==0)
        {
          view_html(&html_data, pgtb_emps, 1, 1, 1
          ,""
          ,"style='font-family: Calibri;margin-top: 0;margin-bottom: 0;color: #004000;font-size: medium;border: 1px solid #000080; background: #EEEFFF; text-align: center;' "
          ,"style='font-family: Calibri;margin-top: 0;margin-bottom: 0;color: #003000;font-size: medium;border: 1px solid #008000; "
          ," text-align: right;'"
          ," text-align: left;'"
          ," '");
        }
        else if(strcmp(temp_val, "pwd")==0)
        {
          view_html(&html_data, pgtb_pwd, 1, 1, 1
          ,""
          ,"style='font-family: Calibri;margin-top: 0;margin-bottom: 0;color: #004000;font-size: medium;border: 1px solid #000080; background: #EEEFFF; text-align: center;' "
          ,"style='font-family: Calibri;margin-top: 0;margin-bottom: 0;color: #003000;font-size: medium;border: 1px solid #008000;' "
          ," text-align: right;'"
          ," text-align: left;'"
          ," '");
        }
        else
        {
          html_data=(char*)malloc(sizeof(char)*256);
          strcpy(html_data,"unknown data");
        }
        /*
        char *html_data2=(char*)malloc(sizeof(char*)*strlen(html_data));
        str_sh(html_data2,html_data);
        if(html_data!=NULL)
        {
          free(html_data);
          html_data=NULL;
        }*/
        //buff[nread]='\0';
        //memset(ws_buff,0,2048);
        //str_sh(ws_buff,buff);

        send_TXT(client_fd, (unsigned char*) html_data,2);

        send_TXT(client_fd, (unsigned char*) "\"}",3);

        if(html_data!=NULL)
        {
          free(html_data);
          html_data=NULL;
        }
        
        //unsigned char *ret;
        //send_TXT(client_fd, ret,0);
      }
      
    }
    else if(get_str_n(js_data,"type","gl_data_raw")>=0) // var: send raw "GL_DATA" message
    {
      //if(get_str(js_data,"cmd_str",&temp_val)>=0)
      //char messag_out[2048]={0,};
      //strcpy(messag_out,(char*)messag);
      //send_TXT(client_fd, (unsigned char*) messag_out,0);

      last_client_id=client_fd;
      strcpy(global_str_GL,(char*)messag);
      
    }
    else
    {
      
    
    
      //char ret[1024];
      //char *ret;
      /*
      get_str(js_data, "type", &ret);
      printf("%s : %s\n\r","type",ret);
      get_str(js_data, "text", &ret);
      printf("%s : %s\n\r","text",ret);
      get_str(js_data, "id", &ret);
      printf("%s : %s\n\r","id",ret);
      get_str(js_data, "date", &ret);
      printf("%s : %s\n\r","date",ret);
      get_str(js_data, "float_num", &ret);
      printf("%s : %s\n\r","float_num",ret);
      */

      js_row js_data2[128];

      strcpy(js_data2[0].key,"x0");
      strcpy(js_data2[0].val,"-0.001");
      js_data2[0].type_=1;

      strcpy(js_data2[1].key,"x1");
      strcpy(js_data2[1].val,"-0.001");
      js_data2[1].type_=2;

      strcpy(js_data2[2].key,"x2");
      strcpy(js_data2[2].val,"ЙЦ\"УКЕН00\\0011\\\"11");
      js_data2[2].type_=2;

      js_data2[3].type_=0;

      char messag_out[4096];
      memset(messag_out,0,4096);

      pack_js_data(messag_out,js_data2,3);


      send_TXT(client_fd, (unsigned char*) messag_out,0);
    }
  }
  else
  {
    unsigned char ret[]="00";
    send_TXT(client_fd, ret,0);
  }
}

void send_static(int client_fd, char *full_path)
{
  FILE *fp;
  char buff[1024];
  char ws_buff[2048];
  size_t nread;
  fp = fopen(full_path,"r");
  if(fp)
  {
    while((nread = fread(buff,1, sizeof(buff)-1, fp))>0)
    {
      buff[nread]='\0';
      memset(ws_buff,0,2048);
      json_sh_cat(ws_buff,buff);
      send_TXT(client_fd, (unsigned char*) ws_buff,2);
    }
    fclose(fp);
  }
}
