#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <wchar.h>

#define GLOBAL_ID_INCREMENT 100

struct queue_elem{     //one queue element
    int id;
    int addr_to;
    wchar_t msg1[256];
    void *m_obj;
    int curr_id;
    int use;
};
typedef struct queue_elem qe;

struct queue{     //exemplar of queue
    qe *que;
    int len_que;
    int curr_off;
};
typedef struct queue que;

int max_global_id=0;

int create_new_id()
{
    max_global_id=max_global_id + GLOBAL_ID_INCREMENT;
    return max_global_id;
}

que * start_queue(int q_len)
{
    que *m_que=NULL;
    int incr=q_len==0?20:q_len;
    m_que=(que *)malloc(sizeof(que));
    m_que->que= (qe *)malloc(sizeof(qe)*incr);
    m_que->len_que=incr;
    m_que->curr_off=0;
    for(int i=0; i<incr; i++)
    {
        ((m_que->que)+i)->m_obj=NULL;
        ((m_que->que)+i)->use=0;
    }
    return m_que;
}
void drop_que(que **m_que)
{
    if(*m_que!=NULL)
    {
        if(((*m_que)->que)!=NULL)
        {
            free(((*m_que)->que));
        }
        free(*m_que);
        (*m_que)=NULL;  
    }
}
void assign(qe * p_elem,qe *p_elem_src)
{
    p_elem->addr_to=p_elem_src->addr_to;
    p_elem->curr_id=p_elem_src->curr_id;
    p_elem->id=p_elem_src->id;
    p_elem->m_obj=p_elem_src->m_obj;
    wcscpy(p_elem->msg1,p_elem_src->msg1);
}

int put_elem(que *p_que, qe *p_elem)
{
    for(int i=p_que->curr_off; i<p_que->len_que; i++)
    {
        if(((p_que->que)+i)->use==0)
        {
            ((p_que->que)+i)->use=1;
            assign(((p_que->que)+i),p_elem);
        }
    }
    for(int i=0; i<p_que->curr_off; i++)
    {
        if(((p_que->que)+i)->use==0)
        {
            ((p_que->que)+i)->use=1;
            assign(((p_que->que)+i),p_elem);
        }
    }
    return 0;
}
int get_elem_byid(que *p_que, qe *p_elem, int addr_to, int del)
{
    int nn=-1;
    int mm1=-1;
    int mm2=-1;
    int ii=-1;
    for(int i=p_que->curr_off; i<p_que->len_que; i++)
    {
        if(((p_que->que)+i)->use==1&&((p_que->que)+i)->addr_to==addr_to)
        {
            ii=i;
            break;
        }
    }
    for(int i=0; i<p_que->curr_off; i++)
    {
        if(((p_que->que)+i)->use==1&&((p_que->que)+i)->addr_to==addr_to)
        {
            ii=i;
            break;
        }
    }
    if(ii>=0)
    {
        ((p_que->que)+ii)->use=1;
        assign(p_elem,((p_que->que)+ii));
        //assign(((p_que->que)+i),q_elem);
        if(del==1)
        {
            ((p_que->que)+ii)->use=0;
            nn=-1;
            mm1=-1;
            mm2=-1;
            for(int n=ii;n<p_que->len_que;n++)
            {
                if(((p_que->que)+n)->use==0)
                {
                    nn=n;
                    mm1=-1;
                    mm2=-1;
                    for(int m=nn;m<p_que->len_que;m++)
                    {
                        if(((p_que->que)+m)->use==1&&mm1<0&&mm2<0)
                        {
                            mm1=m;
                        }
                        if(((p_que->que)+m)->use==1&&mm1>=0&&mm2<0)
                        {
                            mm2=m;
                        }
                        if(m==(p_que->len_que-1) && mm1<0)
                        {
                            n=p_que->len_que;
                            break;
                        }
                        if(mm1>=0&&mm2>=0&&((p_que->que)+m)->use==0)
                        {
                            for(int j=mm1;j<=mm2;j++)
                            {
                                assign(((p_que->que)+(nn+j-mm1)),((p_que->que)+j));
                                ((p_que->que)+j)->use=0;
                            }
                            n=m-1;
                            break;
                        }
                    }
                }
            }
            //((p_que->que)+ii)->use=0;
        }
    }
    return 0;
}