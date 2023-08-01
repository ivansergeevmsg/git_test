#pragma once
//#include <cstddef>
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
#define _GNU_SOURCE
#include <time.h>

#include "main.h"
#include "test_http.c"

/*
struct tag_ini_data {
  int ini_http_port;
  int ini_http_treads;
  char ini_def_page[512];
};*/
//typedef struct tag_ini_data ini_data;

//ini_data *p_ini_data;

int nanosleep(const struct timespec *tw,struct timespec *tr);
extern int proc_count;

//int main()
void *main_http(void *args)
{
  //int ini_port=9080;
  //int ini_treads=16;

  ini_data *i_data=(ini_data *) args;

  int ini_port=i_data->ini_http_port;
  int ini_treads=i_data->ini_http_treads;

  //sleep(0.5);


  int one = 1, client_fd;
  struct sockaddr_in svr_addr, cli_addr;
  socklen_t sin_len = sizeof(cli_addr);

  int sock = socket(AF_INET, SOCK_STREAM, 0); //IPPROTO_TCP // socket(PF_INET,SOCK_STREAM,0);
  if (sock < 0)
    err(1, "can't open socket");

  setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &one, sizeof(int));

  int port = ini_port; //9085;
  svr_addr.sin_family = AF_INET;
  svr_addr.sin_addr.s_addr = INADDR_ANY;
  svr_addr.sin_port = htons(port);

  //int arr[]

  if (bind(sock, (struct sockaddr *) &svr_addr, sizeof(svr_addr)) == -1) {
    close(sock);
    err(1, "Can't bind");
  }

  signal(SIGPIPE, handle_sig_nopipe);

  listen(sock, 10); // 10 - net que length
  //SIG_DFL
  //signal(SIGPIPE, SIG_IGN);
  

  sem_init(&sem_proc1, 0, 1);
  proc_count=0;

  int max_curr_threads=0;
  while (1) 
  {
    int loc_q_threads = proc_count;
    if(loc_q_threads>max_curr_threads)
    {
      max_curr_threads=loc_q_threads;
    }
    printf("////////// HWL (threads) = %d\n\r",max_curr_threads);
    printf("listening...\n");
    client_fd = accept(sock, (struct sockaddr *) &cli_addr, &sin_len);
    printf("got connection [client : %d]\n", client_fd);

    if (client_fd == -1) {
      perror("Can't accept");
      continue;
    }


    //int rres=0;
    //rres=
    //read_do_smth(&client_fd);

    /*
    while(p_data->m_busy==1)
    {
      int bb=p_data->m_busy;
      sleep(1);
    }
    */
    while(proc_count>=ini_treads)
    {
      //int bb=proc_count;
      //usleep(2000000);
      struct timespec tw = {0,125000000};
      struct timespec tr;
      nanosleep(&tw,&tr);
      //sleep(1);
    }
    

    pthread_t p_thread1;
    cdata *p_data=NULL;
    p_data=(cdata*)malloc(sizeof(*p_data));
    p_data->m_client_fd=0;
    p_data->m_res=0;
    p_data->m_busy=0;

    p_data->m_client_fd=client_fd;
    p_data->m_res=0;
    p_data->m_busy=1;
    p_data->pid=proc_count;
    p_data->p_ini=i_data;
    //sem_init(&sem_proc1, 0, 0);
    if(pthread_create(&p_thread1, NULL, &read_do_smth, p_data) != 0)
    {
      printf("Error start tread for client_fd [%d]\n\r",client_fd);
      //p_data->m_busy=0;
    }
    else
    {
      pthread_detach(p_thread1);
      //sem_wait(&sem_proc1);
    }

    //sleep(1);

    //rres=100;


    ///////////////////////////////////
    /*
    if(1==2)
    {


    char buf[1024];
    memset(buf, '\0', 1024);
    
    char buf1[1024];
    char buf2[1024];
    char buf3[1024];
    char buf4[1024];
    
    int bytes_read;
    bytes_read = recv(client_fd, buf, 1024, 0);
    //bytes_read = recvfrom(sock, buf, 1024, 0, (struct sockaddr *) &cli_addr, &sin_len);
    if(bytes_read <= 0) 
    {
      printf("no input data, close connection\n");
      close(client_fd);
      //break;
    }     //b].l[q ]
    else
    {
      printf("data len: %d\n", bytes_read);
      int res_d=do_smth(0,client_fd,buf);
      if(res_d==err_pipe)
      {
        printf("Err! No Client_N: %d\n", client_fd);
        close(client_fd);
        client_fd=0;
      }
      
    }

    }
    */
    ///////////////////////////////////
  }

  //return 0;
  return SUCCESS;
}
