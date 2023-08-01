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

#include "main_proc.c"
#include "test_http.h"
#include "http_data.c"
#include "post_list.h"
#include "utils.c"
#include "tbl.c"

extern ptb *p_glob_t;

extern ssize_t write2(int _fd, const void *buf, size_t _n);
extern void make_header(char *dest, char *MIME, int m_size, int m_cash, int m_conn);

/*
void test_func(int pid,int client_fd)
{
    char data_out[256] = "ФЙЙ; xx=";
    
    //strcat(data_out,p_m->param_vals[0]);
    int len_data_out=strlen(data_out);

    sleep(10);

    write(client_fd, response0, sizeof(response0) - 1);
    write(client_fd, data_out, sizeof(*data_out)*len_data_out);
    //write(client_fd, responseE, sizeof(responseE) - 1);
    //free(err_out);

    
    close(client_fd);
    
}
*/
int http_list(int pid,int client_fd,struct parse_ret *p_m)
{
    int ret=0;
    if(p_m->qc==0)
    {
        ;
    }
    else
    {
        if(pid<0)
        {
            ;
        }
        if(!strcmp(p_m->path_chain[0], "page_001"))
        {
            char dbuf[64]="; dd=";
            char data_out[256] = "ФЙЙ; xx=";
    
            strcat(data_out,p_m->param_vals[0]);
            strcat(data_out,dbuf);
            double dd=atof(p_m->param_vals[0]);
            dd=dd/100.0;
            //char dbuf[64];
            //sprintf(dbuf,"; dd=%f", dd);
            //str_0_trim(dbuf,dd,',');
            strcat(data_out,dbuf);

            //sleep(10);

            int len_data_out=strlen(data_out);
            write(client_fd, response0, sizeof(response0) - 1);
            write(client_fd, data_out, sizeof(*data_out)*len_data_out);
            //write(client_fd, responseE, sizeof(responseE) - 1);
            ret=1;
        }
        if(!strcmp(p_m->path_chain[0], "view_tbl_001"))
        {
            
            int N=10;
            int M=5;
            char data_out[2048] = {'\0',};
            
            char buf[1024]={'\0',};
            int len_data_out=0;
            //usleep(500000);
            write2(client_fd, response0, sizeof(response0) - 1);
            write2(client_fd, "\n\r", sizeof("\n\r") - 1);
            if(!strcmp(p_m->bufr1[0], "GET"))
            {
                strcat(data_out,"<!DOCTYPE html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><title>");
                strcat(data_out,p_m->path_chain[0]);
                strcat(data_out,"</title></head><body>");
            }
            strcat(data_out,"<table border=1>");

            for(int n=0; n<N; n++)
            {
                strcat(data_out,"<tr>");
                strcat(data_out,"<td>");
                sprintf(buf,"%d",n);
                strcat(data_out,buf);
                strcat(data_out,"</td>");
                for(int m=0; m<M; m++)
                {
                    
                    strcat(data_out,"<td>");
                    sprintf(buf,"C_%d_%d",m,n);
                    strcat(data_out,buf);
                    strcat(data_out,"</td>");
                    //buf[1024]={'\000',};
                    memset(buf,'\0',sizeof(buf));
                }
                strcat(data_out,"</tr>");
                len_data_out=strlen(data_out);
                write2(client_fd, data_out, sizeof(*data_out)*len_data_out);
                data_out[0]='\0';
            }
            data_out[0]='\0';
            strcat(data_out,"</table>");

            if(!strcmp(p_m->bufr1[0], "GET"))
            {
                strcat(data_out,"</body></html>");
            }

            len_data_out=strlen(data_out);
            write2(client_fd, data_out, sizeof(*data_out)*len_data_out);

            if(!strcmp(p_m->bufr1[0], "GET"))
            {
                write2(client_fd, responseE, sizeof(responseE) - 1);
            }

            ret=1;
        }
        if(!strcmp(p_m->path_chain[0], "view_tbl_002"))
        {

            ptb *pmt=p_glob_t;
            
            /*
            pmt = create_tbl();
            read_csv_file(pmt,L"test_data_02W.csv",1,L',',L'"');
            
            int res_conv = -1;
            res_conv=conver_to_num(pmt,0,L'.');
            res_conv=conver_to_num(pmt,1,L'.');
            if(res_conv)
            {
                ;
            }
            */
            //show(pmt,10,NULL,0);

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
            wchar_t data_out[2048] = L"";
            char buf[1024]={'\0',};
            wchar_t wbuf[1024]={'\0',};
            wchar_t wbuf2[1024]={'\0',};
            int len_data_out=0;
            //usleep(500000);
            write2(client_fd, response0, sizeof(response0) - 1);
            write2(client_fd, "\n\r", sizeof("\n\r") - 1);

            if(!strcmp(p_m->bufr1[0], "GET"))
            {
                wcscat(data_out,L"<!DOCTYPE html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><title>");
                mbstowcs(wbuf, p_m->path_chain[0], 2048);
                wcscat(data_out,wbuf);
                wcscat(data_out,L"</title></head><body>");
            }
            wcscat(data_out,L"<table border=1>");

            if(pmt!=NULL)
            {
                
            

                if(wcslen(((pmt->cc)+0)->cname )>0)
                {
                    wcscat(data_out,L"<tr>");
                    wcscat(data_out,L"<td>");
                    //sprintf(buf,"%d",n);
                    //swprintf(wbuf2, 1024, L"%d", n);
                    //wcscat(data_out,wbuf2);
                    wcscat(data_out,L"</td>");            
                    for(int m=0; m<M; m++)
                    {
                        
                        wcscat(data_out,L"<td>");
                        //get_cell_sval(pmt,m,n,wbuf,L',',12);

                        //pmt->
                        //sprintf(buf,"C_%d_%d",m,n);
                        wcscat(data_out,((pmt->cc)+m)->cname);
                        wcscat(data_out,L"</td>");
                        memset(wbuf,'\0',sizeof(wbuf));
                    }
                    wcscat(data_out,L"</tr>");
                    wcstombs(buf, data_out, 2048);
                    len_data_out=strlen(buf);
                    write2(client_fd, buf, sizeof(*buf)*len_data_out);
                    data_out[0]=L'\0';
                }

                for(int n=0; n<N; n++)
                {
                    wcscat(data_out,L"<tr>");
                    wcscat(data_out,L"<td>");
                    //sprintf(buf,"%d",n);
                    swprintf(wbuf2, 1024, L"%d", n);
                    wcscat(data_out,wbuf2);
                    wcscat(data_out,L"</td>");
                    for(int m=0; m<M; m++)
                    {
                        
                        wcscat(data_out,L"<td>");
                        get_cell_sval(pmt,m,n,wbuf,L',',12);
                        //pmt->
                        //sprintf(buf,"C_%d_%d",m,n);
                        wcscat(data_out,wbuf);
                        wcscat(data_out,L"</td>");
                        memset(wbuf,'\0',sizeof(wbuf));
                    }
                    wcscat(data_out,L"</tr>");
                    wcstombs(buf, data_out, 2048);
                    len_data_out=strlen(buf);
                    write2(client_fd, buf, sizeof(*buf)*len_data_out);
                    data_out[0]=L'\0';
                }
                data_out[0]=L'\0';
                wcscat(data_out,L"</table>");
                if(!strcmp(p_m->bufr1[0], "GET"))
                {
                    wcscat(data_out,L"</body></html>");
                }

                wcstombs(buf, data_out, 2048);
                len_data_out=strlen(buf);
                write2(client_fd, buf, sizeof(*buf)*len_data_out);

                //drop_tbl(&pmt);
            }
            if(!strcmp(p_m->bufr1[0], "GET"))
            {
                write2(client_fd, responseE, sizeof(responseE) - 1);
            }
            ret=1;
        }
    }
    
    //close(client_fd);
    return ret;
    
}