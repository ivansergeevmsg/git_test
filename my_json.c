#pragma once
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "utils.c"

struct json_table_row{     
    char key[256];
    char val[1024];
    int type_;
};
typedef struct json_table_row js_row;

void get_js_data(char *src, js_row *data,int js_buf_len, int *js_len)
{
    //printf("%s\n\r",src);
    int kk=0;
    for(kk=0;kk<js_buf_len;kk++)
    {
        (data)[kk].key[0]='\0';
        (data)[kk].val[0]='\0';
        (data)[kk].type_=0;
    }
    kk=0;

    char loc_key[256] ={'\0',};
    char loc_val[1024]={'\0',};
    
    int L=strlen(src);
    int err=0;
    int sm1=0;
    int sn1=0;
    int sn2=0;
    int snd=0;
    int sc =0;
    for(int i=0; i<L; i++)
    {
        if(src[i]=='"')
        {
            if(sm1==0)
            {
                sm1=1;
                loc_key[0]='\0';
                loc_val[0]='\0';
            }
            else if(sm1==1)
            {
                if(sc==1)
                {
                    strncat(loc_key,&(src[i]),1);
                    sc=0;
                }
                else
                {
                    sm1=2;
                    strcpy((data)[kk].key,loc_key);
                }
            }
            else if(sm1==2)
            {
                err=1;
            }
            else if(sm1==3)
            {
                sn1=0;
                sm1=4;
                //loc_key[0]='\0';
                loc_val[0]='\0';
            }
            else if(sm1==4)
            {
                if(sn1==1)
                {
                    err=1;
                }
                else
                {
                    if(sc==1)
                    {
                        strncat(loc_val,&(src[i]),1);
                        sc=0;
                    }
                    else
                    {
                        sm1=5;
                        strcpy((data)[kk].val,loc_val);
                        (data)[kk].type_=2;
                        kk++;
                    }
                }
            }
            else if(sm1==5)
            {
                err=1;
            }

        }
        else if(src[i]=='\\')
        {
            if(sm1==1)
            {
                if(sc==1)
                {
                    strncat(loc_key,&(src[i]),1);
                    sc=0;
                }
                else
                {
                    sc=1;
                }
            }
            else if(sm1==4)
            {
                if(sn1==1)
                {
                    err=1;
                }
                else
                {
                    if(sc==1)
                    {
                        strncat(loc_val,&(src[i]),1);
                        sc=0;
                    }
                    else
                    {
                        sc=1;
                    }
                }
            }
            else
            {
                err=1;
            }
        }
        else if(src[i]==':')
        {
            if(sm1==1)
            {
                strncat(loc_key,&(src[i]),1);
            }
            else if(sm1==4)
            {
                if(sn1==1)
                {
                    err=1;
                }
                else
                {
                    strncat(loc_val,&(src[i]),1);
                }
            }
            else if(sm1==2)
            {
                sm1=3;
            }
            else
            {
                err=1;
            }
        }
        else if(src[i]==',')
        {
            if(sm1==1)
            {
                strncat(loc_key,&(src[i]),1);
            }
            else if(sm1==4)
            {
                if(sn1==1)
                {
                    sm1=0;
                    /*
                    if(!strcmp(key, loc_key))
                    {
                        strcpy(data,loc_val);
                        break;
                    }
                    */
                    strcpy((data)[kk].val,loc_val);
                    (data)[kk].type_=1;
                    kk++;
                }
                else
                {
                    strncat(loc_val,&(src[i]),1);
                }
            }
            else if(sm1==5)
            {
                sm1=0;
            }
            else
            {
                err=1;
            }
        }
        else 
        {
            if(sm1==1)
            {
                strncat(loc_key,&(src[i]),1);
            }
            else if(sm1==4)
            {
                if(sn1==0)
                {
                    strncat(loc_val,&(src[i]),1);
                }
                else
                {
                    if(sn2==1)
                    {
                        if(src[i]=='.'&&snd==0)
                        {
                            strncat(loc_val,&(src[i]),1);
                            snd=1;
                        }
                        else if(src[i]=='0'||src[i]=='1'||src[i]=='2'||src[i]=='3'||src[i]=='4'||src[i]=='5'||src[i]=='6'||src[i]=='7'||src[i]=='8'||src[i]=='9')
                        {
                            strncat(loc_val,&(src[i]),1);
                        }
                        else if(src[i]==' ')
                        {
                            sn2=2;
                        }
                        else if(src[i]=='}')
                        {
                            sm1=5;
                            /*
                            if(!strcmp(key, loc_key))
                            {
                                strcpy(data,loc_val);
                                break;
                            }
                            */
                            strcpy((data)[kk].val,loc_val);
                            (data)[kk].type_=1;
                            kk++;
                            break;
                        }
                        else
                        {
                            err=1;
                        }
                    }
                    else if(sn2==2)
                    {
                        if(src[i]==' ')
                        {
                            sn2=2;
                        }
                        else
                        {
                            err=1;
                        }
                    }
                }
            }
            else if(sm1==3)
            {
                if(src[i]=='-'||src[i]=='0'||src[i]=='1'||src[i]=='2'||src[i]=='3'||src[i]=='4'||src[i]=='5'||src[i]=='6'||src[i]=='7'||src[i]=='8'||src[i]=='9')
                {
                    loc_val[0]='\0';
                    strncat(loc_val,&(src[i]),1);
                    sm1=4;
                    sn1=1;
                    sn2=1;
                    snd=0;
                }
            }
            else if(sm1==5 && src[i]=='}')
            {
                /*
                if(!strcmp(key, loc_key))
                {
                    strcpy(data,loc_val);
                    break;
                }*/
                strcpy((data)[kk].val,loc_val);
                (data)[kk].type_=1;
                kk++;
                break;
            }
            else
            {
                if(src[i]==' ')
                {
                    ;
                }
                else if(src[i]=='{'&&sm1==0)
                {
                    ;
                }
                else if(src[i]=='}'&&sm1==0)
                {
                    ;
                }
                else
                {
                    err=1;
                }

            }
        }
        /*
        if(sm1==2)
        {
            err=err;
        }
        else if(sm1==5)
        {
            if(!strcmp(key, loc_key))
            {
                strcpy(data,loc_val);
                break;
            }
            err=err;
        }
        */
        if(err==1)
        {
            break;
        }
    }
    *js_len=kk;
    /*
    if(!strcmp(key, loc_key))
    {
        strcpy(data,loc_val);
    }
    */
}
int get_int(js_row *data, char *key, int *val)
{
    char c_val[256]={'\0',};
    int ret=-1;
    for(int i=0;i<128;i++)
    {
        if(data[i].type_==0)
        {
            break;
        }
        if(!strcmp(data[i].key,key))
        {
            ret=i;
            strcpy(c_val,data[i].val);
            *val=atoi(c_val);
            //*val=(data[i].val);
            break;
        }
    }
    return ret;
}
int get_dbl(js_row *data, char *key, double *val)
{
    char c_val[256]={'\0',};
    int ret=-1;
    for(int i=0;i<128;i++)
    {
        if(data[i].type_==0)
        {
            break;
        }
        if(!strcmp(data[i].key,key))
        {
            ret=i;
            strcpy(c_val,data[i].val);
            *val=atof(c_val);
            //*val=(data[i].val);
            break;
        }
    }
    return ret;
}
int get_str(js_row *data, char *key, char **val)
{
    int ret=-1;
    for(int i=0;i<128;i++)
    {
        if(data[i].type_==0)
        {
            break;
        }
        if(!strcmp(data[i].key,key))
        {
            ret=i;
            *val=(data[i].val);
            break;
        }
    }
    return ret;
}
int get_str_n(js_row *data, char *key, char *val)
{
    int ret=-1;
    for(int i=0;i<128;i++)
    {
        if(data[i].type_==0)
        {
            break;
        }
        if(!strcmp(data[i].key,key))
        {
            if(!strcmp(data[i].val,val))
            {
                ret=i;
            }
            break;
        }
    }
    return ret;
}

void pack_js_data(char *dest, js_row *data, int js_len)
{
    int L=js_len==0 ? 128 : js_len;
    //memset(dest,0,sizeof(js_row)*L);
    dest[0]='{';
    for(int i=0;i<L;i++)
    {
        if(data[i].type_==0)
        {
            break;
        }
        if(i>0)
        {
            strcat(dest,",");
        }
        strcat(dest,"\"");
        strcat(dest,data[i].key);
        strcat(dest,"\":");
        if(data[i].type_==1)
        {
            strcat(dest,data[i].val);
        }
        else if(data[i].type_==2)
        {
            strcat(dest,"\"");
            json_sh_cat(dest,data[i].val);
            strcat(dest,"\"");
        }
    }
    strcat(dest,"}");
    strcat(dest,"\0");
    //int N=strlen(dest);
    //dest[N]='}';
    //dest[N+1]='\0';
}
void show_json(js_row *js_data)
{
//  {"type":"message","text":"json_\"msg_\\ABCФBC","id":555,"date":1680174275359}
    //char ret[1024];
    //char *inp="{\"type\":\"message\",\"text\":\"json_\\\"msg_\\\\ABCФBC\",\"id\":555,\"date\":1680174275359}";
    int L=128;
    if(L==0)
    {
        printf("empy or bad JSON\n\r");
    }
    for(int i=0;i<L;i++)
    {
        if(js_data[i].type_==0)
        {
            break;
        }
        else
        {
            printf("%s : %s [%d]\n\r",js_data[i].key,js_data[i].val,js_data[i].type_);
        }
    }
    /*
    get_str(inp, "type", ret);
    printf("%s : %s\n\r","type",ret);
    get_str(inp, "text", ret);
    printf("%s : %s\n\r","text",ret);
    get_str(inp, "id", ret);
    printf("%s : %s\n\r","id",ret);
    get_str(inp, "date", ret);
    printf("%s : %s\n\r","date",ret);
    strcpy(ret, inp);
    */
}
int test_json(char *inp)
{
    int L=0;
    js_row js_data[128];
    get_js_data(inp, js_data, 128, &L);
    show_json(js_data);
    return 0;
}