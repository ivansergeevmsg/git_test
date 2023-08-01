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

#include <pthread.h>

#include "main.h"
#include "main_http.c"
#include "tbl.c"
#include "proc_mgr.c"
#include "my_sqlite.c"
#include "my_json.c"
#include "proc_mgr.c"
#include "work_proc.c"

#define ERROR_CREATE_THREAD -11
#define ERROR_JOIN_THREAD   -12
#define SUCCESS        0

ptb *p_glob_t;

extern thr_list th_list;

void get_ini(ini_data * pdata);
void ini_global_data();

int test_proc()
{
    setlocale(LC_ALL, "en_US.utf8");
    printf("start test proc\n\r");

    //int x=0;
    start_mgr();
    //x=th_list.thr_q;

    //int res=0;
    int my_new_thread=0;
    create_new_thread(&my_new_thread, -1, &test_func, 0, NULL);
    //create_new(&my_new_thread, &test_func, NULL);

    join_all();


    //x=th_list.thr_q;

    return 0;
}

extern int start_mgr();
extern int close_mgr();
    ////////////////////////////////////////////////////////////////////////////////////
int main_proc()
{
    setlocale(LC_ALL, "en_US.utf8");
    //setlocale(LC_ALL, "ru_RU.utf8");
    printf("start main proc:\n\r");
    ini_data *pdata;
    pdata  = (ini_data *)malloc(sizeof(ini_data));
    pdata->ini_http_port=9080;
    pdata->ini_http_treads=16;
    strcpy(pdata->ini_def_page,"./index.html");

    get_ini(pdata);
    ini_global_data();
    load_global_data("./data");
    //pdata->ini_http_treads=1;

    start_mgr();

    int status=-1;
    int status_addr=-1;
    pthread_t pthread_1;
    //pthread1  = (pthread_t *)malloc(sizeof(pthread_t)); 
    status = pthread_create(&pthread_1, NULL, &main_http, pdata);
    if (status != 0) {
        printf("main errors: can't create thread, status = %d\n", status);
        exit(ERROR_CREATE_THREAD);
    }

    status = pthread_join(pthread_1, (void**) &status_addr);
    if (status != SUCCESS) {
        printf("main error: can't join thread, status = %d\n", status);
        exit(ERROR_JOIN_THREAD);
    }
    printf("joined with address %d\n", status_addr);

    //free(pthread_1);
    free(pdata);
    if(p_glob_t!=NULL)
    {
        free(p_glob_t);
    }

    close_mgr();

    return 0;
}

void get_ini(ini_data * pdata)
{
    FILE *ini_fp;
    char buff[1024];
    //size_t len = 0; 
    ini_fp = fopen("./ini.txt","r");
    if(ini_fp)
    {
        //int rq=0; //fread(buff,sizeof(char),sizeof(buff)-1, ini_fp);
        //ssize_t read;

        int ini_port=0;
        int ini_treads=0;
        char ini_def_page[512]={'\0'};

        while (fgets(buff, sizeof(buff)-1, ini_fp) != NULL) 
        {
            //printf("%s", buff);
            int L=strlen(buff);
            if(buff[L-1]=='\n')
            {
                buff[L-1]='\0';
            }
            L=strlen(buff);
            if(L==0)
            {break;}
            char *s1=NULL;
            s1=strstr(buff,"http_port:");
            if(s1!=NULL)
            {
                ini_port=atoi(s1+10);
                //printf("%s", s1+10);
                printf("http_port [%d]\n\r", ini_port);
            }
            else
            {
                s1=strstr(buff,"http_treads:");
                if(s1!=NULL)
                {
                    ini_treads=atoi(s1+12);
                    //printf("%s", s1+12);
                    printf("http_max_treads [%d]\n\r", ini_treads);
                }
                else
                {
                    s1=strstr(buff,"ini_def_page:");
                    if(s1!=NULL)
                    {
                        strcpy(ini_def_page,s1+13);
                        //printf("%s", s1+12);
                        printf("ini_def_page [%s]\n\r", ini_def_page);
                    }
                    else
                    {
                        printf("Unknown string: [%s]\n\r", buff);
                    }
                }
            }
        }
        if(ini_fp)
        {
            fclose(ini_fp);
        }
        if(ini_port)
        {
            pdata->ini_http_port=ini_port;
        }
        if(ini_treads)
        {
            pdata->ini_http_treads=ini_treads;
        }
        if(strlen(ini_def_page)>0)
        {
            strcpy(pdata->ini_def_page,ini_def_page);
        }
    }
}

void ini_global_data()
{
    //ptb *pmt=p_glob_t;
    p_glob_t = create_tbl();

    read_csv_file(p_glob_t,"test_data_02S.csv",1,L',',L'"');
    //read_csv_file(p_glob_t,"test_data_02W.csv",1,L',',L'"');
    //int res_conv = -1;
    conver_to_num(p_glob_t,0,L'.');
    conver_to_num(p_glob_t,1,L'.');
}

void main_proc_d()
{
    
}

//int main_main_proc()
int main(int argc, char* argv[])
{
    setlocale(LC_ALL, "en_US.utf8");
    int ret=0;

    //ret=main_tbl();

    //ret=test_proc();
    //ret=main_sqlite_2();
    //ret=test_json();

    //return 0;

    //int PROD=0;
    pid_t parpid;

    if (argc < 2)
    {
        ret=main_proc();
    //exit(ret);
    }
    else if(strcmp(argv[1],"-d")==0)
    {
        printf("\nRun in daemon mode\n\n");

        if((parpid=fork())<0) 
        {                  
            printf("\ncan't fork");
            exit(1);               
        }
        else if (parpid!=0)
        exit(0);           
        setsid();          
        ret=main_proc();
    }
    else
    {
        printf("Usage ./daemon -d for daemon or ./daemon   for interactive\n");
        exit(1);
    }   

    return ret;
}