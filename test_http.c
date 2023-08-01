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
#include "post_list.c"
#include "test_http.h"

#include "http_data.c"

#include "hashs.c"
#include "ws.c"

int m_debug = 0;

sem_t sem_proc1;

int proc_count=0;

//typedef struct tag_ini_data ini_data;

struct tread_data
{
  int m_client_fd;
  int m_res;
  int m_busy;
  int pid;
  ini_data *p_ini;
};
typedef struct tread_data cdata;
//typedef struct ini_data   idata;

jmp_buf env_1;

int do_smth(cdata *pcdata,int client_fd, char *data_in);

void handle_sig_nopipe(int sig)
{
    printf("/*----Caught pipe signal----*/ N: %d\n\r", sig);
    signal(SIGPIPE, handle_sig_nopipe);
    longjmp(env_1, err_pipe);
}

void ini_parse_ret(struct parse_ret *p_data)
{
  memset(p_data->bufs, '\0', 4096);
  memset(p_data->bufr, '\0', http_size*http_line_len);
  p_data->q_line=0;
  memset(p_data->bufr1, '\0', http_size*http_name_len);
  memset(p_data->bufr2, '\0', http_size*http_vals_len);
  memset(p_data->param_name, '\0', max_params*param_name_len);
  memset(p_data->param_vals, '\0', max_params*param_vals_len);
  memset(p_data->path_chain, '\0', path_inners*path_obj_len);
  p_data->qc=0;
  p_data->qp=0;
  memset(p_data->file_path, '\0', http_vals_len);
  memset(p_data->post_params_str, '\0', http_vals_len);
  p_data->post_params_length=0;
  memset(p_data->key_out, '\0', 24);
  p_data->ws_conn=0;
}

int form_full_path(struct parse_ret *p_data)
{
  for(int ii=0;ii<p_data->qc; ii++)
  {
    if(ii>0)
    {
      strcat(p_data->file_path,"/");
    }
    else
    {
      strcat(p_data->file_path,"./");
    }
    strcat(p_data->file_path,p_data->path_chain[ii]);
  }
  return 0;
}

//char *show_err_page(char *err_msg, struct parse_ret *p_data);
wchar_t *show_err_page_w(int msg_type,char *err_msg, struct parse_ret *p_data);

extern inline void parse_step1(char *src, int i, char *ret1, char *ret2)
{
  char *s1=NULL;
  char *s2=NULL;
  char *s3=NULL;
  char *s4=NULL;
  char d_char[http_vals_len];
  memset(d_char, '\0', http_vals_len);
  if(i==0)
  {
    s1=strstr(src,"GET ");
    if(s1)
    {
      strcpy(ret1, "GET");
      s1=&src[4];
      int L=strlen(s1);  
      //int L = L0;//<=http_name_len? L0:http_name_len;
      //char st1[http_name_len];
      char *pst1=(char *)malloc(sizeof( char )*(L+1));
      //memset(st1, '\0', http_name_len);
      memset(pst1, '\0', L+1);
      for(register int j=0;j<L;j++)
      {
        //st1[j]=s1[L-1-j];
        pst1[j]=s1[L-1-j];
      }
      //char *s11=strstr(st1,"/PTTH ");
      char *s11=strstr(pst1,"/PTTH ");
      int L11=strlen(s11)-6;

      //strncpy(d_char, &src[4],L11);
      strncpy(pst1, &src[4],L11);
      pst1[L11]='\0';
      //int d_ret=
      //url_decode(d_char, ret2);
      url_decode(pst1, ret2);
      free(pst1);
      pst1=NULL;
      //strncpy(ret2, &src[4],L11);
    }
    else
    {
      s1=strstr(src,"POST ");
      if(s1)
      {
        strcpy(ret1, "POST");
        s1=&src[5];
        int L=strlen(s1);
        //char st1[http_name_len];
        char *pst1=(char *)malloc(sizeof( char )*(L+1));
        //memset(st1, '\0', http_name_len);
        memset(pst1, '\0', L+1);
        for(int j=0;j<L;j++)
        {
          //st1[j]=s1[L-1-j];
          pst1[j]=s1[L-1-j];
        }
        //char *s11=strstr(st1,"/PTTH ");
        char *s11=strstr(pst1,"/PTTH ");
        int L11=strlen(s11)-6;

        //strncpy(d_char, &src[5],L11);

        strncpy(pst1, &src[5],L11);
        pst1[L11]='\0';
    
        //int d_ret=
        //url_decode(d_char, ret2);
        url_decode(pst1, ret2);
        free(pst1);
        pst1=NULL;
        //strncpy(ret2, &src[5],L11);
      }
    }
  }
  else
  {
    int L1;
    int LF=strlen(src);
    int len1=0;
    int len2=0;
    int len3=0;
    int len4=0;
    s1=strstr(src,": ");
    s2=strstr(src,"\"");
    s3=strstr(src,"'");
    s4=strstr(src,"=");

    len1 = s1 ? strlen(s1):0;
    len2 = s2 ? strlen(s2):0;
    len3 = s3 ? strlen(s3):0;
    len4 = s4 ? strlen(s4):0;

    if(!s1 || len1<len2 || len1<len3 || len1<len4 )
    {
      L1=LF;
      //strncpy(ret1, &src[0],0);
      strncpy(ret2, &src[0],LF);
    }
    else
    {
      L1=strlen(s1);
      strncpy(ret1, &src[0],LF-L1);
      strncpy(ret2, &src[LF-L1+2],L1-2);
    }
  }
}

extern inline int parse_params(int mode_,char *src, char ret1[][param_name_len], char ret2[][param_vals_len])
{
  int Q=0;
  char *s1=NULL;
  s1=strstr(src,"?");
  char *ss;
  if(s1 || mode_==1)
  {
    if(mode_==0)
    {
      ss=&s1[1];
    }
    else
    {
      ss=src;
    }
    //int Lss=strlen(ss);
    //printf("ss: %s\n",ss);

    char *ps, *pp, *p_in;//, *p_name, *p_vals;
    ps=ss;
    int i=0;
    for(i=0;;i++)
    {
      pp=strtok(ps,"&");
      ps=NULL;
      if(pp!=NULL)
      { 
        int L1;
        int LF=strlen(pp);
        p_in=strstr(pp,"=");
        if(p_in!=NULL)
        {
          L1=strlen(p_in);
          strncpy(ret1[i], &pp[0],LF-L1);
          strncpy(ret2[i], &pp[LF-L1+1],L1-1);
        }
        else
        {
          L1=LF;
          strncpy(ret1[i], &pp[0],LF-L1);
          strncpy(ret2[i], &pp[LF-L1],L1);
        }
      }
      else{break;}
    }
    Q=i;

  }
  else
  {
    return 0;
  }

  return Q;
}

extern inline int parse_path(char *src, char ret1[][path_obj_len])
{
  int L = strlen(src);
  int i=0;
  int j=0;
  int k=0;
  int z=0;
  char buf[path_obj_len];
  memset(buf, '\0', path_obj_len);
  for(i=0;i<L;i++)
  {
    if(src[i]!=' ' || z>0)
    {
      z=1;
      if(src[i]=='/' || src[i]=='\\')
      {
        if(j>0)
        {
          strncpy(ret1[k], buf, j);
          k++;
          if(k>=path_inners)
          {
            return -2;
          }
          j=0;
          memset(buf, '\0', path_obj_len);
        }
      }
      else
      {
        buf[j]=src[i];
        j++;
        if(j>=path_obj_len)
        {
          return -1;
        }
      }
    }
  } 
  if(j>0)
  {
    strncpy(ret1[k], buf, j);
    k++;
  }
  return k;
}

extern inline int ishex(int x)
{
	return	(x >= '0' && x <= '9')	||
		(x >= 'a' && x <= 'f')	||
		(x >= 'A' && x <= 'F');
}

int url_decode(const char *s, char *dec)
{
	char *o;
	const char *end = s + strlen(s);
	unsigned int c; /*int*/

	for (o = dec; s <= end; o++) {
		c = *s++;
		if (c == '+') c = ' ';
		else if (c == '%' && (	!ishex(*s++)	||
					!ishex(*s++)	||
					!sscanf(s - 2, "%2x", &c)))
			return -1;

		if (dec) *o = c;
	}

	return o - dec;
}

int form_MIME_file(char* res, char* f_name)
{
  int ret=0;
  int L=strlen(f_name);
  if(L<3)
  {
    return -1;
  }
  int N=L<5?L:5;
  for(int i=0; i<N; i++)
  {
    int h=L-N+i;
    char a=f_name[h];
    if(a=='.')
    {
      char bb[8]={'\0',};
      strcpy(bb,&f_name[h+1]); 
      //int LL=strlen(bb);
      if(!strcmp(bb,"html"))
      {
        strcpy(res,responseZZ01);
        ret=1;
      }
      else if(!strcmp(bb,"htm"))
      {
        strcpy(res,responseZZ01);
        ret=1;
      }
      else if(!strcmp(bb,"css"))
      {
        strcpy(res,responseZZ02);
        ret=2;
      }
      else if(!strcmp(bb,"js"))
      {
        //strcpy(res,responseZZ01);
        strcpy(res,responseZZ03);
        ret=3;
      }
      else if(!strcmp(bb,"ico"))
      {
        strcpy(res,responseZZ09);
        ret=9;
      }
      else if(!strcmp(bb,"gif"))
      {
        strcpy(res,responseZZ04);
        ret=4;
      }
      else if(!strcmp(bb,"jpeg"))
      {
        strcpy(res,responseZZ05);
        ret=5;
      }
      else if(!strcmp(bb,"jpg"))
      {
        strcpy(res,responseZZ05);
        ret=5;
      }
      else if(!strcmp(bb,"png"))
      {
        strcpy(res,responseZZ06);
        ret=6;
      }
      else if(!strcmp(bb,"svg"))
      {
        strcpy(res,responseZZ07);
        ret=7;
      }
      else if(!strcmp(bb,"bmp"))
      {
        strcpy(res,responseZZ10);
        ret=10;
      }
      else if(!strcmp(bb,"tiff"))
      {
        strcpy(res,responseZZ08);
        ret=8;
      }
      else
      {
        strcpy(res,responseZZ01);
        ret=1000;
      }
      return ret;
    }
  }
  strcpy(res,responseZZ01);
  return 0;
}

void make_header(char *dest, char *MIME, int m_size, int m_cash, int m_conn)
{
  char a_buf[256]={0,};
  memset(dest,0,strlen(dest));
  strcpy(dest,"HTTP/1.1 200 OK\n\r");
  strcat(dest," \r\n");
  strcat(dest,"server: GLOB-1.2\r\n");
  strcat(dest,MIME);
  if(m_size<0)
  {
    strcat(dest,"Transfer-Encoding: chunked\r\n");
  }
  else if(m_size>0)
  {
    sprintf(a_buf,"Content-Length: %d\r\n",m_size);
    strcat(dest,a_buf);
  }
  if(m_conn>=0)
  {
    strcat(dest,"Connection: keep-alive\r\n");
    if(m_conn>0)
    {
      memset(a_buf,0,256);
      sprintf(a_buf,"Keep-Alive: timeout=%d\r\n",m_conn);
      strcat(dest,a_buf);
    }
  }
  if(m_cash==0)
  {
    strcat(dest,"Cache-Control: no-cache\r\n");
  }
  else if(m_cash>0)
  {
    memset(a_buf,0,256);
    sprintf(a_buf,"Cache-Control: max-age=%d\r\n",m_cash);
    strcat(dest,a_buf);
  }
  else
  {
    strcat(dest,"Cache-Control: no-store\r\n");
  }
}

int main_test_http()
{
  
// /aaa
// /test.html?query=alibaba
// /test.html?query=alibaba&par1 =AA& par2=BB&111=222=333
// /page1
// /proc1/static%D0%A4/index.html?ssi=123456&aa=%D0%A4%D0%A4
  char *s_data1 = "GET /proc1ФХ/static%20%D0%A4%D0%A5/index.html?ssi=123456&aa=%D0%A4%D0%A4 HTTP/1.1\n\r"
"Host: 127.0.0.1:9085\n\r"
"User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0\n\r"
"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8\n\r"
"Accept-Language: en-US,en;q=0.5\n\r"
"Accept-Encoding: gzip, deflate, br\n\r"
"Connection: keep-alive\n\r"
"Upgrade-Insecure-Requests: 1\n\r"
"Sec-Fetch-Dest: document\n\r"
"Sec-Fetch-Mode: navigate\n\r"
"Sec-Fetch-Site: cross-site\n\r"
//"Sec-Fetch-Site: none\n\r"
//"Sec-Fetch-User: ?1\n\r"
"\n\r";
/*
char *s_data2 = "POST / HTTP/1.1\n\r"
"Host: foo.com\n\r"
"Content-Type: application/x-www-form-urlencoded\n\r"
"Content-Length: 13\n\r"
"\n\r"
"say=Hi&to=Mom\n\r"
//"Sec-Fetch-Site: none\n\r"
//"Sec-Fetch-User: ?1\n\r"
"\n\r";
*/
    char *s_data=s_data1;
    do_smth(0,0,s_data);
    return 0;
}

void * read_do_smth(void *client_arg)
{
  setlocale(LC_ALL, "en_US.utf8");
  //setlocale(LC_ALL, "ru_RU.utf8");
  sem_wait(&sem_proc1);
  proc_count=proc_count+1;
  sem_post(&sem_proc1);
  cdata *p_data=(cdata *) client_arg;
  p_data->m_busy=1;

  int client_fd = p_data->m_client_fd;
  int res_d=0;
  char buf[2048];
  memset(buf, '\0', 2048);

  int bytes_read;
  bytes_read = recv(client_fd, buf, 2048, 0);
  //bytes_read = recvfrom(sock, buf, 1024, 0, (struct sockaddr *) &cli_addr, &sin_len);
  if(bytes_read <= 0) 
  {
    printf("p[%d]_Client_%d: no input data, close connection\n\r",p_data->pid, client_fd);
    close(client_fd);
    client_fd=0;
    p_data->m_client_fd=0;
    //break;
  }
  else if(bytes_read>=2048)
  {
    printf("p[%d]_Client_%d: LARGE data len: %d\n", p_data->pid,client_fd,bytes_read);
    close(client_fd);
    client_fd=0;
    p_data->m_client_fd=0;
  }
  else
  {
    printf("p[%d]_Client_%d: data len: %d\n", p_data->pid,client_fd,bytes_read);
    res_d=do_smth(p_data,client_fd,buf);
    if(res_d==err_pipe)
    {
      printf("p[%d]: Err! No Client_%d\n", p_data->pid, client_fd);
      close(client_fd);
      client_fd=0;
      p_data->m_client_fd=0;
    }
    
  }

  //int res=do_smth(client_fd, data_in);

  p_data->m_busy=0;
  free(client_arg);
  client_arg=NULL;
  sem_wait(&sem_proc1);
  proc_count=proc_count-1;
  sem_post(&sem_proc1);

  pthread_exit(NULL);
  //return res_d;
}

ssize_t write2(int _fd, const void *buf, size_t _n)
{
  ssize_t ret=0;
  //char bbuf[4096];
  int e_val = setjmp(env_1);
  if(e_val) {
    printf("PIPE-ERR: Возникла ошибка с кодом %d\n\r", e_val);

    return -1;
  }
  else
  {
    //strcpy(bbuf,(char*)buf);
    //printf("response Client_%d:\n\r%s|\n\r",_fd,(char*)buf);
    ret= write(_fd, buf, _n);
  }

  return ret;
}

int do_smth(cdata *pcdata,int client_fd, char *data_in)
{
  int pid=pcdata->pid;
  //usleep(8000000);
  char sMIME[256]={'\0',};
  strcpy(sMIME,responseZZ00);

  int fd_status=1;
  pthread_t ws_thread;

  clock_t t1 = clock(), t2;
  
  struct parse_ret *p_m = NULL;
  p_m=(struct parse_ret *)malloc(sizeof(struct parse_ret ));

  int e_val = setjmp(env_1);
  if(e_val) {
    printf("p[%d]_Client_%d: Возникла ошибка с кодом %d\n\r",pid, client_fd, e_val);
    if(p_m)
    {
      free(p_m);
    }
    return e_val;
  }

  ini_parse_ret(p_m);

  //int bytes_read;

  char /**p0, *p1,*p2,*p3,*/ *pp,*ps;

  int NL=0;
  if(data_in){NL=strlen(data_in);}
  strcpy(p_m->bufs,data_in);

  printf("p[%d]_Client_%d: M_source: \n\r%s\n\r",pid, client_fd, p_m->bufs);

  // Раскладываем по строкам:
  ps=p_m->bufs;
  int i=0;
  int L=0;
  int e1=0;
  for(i=0;;i++)
  {
    pp=strtok(ps,"\n\r");
    if(pp){NL=strlen(pp);}
    if(pp==NULL && e1>1){break;}
    ps=NULL;
    //printf("%d: %s\n", i, pp);
    if(pp!=NULL){ strcpy(p_m->bufr[i],pp);}
    else{e1++;}
  }
  p_m->q_line=i;
  L=i;
  
  strcpy(p_m->bufs,data_in); // Восстанавливаем после нарезки strtok
  
  if(m_debug==1)
  {
    for(i=0;i<L;i++)
    {
      printf("%d: %s\n", i, p_m->bufr[i]);
    }
  }
  //i=0;
  // Раскладываем строки на два столбца (параметр | значение):
  for(i=0;i<L;i++)
  {
    parse_step1(p_m->bufr[i], i, p_m->bufr1[i], p_m->bufr2[i]);
    if(m_debug==1)
    {
      printf("%d-1|%s\n",i,p_m->bufr1[i]);
      printf("%d-2|%s\n",i,p_m->bufr2[i]);
    }
  }
  

  //int qc=0;
  //int qp=0;
    
  if(strcmp(p_m->bufr1[0],"GET")==0)
  {
    printf("p[%d]_Client_%d: %s\n\r",pid, client_fd,"1-GET");
    //int q=0;
    char *s1=NULL;
    int LF=strlen(p_m->bufr2[0]);
    s1=strstr(p_m->bufr2[0],"?");
    int L1=0;
    char sp[http_vals_len];
    memset(sp, '\0', http_vals_len);
    if(s1==NULL)
    {
      L1=0;
    }
    else
    {
      L1=strlen(s1);
      char tmps[sizeof(p_m->bufr2[0])];
      strcpy(tmps, p_m->bufr2[0]);
      p_m->qp=parse_params(0,tmps, p_m->param_name, p_m->param_vals);
    }
    
    strncpy(sp,p_m->bufr2[0],LF-L1);
    p_m->qc=parse_path(sp, p_m->path_chain);
    form_full_path(p_m);
    int rret=http_list(pid,client_fd,p_m); // тут все "адреса" GET-POST страниц
    if(rret==1)
    {
      close(client_fd);
      free(p_m);
      p_m=NULL;
      return 0;
    }
  }
  else if(strcmp(p_m->bufr1[0],"POST")==0)
  {
    printf("p[%d]_Client_%d: %s\n",pid, client_fd,"1-POST");
    int i=0;
    int x1=0;
    int LL=0;
    char tmp_c[sizeof(p_m->bufr2[0])];
    memset(tmp_c,'\0',sizeof(tmp_c));
    for(i=0; i<p_m->q_line;i++)
    {
      if(x1==0)
      {
        if(!strcmp(p_m->bufr1[i],"Content-Length"))
        {
          x1=1;
          if(strlen(p_m->bufr2[i])>0)
          {
            p_m->post_params_length=atoi(p_m->bufr2[i]);
          }
        }
      }
      else if(x1==1)
      {
        if(!strcmp(p_m->bufr1[i],"") && strcmp(p_m->bufr2[i],""))
        {
          LL=strlen(p_m->bufr2[i]);
          if(LL==p_m->post_params_length)
          {
            strcpy(p_m->post_params_str,p_m->bufr2[i]);
            //p_m->post_params_str=p_m->bufr2[i];
            break;
          }
          else
          {
            strcpy(tmp_c, p_m->bufr2[i]);
          }
        }
      }
    }
    if(!strcmp(p_m->post_params_str, "") && strcmp(tmp_c, ""))
    {
      strcpy(p_m->post_params_str,tmp_c);
    }
    if(strcmp(p_m->post_params_str,""))
    {
      char tmps[sizeof(p_m->post_params_str)];
      strcpy(tmps, p_m->post_params_str);
      p_m->qp=parse_params(1,tmps, p_m->param_name, p_m->param_vals);
    }

    char sp[http_vals_len];
    memset(sp, '\0', http_vals_len);
    int LF=strlen(p_m->bufr2[0]);
    strncpy(sp,p_m->bufr2[0],LF);
    p_m->qc=parse_path(sp, p_m->path_chain);
    form_full_path(p_m);


    // тестовая отработка POST /////////////////////////////////////////////

    http_list(pid,client_fd,p_m); // тут все "адреса" GET-POST страниц

    close(client_fd);
    free(p_m);
    p_m=NULL;
    return 0;
    ////////////////////////////////////////////////////////////////////////
  }


  //char sMIME[256]={'\0',};
  //strcpy(sMIME,responseZZ00);


  //char *kkey;
  //char *p = NULL;
  for(i=0; i<p_m->q_line; i++)
  {
    if(!strcmp(p_m->bufr1[i],"Sec-WebSocket-Key"))
    {
      //kkey=p_m->bufr2[i];

      char resultstr[64] = {0,};
          /*
          int i = 0, it = 0;
          for(i = 19; it < 24; i++, it++)
           {
             resultstr[it] = p[i];
           }
           */
          strncpy(resultstr,p_m->bufr2[i],24);
          strcat(resultstr, GUIDKey);

          printf("\np[%d]_Client_%d: _____________|Key ot clienta__________|GUIDKey____________________________\n",pid, client_fd);
          printf("Result_stroka:%s\n", resultstr);


          ////////////////////////////sha1///////////////////////////////////////
          unsigned char temp[SHA_DIGEST_LENGTH] = {0,};
          SHA1(temp, resultstr, strlen(resultstr));


        ///////////////////// нужна только для того чтоб увидеть SHA1-хеш //////////////////////
          char buf[SHA_DIGEST_LENGTH*2] = {0,};                                               //
          for(i=0; i < SHA_DIGEST_LENGTH; i++)                                                // 
           {                                                                                  //
             sprintf((char*)&(buf[i*2]), "%02x", temp[i]);                          //  
           }                                                                                  //
          printf("\nSHA1_hash:%s\n", buf);                                            // 
        ////////////////////////////////////////////////////////////////////////////////////////


          ////////////////////////////Base64//////////////////////////////////// 
          //unsigned char key_out[64] = {0,};
          base64_encode(temp, p_m->key_out, sizeof(temp));

          printf("\nKey_for_client:%s\n", p_m->key_out);

          sem_init(&sem, 0, 0);

          char resp[131] = {0,};
          snprintf(resp, 130, "%s%s%s", response_ws, p_m->key_out, "\r\n\r\n");
          if(send(client_fd, resp, sizeof(char) * strlen(resp), MSG_NOSIGNAL) == -1) warning_access_log("send response_ws.");
          p_m->ws_conn=1;
          //////////////////////////// START WS /////////////////////////////////
          if(pthread_create(&ws_thread, NULL, &ws_func, &client_fd) != 0) error_log("creating WS.");
          pthread_detach(ws_thread);
          sem_wait(&sem);

    }
  }

  t2 = clock();
  float time1 = ( 1.f * ( t2 - t1 ) ) / CLOCKS_PER_SEC * 1000;

  //usleep(5000000);

  if(p_m->ws_conn==1)
  {
    ;
  }
  //else if(p_m->qc==1 && !strcmp(p_m->bufr2[0],"/test"))
  else if(p_m->qc==1 && !strcmp(p_m->path_chain[0],"test"))
  {
    char msg[http_vals_len+128];
    sprintf( msg, "executed in %.2f ms </br>", time1 );
    strcat(msg,p_m->file_path);
    //wchar_t *err_out = show_err_page_w(0,msg, p_m);
    char *err_out = show_err_page(0,msg, p_m);
    //int len_err_out=wcslen(err_out);
    int len_err_out=strlen(err_out);

    //write2(client_fd, response0, sizeof(response0) - 1);
    //write2(client_fd, "\r\n", 2);
    char bbb[]="HTTP/1.1 200 OK\r\n \r\nserver: GLOB-1.2\r\nContent-Type: text/html; charset=UTF-8;\r\n\r\n"; //charset=utf-8;
    write2(client_fd, bbb, sizeof(bbb) - 1);
    write2(client_fd, err_out, sizeof(*err_out)*len_err_out-1);
    write2(client_fd, responseE, sizeof(responseE) - 1);
    free(err_out);
    err_out=NULL;
    close(client_fd);
  }
  else
  {
//////////////////////////////////////////////////
    if(/*p_m->qc>0 &&*/ p_m->qp>=0)
    {
        FILE *fp;
        char buff[2048];
        size_t nread;

        char bbbb[8000];
        memset(bbbb,0,8000);

        
        
        printf("file_path: [%s]\n\r",p_m->file_path);
        char msg[http_vals_len+128];
        memset(msg, '\0', http_vals_len+128);
        //fp = fopen("./page_.htm","r");
        char res_file[256]={'\0',};
        if(p_m->qc==0)
        {
          // default page
          //strcpy(res_file,"./index.html");
          strcpy(res_file,pcdata->p_ini->ini_def_page);
          printf("    def_Pages: %s\n\r",pcdata->p_ini->ini_def_page);
          fp = fopen(pcdata->p_ini->ini_def_page,"r");
          //strcpy(msg,"bad path for ini index.html static file</br>path: ");
          //strcat(msg,"./index.html");
        }
        else
        {
          strcpy(res_file,p_m->path_chain[p_m->qc-1]);
          fp = fopen(p_m->file_path,"r");
          //strcpy(msg,"bad path for static file</br>path: ");
        }
        //fp = fopen(p_m->file_path,"r");
        //struct parse_ret parse_m;
        int fres=   form_MIME_file(sMIME, res_file);
        if(!fp)
        {
          //strcpy(msg,"bad path for static file</br>path: ");
          //strcat(msg,p_m->file_path);
          //int fres=form_MIME_file(sMIME, res_file);
          if(fres>-10001)
          {
            if(p_m->qc==0)
            {
              strcpy(msg,"bad path for ini html file</br>path: ");
              strcat(msg,pcdata->p_ini->ini_def_page);
            }
            else 
            {
              if(fres==0)
              {
                strcpy(msg,"bad url path</br>url: ");
                strcat(msg,p_m->file_path);
              }
              else
              {
                strcpy(msg,"bad path for static file</br>path: ");
                strcat(msg,p_m->file_path);
              }
            }
            char *err_out = show_err_page(1,msg, p_m);
            strcpy(bbbb,err_out);
            int len_err_out=strlen(err_out);
            char bbb[]="HTTP/1.1 200 OK\r\n \r\nserver: GLOB-1.2\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n";
            //len_err_out=strlen(bbb);
            //int bbb_sz=sizeof(bbb[0]);
            //write(client_fd, response0, sizeof(response0) - 1);
            write2(client_fd, bbb, sizeof(bbb) - 1);
            write2(client_fd, err_out, sizeof(*err_out)*len_err_out);
            //write(client_fd, bbb, bbb_sz*len_err_out);
            write2(client_fd, responseE, sizeof(responseE) - 1);
            free(err_out);
          }
          else
          {
            memset(responseZ_RES,'\0',sizeof(responseZ_RES));
            strcat(responseZ_RES,responseZerrF);
            strcat(responseZ_RES,sMIME);
            strcat(responseZ_RES,responseE);
            int Z_L=strlen(responseZ_RES);
            //write(client_fd, response0, sizeof(response0) - 1);
            printf("------------------\n\rout_to [%d]:\n\r---------\n\r%s\n\r------------------\n\r",client_fd,responseZ_RES);
            write2(client_fd, responseZ_RES, Z_L);
          }
        }
        else
        {
          //form_MIME_file(sMIME, res_file);
          //strcat(responseZ,sMIME);har
          //char hex_len[32];
          int buff_sz=2048;
          int sz_mode=0;
          int chank_mode=0;
          //char head[1024]={0,};
          char hex_len_buff[2200]={0,}; //2179
          //memset(responseZ_RES,'\0',sizeof(responseZ_RES));
          
          /*
          strcat(responseZ_RES,responseZ);
          strcat(responseZ_RES,sMIME);
          strcat(responseZ_RES,"Transfer-Encoding: chunked\r\n");
          strcat(responseZ_RES,"Cache-Control: no-store\r\n");
          //strcat(responseZ_RES,"Connection: keep-alive\r\n");
          strcat(responseZ_RES,responseE);
          //make_header(head,sMIME,);
          int Z_L=strlen(responseZ_RES);
          printf("------------------\n\rout_to [%d]:\n\r-------\n\r%s\n\r------------------\n\r",client_fd,responseZ_RES);
          if(fd_status>0)
          {
            if(write2(client_fd, responseZ_RES, Z_L)<0)
            {
              fd_status=0;
            }
          }
          */
          int ll=0;
          while((nread = fread(buff,1, sizeof(buff)-1, fp))>0)
          {
            int full_len=0;
            buff[nread]='\0';
            memset(hex_len_buff,'\0',sizeof(hex_len_buff));

            char a_buf[256]={0,};
            //sprintf(hex_len_buff,"%x\r\n",(int)nread);
            //strcat(hex_len_buff,buff);
            //strcat(hex_len_buff,responseE);
            //int full_len=strlen(hex_len_buff);
            if(fd_status>0) //fres
            {
              if(ll==0)
              {
                if( nread < (size_t)(buff_sz-1))
                {
                  sz_mode=nread;
                }
                else
                {
                  if(fres==1 || fres==2 || fres==3 || fres==1000)
                  {
                    sz_mode=-1;
                    chank_mode=1;
                  }
                  else
                  {
                    sz_mode=0;
                  }
                }
                make_header(hex_len_buff,sMIME,sz_mode,-1,-1);
                strcat(hex_len_buff,responseE);
              }

              if(chank_mode==1)
              {
                sprintf(a_buf,"%x\r\n",(int)nread);
                strcat(hex_len_buff,a_buf);
              }

              full_len=strlen(hex_len_buff);
              //strcat(hex_len_buff,buff);
              for(unsigned int i=0; i<nread; i++)
              {
                hex_len_buff[full_len+i]=buff[i];
              }
              full_len=full_len+nread;
              hex_len_buff[full_len]='\0';

              if(chank_mode==1)
              {
                strcat(hex_len_buff,responseE);
                full_len=full_len+strlen(responseE);
              }

              if(write2(client_fd, hex_len_buff, full_len)<0)
              {
                fd_status=0;
              }
            }
            ll++;
          }
          if(fd_status>0)
          {
            char hex_len_buff_e[] ="\r\n\r\n";
            char hex_len_buff_e0[]="0\r\n\r\n";
            char *ch=NULL;
            if(chank_mode==1)
            {
              ch=hex_len_buff_e0;
            }
            else
            {
              ch=hex_len_buff_e;
            }
            int full_len=strlen(ch);
            if(write2(client_fd, ch, full_len))
            {
              fd_status=0;
            }
            /*if(write2(client_fd, responseE, sizeof(responseE) - 1))
            {
              fd_status=0;
            }*/
          }


          fclose(fp);
        }
        close(client_fd);
    }
//////////////////////////////////////////////////



    if(m_debug==1)
    {
      t2 = clock();
      float time1 = ( 1.f * ( t2 - t1 ) ) / CLOCKS_PER_SEC * 1000;

      
      
      
      
      printf( "executed in %.2f ms\n", time1 );
      printf("chains: %d\n", p_m->qc);
      for(i=0;i<p_m->qc; i++)
      {
        printf("path_chain %d: [%s]\n",i,p_m->path_chain[i]);
      }

      printf("params: %d\n", p_m->qp);
      if(strcmp(p_m->post_params_str,""))
      {
        printf("POST_par_line: [%s]\n",p_m->post_params_str);
      }
      for(i=0;i<p_m->qp; i++)
      {
        printf("par_name %d: [%s]\n",i,p_m->param_name[i]);
        printf("par_vals %d: [%s]\n",i,p_m->param_vals[i]);
      }
      printf("----------------------------------------------------------------------\n\n");
    }
    
  }
  free(p_m);
  p_m=NULL;
  return 0;
}

wchar_t *show_err_page_w(int msg_type,char *err_msg, struct parse_ret *p_data)
{
  wchar_t *ret=(wchar_t *)malloc(sizeof( wchar_t )*4000);
  //char *ret_out=(char *)malloc(sizeof( char )*4000);
  memset(ret, '\0', 4000);
  //memset(ret_out, '\0', 4000);
  int i=0;
  wchar_t wt1[1024]={'\0',};
  //wchar_t wt2[1024]={'\0',};
  //char s1[]="<html><body><strong>Error</strong></br>type: "; //bad path for static file</br>path:";
  wcscat(ret,L"<!DOCTYPE html><html><head><style>.style_h {"
  "font-family: Calibri;"
  //"letter-spacing: -1pt;"
  "margin-top: 0;"
  "margin-bottom: 0;"
  "color: #004000;"
  "font-size: medium;"
  "border: 1px solid #008000;"
  "}"
  ".style5_2 {"
	"color: #FF6600;"
	"text-align: center;"
	"border: 1px solid #008000;"
  "font-family: Verdana, Helvetica, sans-serif;"
  "font-size: 11px;"
  "}"
  "</style></head><body><table><tr><td style='text-align: center;'>");
  if(msg_type==0)
  {
    wcscat(ret,L"<strong style='color: blue;'>Diagnostic</strong></td></tr><tr><td>");
    wcscat(ret,L"result: ");
    
    mbstowcs(wt1,err_msg,1024);
    wcscat(ret,wt1);
    wcscat(ret,L"&nbsp;Path: ");
    mbstowcs(wt1,p_data->file_path,1024);
    wcscat(ret,wt1);
    wcscat(ret,L"</td></tr>");
  }
  else
  {
    wcscat(ret,L"<strong style='color: red;'><h2>Error</h2></strong></td></tr><tr><td>");
    //strcat(ret,"Type: ");
    //strcat(ret,err_msg);
    //strcat(ret,"&nbsp;Path: ");
    //strcat(ret,p_data->file_path);
    wcscat(ret,L"</td></tr>");
    wcscat(ret,L"<tr><td style='text-align: center;'><table style='height:100px; width: 100%;'><tr>"
    "<td> Type:");
    mbstowcs(wt1,err_msg,1024);
    wcscat(ret,wt1);
    //strcat(ret,"&nbsp;Path: ");
    //strcat(ret,p_data->file_path);
    wcscat(ret,L"</td>"
    "<td style='text-align: center;'><div><img src='/16470096361658847.jpg'/></div></td></tr></table></td></tr>");
  }
  //style='display: block; float:right;'
  //strcat(ret,err_msg);
  //style='display: block; float:left;'
  //strcat(ret,err_msg);
  //strcat(ret,p_data->file_path);
  wcscat(ret,L"<tr><td>  Parsing result:</br><table class='style_h'><tr><td colspan=2 style='background: #AACAFF'>raw data:</td></tr><tr><td colspan=2>");//<td>param</td><td>val</td></tr><tr><td>raw_data</td><td>");
  mbstowcs(wt1,p_data->bufs,1024);
  wcscat(ret,wt1);
  wcscat(ret,L"</td></tr><tr><td colspan=2 style='background: #AACAFF'>row split result:</td></tr>");

  for(i=0;i<p_data->q_line;i++)
  {
    wchar_t c[4];
    swprintf(c, 1024, L"%d", i+1);
    wcscat(ret,L"<tr><td style='width:50px;'>");
    wcscat(ret,c);
    wcscat(ret,L":</td><td>");
    mbstowcs(wt1,p_data->bufr[i],1024);
    wcscat(ret,wt1);
    wcscat(ret,L"</td><tr>");
  }
  wcscat(ret,L"<tr><td colspan=2 style='background: #AACAFF'>detailed:</td></tr><tr><td>method:</td><td>");
  mbstowcs(wt1,p_data->bufr1[0],1024);
  wcscat(ret,wt1);
  wcscat(ret,L"</td></tr><tr><td>path:</td><td>");
  mbstowcs(wt1,p_data->file_path,1024);
  wcscat(ret,wt1);
  wcscat(ret,L"</td></tr>");
  if(p_data->qp>0)
  {
    //char cpp[1024];
    //char cpv[1024];
    wcscat(ret,L"<tr><td colspan=2 style='background: #AACAFF'>params:</td></tr>");
    char buf[1024]={'\0',};
    wchar_t wbuf[1024]=L"ЙЙЙ";
    for(int pi=0; pi<p_data->qp; pi++)
    {

      wcscat(ret,L"<tr><td>");
      mbstowcs(wt1,p_data->param_name[pi],1024);
      wcscat(ret,wt1);
      wcscat(ret,L"</td><td>");
      //wcstombs(buf, p_data->param_vals[pi], 2048);
      //wcstombs(buf, wbuf, 2048);
      wcscat(ret,wbuf);
      wcscat(ret,L"</td></tr>");
    }
  }
  wcscat(ret,L"</table></td></tr></table></body></html>");
  //wcstombs(ret_out, ret, 4000);
  //free(ret);
  //ret=NULL;
  return ret;
}



char *show_err_page2(int msg_type,char *err_msg, struct parse_ret *p_data)
{
  wchar_t *ret=(wchar_t *)malloc(sizeof( wchar_t )*4000);
  char *ret_out=(char *)malloc(sizeof( char )*4000);
  memset(ret, '\0', 4000);
  memset(ret_out, '\0', 4000);
  int i=0;
  wchar_t wt1[1024]={'\0',};
  wchar_t wt2[1024]={'\0',};
  //char s1[]="<html><body><strong>Error</strong></br>type: "; //bad path for static file</br>path:";
  wcscat(ret,L"<!DOCTYPE html><html><head><style>.style_h {"
  "font-family: Calibri;"
  //"letter-spacing: -1pt;"
  "margin-top: 0;"
  "margin-bottom: 0;"
  "color: #004000;"
  "font-size: medium;"
  "border: 1px solid #008000;"
  "}"
  ".style5_2 {"
	"color: #FF6600;"
	"text-align: center;"
	"border: 1px solid #008000;"
  "font-family: Verdana, Helvetica, sans-serif;"
  "font-size: 11px;"
  "}"
  "</style></head><body><table><tr><td style='text-align: center;'>");
  if(msg_type==0)
  {
    wcscat(ret,L"<strong style='color: blue;'>Diagnostic</strong></td></tr><tr><td>");
    wcscat(ret,L"result: ");
    
    mbstowcs(wt1,err_msg,1024);
    wcscat(ret,wt1);
    wcscat(ret,L"&nbsp;Path: ");
    mbstowcs(wt1,p_data->file_path,1024);
    wcscat(ret,wt1);
    wcscat(ret,L"</td></tr>");
  }
  else
  {
    wcscat(ret,L"<strong style='color: red;'><h2>Error</h2></strong></td></tr><tr><td>");
    //strcat(ret,"Type: ");
    //strcat(ret,err_msg);
    //strcat(ret,"&nbsp;Path: ");
    //strcat(ret,p_data->file_path);
    wcscat(ret,L"</td></tr>");
    wcscat(ret,L"<tr><td style='text-align: center;'><table style='height:100px; width: 100%;'><tr>"
    "<td> Type:");
    mbstowcs(wt1,err_msg,1024);
    wcscat(ret,wt1);
    //strcat(ret,"&nbsp;Path: ");
    //strcat(ret,p_data->file_path);
    wcscat(ret,L"</td>"
    "<td style='text-align: center;'><div><img src='/16470096361658847.jpg'/></div></td></tr></table></td></tr>");
  }
  //style='display: block; float:right;'
  //strcat(ret,err_msg);
  //style='display: block; float:left;'
  //strcat(ret,err_msg);
  //strcat(ret,p_data->file_path);
  wcscat(ret,L"<tr><td>  Parsing result:</br><table class='style_h'><tr><td colspan=2 style='background: #AACAFF'>raw data:</td></tr><tr><td colspan=2>");//<td>param</td><td>val</td></tr><tr><td>raw_data</td><td>");
  mbstowcs(wt1,p_data->bufs,1024);
  wcscat(ret,wt1);
  wcscat(ret,L"</td></tr><tr><td colspan=2 style='background: #AACAFF'>row split result:</td></tr>");

  for(i=0;i<p_data->q_line;i++)
  {
    wchar_t c[4];
    swprintf(c, 1024, L"%d", i+1);
    wcscat(ret,L"<tr><td style='width:50px;'>");
    wcscat(ret,c);
    wcscat(ret,L":</td><td>");
    mbstowcs(wt1,p_data->bufr[i],1024);
    wcscat(ret,wt1);
    wcscat(ret,L"</td><tr>");
  }
  wcscat(ret,L"<tr><td colspan=2 style='background: #AACAFF'>detailed:</td></tr><tr><td>method:</td><td>");
  mbstowcs(wt1,p_data->bufr1[0],1024);
  wcscat(ret,wt1);
  wcscat(ret,L"</td></tr><tr><td>path:</td><td>");
  mbstowcs(wt1,p_data->file_path,1024);
  wcscat(ret,wt1);
  wcscat(ret,L"</td></tr>");
  if(p_data->qp>0)
  {
    //char cpp[1024];
    //char cpv[1024];
    wcscat(ret,L"<tr><td colspan=2 style='background: #AACAFF'>params:</td></tr>");
    char buf[1024]={'\0',};
    wchar_t wbuf[1024]=L"ЙЙЙ";
    for(int pi=0; pi<p_data->qp; pi++)
    {
      wcscat(ret,L"<tr><td>");
      mbstowcs(wt1,p_data->param_name[pi],1024);
      wcscat(ret,wt1);
      wcscat(ret,L"</td><td>");
      //wcstombs(buf, p_data->param_vals[pi], 2048);
      //wcstombs(buf, wbuf, 2048);
      wcscat(ret,wbuf);
      wcscat(ret,L"</td></tr>");
    }
  }
  wcscat(ret,L"</table></td></tr></table></body></html>");
  wcstombs(ret_out, ret, 4000);
  free(ret);
  ret=NULL;
  return ret_out;
}

//////////////////////

void safe_strcat(char **dest, char *src, int *cur_lim, int tr, int add)
{
  //int LK=4000;
  int LL=0;
  int L2=0;
  //int L_tr=256;
  //int L_add=1000;

  LL=strlen(*dest);
  L2=strlen(src);
  if((*cur_lim)-LL-L2<tr)
  {
    (*cur_lim)=LL+L2+add+tr;
    *dest=(char *)realloc(*dest,sizeof( char )*(*cur_lim));
  }
  strcat(*dest,src);
}

char *show_err_page(int msg_type,char *err_msg, struct parse_ret *p_data)
{
//wchar_t *ret=(wchar_t *)malloc(sizeof( wchar_t )*4000);
  int LK=4000;
  char *ret=(char *)malloc(sizeof( char )*LK);
  memset(ret, '\0', 4000);
  //memset(ret_out, '\0', 4000);
  int i=0;
  int LL=0;
  int L2=0;
  int L_tr=256;
  int L_add=1000;
  //char s1[]="<html><body><strong>Error</strong></br>type: "; //bad path for static file</br>path:";
  strcat(ret,"<!DOCTYPE html><html><head><meta charset=\"utf-8\"><style>.style_h {"
  "font-family: Calibri;"
  //"letter-spacing: -1pt;"
  "margin-top: 0;"
  "margin-bottom: 0;"
  "color: #004000;"
  "font-size: medium;"
  "border: 1px solid #008000;"
  "}"
  ".style5_2 {"
	"color: #FF6600;"
	"text-align: center;"
	"border: 1px solid #008000;"
  "font-family: Verdana, Helvetica, sans-serif;"
  "font-size: 11px;"
  "}"
  "</style></head><body><table><tr><td style='text-align: center;'>");
  if(msg_type==0)
  {
    strcat(ret,"<strong style='color: blue;'>Diagnostic</strong></td></tr><tr><td>");
    strcat(ret,"result: ");
    strcat(ret,err_msg);
    strcat(ret,"&nbsp;Path: ");
    LL=strlen(ret);
    /*
    L2=strlen(p_data->file_path);
    if(LK-LL-L2<L_tr)
    {
      LK=LK+LL+L_add;
      ret=(char *)realloc(ret,sizeof( char )*LK);
    }
    strcat(ret,p_data->file_path);*/
    safe_strcat(&ret,p_data->file_path,&LK,L_tr,L_add);
    strcat(ret,"</td></tr>");
  }
  else
  {
    strcat(ret,"<strong style='color: red;'><h2>Error</h2></strong></td></tr><tr><td>");
    //strcat(ret,"Type: ");
    //strcat(ret,err_msg);
    //strcat(ret,"&nbsp;Path: ");
    //strcat(ret,p_data->file_path);
    strcat(ret,"</td></tr>");
    strcat(ret,"<tr><td style='text-align: center;'><table style='height:100px; width: 100%;'><tr>"
    "<td> Type:");
    LL=strlen(ret);
    /*
    L2=strlen(err_msg);
    if(LK-LL-L2<L_tr)
    {
      LK=LK+LL+L_add;
      ret=(char *)realloc(ret,sizeof( char )*LK);
    }
    strcat(ret,err_msg);
    */
    safe_strcat(&ret,err_msg,&LK,L_tr,L_add);
    //strcat(ret,"&nbsp;Path: ");
    //strcat(ret,p_data->file_path);
    strcat(ret,"</td>"
    "<td style='text-align: center;'><div><img src='/16470096361658847.jpg'/></div></td></tr></table></td></tr>");
  }
  //style='display: block; float:right;'
  //strcat(ret,err_msg);
  //style='display: block; float:left;'
  //strcat(ret,err_msg);
  //strcat(ret,p_data->file_path);
  strcat(ret,"<tr><td>  Parsing result:</br><table class='style_h'><tr><td colspan=2 style='background: #AACAFF'>raw data:</td></tr><tr><td colspan=2>");//<td>param</td><td>val</td></tr><tr><td>raw_data</td><td>");
  LL=strlen(ret);
  /*
  L2=strlen(p_data->bufs);
  if(LK-LL-L2<L_tr)
  {
    LK=LK+LL+L_add;
    ret=(char *)realloc(ret,sizeof( char )*LK);
  }
  strcat(ret,p_data->bufs);
  */
  safe_strcat(&ret,p_data->bufs,&LK,L_tr,L_add);
  strcat(ret,"</td></tr><tr><td colspan=2 style='background: #AACAFF'>row split result:</td></tr>");

  for(i=0;i<p_data->q_line;i++)
  {
    char c[4];
    sprintf(c, "%d", i+1);
    strcat(ret,"<tr><td style='width:50px;'>");
    strcat(ret,c);
    strcat(ret,":</td><td>");
    //strcat(ret,p_data->bufr[i]);
    safe_strcat(&ret,p_data->bufr[i],&LK,L_tr,L_add);
    strcat(ret,"</td><tr>");
  }
  strcat(ret,"<tr><td colspan=2 style='background: #AACAFF'>detailed:</td></tr><tr><td>method:</td><td>");
  //strcat(ret,p_data->bufr1[0]);
  safe_strcat(&ret,p_data->bufr1[0],&LK,L_tr,L_add);
  strcat(ret,"</td></tr><tr><td>path:</td><td>");
  //strcat(ret,p_data->file_path);
  safe_strcat(&ret,p_data->file_path,&LK,L_tr,L_add);
  strcat(ret,"</td></tr>");
  if(p_data->qp>0)
  {
    //char cpp[1024];
    //char cpv[1024];
    strcat(ret,"<tr><td colspan=2 style='background: #AACAFF'>params:</td></tr>");
    //char buf[1024]={'\0',};
    //wchar_t wbuf[1024]=L"ЙЙЙ";
    LL=strlen(ret);
    for(int pi=0; pi<p_data->qp; pi++)
    {

      strcat(ret,"<tr><td>");
      //strcat(ret,p_data->param_name[pi]);
      safe_strcat(&ret,p_data->param_name[pi],&LK,L_tr,L_add);
      strcat(ret,"</td><td>");
      //wcstombs(buf, p_data->param_vals[pi], 2048);
      //wcstombs(buf, wbuf, 2048);
      //strcat(ret,buf);
      //strcat(ret,p_data->param_vals[pi]);
      safe_strcat(&ret,p_data->param_vals[pi],&LK,L_tr,L_add);
      strcat(ret,"</td></tr>");
      LL=strlen(ret);
    }
    //strcat(ret,"<tr><td>tt</td><td>УУУ</td></tr>");
  }
  strcat(ret,"</table></td></tr></table></body></html>");
  LL=strlen(ret);
  return ret;
}