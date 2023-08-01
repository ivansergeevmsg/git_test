#pragma once
#include "ws.h"
#include <string.h>
#include "ws_list.c"
//#include "hashs.c"

char patch_to_dir[ALLARRAY] = {0,};
char fpfile[ALLARRAY] = {0,};
char buffer[BUFSIZE] = {0,};
int client_fd, count_warning_log =0;
struct stat stat_buf;

sem_t sem;

char response_ws[] = "HTTP/1.1 101 Switching Protocols\r\n"
"Upgrade: websocket\r\n"
"Connection: Upgrade\r\n"
"Sec-WebSocket-Accept: "; //97


////////////////////////////////////// error_log ////////////////////////////////////////////
void error_log(char *my_error) 
{ 
    time_t t;
    time(&t);
    FILE *f;
    f = fopen("app_logs/ErrorWsstd.log", "a"); //"/var/log/ErrorWsstd.log"
    if(f == NULL) printf("Error open /var/log/ErrorWsstd.log.\n");
    fprintf(f, "%s", ctime( &t));
    fprintf(f, "Error %s\n\n", my_error);
    printf("Error %s Write to /var/log/ErrorWsstd.log.\n", my_error);
    fclose(f);
    exit(0);
}


//////////////////////////////// warning_access_log ////////////////////////////////////////
void warning_access_log(char *war_ac) 
{  
    count_warning_log++;
    if(count_warning_log > 100)
    {
        system("gzip -f app_logs/Access_warning.log"); // /var/log/Access_warning.log"
        count_warning_log = 0;
        time_t t;
        time(&t);
        FILE *f;
        f = fopen("app_logs/Access_warning.log", "w"); //"/var/log/Access_warning.log"
        fprintf(f, "%s", ctime( &t));
        fprintf(f, "%s\n\n", war_ac);
        printf("_______________________________________\nWrite to /var/log/Access_warning.log...\n%s\n", war_ac);
        fclose(f);
    }
    else
    {
        time_t t;
        time(&t);
        FILE *f;
        f = fopen("app_logs/Access_warning.log", "a"); //"/var/log/Access_warning.log"
        fprintf(f, "%s", ctime( &t));
        fprintf(f, "%s\n\n", war_ac);
        printf("_______________________________________\nWrite to /var/log/Access_warning.log...\n%s\n", war_ac);
        fclose(f);
    }
}


//////////////////////////////// read_in_file ////////////////////////////////////////
void read_in_file(char *name_file) 
 { 
   off_t offset = 0;
   memset(&stat_buf, 0, sizeof(stat_buf));    
   memset(fpfile, 0, ALLARRAY);
   snprintf(fpfile, (int)strlen(patch_to_dir) + (int)strlen(name_file) + 1, "%s%s", patch_to_dir, name_file);
   int file = open(fpfile, O_RDONLY);

   if(file < 0) 
    {
      if(close(client_fd) == -1) warning_access_log("open file close client_fd.");
      warning_access_log("Not File."); 
    }
   else
    {
      if(fstat(file, &stat_buf) != 0) error_log("fstat.");
      if(sendfile(client_fd, file, &offset, stat_buf.st_size) == -1) warning_access_log("sendfile."); 
      if(close(file) == -1) error_log("close file.");
      if(close(client_fd) == -1) warning_access_log("in function read_in_file() - close client_fd.");
      warning_access_log(buffer);
      printf("Trans %s\n\n", name_file);
    }
 }

///////////////////////////////////////// send)TXT ///////////////////////////////////////////////////

int send_TXT_R(int client_fd, unsigned char *messag,int mode)
{
  int ret=0;
  //char messag[] = "istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru_istarik.ru";

  //int message_size1;
  unsigned short message_size2;
  unsigned long message_size_L = strlen((char*)messag);
  unsigned char *out_data = NULL; //[SW_BUF_127] = {0,};
  //unsigned char out_data[2048]= {0,};
  
  int shift = 2;
  if(message_size_L>=126 && message_size_L<=65535)
  {
    shift=4;
  }
  else if(message_size_L>65535)
  {
    shift=10;
  }
  out_data=(unsigned char *)malloc((message_size_L+shift+1)*sizeof(unsigned char));
  memset(out_data, 0, message_size_L+shift+1); 

  memcpy(out_data + shift, messag, message_size_L); // копируем сообщение в массив "out_data" начиная со "второго" байта (первые два байта для опкода и длины тела)

  //message_size = (unsigned char)message_size_L;

  out_data[0] = 0x81; // == 10000001 == FIN1......opcod 1 (текст)
  if(mode==1)
  {
    out_data[0] = 0x01;
  }
  if(mode==2)
  {
    out_data[0] = 0x00;
  }
  if(mode==3)
  {
    out_data[0] = 0x80;
  }
  if(message_size_L<126)
  {
    out_data[1] = (int)message_size_L;
  }
  else if(message_size_L>=126 && message_size_L<=65535)
  {
    message_size2=message_size_L;
    //out_data[0] = 0x81; // == 10000001 == FIN1......opcod 1 (текст)
    out_data[1] = 126; // пишем цифру 126, котороя в двоичном виде == 01111110, соответственно маска 0, остальные 7 бит == 126
    out_data[3] = message_size2 & 0xFF; // собираем длину сообщения
    out_data[2] = (message_size2 >> 8) & 0xFF; // собираем длину сообщения
  }
  else
  {
    out_data[1] = 127; // пишем цифру 127, котороя в двоичном виде == 01111111, соответственно маска 0, остальные 7 бит == 127
    out_data[9] = message_size_L & 0x00000000000000FF; // собираем длину сообщения
    out_data[8] = (message_size_L >> 8) & 0x00000000000000FF; // собираем длину сообщения
    out_data[7] = (message_size_L >> 16) & 0x00000000000000FF; // собираем длину сообщения
    out_data[6] = (message_size_L >> 24) & 0x00000000000000FF; // собираем длину сообщения
    out_data[5] = (message_size_L >> 32) & 0x00000000000000FF; // собираем длину сообщения
    out_data[4] = (message_size_L >> 40) & 0x00000000000000FF; // собираем длину сообщения
    out_data[3] = (message_size_L >> 48) & 0x00000000000000FF; // собираем длину сообщения
    out_data[2] = (message_size_L >> 56) & 0x00000000000000FF; // собираем длину сообщения
  }
  
  //printf("\nSize out Msg2: %ld\n", message_size_L);
  
  if(send(client_fd, out_data, message_size_L + shift, 0) == -1) // отправка
  {
    warning_access_log("Error Hi."); 
    if(close(client_fd) == -1) warning_access_log("Error close client in WS_5."); // закрываем соединение с клиентом
    {
      if(out_data)
      {
        free(out_data);
        out_data=NULL;
      }
      //pthread_exit(NULL); 
      
    }
    ret=-1;
  }

  if(out_data)
  {
    free(out_data);
    out_data=NULL;
  }

  return ret;

}

void send_TXT(int client_fd, unsigned char *messag,int mode)
{
  if(send_TXT_R(client_fd, messag,mode)<0)
  {
    pthread_exit(NULL); 
  }
}

int ws_reread(int fd, unsigned long payload_len, long int curr_rec_b,unsigned char *curr_buf, unsigned char **ret_buf)
{
  //unsigned char payload_127[SW_BUF_127] = {0,};
  int ret_gs=0;
  unsigned char masking_key[4] = {0,}; // сюда положим маску;
  long int curr_rec_b2=curr_rec_b;
  int sh=0;
  int dsh=6;
  if(payload_len>125 && payload_len<65536)
  {
    sh=2;
  }
  else if(payload_len>=65536)
  {
    sh=8;
  }
  dsh=dsh+sh;
  masking_key[0] = *(curr_buf+2+sh);
  masking_key[1] = *(curr_buf+3+sh);
  masking_key[2] = *(curr_buf+4+sh);
  masking_key[3] = *(curr_buf+5+sh);
  unsigned char inbuf[SW_BUF] = {0,};
  long int rec_req=payload_len+dsh;
  if(curr_rec_b > rec_req)
  {
    curr_rec_b2=rec_req;
    rec_req=0;
    ret_gs=curr_rec_b2;
  }
  else
  {
    rec_req=rec_req-curr_rec_b;
  }

  //m=cn+mn;
  //ret_buf=(unsigned char *)realloc(mt->cc,sizeof(unsigned char *)*m);
  //(*ret_buf)=(unsigned char *)calloc(payload_len,sizeof(unsigned char));
  (*ret_buf)=(unsigned char *)malloc((payload_len+1)*sizeof(unsigned char));
  memset((*ret_buf), 0, payload_len+1); 
  memset(inbuf, 0, SW_BUF); 

  for(int i=0; i<curr_rec_b2-dsh; i++)
  {
    (*((*ret_buf)+i))=(*(curr_buf+i+dsh))^masking_key[i % 4]; 
  }

  long int curr_p=curr_rec_b2-dsh;

  //while(rec_b_in-14<payload_len64)
  while(rec_req>0)
  {
    //long int curr_p=payload_len+14-rec_req;
    int need_read=rec_req<(SW_BUF - 1)?rec_req:(SW_BUF - 1);
    long int rec_b_in2 = read(fd, &inbuf, need_read);

    for(int i=0; i<rec_b_in2; i++)
    {
      //payload_127[+i+curr_p]=
      (*((*ret_buf)+i+curr_p))=inbuf[i]^masking_key[(i+curr_p) % 4]; 
    }
    memset(inbuf, 0, SW_BUF); 
    curr_p=curr_p+rec_b_in2;
    rec_req=rec_req-rec_b_in2;
  }
  return ret_gs;
}

void SHA1(unsigned char *hash_out, const char *str, unsigned int len);
void F_SHA1(unsigned char *hash_out, unsigned char *hash_in)
{
  //unsigned char ttt[1024]={0,};
  unsigned char temp[1024]={0,};
  //strncpy((char*)ttt,(char*)hash_in,512);
  SHA1(temp, (char*)hash_in, strlen((char*)hash_in));                                         //
  for(int i=0; i < SHA_DIGEST_LENGTH; i++)
  {
    sprintf((char*)&(hash_out[i*2]), "%02x", temp[i]);
  }
}


void do_ws(int client_fd, unsigned char *messag, int *p_thr_id)
{
  setlocale(LC_ALL, "en_US.utf8");
  ws_list(client_fd, messag, p_thr_id);
}

void close_ws_thread(int client_fd, int p_thr_id)
{
  send_stop(p_thr_id,client_fd);
  pthread_exit(NULL);
}


///////////////////////////////////////// ws_func ///////////////////////////////////////////////////
void * ws_func(void *client_arg) 
 { 
   int p_thr_id=-1;
   int gs=0;
   int client_fd = * (int *) client_arg;
   sem_post(&sem);
   //warning_access_log("START_WS");
   printf("\nClient ID - %d\n", client_fd);
   unsigned char inbuf[SW_BUF] = {0,};
   char reciv_r[48] = {0,};

   unsigned char * ret_data=NULL;
   long int rec_b = 0;
   while(1)
    {
      if(gs<=0)
      {
        rec_b = 0;
        memset(inbuf, 0, SW_BUF); 
        rec_b = read(client_fd, inbuf, SW_BUF - 1); // ожидаем данные от клиента и читаем их по приходу
      }
      else
      {
        if(rec_b<0)
        {
          rec_b=0;
        }
        for(int i=gs;i<rec_b;i++)
        {
          inbuf[i-gs]=inbuf[i];
        }
        inbuf[rec_b-gs]=0;
        rec_b = rec_b-gs;
      }
      memset(reciv_r, 0, 48);
      snprintf(reciv_r, 47, "%s%ld%s%d\n", "Ws_func recive ", rec_b, " bytes from clien ",  client_fd);
      //warning_access_log(reciv_r); // пишем событие в лог

      if(rec_b == 0 || rec_b == -1) // если клиент отвалился или что-то нехорошо, тогда...
       {
        send_stop(p_thr_id,client_fd);
         memset(reciv_r, 0, 48);
         snprintf(reciv_r, 47, "%s%ld%s%d\n", "Ws_func read return - ", rec_b, ", DIE clien - ",  client_fd);
         warning_access_log(reciv_r); // пишем ссобытие в лог
         if(close(client_fd) == -1) warning_access_log("Error close client in WS_1."); // закрываем соединение с клиентом
         close_ws_thread(client_fd,p_thr_id);
         //pthread_exit(NULL);
       } 

      if(rec_b > 0)  // если чё то получили, то ...                    
       { 
         unsigned char masking_key[4] = {0,}; // сюда положим маску
         unsigned char opcode; // сюда тип фрейма
         unsigned char payload_len; // сюда длину сообщения (тела), то есть без служебных байтов либо цифры 126 или 127

         opcode = inbuf[0] & 0x0F;  
            printf("FIN: 0x%02X\n", inbuf[0] & 0x01);
            printf("RSV1: 0x%02X\n", inbuf[0] & 0x02);
            printf("RSV2: 0x%02X\n", inbuf[0] & 0x04);
            printf("RSV3: 0x%02X\n", inbuf[0] & 0x08);
            printf("Opcode: 0x%02X\n", inbuf[0] & 0x0F);
                      
         payload_len = inbuf[1] & 0x7F; 
            printf("Maska: 0x%02x\n", inbuf[1] & 0x80 ? 1:0);
            
         unsigned char payload[SW_BUF] = {0,};
         //unsigned char payload_126[SW_BUF_126] = {0,};
         //unsigned char payload_127[SW_BUF_127] = {0,};


         if(opcode == WS_CLOSING_FRAME) // от клиента получен код закрытия соединения
          {
            send_stop(p_thr_id,client_fd);
            memset(reciv_r, 0, 48);
            snprintf(reciv_r, 47, "%s%d\n", "Ws_func recive opcod - 0x08, DIE clien - ",  client_fd);
            //warning_access_log(reciv_r); // пишем ссобытие в лог
            if(close(client_fd) == -1) warning_access_log("Error close client in WS_2."); // закрываем соединение с клиентом
            close_ws_thread(client_fd,p_thr_id);
            //pthread_exit(NULL); // убиваем поtok
          }

         else if(opcode == WS_PONG_FRAME) // от клиента получен PONG (маскированный)
          {
            masking_key[0] = inbuf[2];
            masking_key[1] = inbuf[3];
            masking_key[2] = inbuf[4];
            masking_key[3] = inbuf[5]; 

            unsigned int i = 6, pl = 0;
            for(; pl < payload_len; i++, pl++)
             {
               payload[pl] = inbuf[i]^masking_key[pl % 4]; 
             }
                     
            printf("Payload_len: %d\n", inbuf[1] & 0x7F);
            printf("\nRecive PONG and text \"%s\"\n", payload);
          }

         else if(opcode == WS_TEXT_FRAME && payload_len < 126) // от клиента получен текст
          {
            masking_key[0] = inbuf[2];
            masking_key[1] = inbuf[3];
            masking_key[2] = inbuf[4];
            masking_key[3] = inbuf[5]; 
            
            unsigned int i = 6, pl = 0;
            for(; pl < payload_len; i++, pl++)
             {
               payload[pl] = inbuf[i]^masking_key[pl % 4]; 
             }
                
            printf("Payload_len: %d\n", inbuf[1] & 0x7F);     
            printf("\nReciv TEXT_FRAME from %d client, payload: %s\n", client_fd, payload);


            if(payload[0] == 'p' && payload[1] == 'i' && payload[2] == 'n' && payload[3] == 'g') // от клиента получен текст "ping"  
             {
               printf("\nPING client - %d\n", client_fd); 

               unsigned char ping[] = {0x89, 0x05, 0x48, 0x65, 0x6c, 0x6c, 0x6f}; // Ping - не маскированный
               
               if(send(client_fd, ping, 7, 0) == -1)
                {
                  warning_access_log("Error PING."); 
                  if(close(client_fd) == -1) warning_access_log("Error close client in WS_3."); // закрываем соединение с клиентом
                  close_ws_thread(client_fd,p_thr_id);
                  //pthread_exit(NULL); 
                }

             }

            else if(payload[0] == 'c' && payload[1] == 'l' && payload[2] == 'o' && payload[3] == 's' && payload[4] == 'e') // от клиента получен текст "close"
             {
               printf("\nClose client - %d\n", client_fd); 

               unsigned char close_client[] = {0x88, 0};
               
               if(send(client_fd, close_client, 2, 0) == -1)
                {
                  warning_access_log("Error CLOSE."); 
                  if(close(client_fd) == -1) warning_access_log("Error close client in WS_4."); // закрываем соединение с клиентом
                  close_ws_thread(client_fd,p_thr_id);
                  //pthread_exit(NULL); 
                }

             }

            else
             {
               //unsigned char messag[] = "I do not know what to tell you bro... Link OK. But what do you want I do not understand, explain how a human being...";
               
               do_ws(client_fd, payload,&p_thr_id);

              }

          } // END if < 126
   
         else if(opcode == WS_TEXT_FRAME && payload_len == 126) // от клиента получен текст
          {
            unsigned char len16[2] = {0,};
            unsigned int payload_len16 = 0;
            len16[0] = inbuf[2]; 
            len16[1] = inbuf[3]; 
            payload_len16 = (len16[0] << 8) | len16[1]; // собираем длину сообщения

            gs=ws_reread(client_fd, payload_len16, rec_b,inbuf, &ret_data);
            
            /*
            masking_key[0] = inbuf[4];
            masking_key[1] = inbuf[5];
            masking_key[2] = inbuf[6];
            masking_key[3] = inbuf[7]; 
            
            unsigned int i = 8, pl = 0;
            for(; pl < payload_len16; i++, pl++)
             {
               payload_126[pl] = inbuf[i]^masking_key[pl % 4]; 
             }
            */
            printf("Payload_code: %d\n", inbuf[1] & 0x7F);  
            printf("Payload_len16: %u\n", payload_len16);       
            printf("\nReciv TEXT_FRAME from %d client, payload: %s\n", client_fd, ret_data);
            
            do_ws(client_fd, ret_data,&p_thr_id);
            /*
            unsigned char temp_msg[]="Ответ (126):";
            send_TXT(client_fd, temp_msg);
            send_TXT(client_fd, ret_data);
            */
            if(ret_data)
            {
              free(ret_data);
              ret_data=NULL;
            }
          }

         else if(opcode == WS_TEXT_FRAME && payload_len == 127) // от клиента получен текст
          {
            // text > 65535
            unsigned long len64[8] = {0,};
            unsigned long payload_len64 = 0;

            len64[0] = inbuf[2]; 
            len64[1] = inbuf[3]; 
            len64[2] = inbuf[4]; 
            len64[3] = inbuf[5];  
            len64[4] = inbuf[6]; 
            len64[5] = inbuf[7]; 
            len64[6] = inbuf[8]; 
            len64[7] = inbuf[9];

            payload_len64 = (len64[0] << 56) | (len64[1] << 48) | (len64[2] << 40) | (len64[3] << 32) | (len64[4] << 24) | (len64[5] << 16) | (len64[6] << 8) | len64[7]; // собираем длину сообщения
            
            //masking_key[0] = inbuf[10];
            //masking_key[1] = inbuf[11];
            //masking_key[2] = inbuf[12];
            //masking_key[3] = inbuf[13]; 

            gs=ws_reread(client_fd, payload_len64, rec_b,inbuf, &ret_data);
            
            /*
            //long int rec_b_in=rec_b;
            long int rec_req=payload_len64+14;
            rec_req=rec_req-rec_b;

            //while(rec_b_in-14<payload_len64)
            while(rec_req>0)
            {
              long int curr_p=payload_len64+14-rec_req;
              long int rec_b_in2 = read(client_fd, &inbuf[curr_p], SW_BUF - 1-curr_p);
              rec_req=rec_req-rec_b_in2;
            }

            unsigned int i = 14, pl = 0;
            for(; pl < payload_len64; i++, pl++)
             {
               payload_127[pl] = inbuf[i]^masking_key[pl % 4]; 
             }
            */
            printf("Payload_code: %d\n", inbuf[1] & 0x7F);  
            printf("Payload_len64: %ld\n", payload_len64);       
            printf("\nReciv TEXT_FRAME from %d client, payload: %s\n", client_fd, ret_data);
            
            do_ws(client_fd, ret_data,&p_thr_id);
            //unsigned char temp_msg[]="Ответ (127):";
            //send_TXT(client_fd, temp_msg);
            //send_TXT(client_fd, ret_data);

            if(ret_data)
            {
              free(ret_data);
              ret_data=NULL;
            }
          }

         else
          {
            //
          } 

       } // END if(n > 0)  
   
    } // END while(1)

    send_stop(p_thr_id,client_fd);

 } // END ws_func
