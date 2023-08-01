#pragma once
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <wchar.h>
#include <locale.h>
#include <time.h>
#include <stdint.h>
#include <math.h>

#include <signal.h>
#include <setjmp.h>
#include "tbl.h"
#include "utils.c"

#define LEN_A(x) sizeof(x)/sizeof(x[0])

struct struct_arr{
    void *data;
    int  sz;
};
typedef struct struct_arr arrr;
//jmp_buf env_2;

//void handle_sig_bad_addr1(int sig)
//{
//    wprintf(L"/*----Caught SIGSEGV signal----*/ N: %d\n\r", sig);
//    signal(SIGSEGV, handle_sig_bad_addr1);
//    longjmp(env_2, 210);
//}
//void handle_sig_bad_addr2(int sig)
//{
//    wprintf(L"/*----Caught SIGBUS signal----*/ N: %d\n\r", sig);
//    signal(SIGBUS, handle_sig_bad_addr2);
//    longjmp(env_2, 220);
//}


inline int set_null_cell(ptb *mt,int c, int n, int v_bool)
{
    int v = v_bool == 0 ? 0 : 1;
    if(!mt)
    {
        return -1;
    }
    if(mt->cq<=c || mt->zq<=n)
    {
        return -2;
    }
    if(!((mt->cc)+c)->pn)
    {
        ((mt->cc)+c)->pn=(int*)calloc((mt->zq),sizeof(int));
    }
    *((((mt->cc)+c)->pn)+n)=v;
    return v;
}
int is_null_cell(ptb *mt,int c, int n)
{
    if(!mt)
    {
        return -1;
    }
    if(mt->cq<=c || mt->zq<=n)
    {
        return -2;
    }

    if(((mt->cc)+c)->pn)
    {
        int v = *((((mt->cc)+c)->pn)+n) == 0 ? 0 : 1;
        return v;
    }
    return 0;
}

int set_col_name(ptb *mt, int m, wchar_t *str)
{
    if(mt->cq<=m)
    {
        return 1;
    }
    for(int i=0; i<mt->cq; i++)
    {
        if(!wcscmp(((mt->cc)+i)->cname, str ))
        {
            return 2;
        }
    }
    if(wcslen(str)>255)
    {
        return 3;
    }
    wcscpy(((mt->cc)+m)->cname, str );
    return 0;
}
int add_col(ptb *mt, int mn,int ct)  // tbl , add new Cols Q tbl , type for new Cols
{
    int cn=mt->cq;
    int z =mt->zq;
    int m=0;
    if(cn==0)
    {
        m=mn;
        mt->cc=(pt*)calloc(m,sizeof(pt));
        for(int i=0; i<m; i++)
        {
            ((mt->cc)+i)->vt=ct;
            ((mt->cc)+i)->cname[0]='\0';
            ((mt->cc)+i)->sort_id=0;
            ((mt->cc)+i)->sort_dir=0;
            ((mt->cc)+i)->sort_ni=0;
            ((mt->cc)+i)->vz=z;
            if(z>0)
            {
                ((mt->cc)+i)->pv= (mu*)calloc(z,sizeof(mu));
                ((mt->cc)+i)->pn=(int*)calloc(z,sizeof(int));
                ((mt->cc)+i)->vt=ct;
                
                if(ct==1)
                {
                    for(int j=0; j<z; j++)
                    {
                        ((((mt->cc)+i)->pv)+j)->p_d=0;
                        set_null_cell(mt,i,j,1);
                        //((((mt->cc)+i)->pv)+j)->ni=1;
                    }
                }
                if(ct==2)
                {
                    for(int j=0; j<z; j++)
                    {
                        ((((mt->cc)+i)->pv)+j)->p_w=NULL;
                        set_null_cell(mt,i,j,1);
                        //((((mt->cc)+i)->pv)+j)->ni=1;
                    }
                }
                if(ct==3)
                {
                    for(int j=0; j<z; j++)
                    {
                        ((((mt->cc)+i)->pv)+j)->p_t=0;
                        set_null_cell(mt,i,j,1);
                        //((((mt->cc)+i)->pv)+j)->ni=1;
                    }
                }
            }
            else
            {
                ((mt->cc)+i)->pv=NULL;
                ((mt->cc)+i)->pn=NULL;
            }
        }
    }
    else 
    {
        m=cn+mn;
        mt->cc=(pt*)realloc(mt->cc,sizeof(pt)*m);

        for(int i=mt->cq; i<m; i++)
        {
            ((mt->cc)+i)->vt=ct;
            ((mt->cc)+i)->cname[0]='\0';
            ((mt->cc)+i)->sort_id=0;
            ((mt->cc)+i)->sort_dir=0;
            ((mt->cc)+i)->sort_ni=0;
            ((mt->cc)+i)->vz=z;
            if(z>0)
            {
                ((mt->cc)+i)->pv= (mu*)calloc(z,sizeof(mu));
                ((mt->cc)+i)->pn=(int*)calloc(z,sizeof(int));
                if(ct==1)
                {
                    for(int j=0; j<z; j++)
                    {
                        ((((mt->cc)+i)->pv)+j)->p_d=0;
                        //((((mt->cc)+i)->pv)+j)->ni=1;
                    }
                }
                if(ct==2)
                {
                    for(int j=0; j<z; j++)
                    {
                        ((((mt->cc)+i)->pv)+j)->p_w=NULL;
                        //((((mt->cc)+i)->pv)+j)->ni=1;
                    }
                }
                if(ct==3)
                {
                    for(int j=0; j<z; j++)
                    {
                        ((((mt->cc)+i)->pv)+j)->p_t=0;
                        //((((mt->cc)+i)->pv)+j)->ni=1;
                    }
                }
            }
            else
            {
                ((mt->cc)+i)->pv=NULL;
                ((mt->cc)+i)->pn=NULL;
            }
        }
        //mt->cq=m;
    }
    //((mt->cc)+c)->pv=(mu*)realloc(((mt->cc)+c)->pv,sizeof(mu)*z);
    //(*mc).cc[cn];
    (*mt).cq+=mn;
    return 0;
}
void refr_sort_mask(ptb *mt);
int drop_col(ptb *mt, int m)  // tbl , add new Cols Q tbl , type for new Cols
{
    if(mt->cq<=m)
    {
        return 1;
    }

    int zq=mt->zq;
    
    if(((mt->cc)+m)->pv)
    {
        int ct=((mt->cc)+m)->vt;
        switch (ct) {
        case 1:
            free(((mt->cc)+m)->pv);
            break;
        case 2:
            for(int n=0;n<zq;n++)
            {
                if( ((((mt->cc)+m)->pv)+n)->p_w )
                {
                    free(((((mt->cc)+m)->pv)+n)->p_w);
                    ((((mt->cc)+m)->pv)+n)->p_w=NULL;
                }
            }
            free(((mt->cc)+m)->pv);
            break;
        case 3:
            free(((mt->cc)+m)->pv);
            break;
        }
        ((mt->cc)+m)->pv=NULL;
    }
    ((mt->cc)+m)->vt=0;
    
    if(((mt->cc)+m)->pn)
    {
        free(((mt->cc)+m)->pn);
    }
    ((mt->cc)+m)->pn=NULL;

    pt  *cc2;
    cc2=(pt*)calloc(mt->cq-1,sizeof(pt));
    
    int s=0;
    for(int i=0;i<mt->cq-1;i++)
    {
        if(i<m)
        {
            s=i;
        }
        else
        {
            s=i+1;
        }
        pt *c0=((cc2)+i);
        pt *c1=((mt->cc)+s);
        c0->pn=c1->pn;
        c0->pv=c1->pv;
        c0->sort_dir=c1->sort_dir;
        c0->sort_id =c1->sort_id;
        c0->sort_ni =c1->sort_ni;
        c0->vt=c1->vt;
        c0->vz=c1->vz;
        wcscpy(c0->cname,c1->cname);
    }
    free(mt->cc);
    mt->cc=cc2;
    mt->cq--;

    refr_sort_mask(mt);

    return 0;
}
ptb* create_tbl()
{
    ptb *mt=NULL;
    mt=(ptb*)malloc(sizeof(ptb));
    (mt)->cc=NULL;
    (mt)->cq=0;
    (mt)->zq=0;
    (mt)->sort_mask    =NULL;
    //(*mt)->sort_mask_dir=NULL;
    //(*mt)->sort_mask_ni =NULL;
    (mt)->sort_q=0;
    return mt;
}

int drop_tbl(ptb **pmt)
{
    //signal(SIGSEGV, handle_sig_bad_addr1);
    //signal(SIGBUS,  handle_sig_bad_addr2);
    //signal(SIGBUS,  SIG_IGN);
    ptb *mt = (*pmt);
    int zq=mt->zq;
    if(mt)
    {
        if(mt->cc)
        {
            if(mt->cq>0)
            {
                if(zq>0)
                {
                    for(int m=0; m<mt->cq; m++)
                    {
                        if(((mt->cc)+m)->pv)
                        {
                            int ct=((mt->cc)+m)->vt;
                            switch (ct) {
                            case 1:
                                free(((mt->cc)+m)->pv);
                                break;
                            case 2:
                                for(int n=0;n<zq;n++)
                                {
                                    if( ((((mt->cc)+m)->pv)+n)->p_w )
                                    {
                                        //wchar_t *del_pw = ((((mt->cc)+m)->pv)+n)->p_w;
                                        free(((((mt->cc)+m)->pv)+n)->p_w);
                                        ((((mt->cc)+m)->pv)+n)->p_w=NULL;
                                        /*
                                        int e_val = setjmp(env_2);
                                        if(e_val) {
                                            ((((mt->cc)+m)->pv)+n)->p_w=NULL;
                                        }
                                        else{
                                            free(((((mt->cc)+m)->pv)+n)->p_w);
                                            ((((mt->cc)+m)->pv)+n)->p_w=NULL;
                                        }
                                        */
                                        /*
                                        for(int ii=n+1; ii<-zq; ii++)
                                        {
                                            if(((((mt->cc)+m)->pv)+ii)->p_w==del_pw)
                                            {
                                                ((((mt->cc)+m)->pv)+ii)->p_w=NULL;
                                            }
                                        }
                                        */
                                    }
                                }
                                free(((mt->cc)+m)->pv);
                                break;
                            case 3:
                                free(((mt->cc)+m)->pv);
                                break;
                            }
                            ((mt->cc)+m)->pv=NULL;
                        }
                        ((mt->cc)+m)->vt=0;
                        if(((mt->cc)+m)->pn)
                        {
                            free(((mt->cc)+m)->pn);
                        }
                        ((mt->cc)+m)->pn=NULL;
                    }
                }
                mt->zq=0;
            }
            mt->cq=0;
            free(mt->cc);
            mt->cc=NULL;
        }
        if(mt->sort_mask)
        {
            free(mt->sort_mask);
            mt->sort_mask=NULL;
            mt->sort_q=0;
        }
        /*
        if(mt->sort_mask_dir)
        {
            free(mt->sort_mask_dir);
            mt->sort_mask_dir=NULL;
            mt->sort_mask_dir=0;
        }
        if(mt->sort_mask_ni)
        {
            free(mt->sort_mask_ni);
            mt->sort_mask_ni=NULL;
        }
        */
        free(mt);
        (*pmt)=NULL;
    }
    //signal(SIGSEGV, SIG_DFL);
    //signal(SIGBUS,  SIG_DFL);
    return 0;
}

int add_rows(ptb *mt,int z)  // tbl , new rows count 
{
    int max_rr=0;
    for(int c=0; c<mt->cq; c++)
    {
        ((mt->cc)+c)->pv= (mu*)realloc(((mt->cc)+c)->pv,sizeof(mu)*z);
        if(((mt->cc)+c)->pn)
        {
            ((mt->cc)+c)->pn=(int*)realloc(((mt->cc)+c)->pn,sizeof(int)*z);
        }
        int ct=((mt->cc)+c)->vt;
        if(ct==1)
        {
            for(int i=((mt->cc)+c)->vz; i<z; i++)
            {
                ((((mt->cc)+c)->pv)+i)->p_d=0;
                if(((mt->cc)+c)->pn)
                {
                    *((((mt->cc)+c)->pn)+i)=1;
                }
                //((((mt->cc)+c)->pv)+i)->ni=1;
            }
        }
        else if(ct==2)
        {
            for(int i=((mt->cc)+c)->vz; i<z; i++)
            {
                ((((mt->cc)+c)->pv)+i)->p_w=NULL;
                if(((mt->cc)+c)->pn)
                {
                    *((((mt->cc)+c)->pn)+i)=1;
                }
                //((((mt->cc)+c)->pv)+i)->ni=1;
            }
        }
        else if(ct==3)
        {
            for(int i=((mt->cc)+c)->vz; i<z; i++)
            {
                ((((mt->cc)+c)->pv)+i)->p_t=0;
                if(((mt->cc)+c)->pn)
                {
                    *((((mt->cc)+c)->pn)+i)=1;
                }
                //((((mt->cc)+c)->pv)+i)->ni=1;
            }
        }
        ((mt->cc)+c)->vz=z;
        max_rr = max_rr<z ? z : max_rr;
    }
    mt->zq=max_rr;
    return 0;
}
int rr_from_tbl(ptb *mt,rr_mu **prr, int rn)
{
    if(mt->zq<=rn)
    {
        return 1;
    }
    int c=mt->cq;
    int t=0;
    for(int m=0; m<c; m++)
    {
        if(((mt->cc)+m)->pn)
        {
            ((*prr)+c)->ni=*((((mt->cc)+m)->pn)+rn);
        }
        else
        {
            ((*prr)+c)->ni=0;
        }
        //((*prr)+c)->vv.ni=((((mt->cc)+m)->pv)+rn)->ni;
        t=((mt->cc)+m)->vt;
        ((*prr)+c)->vt = t;
        switch(t)
        {
            case 1:
            ((*prr)+c)->vv.p_d=((((mt->cc)+m)->pv)+rn)->p_d;
            break;

            case 2:
            ((*prr)+c)->vv.p_w=((((mt->cc)+m)->pv)+rn)->p_w;
            break;

            case 3:
            ((*prr)+c)->vv.p_t=((((mt->cc)+m)->pv)+rn)->p_t;
            break;
        }
        
    }
    return 0;
}
void refr_sort_mask(ptb *mt)
{
    int qi=0;
    int c=mt->cq;
    if(mt->sort_mask)
    {
        free(mt->sort_mask);
        mt->sort_q=0;
    }
    /*
    if(mt->sort_mask_ni)
    {
        free(mt->sort_mask_ni);
        mt->sort_q=0;
    }
    */
    int s_min=0; //100000000;
    for(int i=0; i<c; i++)
    {
        if(((mt->cc)+i)->sort_id>0)
        {
            if(s_min==0 || s_min>((mt->cc)+i)->sort_id)
            {
                s_min=((mt->cc)+i)->sort_id;
            }
            qi++;
        }
    }
    if(qi==0)
    {
        return;
    }

    mt->sort_mask=(int *)malloc((sizeof((mt->sort_mask)[0]))*qi);
    mt->sort_q=qi;
    int s_min_t=s_min;
    int s_min_tt=0;
    int n=0;
    for(int r=0; r<c; r++)
    {
        for(int i=0; i<c; i++)
        {
            if(s_min_t == ((mt->cc)+i)->sort_id)
            {
                mt->sort_mask[n]=i;
                n++;
            }
        }
        s_min_tt=1000000000;
        for(int i=0; i<c; i++)
        {
            if(s_min_tt > ((mt->cc)+i)->sort_id && ((mt->cc)+i)->sort_id > s_min_t)
            {
                s_min_tt = ((mt->cc)+i)->sort_id;
            }
        }
        if(s_min_tt==1000000000)
        {
            break;
        }
        s_min_t=s_min_tt;
    }
}
void set_sorts(ptb *mt, int *srt, int srt_n)
{
    //int tc[4000];
    if(srt)
    {
        int x= 0; //col_num
        int d= 0; //col_dir
        int u= 0; //col_dir_nulls
        int sc=srt_n; //LEN_A(srt);
        int *tc=(int *)malloc(sizeof(int)*sc);
        //int x1=sizeof(srt);
        //int x2=sizeof(srt[0]);
        for(int i=0; i<mt->cq; i++)
        {
            ((mt->cc)+i)->sort_id=0;
            ((mt->cc)+i)->sort_dir=0;
            ((mt->cc)+i)->sort_ni=0;
        }
        if(mt->sort_mask)
        {
            free(mt->sort_mask);
        }
        //mt->sort_mask=(int *)malloc((sizeof((mt->sort_mask)[0]))*sc);
        int jj=0;
        for(int i=0; i<sc; i++)
        {
            int te=1;
            x=*(srt+(i*3));
            d=*(srt+(i*3+1));
            u=*(srt+(i*3+2));
            if(x<mt->cq)
            {
                for(int j=0; j<jj; j++)
                {
                    if(tc[j]==x)
                    {
                        te=0;
                    }
                }
                if(te)
                {
                    ((mt->cc)+x)->sort_id=jj+1;
                    tc[jj]=x;
                    ((mt->cc)+x)->sort_dir=d;
                    ((mt->cc)+x)->sort_ni =u;
                    jj++;
                }
            }
        }
        if(jj>0)
        {
            mt->sort_mask=(int *)malloc((sizeof((mt->sort_mask)[0]))*jj);
        }
        for(int ii=0; ii<jj; ii++)
        {
            *((mt->sort_mask)+ii)=tc[ii];
        }
        
        mt->sort_q=jj;
        free(tc);
    }
}

int rr_to_tbl(ptb *mt,rr_mu **prr, int rn)
{
    if(mt->zq<=rn)
    {
        return 1;
    }
    int c=mt->cq;
    int t=0;
    for(int m=0; m<c; m++)
    {
        t=((mt->cc)+m)->vt;
        //((*prr)+c)->vt = t;
        switch(t)
        {
            case 1:
            ((((mt->cc)+m)->pv)+rn)->p_d=((*prr)+c)->vv.p_d;
            break;

            case 2:
            if(((((mt->cc)+m)->pv)+rn)->p_w)
            {
                free(((((mt->cc)+m)->pv)+rn)->p_w);
            }
            ((((mt->cc)+m)->pv)+rn)->p_w=((*prr)+c)->vv.p_w;
            break;

            case 3:
            ((((mt->cc)+m)->pv)+rn)->p_t=((*prr)+c)->vv.p_t;
            break;
        }
        if(((mt->cc)+m)->pn)
        {
            *((((mt->cc)+m)->pn)+rn)=((*prr)+c)->ni;
        }
        else
        {
            if(((*prr)+c)->ni!=0)
            {
                ((mt->cc)+m)->pn=(int*)calloc(mt->zq,sizeof(int));
                *((((mt->cc)+m)->pn)+rn)=((*prr)+c)->ni;
            }
        }
    }
    
    return 0;
}

int copy_rr_in_tbl(ptb *mt,int rn_dest,int rn_src)
{
    if(mt->zq<=rn_dest || mt->zq<=rn_src)
    {
        return 1;
    }
    int c=mt->cq;
    int t=0;
    for(int m=0; m<c; m++)
    {
        t=((mt->cc)+m)->vt;
        //((*prr)+c)->vt = t;
        switch(t)
        {
            case 1:
            ((((mt->cc)+m)->pv)+rn_dest)->p_d=((((mt->cc)+m)->pv)+rn_src)->p_d;
            break;

            case 2:
            if(((((mt->cc)+m)->pv)+rn_dest)->p_w)
            {
                free(((((mt->cc)+m)->pv)+rn_dest)->p_w);
            }
            int L=wcslen(((((mt->cc)+m)->pv)+rn_src)->p_w);
            wchar_t *n_v = (wchar_t*)malloc(sizeof(wchar_t)* (L+1));
            wcscpy(n_v, ((((mt->cc)+m)->pv)+rn_src)->p_w);

            ((((mt->cc)+m)->pv)+rn_dest)->p_w=n_v;
            break;

            case 3:
            ((((mt->cc)+m)->pv)+rn_dest)->p_t=((((mt->cc)+m)->pv)+rn_src)->p_t;
            break;
        }
        if(((mt->cc)+m)->pn)
        {
            *((((mt->cc)+m)->pn)+rn_dest)=*((((mt->cc)+m)->pn)+rn_src);
        }

        
    }
    return 0;
}

int swap_rr_in_tbl(ptb *mt,int rn_dest,int rn_src)
{
    if(mt->zq<=rn_dest || mt->zq<=rn_src)
    {
        return 1;
    }
    register int c=mt->cq;
    int t=0;

    double v_d=0;
    wchar_t *v_w=NULL;
    clock_t v_t=0;
    int ni=1;

    for(register int m=0; m<c; m++)
    {
        t=((mt->cc)+m)->vt;
        //((*prr)+c)->vt = t;
        switch(t)
        {
            case 1:
            v_d=((((mt->cc)+m)->pv)+rn_dest)->p_d;
            ((((mt->cc)+m)->pv)+rn_dest)->p_d=((((mt->cc)+m)->pv)+rn_src)->p_d;
            ((((mt->cc)+m)->pv)+rn_src)->p_d=v_d;
            break;

            case 2:
            v_w=((((mt->cc)+m)->pv)+rn_dest)->p_w;
            ((((mt->cc)+m)->pv)+rn_dest)->p_w=((((mt->cc)+m)->pv)+rn_src)->p_w;
            ((((mt->cc)+m)->pv)+rn_src)->p_w=v_w;
            break;

            case 3:
            v_t=((((mt->cc)+m)->pv)+rn_dest)->p_t;
            ((((mt->cc)+m)->pv)+rn_dest)->p_t=((((mt->cc)+m)->pv)+rn_src)->p_t;
            ((((mt->cc)+m)->pv)+rn_src)->p_t=v_t;
            break;
        }
        if(((mt->cc)+m)->pn)
        {
            ni=*((((mt->cc)+m)->pn)+rn_dest);
            *((((mt->cc)+m)->pn)+rn_dest)=*((((mt->cc)+m)->pn)+rn_src);
            *((((mt->cc)+m)->pn)+rn_src)=ni;
        }
    }
    return 0;
}

int tbl_row_cmp(ptb *mt,int n1,int n2, tsrt *srt,int srt_n)
{
    if(mt->zq<=n1 || mt->zq<=n2)
    {
        return 0;
    }
    if(mt->sort_q==0 && srt==NULL)
    {
        return 0;
    }
    //int c=mt->cq;
    int t=0;
    register int sc;
    if(srt)
    {
        sc=srt_n;
    }
    else
    {
        sc=mt->sort_q;
    }
    //double v_d=0;
    //wchar_t *v_w=NULL;
    //clock_t v_t=0;

    int m=-1; //col_num
    int d= 0; //col_dir
    int u= 0; //col_dir_nulls
    int ni_1=0; //value null ind
    int ni_2=0; //value null ind
    int ts=0;
    for(register int sm=0; sm<sc; sm++)
    {
        if(srt)
        {
            //tsrt *mm=(srt+sm);
            //m=*((int*)srt+(sm*3));
            m=*(*(srt+sm)+0);
            d=*(*(srt+sm)+1);
            u=*(*(srt+sm)+2);
        }
        else
        {
            m=*((mt->sort_mask)+sm);
            d=((mt->cc)+m)->sort_dir;
            u=((mt->cc)+m)->sort_ni;
        }
        t=((mt->cc)+m)->vt;
        //((*prr)+c)->vt = t;
        ni_1=(((mt->cc)+m)->pn)!=NULL ? *((((mt->cc)+m)->pn)+n1) : 0;
        ni_2=(((mt->cc)+m)->pn)!=NULL ? *((((mt->cc)+m)->pn)+n2) : 0;
        if(ni_1==1 && ni_2==1)
        {break;}
        else if(ni_1==1 && ni_2==0 && u==0)
        {return d==0 ? 1 : -1;} //1;}
        else if(ni_1==1 && ni_2==0 && u!=0)
        {return d==0 ? -1 : 1;} //-1;}
        else if(ni_1==0 && ni_2==1 && u==0)
        {return d==0 ? -1 : 1;} //-1;}
        else if(ni_1==0 && ni_2==1 && u!=0)
        {return d==0 ? 1 : -1;} //1;}
        //double dd1=0;
        //double dd2=0;
        switch(t)
        {
            case 1:
            //dd1=((((mt->cc)+m)->pv)+n1)->p_d;
            //dd2=((((mt->cc)+m)->pv)+n2)->p_d;
            if(((((mt->cc)+m)->pv)+n1)->p_d>((((mt->cc)+m)->pv)+n2)->p_d)
            {
                return d==0 ? 1 : -1; //1;
            }
            else if(((((mt->cc)+m)->pv)+n1)->p_d<((((mt->cc)+m)->pv)+n2)->p_d)
            {
                return d==0 ? -1 : 1; //-1;
            }
            break;

            case 2:
            //v_w=((((mt->cc)+m)->pv)+n1)->p_w;
            ts = wcscmp(((((mt->cc)+m)->pv)+n1)->p_w,((((mt->cc)+m)->pv)+n2)->p_w);
            if(ts!=0)
            {
                return d==0 ? ts : -ts; //ts;
            }
            break;

            case 3:
            if(((((mt->cc)+m)->pv)+n1)->p_t>((((mt->cc)+m)->pv)+n2)->p_t)
            {
                return d==0 ? 1 : -1; //1;
            }
            else if(((((mt->cc)+m)->pv)+n1)->p_t<((((mt->cc)+m)->pv)+n2)->p_t)
            {
                return d==0 ? -1 : 1; //-1;
            }
            break;
        }
    }
    return 0;
}

int set_rr_in_tbl(ptb *mt,int rn_dest,int rn_src)
{
    if(mt->zq<=rn_dest || mt->zq<=rn_src)
    {
        return 1;
    }
    int c=mt->cq;
    int t=0;

    //double v_d=0;
    //wchar_t *v_w=NULL;
    //clock_t v_t=0;

    for(int m=0; m<c; m++)
    {
        t=((mt->cc)+m)->vt;
        //((*prr)+c)->vt = t;
        switch(t)
        {
            case 1:
            //v_d=((((mt->cc)+m)->pv)+rn_dest)->p_d;
            ((((mt->cc)+m)->pv)+rn_dest)->p_d=((((mt->cc)+m)->pv)+rn_src)->p_d;
            //((((mt->cc)+m)->pv)+rn_src)->p_d=v_d;
            break;

            case 2:
            //v_w=((((mt->cc)+m)->pv)+rn_dest)->p_w;
            ((((mt->cc)+m)->pv)+rn_dest)->p_w=((((mt->cc)+m)->pv)+rn_src)->p_w;
            //((((mt->cc)+m)->pv)+rn_src)->p_w=v_w;
            break;

            case 3:
            //v_t=((((mt->cc)+m)->pv)+rn_dest)->p_t;
            ((((mt->cc)+m)->pv)+rn_dest)->p_t=((((mt->cc)+m)->pv)+rn_src)->p_t;
            //((((mt->cc)+m)->pv)+rn_src)->p_t=v_t;
            break;
        }
        if(((mt->cc)+m)->pn)
        {
            *((((mt->cc)+m)->pn)+rn_dest)=*((((mt->cc)+m)->pn)+rn_src);
        }
    }
    return 0;
}

int set_cell_dbl(ptb *mt,int m,int n, double v, int ni)  // tbl , col, row, cels val 
{
    int tp=((mt->cc)+m)->vt;
    int z =mt->zq;
    if(tp!=1)
    {
        return 1;
    }
    if(mt->cq<=m)
    {
        return 2;
    }
    if(mt->zq<=n)
    {
        add_rows(mt,n+1);
        //return 3;
    }
    if(ni==1)
    {
        if(((mt->cc)+m)->pn==NULL)
        {
            ((mt->cc)+m)->pn=(int*)realloc(((mt->cc)+m)->pn,sizeof(int)*z);
            for(register int ii=0; ii<z; ii++)
            {
                *((((mt->cc)+m)->pn)+ii)=0;
            }
        }
        else
        {
            *((((mt->cc)+m)->pn)+n)=1;
        }
        ((((mt->cc)+m)->pv)+n)->p_d=0;
    }
    else
    {
        ((((mt->cc)+m)->pv)+n)->p_d=v;
        if(((mt->cc)+m)->pn)
        {
            *((((mt->cc)+m)->pn)+n)=0;
        }
    }
    return 0;
}
int set_cell_str(ptb *mt,int m,int n, wchar_t *v, int ni)  // tbl , col, row, cels val 
{
    int tp=((mt->cc)+m)->vt;
    int z =mt->zq;
    if(tp!=2)
    {
        return 1;
    }
    if(mt->cq<=m)
    {
        return 2;
    }
    if(mt->zq<=n)
    {
        add_rows(mt,n+1);
        //return 3;
    }
    int L=wcslen(v);
    if(ni==1 || v==NULL)
    {
        if(((mt->cc)+m)->pn==NULL)
        {
            ((mt->cc)+m)->pn=(int*)realloc(((mt->cc)+m)->pn,sizeof(int)*z);
            for(register int ii=0; ii<z; ii++)
            {
                *((((mt->cc)+m)->pn)+ii)=0;
            }
        }
        else
        {
            *((((mt->cc)+m)->pn)+n)=1;
        }
        ((((mt->cc)+m)->pv)+n)->p_d=0;
    }
    else
    {
        if(((((mt->cc)+m)->pv)+n)->p_w)
        {
            free(((((mt->cc)+m)->pv)+n)->p_w);
            ((((mt->cc)+m)->pv)+n)->p_w=NULL;
            if(((mt->cc)+m)->pn)
            {
                *((((mt->cc)+m)->pn)+n)=1;
            }
        }
        
        if(v)
        {
            wchar_t *n_v = (wchar_t*)malloc(sizeof(wchar_t)* (L+1));
            wcscpy(n_v, v);
            ((((mt->cc)+m)->pv)+n)->p_w=n_v;
            if(((mt->cc)+m)->pn)
            {
                *((((mt->cc)+m)->pn)+n)=0;
            }
        }
        /*else
        {
            *((((mt->cc)+m)->pn)+n)=1;
        }*/
    }
    return 0;
}
int get_cell_val(ptb *mt,int m,int n, rr_mu *pmu)  // tbl , col, row, return cels val
{
    int tp=((mt->cc)+m)->vt;

    if(mt->cq<=m)
    {
        return 2;
    }
    if(mt->zq<=n)
    {
        return 3;
    }
    switch (tp) {
        case 1:
        (*pmu).vv.p_d=((((mt->cc)+m)->pv)+n)->p_d;
        break;
        case 2:
        (*pmu).vv.p_w=((((mt->cc)+m)->pv)+n)->p_w;
        break;
        case 3:
        (*pmu).vv.p_t=((((mt->cc)+m)->pv)+n)->p_t;
        break;
    }
    (*pmu).vt=tp;
    if(((mt->cc)+m)->pn)
    {
        (*pmu).ni=*((((mt->cc)+m)->pn)+n);
    }
    return 0;
}
int get_cell_sval(ptb *mt,int m,int n, wchar_t *ptbuf, wchar_t d, int mq)  // tbl , col, row, return cels val
{
    //void (*fptr)(wchar_t* dest, double v, wchar_t d) = NULL;
    int tp=((mt->cc)+m)->vt;
    int nni=0;
    //double f=0.0;
    if(mt->cq<=m)
    {
        return 2;
    }
    if(mt->zq<=n)
    {
        return 3;
    }
    if(((mt->cc)+m)->pn)
    {
        if(*((((mt->cc)+m)->pn)+n)!=0)
        {
            wcscpy((ptbuf),L"null");
            //(*ppv)=ptbuf;
            nni=1;
        }
        else
        {
            nni=0;
        }
    }
    if(nni==0){
        switch (tp) {
            case 1:
            //swprintf(ptbuf, 30, L"%f", ((((mt->cc)+m)->pv)+n)->p_d);
            str_0_trim(ptbuf, ((((mt->cc)+m)->pv)+n)->p_d, d,mq);
            //(*ppv)=ptbuf;
            break;
            case 2:
            //(*ppv)=((((mt->cc)+m)->pv)+n)->p_w;
            wcscpy(ptbuf, ((((mt->cc)+m)->pv)+n)->p_w);
            break;
            case 3:
            swprintf(ptbuf, 30, L"%d", ((((mt->cc)+m)->pv)+n)->p_t);
            //(*ppv)=ptbuf;
            break;
        }
    }
    return 0;
}
int get_cell_ndbl(ptb *mt,int m,int n, rr_mu *pmu)  // tbl , col, row, return cels val
{
    int tp=((mt->cc)+m)->vt;
    if(tp!=1)
    {
        return 1;
    }
    if(mt->cq<=m)
    {
        return 2;
    }
    if(mt->zq<=n)
    {
        return 3;
    }
    (*pmu).vv.p_d=((((mt->cc)+m)->pv)+n)->p_d;
    if(((mt->cc)+m)->pn)
    {
        (*pmu).ni=*((((mt->cc)+m)->pn)+n);
    }
    return 0;
}
int get_cell_dbl(ptb *mt,int m,int n, double *pv)  // tbl , col, row, return cels val
{
    rr_mu m_mu;
    int ret=get_cell_val(mt,m,n, &m_mu);
    if(m_mu.vt!=1)
    {return 1;}
    if(ret==0)
    {
        *pv=m_mu.vv.p_d;
    }
    return ret;
}
int get_cell_nstr(ptb *mt,int m,int n, rr_mu *pmu)  // tbl , col, row, return cels val
{
    int tp=((mt->cc)+m)->vt;
    if(tp!=2)
    {
        return 1;
    }
    if(mt->cq<=m)
    {
        return 2;
    }
    if(mt->zq<=n)
    {
        return 3;
    }
    //(*ppv)=((((mt->cc)+m)->pv)+n)->p_w;
    (*pmu).vv.p_w=((((mt->cc)+m)->pv)+n)->p_w;
    if(((mt->cc)+m)->pn)
    {
        (*pmu).ni=*((((mt->cc)+m)->pn)+n);
    }
    return 0;
}
int get_cell_str(ptb *mt,int m,int n, wchar_t **ppv)  // tbl , col, row, return cels val
{
    rr_mu m_mu;
    //int ret=get_cell_nstr(mt,m,n, p_mu);
    int ret=get_cell_val(mt,m,n, &m_mu);
    if(m_mu.vt!=2)
    {return 1;}
    if(ret==0)
    {
        (*ppv)=m_mu.vv.p_w;
    }
    //free(p_mu);
    return ret;
}
void show(ptb *mt,int zz, int* view_srt, int view_srt_n);
void show0(ptb *mt,int zz)
{
    show(mt,zz, NULL,0);
}
extern inline int get_real_row(int *p_arr,int n)
{
    if(!p_arr)
    {
        return n;
    }

    return *(p_arr+n);
}
void show(ptb *mt,int zz, int* view_srt, int view_srt_n)
{
    int* psrt=NULL;
    int c =mt->cq;
    int z =mt->zq;
    int cn=0;
    int cw[1000];
    int ci[1000];
    int cp[1000];
    int nv=0;

    if(view_srt!=NULL)
    {
        for(int i=0;i<view_srt_n;i++)
        {
            int vi=*(view_srt+i);
            if(vi>z-1)
            {
                i=view_srt_n;
            }
        }
        psrt=view_srt;
        z=view_srt_n;
    }

    for(int m=0;m<c;m++)
    {
        int smax=0;
        int imax=0;
        int pmax=0;
        if(wcslen(((mt->cc)+m)->cname )>0)
        {
            cn=1;
            //m=c;
        }
        if(((mt->cc)+m)->vt==1)
        {
            for(register int nn=0;nn<z;nn++)
            {
                int n=get_real_row(psrt,nn);
                if(n<zz || n >= z-zz)
                {
                    char sss1[100];
                    int L=0;
                    int P=0;
                    if(((mt->cc)+m)->pn)
                    {
                        nv=*((((mt->cc)+m)->pn)+n)==0 ? 0 : 1;
                    }
                    else
                    {
                        nv=0;
                    }
                    if(nv==0)
                    {
                        double vv=((((mt->cc)+m)->pv)+n)->p_d;
                        double v=fabs(vv);
                        double tv=(v-floor(v));

                        sprintf(sss1, "%0.14f", tv);
                        int ls=strlen(sss1);
                        P=0;
                        for(int i=ls-1; i>=0; i--)
                        {
                            if(sss1[i]!='0')
                            {
                                P=i-1;
                                break;
                            }
                        }

                        L=(v==0?1:(log10(v)+1));
                        L=vv<0 ? L+1 : L;
                        P= P>0 ? P+1 : P;
                    }
                    else
                    {
                        P=0;
                        L=4;
                    }
                    if(pmax<P)
                    {
                        pmax=P;
                    }
                    if(imax<L)
                    {
                        imax=L;
                    }
                    if(smax<imax+pmax)
                    {
                        smax=imax+pmax;
                    }
                }
            }
        }
        if(((mt->cc)+m)->vt==2)
        {
            for(register int nn=0;nn<z;nn++)
            {
                int n=get_real_row(psrt,nn);
                if(n<zz || n >= z-zz)
                {
                    int L=0;
                    if(((mt->cc)+m)->pn)
                    {
                        nv=*((((mt->cc)+m)->pn)+n)==0 ? 0 : 1;
                    }
                    else
                    {
                        nv=0;
                    }
                    if((((((mt->cc)+m)->pv)+n)->p_w) && nv==0)
                    {
                        L=wcslen(((((mt->cc)+m)->pv)+n)->p_w);
                    }
                    else
                    {
                        L=4;
                    }
                    if(smax<L)
                    {
                        smax=L;
                    }
                }
            }
        }
        cw[m]=smax;
        ci[m]=imax;
        cp[m]=pmax;
    }
    if(cn>0)
    {
        for(int m=0;m<c;m++)
        {
            int L=wcslen(((mt->cc)+m)->cname);
            int P1=0;
            int P2=0;
            if(5>cw[m])
            {
                cw[m]=5;
            }
            if(L>cw[m])
            {
                cw[m]=L;
            }
            else
            {
                P1=floor((cw[m]-L)/2.0);
                P2=2*P1<(cw[m]-L)?P1+1:P1;
            }
            wprintf(L"(%*ls%*ls)",P1+L,((mt->cc)+m)->cname,P2,L"");
            
        }
        wprintf(L"\n\r");
        for(int m=0;m<c;m++)
        {
            int L=5;
            int P1=0;
            int P2=0;
            if(L>cw[m])
            {
                cw[m]=L;
            }
            else
            {
                P1=floor((cw[m]-L)/2.0);
                P2=2*P1<(cw[m]-L)?P1+1:P1;
            }
            wprintf(L"(%*ls%d|%d|%d%*ls)",P1,L"",((mt->cc)+m)->sort_id,((mt->cc)+m)->sort_dir,((mt->cc)+m)->sort_ni,P2,L"");
            
        }
        wprintf(L"\n\r");
    }
    
    for(int nn=0;nn<z;nn++)
    {
        //wprintf(L"[%ls]",ss);
        if(nn<zz || nn >= z-zz)
        {
            int n=get_real_row(psrt,nn);
            for(int m=0;m<c;m++)
            {
                //a[i].pv=NULL;
                int tp=((mt->cc)+m)->vt;
                nv=0;
                if(((mt->cc)+m)->pn)
                {
                    nv=*((((mt->cc)+m)->pn)+n)==0 ? 0 : 1;
                }
                int L=0;
                int P1=0;
                int P2=0;
                if(nv!=0)
                {
                    L=4;
                    if(L>cw[m])
                    {
                        cw[m]=L;
                    }
                    else
                    {
                        P1=floor((cw[m]-L)/2.0);
                        P2=2*P1<(cw[m]-L)?P1+1:P1;
                    }
                    if(tp==1)
                    {
                        int Pt=P1;
                        P1=P2;
                        P2=Pt;
                    }
                    wprintf(L"[%*ls%*ls]",P1+L,L"null",P2,L"");
                }
                else
                {
                    char sss1[100];
                    double vv=0;
                    int P=0;
                    int PP=0;
                    int PPP1=0;
                    int PPP2=0;
                    switch(tp)
                    {
                        case 1:

                        vv=((((mt->cc)+m)->pv)+n)->p_d;
                        double v=fabs(vv);
                        double tv=(v-floor(v));

                        sprintf(sss1, "%0.14f", tv);
                        int ls=strlen(sss1);
                        P=0;
                        for(int i=ls-1; i>=0; i--)
                        {
                            if(sss1[i]!='0')
                            {
                                P=i-1;
                                break;
                            }
                        }
                        PP = P>0?P+1:0;

                        PPP2=cp[m]-PP;
                        PPP1=cw[m]-PPP2;

                        //wprintf(L"[%*.0f]",cw[m],((((mt->cc)+m)->pv)+n)->p_d);
                        wprintf(L"[%*.*f%*ls]",  PPP1  ,  P , vv ,  PPP2 ,"");
                        break;

                        case 2:
                        L=wcslen(((((mt->cc)+m)->pv)+n)->p_w);
                        if(L>cw[m])
                        {
                            cw[m]=L;
                        }
                        else
                        {
                            P1=floor((cw[m]-L)/2.0);
                            P2=2*P1<(cw[m]-L)?P1+1:P1;
                        }
                        wchar_t tms[1024];
                        wcscpy(tms,((((mt->cc)+m)->pv)+n)->p_w);
                        
                        for(register int li=0;li<L;li++)
                        {
                            if(tms[li] == L'\n')
                            {
                                tms[li] = L'^';
                            }
                            if(tms[li] == L'\r')
                            {
                                tms[li] = L'^';
                            }
                        }
                        
                        wprintf(L"(%*ls%*ls)",P1+L,tms,P2,"");
                        break;

                        case 3:
                        wprintf(L"[%*ju]",cw[m], (uintmax_t)(clock_t)((((mt->cc)+m)->pv)+n)->p_t);
                        break;
                    }
                }
                //printf("a[%d].vt=%d\n\r",m,a[m].vt);
                //printf("a[%d].x =%d\n\r",m,a[m].x);
                
            }
            wprintf(L"\n\r");
        }
        else if(nn==zz)
        {
            wprintf(L"------\n\r");
        }
    }
}
void show_v(pvtb *vt,int zz, int* view_srt, int view_srt_n)
{
    int* psrt=NULL;
    int c =vt->cq;
    int z =vt->zq;
    int cn=0;
    int cw[1000];
    int ci[1000];
    int cp[1000];
    int nv=0;

    ptb *mt;

    if(view_srt!=NULL)
    {
        for(int i=0;i<view_srt_n;i++)
        {
            int vi=*(view_srt+i);
            if(vi>z-1)
            {
                i=view_srt_n;
            }
        }
        psrt=view_srt;
        z=view_srt_n;
    }

    for(int vt_m=0;vt_m<c;vt_m++)
    {
        int tb_c=*((vt->cc_tbl)+vt_m); // tbl-src number
        ptb *mt=(*(vt->pptb+tb_c)); // tbl-src unit
        int m=*((vt->cc)+vt_m); // col # in tbl-src
        int smax=0;
        int imax=0;
        int pmax=0;
        if(wcslen(((mt->cc)+m)->cname )>0)
        {
            cn=1;
            //m=c;
        }
        if(((mt->cc)+m)->vt==1)
        {
            for(register int vt_nn=0;vt_nn<z;vt_nn++)
            {
                if(vt_nn<zz || vt_nn >= z-zz)
                {
                    char sss1[100];
                    
                    int vt_n=get_real_row(psrt,vt_nn);
                    int n   =get_real_row(*((vt->ptb_rr)+tb_c),vt_n);
                    
                    /*
                    int mx=0b00000011;
                    int bx = 0;
                    int dd=8;
                    while (dd) {
                        bx <<= 1;
                        bx |= mx & 1;
                        mx >>= 1;
                        dd--;
                    }
                    double dt=log2(bx);
                    */
                    
                    int L=0;
                    int P=0;
                    if(((mt->cc)+m)->pn)
                    {
                        nv=*((((mt->cc)+m)->pn)+n)==0 ? 0 : 1;
                    }
                    else
                    {
                        nv=0;
                    }
                    if(nv==0)
                    {
                        double vv=((((mt->cc)+m)->pv)+n)->p_d;
                        double v=fabs(vv);
                        double tv=(v-floor(v));

                        sprintf(sss1, "%0.8f", tv);
                        int ls=strlen(sss1);
                        P=0;
                        for(int i=ls-1; i>=0; i--)
                        {
                            if(sss1[i]!='0')
                            {
                                P=i-1;
                                break;
                            }
                        }

                        L=(v==0?1:(log10(v)+1));
                        L= vv<0 ? L+1 : L;
                        P= P>0 ? P+1 : P;
                        //L=L+P;
                        
                    }
                    else
                    {
                        P=0;
                        L=4;
                    }
                    if(pmax<P)
                    {
                        pmax=P;
                    }
                    if(imax<L)
                    {
                        imax=L;
                    }
                    if(smax<imax+pmax)
                    {
                        smax=imax+pmax;
                    }
                }
            }
        }
        if(((mt->cc)+m)->vt==2)
        {
            for(register int vt_nn=0;vt_nn<z;vt_nn++)
            {
                if(vt_nn<zz || vt_nn >= z-zz)
                {
                    int vt_n=get_real_row(psrt,vt_nn);
                    int n   =get_real_row(*((vt->ptb_rr)+tb_c),vt_n);
                    int L=0;
                    if(((mt->cc)+m)->pn)
                    {
                        nv=*((((mt->cc)+m)->pn)+n)==0 ? 0 : 1;
                    }
                    else
                    {
                        nv=0;
                    }
                    if((((((mt->cc)+m)->pv)+n)->p_w) && nv==0)
                    {
                        L=wcslen(((((mt->cc)+m)->pv)+n)->p_w);
                    }
                    else
                    {
                        L=4;
                    }
                    if(smax<L)
                    {
                        smax=L;
                    }
                }
            }
        }
        cw[vt_m]=smax;
        ci[vt_m]=imax;
        cp[vt_m]=pmax;
    }
    if(cn>0)
    {
        for(int vt_m=0;vt_m<c;vt_m++)
        {
            int tb_c=*((vt->cc_tbl)+vt_m); // tbl-src number
            ptb *mt=(*(vt->pptb+tb_c)); // tbl-src unit
            int m=*((vt->cc)+vt_m); // col # in tbl-src
            
            int L=wcslen(((mt->cc)+m)->cname);
            int P1=0;
            int P2=0;
            if(5>cw[vt_m])
            {
                cw[vt_m]=5;
            }
            if(L>cw[vt_m])
            {
                cw[vt_m]=L;
            }
            else
            {
                P1=floor((cw[vt_m]-L)/2.0);
                P2=2*P1<(cw[vt_m]-L)?P1+1:P1;
            }
            wprintf(L"(%*ls%*ls)",P1+L,((mt->cc)+m)->cname,P2,"");
            
        }
        wprintf(L"\n\r");
        for(int vt_m=0;vt_m<c;vt_m++)
        {
            int tb_c=*((vt->cc_tbl)+vt_m); // tbl-src number
            ptb *mt=(*(vt->pptb+tb_c)); // tbl-src unit
            int m=*((vt->cc)+vt_m); // col # in tbl-src

            int L=5;
            int P1=0;
            int P2=0;
            if(L>cw[vt_m])
            {
                cw[vt_m]=L;
            }
            else
            {
                P1=floor((cw[vt_m]-L)/2.0);
                P2=2*P1<(cw[vt_m]-L)?P1+1:P1;
            }
            wprintf(L"(%*ls%d|%d|%d%*ls)",P1,L"",((mt->cc)+m)->sort_id,((mt->cc)+m)->sort_dir,((mt->cc)+m)->sort_ni,P2,L"");
            
        }
        wprintf(L"\n\r");
    }
    
    for(register int vt_nn=0;vt_nn<z;vt_nn++)
    {
        //wprintf(L"[%ls]",ss);
        if(vt_nn<zz || vt_nn >= z-zz)
        {
            int vt_n=get_real_row(psrt,vt_nn);
            for(int vt_m=0;vt_m<c;vt_m++)
            {
                int tb_c=*((vt->cc_tbl)+vt_m); // tbl-src number
                ptb *mt=(*(vt->pptb+tb_c)); // tbl-src unit
                int m=*((vt->cc)+vt_m); // col # in tbl-src
                //int n=*((*((vt->ptb_rr)+tb_c))+vt_n); //real #row in tbl-src
                int n=get_real_row(*((vt->ptb_rr)+tb_c),vt_n); //real #row in tbl-src
                //a[i].pv=NULL;
                int tp=((mt->cc)+m)->vt;
                if(((mt->cc)+m)->pn)
                {
                    nv=*((((mt->cc)+m)->pn)+n)==0 ? 0 : 1;
                }
                int L=0;
                int P1=0;
                int P2=0;
                if(nv!=0)
                {
                    L=4;
                    if(L>cw[vt_m])
                    {
                        cw[vt_m]=L;
                    }
                    else
                    {
                        P1=floor((cw[vt_m]-L)/2.0);
                        P2=2*P1<(cw[vt_m]-L)?P1+1:P1;
                    }
                    if(tp==1)
                    {
                        int Pt=P1;
                        P1=P2;
                        P2=Pt;
                    }
                    wprintf(L"[%*ls%*ls]",P1+L,L"null",P2,L"");
                }
                else
                {
                    char sss1[100];
                    double vv=0;
                    int P=0;
                    int PP=0;
                    int PPP1=0;
                    int PPP2=0;
                    switch(tp)
                    {
                        case 1:

                        vv=((((mt->cc)+m)->pv)+n)->p_d;
                        double v=fabs(vv);
                        double tv=(v-floor(v));

                        sprintf(sss1, "%0.8f", tv);
                        int ls=strlen(sss1);
                        P=0;
                        for(int i=ls-1; i>=0; i--)
                        {
                            if(sss1[i]!='0')
                            {
                                P=i-1;
                                break;
                            }
                        }
                        PP = P>0?P+1:0;
                        //L=(v==0?1:(log10(v)+1));
                        //L= vv<0 ? L+1 : L;

                        //x1=cp[vt_m];
                        //swprintf(sm, 5, L"%d", cp[vt_m]);
                        //swprintf(te, 19,L"[%*.*f]",cw[vt_m],cp[vt_m],((((mt->cc)+m)->pv)+n)->p_d);
                        //0*(ci[vt_m]-L)
                        
                        PPP2=cp[vt_m]-PP;
                        PPP1=cw[vt_m]-PPP2;//-cp[vt_m]+x1;
                        wprintf(L"[%*.*f%*ls]",  PPP1  ,  P , vv ,  PPP2 ,"");
                        break;

                        case 2:
                        L=wcslen(((((mt->cc)+m)->pv)+n)->p_w);
                        if(L>cw[vt_m])
                        {
                            cw[vt_m]=L;
                        }
                        else
                        {
                            P1=floor((cw[vt_m]-L)/2.0);
                            P2=2*P1<(cw[vt_m]-L)?P1+1:P1;
                        }
                        wchar_t tms[1024];
                        wcscpy(tms,((((mt->cc)+m)->pv)+n)->p_w);
                        
                        for(register int li=0;li<L;li++)
                        {
                            if(tms[li] == L'\n')
                            {
                                tms[li] = L'^';
                            }
                            if(tms[li] == L'\r')
                            {
                                tms[li] = L'^';
                            }
                        }
                        
                        wprintf(L"(%*ls%*ls)",P1+L,tms,P2,"");
                        break;

                        case 3:
                        wprintf(L"[%*ju]",cw[vt_m], (uintmax_t)(clock_t)((((mt->cc)+m)->pv)+n)->p_t);
                        break;
                    }
                }
                //printf("a[%d].vt=%d\n\r",m,a[m].vt);
                //printf("a[%d].x =%d\n\r",m,a[m].x);
                
            }
            wprintf(L"\n\r");
        }
        else if(vt_nn==zz)
        {
            wprintf(L"------\n\r");
        }
    }
}
/*
int create_srt_arr(ptb *tt, pvt **arr_pvt)
{
    int z=tt->zq;
    pvt *p=NULL;
    int sz=sizeof(p[0]);
    p = (pvt *)malloc(sz*z) ;

    for(int i=0; i<z; i++)
    {
        (p+i)->ptb=tt;
        (p+i)->rr=i;
        (p+i)->x=((((tt->cc)+0)->pv)+i)->p_d;
    }

    (*arr_pvt)=p;
    return 0;
}*/
int *create_srt_arr(ptb *tt)
{
    int *arr=NULL;
    int z=tt->zq;
    //pvt *p=NULL;
    int sz=sizeof(arr[0]);
    arr = (int *)malloc(sz*z) ;

    for(int i=0; i<z; i++)
    {
        *(arr+i)=i;
        //(p+i)->rr=i;
        //(p+i)->x=((((tt->cc)+0)->pv)+i)->p_d;
    }

    //(*arr_pvt)=p;
    return arr;
}
int compare_pvt(const void * x1, const void * x2)   // функция сравнения элементов массива
{
    ptb * tt=((pvt*)x1)->ptb;
    int rr1 =((pvt*)x1)->rr;
    int rr2 =((pvt*)x2)->rr;
    double v1=((((tt->cc)+0)->pv)+rr1)->p_d;
    double v2=((((tt->cc)+0)->pv)+rr2)->p_d;
    //double a1= ((mt*)x1)->d1;
    //double a2= ((mt*)x2)->d1;
    //return -(a1-a2);
    int ret = (int) (v1-v2);
    return /* - */ret;
  //return ( *(mt*)x1 - *(double*)x2 );              // если результат вычитания равен 0, то числа равны, < 0: x1 < x2; > 0: x1 > x2
}
void swap_d(int *p1, int *p2)
{
    int b=*p1;
    *p1=*p2;
    *p2=b;
}
void swap_w(wchar_t **p1, wchar_t **p2)
{
    wchar_t *b=NULL;
    b=*p1;
    *p1=*p2;
    *p2=b;
}
void SQ_d(int *A, int first, int last, int it) {
    int pp = (first + last) / 2;
    int i = first, j = last, p = *(A + pp);
    wprintf(L"step %i : [%i] [%i] [%i]\n\r", it, i, pp, j);
    do {
        wprintf(L"step %i : [%i][%i][%i]\n\r", it, i, pp, j);
        while (*(A + i) < p)
        {
            //int x1=*(A + i);
            wprintf(L"step %i < [%i][%i] (%i|%i)\n\r", it, i, pp, *(A + i) , p);
            i++;
        }
        while (*(A + j) > p)
        {
            wprintf(L"step %i > [%i][%i] (%i|%i)\n\r", it, j, pp, *(A + j) , p);
            j--;
        }
        if (i <= j) {
            wprintf(L"step %i <= [%i][%i]\n\r", it, i, j);
            swap_d((int*)(A + i), (int*)(A + j));
            
            //wprintf(L"step %i <= [%i][%i]\n\r", it, i, j);
            
            i++;
            j--;
        }
    } while (i <= j);
    if (i < last)
        SQ_d(A, i, last, it+1);
    if (j > first)
        SQ_d(A, first, j, it+1);
}

void SQ_w(wchar_t **A, int first, int last) {
    int i = first, j = last, pp=0;
    pp = (first + last) / 2;
    wchar_t *p = *(A + pp);
    /*wchar_t sp[300];
    wchar_t s1[300];
    wchar_t s2[300];

    wcscpy(sp, p);
    int dv1=0;
    int dv2=0;*/
    do {
        //while (*(A + i) < p)
        //s1=*(A + i);
        /*wcscpy(s1,*(A + i));
        wcscpy(s2,*(A + j));
        dv1=wcscmp(*(A + i),p);*/
        while ( wcscmp(*(A + i),p)<0)
            i++;
        //while (*(A + j) > p)
        //dv2=wcscmp(*(A + j),p);
        while ( wcscmp(*(A + j),p)>0)
            j--;
        if (i <= j) {
            swap_w((wchar_t **)(A + i), (wchar_t **)(A + j));
            i++;
            j--;
        }
    } while (i <= j);
    if (i < last)
        SQ_w(A, i, last);
    if (j > first)
        SQ_w(A, first, j);
}

void SQ_tbl(ptb *tt, int first, int last, int it) {
    register int i = first, j = last, pp=0;
    pp = (first + last) / 2;

    //wprintf(L"step %i : [%i] [%i] [%i]\n\r", it, i, pp, j);
    do {
        //wprintf(L"step %i : [%i][%i][%i]\n\r", it, i, pp, j);
        while (tbl_row_cmp(tt,i,pp, NULL,0)<0)
        {
            //wprintf(L"step %i < [%i][%i] (%i|%i)\n\r", it, i, pp, (int)(((tt->cc)->pv)+i)->p_d, (int)(((tt->cc)->pv)+pp)->p_d);
            i++;
        }
        //while (*(A + j) > p)
        while (tbl_row_cmp(tt,j,pp, NULL,0)>0)
        {
            //wprintf(L"step %i > [%i][%i] (%i|%i)\n\r", it, j, pp, (int)(((tt->cc)->pv)+j)->p_d, (int)(((tt->cc)->pv)+pp)->p_d);
            j--;
        }
        if (i <= j) {
            //swap_w((wchar_t **)(A + i), (wchar_t **)(A + j));
            //wprintf(L"step %i <= [%i][%i]\n\r", it, i, j);
            swap_rr_in_tbl(tt, i, j);
            if(i==pp)
            {
                pp=j;
            }
            else if(j==pp)
            {
                pp=i;
            }

            //wprintf(L"step %i <= [%i][%i]\n\r", it, i, j);

            i++;
            j--;
        }
    } while (i <= j);
    if (i < last)
        SQ_tbl(tt, i, last, it+1);
    if (j > first)
        SQ_tbl(tt, first, j, it+1);
}
void view_arr1(ptb *tt);
void SQ_tbl2(ptb *tt, int first, int last, int it, tsrt *srt,int srt_n) {
    //if(it==1){view_arr1(tt);}
    register int i = first, j = last, pp=0;
    pp = (first + last) / 2;

    //wprintf(L"step %i : [%i] [%i] [%i]\n\r", it, i, pp, j);
    do {
        //wprintf(L"step %i : [%i][%i][%i]\n\r", it, i, pp, j);
        while (tbl_row_cmp(tt,i,pp, srt,srt_n)<0)
        {
            //wprintf(L"step %i < [%i][%i] (%i|%i)\n\r", it, i, pp, (int)(((tt->cc)->pv)+i)->p_d, (int)(((tt->cc)->pv)+pp)->p_d);
            i++;
        }
        //while (*(A + j) > p)
        while (tbl_row_cmp(tt,j,pp, srt,srt_n)>0)
        {
            //wprintf(L"step %i > [%i][%i] (%i|%i)\n\r", it, j, pp, (int)(((tt->cc)->pv)+j)->p_d, (int)(((tt->cc)->pv)+pp)->p_d);
            j--;
        }
        if (i <= j) {
            //swap_w((wchar_t **)(A + i), (wchar_t **)(A + j));
            //wprintf(L"step %i <= [%i][%i]\n\r", it, i, j);
            swap_rr_in_tbl(tt, i, j);
            //if(it==1){view_arr1(tt);}
            if(i==pp)
            {
                pp=j;
            }
            else if(j==pp)
            {
                pp=i;
            }

            //wprintf(L"step %i <= [%i][%i]\n\r", it, i, j);

            i++;
            j--;
        }
    } while (i <= j);
    if (i < last)
        SQ_tbl2(tt, i, last, it+1, srt,srt_n);
    if (j > first)
        SQ_tbl2(tt, first, j, it+1, srt,srt_n);
}
void view_arr2(ptb *tt,int* ar);
void SQ_tbl3(ptb *tt, int *s_arr,int first, int last, int it, tsrt *srt,int srt_n) {
    //int *ret_arr=create_srt_arr(tt);
    //if(it==1){view_arr2(tt,s_arr);} 
    register int i = first, j = last, pp=0;
    pp = (first + last) / 2;
    int r_i=0;
    int r_j=0;
    int r_pp=0;
    //wprintf(L"step %i : [%i] [%i] [%i]\n\r", it, i, pp, j);
    do {
        //wprintf(L"step %i : [%i][%i][%i]\n\r", it, i, pp, j);
        r_i =*(s_arr+i);
        r_j =*(s_arr+j);
        r_pp=*(s_arr+pp);
        while (tbl_row_cmp(tt,r_i,r_pp, srt,srt_n)<0)
        {
            //wprintf(L"step %i < [%i][%i] (%i|%i)\n\r", it, i, pp, (int)(((tt->cc)->pv)+i)->p_d, (int)(((tt->cc)->pv)+pp)->p_d);
            i++;
            r_i =*(s_arr+i);
        }
        //while (*(A + j) > p)
        while (tbl_row_cmp(tt,r_j,r_pp, srt,srt_n)>0)
        {
            //wprintf(L"step %i > [%i][%i] (%i|%i)\n\r", it, j, pp, (int)(((tt->cc)->pv)+j)->p_d, (int)(((tt->cc)->pv)+pp)->p_d);
            j--;
            r_j =*(s_arr+j);
        }
        if (i <= j) {
            //swap_w((wchar_t **)(A + i), (wchar_t **)(A + j));
            //wprintf(L"step %i <= [%i][%i]\n\r", it, i, j);
            //-//swap_rr_in_tbl(tt, i, j);
            //int ii=*(s_arr+i);
            *(s_arr+i)=r_j;
            *(s_arr+j)=r_i;
            r_i =*(s_arr+i);
            r_j =*(s_arr+j);
            //if(it==1){view_arr2(tt,s_arr);}
            if(i==pp)
            {
                pp=j;
                r_pp=r_j;
            }
            else if(j==pp)
            {
                pp=i;
                r_pp=r_i;
            }
            //wprintf(L"step %i <= [%i][%i]\n\r", it, i, j);

            i++;
            j--;
        }
    } while (i <= j);
    if (i < last)
        SQ_tbl3(tt, s_arr, i, last, it+1, srt,srt_n);
    if (j > first)
        SQ_tbl3(tt, s_arr, first, j, it+1, srt,srt_n);

    //return ret_arr;
}
int *get_sort(ptb *tt, tsrt *srt,int srt_n)
{
    int *ret_arr=create_srt_arr(tt);
    SQ_tbl3(tt, ret_arr ,0, tt->zq-1, 0,  srt,srt_n);
    return ret_arr;
}
int sort_tbl(ptb *tt)
{
    int z=tt->zq;
    int c=tt->cq;
    //pvt *s_arr=NULL;
    int *s_arr=create_srt_arr(tt);
    wprintf(L"s_arr_1\n\r");
    for(int i=0; i<z; i++)
    {
        wprintf(L"[%d]",i);
        //wprintf(L"[rr_%d]",i);
        //wprintf(L"[%d]",(s_arr+i)->rr);
        //wprintf(L"\n\r");
    }

    //qsort(s_arr, z, sizeof(s_arr[0]), compare_pvt);
    /*
    wprintf(L"s_arr_2\n\r");
    for(int i=0; i<z; i++)
    {
        wprintf(L"[rr_%d]",i);
        wprintf(L"[%d]",(s_arr+i)->rr);
        wprintf(L"\n\r");
    }
    */

    int ar_z = 9;
    wchar_t **ar=(wchar_t **)malloc((sizeof(wchar_t *))*ar_z);
    wchar_t sss[300];

    for(int i=0;i<ar_z;i++)
    {
        //*(ar+i)=rand();
        swprintf(sss, 300, L"S_[%d]", rand());
        int L=wcslen(sss);
        wchar_t *n_v = (wchar_t*)malloc(sizeof(wchar_t)* (L+1));
        wcscpy(n_v, sss);
        *(ar+i)=n_v;
    }

    wprintf(L"test_ar_1\n\r");
    
    for(int i=0;i<ar_z;i++)
    {
        wprintf(L"[%ls]",*(ar+i));
        wprintf(L"\n\r");
    }

    //swap_w((ar+2), (ar+(ar_z-2)));
/*
    SQ_d(ar, 0, ar_z-1);
*/
    SQ_w(ar, 0, ar_z-1);
    wprintf(L"test_ar_2\n\r");
    for(int i=0;i<ar_z;i++)
    {
        wprintf(L"[%ls]",*(ar+i));
        wprintf(L"\n\r");
    }
    /*
    for(int i=0;i<ar_z;i++)
    {
        wprintf(L"[%d]",*(ar+i));
        wprintf(L"\n\r");
    }
*/
    for(int i=0;i<ar_z;i++)
    {
        if(*(ar+i))
        {
            free(*(ar+i));
        }
    }
    free(ar);

    rr_mu *rrv=NULL;
    rrv=(rr_mu *)malloc((sizeof(rrv[0]))*c);

    //rr_from_tbl(tt,&rrv, 0);
/*
    int curr_id=-1;
    int i=0;
    for(int ii=0; ii<z*z; ii++)
    {
        if(i>=z)
        {
            i=0;
        }
        else
        {
            i=i+1;
        }
        if(i==0)
        {
            curr_id=(s_arr+i)->rr;
            rr_from_tbl(tt,&rrv, i);
            set_rr_in_tbl(tt,i,curr_id);
            (s_arr+i)->x=1;
        }
        else
        {
            if(i==curr_id)
            {
                curr_id=(s_arr+i)->rr;
                set_rr_in_tbl(tt,i,curr_id);
                (s_arr+i)->x=1;
            }
        }
        //rr_from_tbl(tt,&rrv,i);
        //switch_rr_in_tbl(tt,i,(s_arr+i)->rr);
        ;
    }
    */
    //((((tt->cc)+0)->pv)+5)->p_d=-5;

    //for(int i=0)

    free(s_arr);
    free(rrv);
    return 0;
}
void test_arr( int srt[][3], int srt_n)
{
    int m=0;
    int d=0;
    int u=0;

    for(int sm=0; sm<srt_n; sm++)
    {
        int *mm=(int*)srt+3*sm;
        m=*mm;
        d=*(mm+1);
        u=*(mm+2);
        //m=srt[sm][0];
        //d=srt[sm][1];
        //u=*(srt[sm]+2);
        wprintf(L"a[%d][]=",sm);
        for(int j=0;j<3;j++)
        {
            wprintf(L"[%*d]; ",2,*((int*)srt+sm*3+j));
        }
        //wprintf(L"m=%d | d=%d | u=%d",*(srt+(sm*3+0)),*(srt+(sm*3+1)),*(srt+(sm*3+2)));
        wprintf(L"m=%*d | d=%*d | u=%*d",2,m,2,d,2,u);
        wprintf(L"\n\r");
    }
}
void test_arr2( tsrt *srt, int srt_n)
{
    int m=0;
    int d=0;
    int u=0;

    for(int sm=0; sm<srt_n; sm++)
    {
        //int *mm=(int*)srt+3*sm;
        tsrt *mm=(srt+sm);
        m=*((*mm)+0);
        d=*(*mm+1);
        u=*(*(srt+sm)+2);
        //m=srt[sm][0];
        //d=srt[sm][1];
        //u=*(srt[sm]+2);
        wprintf(L"a[%d][]=",sm);
        for(int j=0;j<3;j++)
        {
            //wprintf(L"[%*d]; ",2,*((int*)srt+sm*3+j));
            wprintf(L"[%*d]; ",2,*((*(srt+sm))+j));
        }
        //wprintf(L"m=%d | d=%d | u=%d",*(srt+(sm*3+0)),*(srt+(sm*3+1)),*(srt+(sm*3+2)));
        wprintf(L"m=%*d | d=%*d | u=%*d",2,m,2,d,2,u);
        wprintf(L"\n\r");
    }
}
ptb* create_tbl_as(ptb *mt,int *c_set, int c_set_n)
{
    int rr=0;
    ptb *mtc=NULL;
    mtc=create_tbl();
    int cn=0;
    if(c_set_n==0)
    {
        for(int c=0;c<mt->cq;c++)
        {
            rr=add_col(mtc,1,((mt->cc)+c)->vt);
        }
    }
    else
    {
        for(int cs=0; cs<c_set_n; cs++)
        {
            cn=*(c_set+cs);
            int mt_t=((mt->cc)+cn)->vt;
            rr=add_col(mtc,1,mt_t);
        }
    }
    return mtc;
}
tsrt *create_tsrt(int n)
{
    tsrt *p_tsrt = NULL;
    //int sz=sizeof(tsrt3);
    //p_tsrt=(tsrt3*)malloc(sz*n);
    //wprintf(L"sz: %d\n\r",sz);

    test_arr2( (tsrt[]){{1,2,3},{4,5},{7,8,9},{10,11},{13,14,15}}, 5);
    wprintf(L"-----------\n\r");

    tsrt a[]={{1,2,3},{4,5},{7,8,9},{10,11},{13,14,15}};
    
    p_tsrt=a;

    test_arr2( p_tsrt, 5);
    wprintf(L"-----------\n\r");
    
    (*(p_tsrt+0))[0]=1;
    (*(p_tsrt+0))[1]=2;
    (*(p_tsrt+0))[2]=3;
    (*(p_tsrt+1))[0]=40;
    (*(p_tsrt+1))[1]=50;
    (*(p_tsrt+1))[2]=60;
    (*(p_tsrt+2))[0]=7;
    (*(p_tsrt+2))[1]=8;
    (*(p_tsrt+2))[2]=9;
    (*(p_tsrt+3))[0]=10;
    (*(p_tsrt+3))[1]=11;
    (*(p_tsrt+3))[2]=12;
    (*(p_tsrt+4))[0]=13;
    (*(p_tsrt+4))[1]=14;
    (*(p_tsrt+4))[2]=15;

    test_arr2( p_tsrt, 5);
    wprintf(L"-----------\n\r");

    test_arr2( a, 5);
    wprintf(L"-----------\n\r");
    //p_tsrt=a;

    //free(p_tsrt);
    return p_tsrt;
}
void drop_vtbl(pvtb* vt)
{
    if(vt->pptb&&vt->ptb_n>0)
    {
        free(vt->pptb);
    }
    if(vt->ptb_rr&&vt->ptb_n>0)
    {
        for(int i=0;i<vt->ptb_n;i++)
        {
            if(*(vt->ptb_rr+i))
            {
                free(*(vt->ptb_rr+i));
            }
            else
            {
                //ptb **mt=((vt->pptb+i)); // tbl-src unit
                drop_tbl(vt->pptb+i);
            }
        }
        free(vt->ptb_rr);
    }
    if(vt->cc&&vt->cq>0)
    {
        free(vt->cc);
    }
    if(vt->cc_tbl&&vt->cq>0)
    {
        free(vt->cc_tbl);
    }
    free(vt);
}
void f_count(int *p_ni,double *p_num, wchar_t **p_str, ptb *mt, int m, int n )
{
    (*p_num)++;
    (*p_ni)=0;
}
void f_count_ni(int m_ini,int *p_ni,double *p_num, wchar_t **p_str, ptb *mt, int m, int n )
{
    if(((mt->cc)+m)->pn)
    {
        if(*((((mt->cc)+m)->pn)+n)==0)
        {
            (*p_num)++;
        }
    }
    else
    {
        (*p_num)++;
    }
    (*p_ni)=0;
}

void f_sum(int m_ini,int *p_ni,double *p_num, wchar_t **p_str, ptb *mt, int m, int n )
{
    if(((mt->cc)+m)->vt==2)
    {
        (*p_num)=0;
        (*p_ni) =1;
        return;
    }
    double v_d=((((mt->cc)+m)->pv)+n)->p_d;
    if(((mt->cc)+m)->pn)
    {
        if(*((((mt->cc)+m)->pn)+n)==0)
        {
            if((*p_ni)!=0)
            {
                (*p_ni)=0;
                (*p_num)=v_d;
            }
            else
            {
                (*p_ni) =0;
                (*p_num)=(*p_num)+v_d;
            }
        }
    }
    else
    {
        (*p_ni) =0;
        (*p_num)=(*p_num)+v_d;
    }
}
void f_avg(int m_ini,int *p_ni,int *p_ni2,double *p_num,double *p_num2, wchar_t **p_str, ptb *mt, int m, int n , int mode_ni)
{
    if(((mt->cc)+m)->vt==2)
    {
        (*p_num)=0;
        (*p_ni) =1;
        return;
    }
    double d_sum0=0;
    
    //(*p_num2)*(*p_num);
    //f_count(m_ini,p_ni,p_num, p_str, mt, m, n);
    double v_d=0;
    int ni=0;
    if(((mt->cc)+m)->pn)
    {
        if(*((((mt->cc)+m)->pn)+n)!=0)
        {
            ni=1;
        }
    }
    if((*p_ni)==0 && (*p_ni2)==0)
    {
        if(ni==0)
        {
            d_sum0=(*p_num)*(*p_num2);
            (*p_num2)++;
            (*p_ni2) =0;
            (*p_num)=((d_sum0+((((mt->cc)+m)->pv)+n)->p_d))/(*p_num2);
            (*p_ni) =0;

            return;
        }
        else
        {
            if(mode_ni==0)
            {
                (*p_num2)++;
                (*p_ni2) =0;
                return;
            }
        }
        //d_sum0=(*p_num2)*(*p_num);
    }
    else if((*p_ni)!=0 && (*p_ni2)==0)
    {
        if(ni==0)
        {
            (*p_num2)++;
            (*p_ni2) =0;
            (*p_num)=(((((mt->cc)+m)->pv)+n)->p_d)/(*p_num2);
            (*p_ni) =0;
            return;
        }
        else
        {
            if(mode_ni==0)
            {
                (*p_num2)++;
                (*p_ni2) =0;
                return;
            }
        }
        //d_sum0=(*p_num2)*(*p_num);
    }
    else if((*p_ni)!=0 && (*p_ni2)!=0)
    {
        if(ni==0)
        {
            (*p_num)=((((mt->cc)+m)->pv)+n)->p_d;
            (*p_ni) =0;
            (*p_num2)=1;
            (*p_ni2) =0;
            return;
        }
        else
        {
            if(mode_ni==0)
            {
                (*p_num)=0;
                (*p_ni) =1;
                (*p_num2)=1;
                (*p_ni2) =0;
                return;
            }
        }
        //d_sum0=(*p_num2)*(*p_num);
    }
    
}

void f_comp(int m_ini,int *p_ni,double *p_num, wchar_t **p_str, ptb *mt, int m, int n, int dir)
{
    double   v_d=0;
    int ni=0;
    wchar_t *v_w=NULL;
    if(((mt->cc)+m)->pn)
    {
        ni =*((((mt->cc)+m)->pn)+n);
    }
    if(ni!=0 && m_ini!=0)
    {
        ;
    }
    else
    {
        int t=((mt->cc)+m)->vt;
        switch(t)
        {
            case 1:
            //if(*(p_num_ni)==
            v_d=((((mt->cc)+m)->pv)+n)->p_d;
            if(m_ini==0 || (ni==0 && (*p_ni)!=0))
            {
                (*p_ni) =ni;
                (*p_num)=v_d;
            }
            else
            {
                if(dir>0 && (*p_num)>v_d)
                {
                    (*p_num)=v_d;
                    (*p_ni) =ni;
                }
                else if(dir<0 && (*p_num)<v_d)
                {
                    (*p_num)=v_d;
                    (*p_ni) =ni;
                }
            }
            break;
            case 2:
            v_w=((((mt->cc)+m)->pv)+n)->p_w;
            if(m_ini==0 || (ni==0 && (*p_ni)!=0))
            {
                (*p_str)=v_w;
                (*p_ni) =ni;
            }
            else
            {
                int ts = wcscmp((*p_str),((((mt->cc)+m)->pv)+n)->p_w);
                if(((double)dir)*ts>0)
                {
                    (*p_str)=v_w;
                    (*p_ni) =ni;
                }
            }
            break;
        }
    }
}
void f_min(int m_ini,int *p_ni,double *p_num, wchar_t **p_str, ptb *mt, int m, int n)
{
    f_comp(m_ini,p_ni,p_num, p_str, mt, m, n, 1);
}
void f_max(int m_ini,int *p_ni,double *p_num, wchar_t **p_str, ptb *mt, int m, int n)
{
    f_comp(m_ini,p_ni,p_num, p_str, mt, m, n, -1);
}

void agg_func(int type_, int m_ini,int *p_ni,int *p_ni2,double *p_num,double *p_num2, wchar_t **p_str, ptb *mt, int m, int n)
{
    switch (type_) {
        case 100:
        f_count(p_ni,p_num, p_str, mt, m, n);
        break;
        case 101:
        f_count_ni(m_ini,p_ni,p_num, p_str, mt, m, n);
        break;
        case 200:
        f_min(m_ini,p_ni,p_num, p_str, mt, m, n);
        break;
        case 300:
        f_max(m_ini,p_ni,p_num, p_str, mt, m, n);
        break;
        case 400:
        f_sum(m_ini,p_ni,p_num, p_str, mt, m, n);
        break;
        case 500:
        f_avg(m_ini,p_ni,p_ni2,p_num,p_num2, p_str, mt, m, n, 0);
        break;
        case 501:
        f_avg(m_ini,p_ni,p_ni2,p_num,p_num2, p_str, mt, m, n, 1);
        break;
    }
}

pvtb* group1(ptb *mt,int *ssrt_in,int *c_set,int c_set_n,tsrt *a_set, int a_set_n)
{
    int rr=0;
    pvtb *mtg=NULL;
    mtg=(pvtb*)malloc(sizeof(pvtb));
    tsrt *p_tsrt = NULL;
    p_tsrt=(tsrt*)malloc(sizeof(tsrt)*c_set_n);
    for(int i=0;i<c_set_n;i++)
    {
        *(*(p_tsrt+i)+0)=*(c_set+i);
        *(*(p_tsrt+i)+1)=0;
        *(*(p_tsrt+i)+2)=0;
    }

    ptb *t_agg = create_tbl();
    int cg=0;
    int fg=0;
    for(int i=0;i<a_set_n;i++)
    {
        cg = *(*(a_set+i)+0);
        fg = *(*(a_set+i)+1);
        int agg_type=((mt->cc)+cg)->vt;
        wchar_t ss[300];
        wchar_t *s_func_name;
        switch (fg)
        {
            case 100:
            s_func_name=L"COUNT";
            agg_type=1;
            break;
            case 101:
            s_func_name=L"COUNT_NI";
            agg_type=1;
            break;
            case 200:
            s_func_name=L"MIN";
            break;
            case 300:
            s_func_name=L"MAX";
            break;
            case 400:
            s_func_name=L"SUM";
            agg_type=1;
            break;
            case 500:
            s_func_name=L"AVG";
            agg_type=1;
            break;
            case 501:
            s_func_name=L"AVG_NI";
            agg_type=1;
            break;
            default:
            s_func_name=L"AGG";
            break;
        }
        swprintf(ss, 300, L"%ls(%ls)",s_func_name, &(((mt->cc)+cg)->cname));
        rr=add_col(t_agg,1,agg_type);
        set_col_name(t_agg, i, ss);
    }

    int *ssrt=NULL;
    if(ssrt_in)
    {
        ssrt=ssrt_in;
    }
    else
    {
        ssrt=get_sort(mt, p_tsrt ,c_set_n);
    }

    mtg->ptb_n=2;
    mtg->pptb=(ptb**)malloc(sizeof(ptb*)*2);
    (*(mtg->pptb+0))=mt;
    (*(mtg->pptb+1))=t_agg;

    mtg->cq=c_set_n+t_agg->cq;
    mtg->cc_tbl=(int*)malloc(sizeof(int)*(mtg->cq));
    mtg->cc    =(int*)malloc(sizeof(int)*(mtg->cq));
    for(int i=0; i<c_set_n; i++)
    {
        *(mtg->cc_tbl+i)=0;
        *(mtg->cc+i)=*(c_set+i);
    }
    for(int i=c_set_n; i<mtg->cq; i++)
    {
        *(mtg->cc_tbl+i)=1;
        *(mtg->cc+i)=i-c_set_n;
    }

    int *src_rr=(int*)malloc(sizeof(int)*1);
    mtg->ptb_rr=(int**)malloc(sizeof(int*)*2);

    
    //mtg=create_tbl_as(mt,c_set,a_set_n);
    //rr=add_col(mtg,1,1);
    int cn=0;

    for(int i=0;i<c_set_n;i++)
    {
        *(*(p_tsrt+i)+0)=*(c_set+(c_set_n-i-1));
    }
    
    int z=mt->zq;
    double *a1=NULL;
    a1=(double*)malloc(sizeof(double)*a_set_n);
    double *a2=NULL;
    a2=(double*)malloc(sizeof(double)*a_set_n);
    wchar_t **p_str=NULL;
    p_str=(wchar_t**)malloc(sizeof(wchar_t*)*a_set_n);
    int *p_ni =NULL;
    p_ni =(int*)malloc(sizeof(int)*a_set_n);
    int *p_ni2=NULL;
    p_ni2=(int*)malloc(sizeof(int)*a_set_n);
    for(int i=0;i<a_set_n;i++)
    {
        *(p_ni +i)=0;
        *(p_ni2+i)=0;
    }
    int srt_rr_n=0;
    int dd_0=0;
    int agg_type=0;
    int rn=0;
    for(int n=0; n<z; n++)
    {
        if(n==0)
        {
            rn=*(ssrt+(n));
            for(int i=0;i<a_set_n;i++)
            {
                    cg = *(*(a_set+i)+0);
                    fg = *(*(a_set+i)+1);
                    *(p_ni +i)=1;
                    *(p_ni2+i)=1;
                    *(a1+i)=0;
                    *(a2+i)=0;
                    agg_func(fg, 0,(p_ni+i), (p_ni2+i), (a1+i),(a2+i), (p_str+i), mt, cg, rn);
            }
            dd_0=1;
    
            srt_rr_n++;
            rr=add_rows(t_agg,srt_rr_n);
            *src_rr=*(ssrt+(n));
        }
        else
        {
            int dd= tbl_row_cmp(mt,*(ssrt+(n-1)), *(ssrt+(n)), p_tsrt,c_set_n);
        
            if(dd==0)
            {
                rn=*(ssrt+(n));
                for(int i=0;i<a_set_n;i++)
                {
                    cg = *(*(a_set+i)+0);
                    fg = *(*(a_set+i)+1);
                    agg_func(fg, 1,(p_ni+i), (p_ni2+i), (a1+i),(a2+i), (p_str+i), mt, cg, rn);
                }
                dd_0=1;
            }
            else
            {
                rn=*(ssrt+(n));
                for(int i=0;i<a_set_n;i++)
                {
                    cg = *(*(a_set+i)+0);
                    fg = *(*(a_set+i)+1);
                    agg_type = ((t_agg->cc)+i)->vt;
                    switch (agg_type) {
                        case 1:
                        rr=set_cell_dbl(t_agg, i, srt_rr_n-1, *(a1+i),*(p_ni+i));
                        break;
                        case 2:
                        rr=set_cell_str(t_agg, i, srt_rr_n-1, *(p_str+i),*(p_ni+i));
                        break;
                    }
                    *(p_ni +i)=1;
                    *(p_ni2+i)=1;
                    *(a1+i)=0;
                    *(a2+i)=0;
                    agg_func(fg, 0,(p_ni+i), (p_ni2+i), (a1+i),(a2+i), (p_str+i), mt, cg, rn);
                }
                //dd_0=0;

                srt_rr_n++;
                rr=add_rows(t_agg,srt_rr_n);
                src_rr=(int*)realloc(src_rr,sizeof(int)*(srt_rr_n));
                *(src_rr+srt_rr_n-1)=*(ssrt+(n));

                dd_0=1;
            }
        }
    }
    if(dd_0!=0)
    {
        for(int i=0;i<a_set_n;i++)
        {
            cg = *(*(a_set+i)+0);
            fg = *(*(a_set+i)+1);
            agg_type = ((t_agg->cc)+i)->vt;

            switch (agg_type) {
                case 1:
                rr=set_cell_dbl(t_agg, i, srt_rr_n-1, *(a1+i),*(p_ni+i));
                break;
                case 2:
                rr=set_cell_str(t_agg, i, srt_rr_n-1, *(p_str+i),*(p_ni+i));
                break;
            }
        }
    }
    *((mtg->ptb_rr)+0)=src_rr;
    *((mtg->ptb_rr)+1)=NULL;
    mtg->zq=srt_rr_n;
    if(a1){free(a1);}
    if(a2){free(a2);}
    if(p_str){free(p_str);}
    if(p_ni ){free(p_ni );}
    if(p_ni2){free(p_ni2);}
    free(p_tsrt);
    return mtg;
}

double cast_str_to_dbl(wchar_t* str,wchar_t d,int *ret)
{
    wchar_t tmp[256];
    //wchar_t tmp1[256];
    //wchar_t tmp2[256];
    int j=0;
    int L=wcslen(str);
    int dn=0;
    int dp=-1;
    int E=0;
    int j2=0;
    for(int i=0;i<L;i++)
    {
        wchar_t a = *(str+i);
        if(a!=L' ')
        {
            if(a==d)
            {
                if(dn==0)
                {
                    tmp[j]=L'.';
                    dn=1;
                    //dp=j;
                    //tmp1[j]=L'\0';
                    j++;
                }
                else
                {
                    if(ret)
                    {
                        *ret=-1;
                    }
                    return 0;
                }
            }
            else if(a==L'-')
            {
                if(j==0)
                {
                    tmp[j]=a;
                    //tmp1[j]=a;
                    //dn=1;
                    j++;
                }
                else
                {
                    if(ret)
                    {
                        *ret=-1;
                    }
                    return 0;
                } 
                
            }
            else
            {
                if(a!=L'E' && a!=L'e' && a!=L'0' && a!=L'1' && a!=L'2' && a!=L'3' && a!=L'4' && a!=L'5' && a!=L'6' && a!=L'7' && a!=L'8' && a!=L'9')
                {
                    if(ret)
                    {
                        *ret=-1;
                    }
                    return 0;
                }
                if(a==L'E' || a==L'e')
                {
                    E=1;
                    tmp[j]=a;
                    //tmp1[j]=a;
                    //dn=1;
                    j++;
                }
                else
                {
                    tmp[j]=a;
                    /*
                    if(dp<0)
                    {
                        tmp1[j]=a;
                    }
                    else
                    {
                        tmp2[j2]=a;
                        j2++;
                    }*/
                    //dn=1;
                    j++;
                }
            }
        }
    }
    if(L==0)
    {
        if(ret)
        {
            *ret=1;
        }
        return 0;
    }
    tmp[j]=L'\0';
    /*
    double db=0.0;
    double db1=0.0;
    double db2=0.0;
    int m_lg10=0;
    if(E==0 && dp>=0 && j<230)
    {
        wcscat(tmp,L"000000000000");
        db1=wcstod(tmp1,NULL);
        db2=wcstod(tmp2,NULL);
        m_lg10=log10(db2);
        db2=db2/pow(10,m_lg10+1);
    }
    */
    double db=wcstod(tmp,NULL);
    
    if(ret)
    {
        *ret=0;
    }
    return db;
}

int conver_to_num(ptb *mt,int m,wchar_t d)
{
    if(mt->cq<=m)
    {
        return -2;
    }
    int ct=((mt->cc)+m)->vt;
    if(ct!=2)
    {
        return -3;
    }
    int CR=mt->cq;
    add_col(mt, 1 , 1);
    int N=mt->zq;
    int nv=0;
    for(int n=0;n<N;n++)
    {
        nv=0;
        if(((mt->cc)+m)->pn)
        {
            if(*((((mt->cc)+m)->pn)+n)!=0)
            {
                nv=1;
                set_null_cell(mt, CR, n, 1);
            }
        }
        if(nv==0)
        {
            int ret=0;
            double db=cast_str_to_dbl(((((mt->cc)+m)->pv)+n)->p_w,d,&ret);
            if(ret<0)
            {
                drop_col(mt, CR); 
                return n;
            }
            else if(ret==0)
            {
                ((((mt->cc)+CR)->pv)+n)->p_d=db;
                if((((mt->cc)+CR)->pn))
                {
                    *((((mt->cc)+CR)->pn)+n)=0;
                }
            }
            else if(ret==1)
            {
                set_null_cell(mt, CR, n, 1);
            }
            
        }
    }
    ((mt->cc)+m)->vt=1;
    for(int n=0;n<N;n++)
    {
        if(((((mt->cc)+m)->pv)+n)->p_w)
        {
            free(((((mt->cc)+m)->pv)+n)->p_w);
        }
        nv=0;
        if(*((((mt->cc)+CR)->pn)+n)!=0)
        {
            nv=1;
        }
        set_cell_dbl(mt,m,n, ((((mt->cc)+CR)->pv)+n)->p_d,nv);
    }
    drop_col(mt, CR); 
    return -1;
}

void d_b(wchar_t *p_out,wchar_t *p_in,wchar_t *d,wchar_t *b);
void save_csv_file(ptb *mt,char *name,int head,wchar_t *d,wchar_t *b)
{
    size_t r;
    FILE *fp;
    if ((fp = fopen(name, "w")) == NULL)
    {
        wprintf(L"Не удалось открыть файл");
        getwchar();
    }

    //wchar_t d[]=L",";
    //wchar_t b[]=L"\"";
    //wchar_t nl[]=L"\n\r";
    wchar_t nl[]=L"\n";
    int z=mt->zq;
    int c=mt->cq;    
    int vt=0;
    int L=0;
    int L1=0;
    int b_m=0;
    
    int sz2=sizeof(wchar_t);
    int sz1=sizeof(char);

    wchar_t buf[1024];
    //wchar_t *pbuf;
    char cbuf[1024];
    int n_start =head==0? 0:-1;

    double t_db=0.0;

    for(int n=n_start; n<z; n++)
    {
        vt=0;
        for(int m=0; m<c; m++)
        {
            if(n==-1)
            {
                buf[0]=L'\0';
                d_b(buf,(((mt->cc)+m)->cname),d,b);
            }
            else
            {
                if(((mt->cc)+m)->pn)
                {
                    if(*((((mt->cc)+m)->pn)+n)!=0)
                    {
                        buf[0]=L'\0';
                    }
                }
                else
                {
                    vt=((mt->cc)+m)->vt;
                    switch (vt)
                    {
                        case 1:
                            t_db=((((mt->cc)+m)->pv)+n)->p_d;
                            str_0_trim(buf, t_db, L'.',12);
                            //swprintf(buf, 256, L"%f", t_db);
                            //pbuf=buf;
                        break;
                        case 2:
                            b_m=0;
                            if(((((mt->cc)+m)->pv)+n)->p_w)
                            {
                                buf[0]=L'\0';
                                d_b(buf,((((mt->cc)+m)->pv)+n)->p_w,d,b);
                                //pbuf=buf;
                            }
                            else
                            {
                                buf[0]=L'\0';
                                //wcscpy(buf, L"");
                                //pbuf=buf;
                            }
                        break;
                        default:
                            //pbuf=NULL;
                            buf[0]=L'\0';
                            break;
                    }
                }
            }
            if(m==c-1)
            {
                wcscat(buf,nl);
                //wcscat(buf,L'\0');
            }
            else
            {
                wcscat(buf,d);
                //wcscat(buf,L'\0');
            }
            wcstombs(cbuf, buf, 1024);
            L=strlen(cbuf);
            r=fwrite(cbuf,sz1,L,fp);

            //L=wcslen(buf);
            //r=fwrite(buf,sz2,L,fp);
            
        }
    }
    fclose(fp);
    //getwchar();
}
void wsave_csv_file(ptb *mt,wchar_t *fname,int head,wchar_t *d,wchar_t *b)
{
    char name[256]; // = "my.txt"; 
    wcstombs(name, fname, 255);
    save_csv_file(mt,name,head,d,b);
}

void read_csv_file(ptb *mt,char *name,int head,char d,char b)
{
    size_t r;
    FILE *fp;
    //char name[256]; // = "my.txt";
    //wcstombs(name, fname, 255);
    if ((fp = fopen(name, "r")) == NULL)
    {
        wprintf(L"Не удалось открыть файл");
        getwchar();
    }
    int step_s=1023;
    int stop_=0;
    //char d=',';
    //char b='"';
    int mb=0;
    int md=0;
    int ic=0;
    int ir=1;
    int ir_b=0;
    int ii=0;
    int rs=0;
    int m=0;
    //wchar_t *ws=NULL;
    //ws=(wchar_t*)malloc(sizeof(wchar_t)*1024);
    char buff[1024];
    //char line[5][1024];
    char str[1024];
    wchar_t ws[1024];
    wchar_t line[512][1024];
    //r=fread(buff,1,32,fp);
    //int LB=strlen(buff);

    ic=0;
    ir_b=0;
    int hn = head==0?0: 1;
    int n=0;
    int nnn=0;
    for(;stop_==0;)
    {
        
        r=fread(buff,1,step_s,fp);
        if(r<step_s)
        {
            stop_=1;
        }
        //for(;;)
        {
            //ic=0;
            //ir_b=0;
            for(int i=0; i<r;i++)
            {
                if(i==70)
                {
                    nnn=i;
                }
                ir=1;     
                
                if(mb==1&&*(buff+i)!=b&&ir_b==1)
                {
                    mb=0;
                    ir_b=0;
                }
                if(mb==0)
                {
                    //ir=1;
                    if(*(buff+i)==d)
                    {
                        *(str+ic)='\0';
                        // *(buff+i)='\0';
                        mbstowcs(ws, str, 1024);
                        //wprintf(L"[%i][%i] %ls\n\r",n,m,ws);
                        if(n==0)
                        {
                            add_col(mt, 1, 2);
                            if(head!=0)
                            {
                                int re=set_col_name(mt,m, ws);
                                int cnc=1;
                                while(re!=0){
                                    wchar_t cws[512]=L"\0";
                                    swprintf(cws, 512, L"%ls_%d", ws,cnc);
                                    re=set_col_name(mt,m, cws);
                                    cnc++;
                                }
                            }
                            else
                            {
                                set_cell_str(mt,m,n-hn,ws,0);
                            }
                        }
                        else
                        {
                            set_cell_str(mt,m,n-hn,ws,0);
                        }
                        *ws='\0';
                        //for(int iii=0; iii<512;iii++)
                        //{*(ws+iii)='\0';}
                        *(str+0)='\0';
                        ic=0;
                        //break;
                        ir=0;

                        md=1;
                        m=m+1;
                    }
                    else if(*(buff+i)==10)
                    {
                        *(str+ic)='\0';
                        // *(buff+i)='\0';
                        mbstowcs(ws, str, 512);
                        //wprintf(L"[%i][%i] %ls\n\r",n,m,ws);
                        if(n==0)
                        {
                            add_col(mt, 1, 2);
                            if(head!=0)
                            {
                                int re=set_col_name(mt,m, ws);
                                int cnc=1;
                                while(re!=0){
                                    wchar_t cws[512]=L"\0";
                                    swprintf(cws, 512, L"%ls_%d", ws,cnc);
                                    re=set_col_name(mt,m, cws);
                                    cnc++;
                                }
                            }
                            else
                            {
                                set_cell_str(mt,m,n-hn,ws,0);
                            }
                        }
                        else
                        {
                            set_cell_str(mt,m,n-hn,ws,0);
                        }
                        *ws='\0';
                        //for(int iii=0; iii<512;iii++)
                        //{*(ws+iii)='\0';}
                        *(str+0)='\0';
                        ic=0;
                        //break;
                        ir=0;

                        md=0;
                        m=0;
                        n=n+1;
                    }
                    else if(*(buff+i)==b)
                    {
                        if(md==1 || m==0)
                        {
                            mb=1;
                            ir=0;
                        }
                    }
                    
                    ir_b=0;
                    //ir=0;
                }
                else
                {
                    md=0;
                    if(*(buff+i)==b)
                    {
                        //mb=0;
                        if(ir_b==2)
                        {
                            ir_b=0;

                        }
                        else if(ir_b==1)
                        {
                            ir_b=0; //ir_b+1;
                            ir=1;
                        }
                        else 
                        {
                            ir_b=ir_b+1;
                            ir=0;
                        }
                    }
                    else
                    {
                        ir=1;      
                    }
                }
                if(ir_b!=1 && ir==1)
                {
                    *(str+ic)=*(buff+i);
                    ic=ic+1;
                }
            }
            
            //mbstowcs(ws, line, 512);

            //wprintf(L"%ls\n\r",ws);
            
        }
        rs=rs+1;
    }

    fclose(fp);
    
    if(mt->cq>0 && head==0)
    {
        wchar_t cb[512]=L"\0";
        for(m=0; m<mt->cq; m++)
        {
            cb[0]=L'\0';
            if(mt->cq<100&&m<10)
            {
                swprintf(cb, 512, L"cc_0%d", m);
            }
            else if(mt->cq<1000&&m<10)
            {
                swprintf(cb, 512, L"cc_00%d", m);
            }
            else if(mt->cq<1000&&m>=10&&m<100)
            {
                swprintf(cb, 512, L"cc_0%d", m);
            }
            else 
            {
                swprintf(cb, 512, L"cc_%d", m);
            }
            set_col_name(mt,m, cb);
        }
    }
    //free(ws);
    //getwchar();
}
void wread_csv_file(ptb *mt,wchar_t *fname,int head,char d,char b)
{
    char name[256]; // = "my.txt"; 
    wcstombs(name, fname, 255);
    read_csv_file(mt,name,head,d,b);
}

void view_arr1(ptb *tt)
{
    for(int i=0; i<tt->zq; i++)
    {
        wprintf(L"[ %d ][ %.0f ] [ %*.0f ]\n\r",i,((((tt->cc)+0)->pv)+((i)))->p_d,10,((((tt->cc)+3)->pv)+((i)))->p_d);
    }
    wprintf(L"-----------\n\r");
}

void view_arr2(ptb *tt,int* ar)
{
    for(int i=0; i<tt->zq; i++)
    {
        wprintf(L"[ %d ][ %d ] [ %*.0f ]\n\r",i,*(ar+i),10,((((tt->cc)+3)->pv)+(*(ar+i)))->p_d);
    }
    wprintf(L"-----------\n\r");
}

void d_b(wchar_t *p_out,wchar_t *p_in,wchar_t *d,wchar_t *b) // экранирование спец.символов для CSV
{
    int b_m=0;

    //wchar_t p_in[]=L"Й,ЦУ\"КЕ\"Н"; //L"ЙЦУ\"КЕН";
    //wchar_t p_out[256]=L"\0";

    wchar_t *ppc = NULL;
    wchar_t *pp0 = NULL;
    wchar_t *pp1 = NULL;
    wchar_t *pbuf;
    
    int L0=0;
    int L1=0;
    int n=0;
    pp0=p_in;
    ppc=wcsstr(pp0+1,d);
    do
    {
        L0=wcslen(pp0);
        L1=0;
        pp1=wcsstr(pp0+1,b);
        if(pp1)
        {
            b_m=1;
            L1=wcslen(pp1);
        }
        if(n==0 && (ppc!=NULL || b_m==1))
        {
            wcscat(p_out,b);
        }
        wcsncat(p_out,pp0,L0-L1);
        if(pp1)
        {
            wcscat(p_out,b);
        }
        //wcsncpy(p_out,pp0,L0-L1);
        //wcscat(p_out,pp0);

        pp0=pp1;
        n++;

    }
    while(pp0);
    if(ppc!=NULL || b_m==1)
    {
        wcscat(p_out,b);
    }
    pp0=pp1;
    //for(int i=0; i)

}
int ctr_str_mem(char **p_out,int str_sz,int dif,int incr)
{
    int L=strlen(*p_out);
    int new_sz=str_sz;
    if(*p_out==NULL)
    {
        *p_out=(char *)malloc(sizeof(char)*incr);
    }
    else
    {
        if(L+dif>str_sz)
        {
            new_sz=str_sz+incr;
            *p_out=(char *)realloc(*p_out,sizeof(char)*new_sz);
        }
    }
    return new_sz;
}

char *sel_chr_type(int type_,char *t_n,char *t_s,char *t_d) // подстановка HTML стилей по типу столбика
{
    switch (type_) {
    case 1:
        return t_n;
    case 2:
        return t_s;
    case 3:
        return t_d;
    default:
        return t_s;
    }
    return t_s;
}

int view_html(char **p_out, ptb *pmt, int sh_json, int sh_html, int head, char *t_class,char *t_head,char *t_cel,char *t_num,char *t_str,char *t_dat)
{
    int curr_L=0;
    int out_LL=2048;
    int dif=512;
    int incr=2048;
    *p_out=(char*)malloc(sizeof(char*)*out_LL);
    memset(*p_out,0,out_LL);
    char buf[2048]={'\0',};
    char buf2[2048]={'\0',};
    wchar_t wbuf[2048]={'\0',};
    memset(wbuf,0,2048);

    char t_class2[1024]={'\0',};
    char t_head2[1024]={'\0',};
    char t_cel2[1024]={'\0',};
    char t_num2[1024]={'\0',};
    char t_str2[1024]={'\0',};
    char t_dat2[1024]={'\0',};

    char t_class3[1024]={'\0',};
    char t_head3[1024]={'\0',};
    char t_cel3[1024]={'\0',};
    char t_num3[1024]={'\0',};
    char t_str3[1024]={'\0',};
    char t_dat3[1024]={'\0',};

    if(sh_html==1)
    {
        json_sh_cat(t_class2,t_class);
        json_sh_cat(t_head2,t_head);
        json_sh_cat(t_cel2,t_cel);
        json_sh_cat(t_num2,t_num);
        json_sh_cat(t_str2,t_str);
        json_sh_cat(t_dat2,t_dat);
    }
    else
    {
        strcat(t_class2,t_class);
        strcat(t_head2,t_head);
        strcat(t_cel2,t_cel);
        strcat(t_num2,t_num);
        strcat(t_str2,t_str);
        strcat(t_dat2,t_dat);
    }
    if(sh_json==1)
    {
        json_sh_cat(t_class3,t_class2);
        json_sh_cat(t_head3,t_head2);
        json_sh_cat(t_cel3,t_cel2);
        json_sh_cat(t_num3,t_num2);
        json_sh_cat(t_str3,t_str2);
        json_sh_cat(t_dat3,t_dat2);
    }
    else
    {
        strcat(t_class3,t_class2);
        strcat(t_head3,t_head2);
        strcat(t_cel3,t_cel2);
        strcat(t_num3,t_num2);
        strcat(t_str3,t_str2);
        strcat(t_dat3,t_dat2);
    }
    int N_=pmt->zq;
    int N=0;
    int LIM=1000;
    int M=pmt->cq;

    if(N_>LIM)
    {
        N=LIM;
    }
    else
    {
        N=N_;
    }

    //char *p
    wchar_t data_out[2048];// = L"<table ";
    strcpy(*p_out,"<table ");
    strcat(*p_out,t_class3);
    strcat(*p_out," >");
    //return 0;
    if(head==1)
    {
      strcat(*p_out,"<tr>");
      for(int m=0;m<M;m++)
      {
        out_LL=ctr_str_mem(p_out,out_LL,dif,incr);
        strcat(*p_out,"<td ");
        strcat(*p_out,t_head3);
        strcat(*p_out,">");
        wcstombs(buf, ((pmt->cc)+m)->cname, 2048);
        buf2[0]='\0';
        if(sh_html==1)
        {
            html_sh_cat(buf2,buf);
        }
        else
        {
            strcpy(buf2,buf);
        }

        if(sh_json==1)
        {
            json_sh_cat(*p_out,buf2);
        }
        else
        {
            strcat(*p_out,buf2);
        }

        //strcat(*p_out,buf2);
        strcat(*p_out,"</td>");
      }
      strcat(*p_out,"</tr>");
    }
    char *tts=NULL;
    for(int n=0; n<N; n++)
    {
      strcat(*p_out,"<tr>");
      for(int m=0;m<M;m++)
      {
        out_LL=ctr_str_mem(p_out,out_LL,dif,incr);
        strcat(*p_out,"<td ");
        strcat(*p_out,t_cel);
        tts=sel_chr_type(((pmt->cc)+m)->vt,t_num3,t_str3,t_dat3);
        strcat(*p_out,tts);
        strcat(*p_out,">");
        get_cell_sval(pmt,m,n,wbuf,L'.',12);
        wcstombs(buf, wbuf, 2048);
        buf2[0]='\0';
        if(sh_html==1)
        {
            html_sh_cat(buf2,buf);
        }
        else
        {
            strcpy(buf2,buf);
        }

        if(sh_json==1)
        {
            json_sh_cat(*p_out,buf2);
        }
        else
        {
            strcat(*p_out,buf2);
        }

        //strcat(*p_out,buf2);
        strcat(*p_out,"</td>");
      }
      strcat(*p_out,"</tr>");
    }
    strcat(*p_out,"</table>");
    //wcscat(data_out,t_class);
    //char buf[1024]={'\0',};
    //wchar_t wbuf[1024]={'\0',};
    //wchar_t wbuf2[1024]={'\0',};
    //int len_data_out=0;
    
    return 0;
}


int main_tbl()
{
    ptb *pmt=NULL;
    pmt = create_tbl();

    wprintf(L"Из файла:\n\r");
    read_csv_file(pmt,"test_data_02S.csv",1,L',',L'"');
    show(pmt,10,NULL,0);

    wprintf(L"\n\r После конверсии 1 и 2 столбиков:\n\r");
    int res = -1;
    res=conver_to_num(pmt,0,L'.');
    res=conver_to_num(pmt,1,L'.');
    show(pmt,10,NULL,0);

    wprintf(L"\n\r Выборочно присвоили NULL:\n\r");
    set_null_cell(pmt, 1, 4,  1);
    set_null_cell(pmt, 2, 95, 1);
    show(pmt,10,NULL,0);

    
    wprintf(L"\n\r После сортировки по cc01_1:\n\r");
    int *m_srt1 = get_sort(pmt, (tsrt[]) {{1,1,0}}  ,1);
    show(pmt,10,m_srt1,pmt->zq);

    wprintf(L"\n\r После сортировки по cc02:\n\r");
    int *m_srt2 = get_sort(pmt, (tsrt[]) {{2,0,1}} ,1);
    show(pmt,10,m_srt2,pmt->zq);


    wprintf(L"\n\r После группировки по cc04:\n\r");
    pvtb *mtg = group1(pmt, NULL
                ,(int[]){4,},1
                ,(tsrt[]){{0,400,0},{2,100,0},{2,101,0},{2,300,0}}, 4);
    show_v(mtg,10,NULL,0);

    drop_tbl(&pmt);
    drop_vtbl(mtg);
    if(m_srt1){free(m_srt1);}
    if(m_srt2){free(m_srt2);}
    
    return 0;

    //tsrt mm_tsrt1[] = {{1,1,0}}; //

    /*
    ptb *pmt=NULL;
    pmt = create_tbl();

    setlocale(LC_ALL, "en_US.utf8");

    //wprintf(L"__%00d\n\r",5);
    //wchar_t st[]=L"ЙЦУ\"КЕН";
    //wchar_t sst[256]; 
    //sst[0]=L'\0';
    //d_b(sst,st);
    read_csv_file(pmt,"test_data_02S.csv",1,L',',L'"');

    show(pmt,10,NULL,0);

    save_csv_file(pmt,"test_data_02S_out.csv",0,L"|",L"\"");

    drop_tbl(&pmt);
    pmt = create_tbl();

    read_csv_file(pmt,"test_data_02S_out.csv",0,'|','"');

    show(pmt,10,NULL,0);
    
    drop_tbl(&pmt);
    
    return 0;
    */
    for(int u=0; u<1; u++)
    {
        ptb *pt=NULL;
        int NN=1;
        ptb **ppt=(ptb**)malloc(sizeof(ptb*)*NN);

        for(int y=0;y<NN;y++)
        {
            ppt[y] = create_tbl();
        }

        for(int y=0;y<NN;y++)
        {
            pt=ppt[y];
            //read_csv_file(ppt[y],L"test_csv");
            read_csv_file(ppt[y],"test_data_02S.csv",1,',','"');
        }
        if(u==0)
        {show(ppt[NN-1],10,NULL,0);}

        wprintf(L"1-----------\n\r");
        
        for(int y=0;y<NN;y++)
        {
            
            int res_conv = -1;
            res_conv=conver_to_num(ppt[y],0,L'.');
            res_conv=conver_to_num(ppt[y],1,L'.');
            /*
            res_conv=conver_to_num(ppt[y],4,L'.');
            res_conv=conver_to_num(ppt[y],7,L'.');
            res_conv=conver_to_num(ppt[y],10,L'.');
            res_conv=conver_to_num(ppt[y],13,L'.');
            res_conv=conver_to_num(ppt[y],16,L'.');
            res_conv=conver_to_num(ppt[y],19,L'.');
            res_conv=conver_to_num(ppt[y],22,L'.');
            res_conv=conver_to_num(ppt[y],25,L'.');
            res_conv=conver_to_num(ppt[y],28,L'.');

            */
            //wprintf(L"res[%d]: %d\n\r",y,res_conv);
        }
        if(u==0)
        {show(ppt[NN-1],10,NULL,0);}

        for(int y=0;y<NN;y++)
        {
            drop_tbl(&(ppt[y]));
        }
        free(ppt);
    }
    return 0;

    //srand(time(NULL));
    srand(2);
    //setlocale(LC_ALL, "en_US.utf8");
    wchar_t ss[300];
    wcscpy(ss,L"--ABCDEФ1234");

    int mm=5;
    //swscanf(ss, L"c_%d_ABCDEФ", mm);
    //sprintf(ss,L"%d", mm);
    swprintf(ss, 300, L"%d", mm);

    wprintf(L"start\n\r");
    
    clock_t t1 = clock(), t2, ts1a, ts2a, ts1b, ts2b;
    float time1, time1a_s, time1b_s;


    //int ww=200;
    int c=0;
    int z =200; //50000000;
    //int z2=200;

    int rr=0;
    ptb *tt=NULL;

    tt= create_tbl();
    wprintf(L"rr=[%d]\n\r",z);

    //rr=add_col(tt,1,1);
    rr=add_col(tt,4,1);
    rr=add_col(tt,2,2);

    rr=add_rows(tt,z);

    c=tt->cq;

    int *arr_i=NULL;
    arr_i=(int *)malloc((sizeof(arr_i[0]))*z);
    double *arr_rnd=NULL;
    arr_rnd=(double *)malloc((sizeof(arr_rnd[0]))*z);
    int mr=0;

    for(int m=0;m<c;m++)
    {
        wchar_t cnn[256];
        swprintf(cnn, 300, L"C_%d", m);
        set_col_name(tt, m, cnn);
        wchar_t ffs[300];
        double vd=0;
        //vd = rand();
        if(m==4)
        {
            wcscpy(ffs, L"%d_X_%d");
        }
        else
        {
            wcscpy(ffs, L"ABCDEФ_M%d_N%d");
            //vd=m*1000000+n;
        }
        if(((tt->cc)+m)->vt==1)
        {
            
            for(int n=0; n<z; n++)
            {
                //vd = rand();
                if(mr==0)
                {
                    *(arr_rnd+n)=rand();
                }
                if(m==0)
                {
                    vd=n;
                }
                else if(m==3)
                {
                    vd=*(arr_rnd+n);
                    int rn1=rand();
                    if(rn1>RAND_MAX/4*2)
                    {
                        vd=-vd+0.0001;
                    }
                }
                else if(m==-2)
                {
                    vd = rand();
                }
                else if(m==-3)
                {
                    vd=m*1000000+n;
                }
                else if(m==1)
                {
                    double bb=3.0;
                    
                    double n1=round(bb*((*(arr_rnd+n))/bb-floor((*(arr_rnd+n))/bb)));
                    vd=n1;
                }
                else if(m==2)
                {
                    double bb=6.0;
                    double n1=round(bb*((*(arr_rnd+n))/bb-floor((*(arr_rnd+n))/bb)));
                    vd=n1;
                    
                }
                else
                {
                    vd=m*1000000+n;
                }
                set_cell_dbl(tt, m, n, vd,0);
            }
            mr=1;
        }
        else if(((tt->cc)+m)->vt==2)
        {
            for(int n=0; n<z; n++)
            {
                wchar_t sss[300];
                swprintf(sss, 300, ffs, m,n);
                set_cell_str(tt, m, n, sss,0);
            }
        }
    }
    free(arr_rnd);
    //set_cell_str(tt, 2, 2, L"ABCDEФ1234");

    ((tt->cc)+0)->sort_id=15;
    //((tt->cc)+1)->sort_id=20;
    //((tt->cc)+2)->sort_id=17;
    refr_sort_mask(tt);

      

    pvt *s_arr=NULL;
    
    
    free(s_arr);
    
    
    ((tt->cc)+0)->sort_id=0;
    ((tt->cc)+1)->sort_id=2;

    refr_sort_mask(tt);

    int *arr=NULL;
    arr=(int *)malloc((sizeof(arr[0]))*5);
    arr[0]=1;
    arr[1]=4;
    arr[2]=4;
    arr[3]=0;
    arr[4]=2;
    
    
    int srt[4][3]={{1,1,1},{0},{2}};
    
    wprintf(L"TBL: -----------\n\r");
    
    set_null_cell(tt, 2, 4, 1);
    set_null_cell(tt, 1, 6, 1);
    set_null_cell(tt, 3, 5, 1);
    set_null_cell(tt, 4, 7, 1);

    //wprintf(L"1-----------\n\r");
    set_sorts(tt,srt[0],3);
    show(tt,20,NULL,0);

    wchar_t *ps=NULL;
    rr=get_cell_str(tt,5,1,&ps);
/*
    wchar_t fname[]=L"tbl_file";
    //save_to_file(tt,fname);

    tts mmt;
    mmt.field1=15;
    mmt.field2=16.6;
    //wcscpy(mmt.field3, L"ABCФ");
    //mmt.field4=(wchar_t*)malloc(sizeof(wchar_t)*4);
    //wcscpy(mmt.field4, L"ABCЙ");

    FILE *fp;
    char name[256]; // = "my.txt";
    wcstombs(name, fname, 255);
    char buff[1024];
    if ((fp = fopen(name, "w")) == NULL)
    {
        wprintf(L"Не удалось открыть файл");
        getwchar();
    }

    char *ppp1=NULL;
    wchar_t *pp1=NULL;
    wchar_t *pp2=NULL;
    ppp1=(char*)malloc(sizeof(char)*4);
    pp1=(wchar_t*)malloc(sizeof(wchar_t)*4);
    pp2=(wchar_t*)malloc(sizeof(wchar_t)*4);
    strcpy(ppp1,"ABCD");
    wcscpy(pp1, L"ABCФ");
    wcscpy(pp2, L"ABCЙ");
    //rr=fwrite(&mmt,sizeof(mmt),1,fp);

    //rr=fwrite(pp1,sizeof(wchar_t),4,fp);
    
    wcstombs(buff, pp1, 255);
    int len=strlen(buff);
    rr=fwrite(buff,1,len,fp);
    */
    /*wcstombs(buff, pp2, 255);
    rr=fwrite(pp2,sizeof(buff),4,fp);
    */
    // открыть файл удалось
    // требуемые действия над данными
    /*
    fclose(fp);

    //free(mmt.field4);
    free(ppp1);
    mmt.field4=NULL;
    free(pp1);
    pp1=NULL;
    free(pp2);
    pp2=NULL;

    FILE *fp2;
    if ((fp2 = fopen(name, "r")) == NULL)
    {
        wprintf(L"Не удалось открыть файл");
        getwchar();
    }
    char *ppo1=NULL;
    //ppo1=(char*)malloc(sizeof(char)*4);
    //rr=fread(ppo1,sizeof(char),4,fp2);
    //printf("F2------ %s\n\r",ppo1);
    wchar_t *po1=NULL;
    wchar_t *po2=NULL;
    //tts mmt2;
    //mmt2.field1=0;
    //mmt2.field2=0;

    //mmt2.field4=NULL;

    //wcscpy(mmt2.field3, L"ABCФ");

    //rr=fread(&mmt2,sizeof(mmt2),1,fp2);
    wchar_t pps[100];
    
    po1=(wchar_t*)malloc(sizeof(wchar_t)*4);
    //po2=(wchar_t*)malloc(sizeof(wchar_t)*4);

    rr=fread(buff,1,32,fp2);
    mbstowcs(po1, buff, 255);
    //rr=fread(buff,sizeof(buff),4,fp2);
    //mbstowcs(po2, buff, 255);
    fclose(fp2);

    wprintf(L"F1------ %ls\n\r",po1);
    //wprintf(L"F2------ %ls\n\r",po2);

    free(po1);
    po1=NULL;
    */
    //free(po2);
    //po2=NULL;

    //free(mmt2.field4);
    //mmt2.field4=NULL;
    //free(ppo1);




    //wprintf(L"2-----------\n\r");
    
    tsrt m_tsrt[]= {{1,0,0},{2,0,0}}; //,{3,0,1}};//{{3,0,1}};
    ts1a = clock();
    int *ssrt=NULL;
    ssrt=get_sort(tt, m_tsrt ,2);
    ts2a = clock();
    
    wprintf(L"\n\rsorting: ----------\n\r");
    show(tt,20,ssrt,tt->zq);
    
    wprintf(L"\n\rgrouping: ----------\n\r");
    ts1b = clock();
    //pvtb *mtg=NULL;
    //mtg = group1(tt,(int[]){1,2},2,(tsrt[]){{3,200,0},{4,300,0}}, 2);
    //mtg = group1(tt,(int[]){1,2},2,(tsrt[]){{5,100,0},{5,101,0},{5,200,0},{5,300,0},{5,400,0}}, 5);
    //mtg = group1(tt,(int[]){1,2},1,(tsrt[]){{2,100,0},{2,101,0},{2,200,0},{2,300,0},{2,400,0},{2,500,0},{2,501,0}}, 7);
/*  mtg = group1(tt
    ,(int[]){1,2},1
    ,(tsrt[]){{3,100,0},{3,101,0},{3,200,0},{3,300,0},{3,400,0},{3,500,0},{3,501,0}}, 7);
*/

    mtg = group1(tt,ssrt
    ,(int[]){1,2},2
    ,(tsrt[]){{3,100,0},{3,101,0},{3,400,0},{3,500,0},{4,200,0}}, 5);

    ts2b = clock();
    //show(*(mtg->pptb+0),20,NULL,0);
    show_v(mtg,20,NULL,0);

    ts2b = clock();
    free(arr);

    wprintf(L"-----------\n\r");


    wprintf(L"-----------\n\r");


    drop_tbl(&tt);
    //free(arr_i);

    t2 = clock();
    time1 = ( 1.f * ( t2 - t1 ) ) / CLOCKS_PER_SEC * 1000;
    time1a_s = ( 1.f * ( ts2a - ts1a ) ) / CLOCKS_PER_SEC * 1000;
    time1b_s = ( 1.f * ( ts2b - ts1b ) ) / CLOCKS_PER_SEC * 1000;
    wprintf(L"end, executed in %.2f ms\n\r", time1 );
    wprintf(L"(sorting  in %.2f ms)\n\r", time1a_s );
    wprintf(L"(grouping in %.2f ms)\n\r", time1b_s );

    sleep(1);

    wprintf(L"exit\n\r");
    free(ssrt);
    drop_vtbl(mtg);
    //free(mtg);

    return 0;
}

