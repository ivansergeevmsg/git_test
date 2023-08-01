#pragma once
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <wchar.h>

void str_0_trim(wchar_t* dest, double v, wchar_t d, int mq)
{
    wchar_t buf[128]={'\0',};
    swprintf(buf,128, L"%0.*f",mq, v);
    int ls=wcslen(buf);
    int P=0;
    int t=0;
    int t1=0;
    for(register int i=ls-1; i>=0; i--)
    {
        if(t==0&&buf[i]!='0')
        {
            //P=i-1;
            t=1;
            if(buf[i]!=L'.')
            {
                dest[i]=buf[i];
                dest[i+1]='\0';
                t1=1;
            }
            //break;
        }
        else if(t==1)
        {
            if(buf[i]==L'.')
            {
                dest[i]=d;
                if(t1==0)
                {
                    dest[i+1]='\0';
                    t1=1;
                }
            }
            else
            {
                dest[i]=buf[i];
                if(t1==0)
                {
                    dest[i+1]='\0';
                    t1=1;
                }
            }
        }
    }
    if(t1==0)
    {
        dest[0]='\0';
    }
}

void json_sh_cat(char *dest,char *src)
{
    char *s_curr1=NULL;
    char *s_curr2=NULL;
    char *s_curr3=NULL;
    char *s_curr4=NULL;
    char *s_curr5=NULL;
    s_curr1=strchr(src,'"');
    s_curr2=strchr(src,'\\');
    s_curr3=strchr(src,'\n');
    s_curr4=strchr(src,'\r');
    s_curr5=strchr(src,'\t');
    if(s_curr1 || s_curr2 || s_curr3 || s_curr4 || s_curr5)
    {
        int LL=strlen(src);
        //strcat(dest,"\"");
        for(register int k=0; k<LL; k++)
        {
            if(src[k]=='"' || src[k]=='\\')
            {
                strcat(dest,"\\");
                strncat(dest,&(src[k]),1);
            }
            else if(src[k]=='\n')
            {
                strcat(dest,"\\n");
            }
            else if(src[k]=='\r')
            {
                strcat(dest,"\\r");
            }
            else if(src[k]=='\t')
            {
                strcat(dest,"\\t");
            }
            else
            {
                strncat(dest,&(src[k]),1);
            }
            
            //s_curr=strchr(s_curr,'"');
        }
    }
    else
    {
        strcat(dest,src);
    }
}

void html_sh_cat(char *dest,char *src)
{
    char *s_curr1=NULL;
    char *s_curr2=NULL;
    char *s_curr3=NULL;
    char *s_curr4=NULL;
    char *s_curr5=NULL;
    char *s_curr6=NULL;
    s_curr1=strchr(src,'"');
    s_curr2=strchr(src,'\\');
    s_curr3=strchr(src,'\'');
    s_curr4=strchr(src,'&');
    s_curr5=strchr(src,'<');
    s_curr6=strchr(src,'>');
    if(s_curr1 || s_curr2 || s_curr3 || s_curr4 || s_curr5 || s_curr6)
    {
        int LL=strlen(src);
        //strcat(dest,"\"");
        for(register int k=0; k<LL; k++)
        {
            if(src[k]=='"')
            {
                strcat(dest,"&quot;");
            }
            else if(src[k]=='\\')
            {
                strcat(dest,"&#x2F;");
            }
            else if(src[k]=='\'')
            {
                strcat(dest,"&#39;");
            }
            else if(src[k]=='&')
            {
                strcat(dest,"&amp;");
            }
            else if(src[k]=='<')
            {
                strcat(dest,"&lt;");
            }
            else if(src[k]=='>')
            {
                strcat(dest,"&gt;");
            }
            else
            {
                strncat(dest,&(src[k]),1);
            }
            
            //s_curr=strchr(s_curr,'"');
        }
    }
    else
    {
        strcat(dest,src);
    }
}