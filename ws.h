#pragma once
#ifndef AF4DB7EE_9364_46E6_850F_0F1B59E385AD
#define AF4DB7EE_9364_46E6_850F_0F1B59E385AD


#endif /* AF4DB7EE_9364_46E6_850F_0F1B59E385AD */


#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h> 
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <string.h>
#include <sys/stat.h> 
#include <fcntl.h>    
#include <time.h>
#include <semaphore.h>
#include <sys/sendfile.h>
#include <pthread.h>


#define WS_TEXT_FRAME 0x01
#define WS_PING_FRAME 0x09
#define WS_PONG_FRAME 0x0A
#define WS_CLOSING_FRAME 0x08

#define BUFSIZE 1024
#define FILESTR 32
#define ALLARRAY 64
#define SHA_DIGEST_LENGTH 20
#define SW_BUF 65552
#define SW_BUF_126 65552
#define SW_BUF_127 80000 //131104 //65552
/*
#define BUFSIZE 1024
#define FILESTR 32
#define ALLARRAY 64
#define SHA_DIGEST_LENGTH 20
#define SW_BUF 65552
*/
/*
char patch_to_dir[ALLARRAY] = {0,};
char fpfile[ALLARRAY] = {0,};
char buffer[BUFSIZE] = {0,};
int client_fd, count_warning_log =0;
*/
//struct stat stat_buf;

