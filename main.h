#pragma once
#include <pthread.h>
#include <signal.h>
#include <setjmp.h>
#include <semaphore.h>

#define http_size 30
#define http_line_len 2048 //1024
#define http_name_len 256
#define http_vals_len 2048 //1024
#define max_params 50
#define param_name_len 256
#define param_vals_len 2048 //1024
#define path_inners 20
#define path_obj_len 256
#define err_pipe 101

#define ERROR_CREATE_THREAD -11
#define ERROR_JOIN_THREAD   -12
#define SUCCESS        0

//int m_debug;

//ini_data;
struct tag_ini_data {
  int ini_http_port;
  int ini_http_treads;
  char ini_def_page[512];
};
typedef struct tag_ini_data ini_data;

struct parse_ret;
extern inline void parse_step1(char *src, int i, char *ret1, char *ret2);
extern inline int parse_params(int mode_,char *src, char ret1[][param_name_len], char ret2[][param_vals_len]);
extern inline int parse_path(char *src, char ret1[][path_obj_len]);
extern inline int url_decode(const char *s, char *dec);

void *main_http(void *args);

void * read_do_smth(void *client_arg);
//int do_smth(cdata *pcdata,int client_fd, char *data_in);
extern char *show_err_page(int msg_type,char *err_msg, struct parse_ret *p_data);

