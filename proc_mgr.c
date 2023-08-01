#pragma once

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <wchar.h>
#include <time.h>
#include "main.h"

#include <pthread.h>

struct thread_elem{     //thread's list element
    int id;
    int th_id;
    int s_id;
    int thread_stat;
    int thread_cmd;
    int thread_stop;
    void *pdata;
    int thr_detach;
    pthread_t thread;
};
typedef struct thread_elem thr_elem;

struct thread_list{     //struct for threads arrs + count
    thr_elem *thr_arr;
    int thr_q;
    int thr_q_max;
};
typedef struct thread_list thr_list;

//int thread_count=0;

thr_list th_list;
sem_t sem_mgr;
sem_t sem_mgr_thr;

int start_mgr()
{
    sem_init(&sem_mgr, 0, 1);
    th_list.thr_arr=NULL;
    th_list.thr_q=0;
    return 0;
}

void *test_func(void *args)
{
    thr_elem *ppp=(thr_elem*) args;
    ppp->thread_stat=1;
    sleep(2);
    printf("AAA, thr:%d\n\r", ppp->id);
    //wprintf(L"AAA\n\r");
    ppp->thread_stat=10;
    return SUCCESS;
}

int create_new_thread(int *p_id, int s_id, void *(*pfunc)(void*), int thr_detach, void *pdata)
{

    int incr=1;
    int n=0;
    int status=-1;
    pthread_t *pthread;
    //void *(*pf)(void*);
    //pf = (void*) test_func;

    pthread_t x_pthread=-1;
    int x_thread_stat=-1;

    sem_wait(&sem_mgr);
    
    for(int i=0; i<th_list.thr_q; i++)
    {
        x_pthread=((th_list.thr_arr)+i)->thread;
        x_thread_stat=((th_list.thr_arr)+i)->thread_stat;

        if(((th_list.thr_arr)+i)->thread==0 || ((th_list.thr_arr)+i)->thread_stat==0 || ((th_list.thr_arr)+i)->thread_stat==10)
        {
            pthread=&(((th_list.thr_arr)+i)->thread);
            //pthread=(((th_list.thr_arr)+i)->thread);
            ((th_list.thr_arr)+i)->id=i;
            ((th_list.thr_arr)+i)->s_id=s_id;
            ((th_list.thr_arr)+i)->th_id=0;
            ((th_list.thr_arr)+i)->pdata=pdata;
            ((th_list.thr_arr)+i)->thread_stat=0;
            ((th_list.thr_arr)+i)->thread_cmd=0;
            ((th_list.thr_arr)+i)->thread_stop=0;
            ((th_list.thr_arr)+i)->thr_detach=thr_detach;
            status = pthread_create(pthread, NULL, pfunc, ((th_list.thr_arr)+i));
            (*p_id)=i;
            n=1;
            if(thr_detach==1)
            {pthread_detach(*pthread);}
            break;
        }
    }
    if(n==1)
    {
        sem_post(&sem_mgr);
        return status;
    }
    if(th_list.thr_arr==NULL)
    {
        //rrv=(rr_mu *)malloc((sizeof(rrv[0]))*c);
        th_list.thr_arr=(thr_elem *)malloc((sizeof(*(th_list.thr_arr)))*incr);
        int j=0;
        for(j=0; j<incr; j++)
        {
            ((th_list.thr_arr)+j)->id=0;
            ((th_list.thr_arr)+j)->s_id=0;
            ((th_list.thr_arr)+j)->th_id=0;
            ((th_list.thr_arr)+j)->thread=0;
            ((th_list.thr_arr)+j)->pdata=0;
            ((th_list.thr_arr)+j)->thread_stat=0;
            ((th_list.thr_arr)+j)->thread_cmd=0;
            ((th_list.thr_arr)+j)->thread_stop=0;
            ((th_list.thr_arr)+j)->thr_detach=thr_detach;
        }
        j=0;
        pthread=&(((th_list.thr_arr)+j)->thread);
        ((th_list.thr_arr)+j)->id=j;
        ((th_list.thr_arr)+j)->s_id=s_id;
        ((th_list.thr_arr)+j)->pdata=pdata;
        status = pthread_create(pthread, NULL, pfunc, ((th_list.thr_arr)+j));
        //sleep(1);
        //pthread=(((th_list.thr_arr)+j)->thread);
        (*p_id)=j;
        th_list.thr_q=th_list.thr_q+incr;
        n=1;
        if(thr_detach==1)
        {pthread_detach(*pthread);}
    }
    else
    {
        int j=0;
        int x1=sizeof(*th_list.thr_arr);
        int sz1=sizeof(*(th_list.thr_arr))*(th_list.thr_q+incr);
        th_list.thr_arr = (thr_elem *)realloc(th_list.thr_arr,sizeof(*(th_list.thr_arr))*(th_list.thr_q+incr));
        for(j=th_list.thr_q; j<th_list.thr_q+incr; j++)
        {
            ((th_list.thr_arr)+j)->id=0;
            ((th_list.thr_arr)+j)->s_id=0;
            ((th_list.thr_arr)+j)->th_id=0;
            ((th_list.thr_arr)+j)->thread=0;
            ((th_list.thr_arr)+j)->pdata=0;
            ((th_list.thr_arr)+j)->thread_stat=0;
            ((th_list.thr_arr)+j)->thread_cmd=0;
            ((th_list.thr_arr)+j)->thread_stop=0;
            ((th_list.thr_arr)+j)->thr_detach=thr_detach;
        }
        j=th_list.thr_q;
        pthread=&(((th_list.thr_arr)+j)->thread);
        ((th_list.thr_arr)+j)->id=j;
        ((th_list.thr_arr)+j)->s_id=s_id;
        ((th_list.thr_arr)+j)->pdata=pdata;
        status = pthread_create(pthread, NULL, pfunc, ((th_list.thr_arr)+j));
        //pthread=(((th_list.thr_arr)+j)->thread);
        (*p_id)=j;
        th_list.thr_q=th_list.thr_q+incr;
        n=1;
        if(thr_detach==1)
        {pthread_detach(*pthread);}
    }
    sem_post(&sem_mgr);
    return status;
}

int get_thr_status(int thr_id)
{
    if(thr_id>=0 && thr_id<th_list.thr_q)
    {
        return ((th_list.thr_arr)+thr_id)->thread_stat;
    }
    return -1;
}

int send_stop(int thr_id, int s_id )
{
    sem_wait(&sem_mgr);
    if(thr_id>=0 && thr_id<th_list.thr_q)
    {
        if(((th_list.thr_arr)+thr_id)->s_id==s_id || s_id==0)
        {
            ((th_list.thr_arr)+thr_id)->thread_stop=1;
            ((th_list.thr_arr)+thr_id)->thread_stat=0;
            sem_post(&sem_mgr);
            return 0;
        }
    }
    sem_post(&sem_mgr);
    return -1;
}

int join_all()
{
    for(int i=0; i<th_list.thr_q; i++)
    {
        if(((th_list.thr_arr)+i)->thread!=0)
        {
            pthread_join(((th_list.thr_arr)+i)->thread, NULL);
            ((th_list.thr_arr)+i)->thread_stat=0;
            ((th_list.thr_arr)+i)->thread=0;
        }
    }
    return 0;
}

int close_mgr()
{
    if(th_list.thr_q>0)
    {
        if(th_list.thr_arr!=NULL)
        {
            free(th_list.thr_arr);
            th_list.thr_arr=NULL;
            th_list.thr_q=0;
        }
    }
    return 0;
}