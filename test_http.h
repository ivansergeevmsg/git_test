#pragma once

#include "main.h"


struct parse_ret
{
  char bufs[4096];
  char bufr[http_size][http_line_len];
  int q_line;
  char bufr1[http_size][http_name_len];
  char bufr2[http_size][http_vals_len];
  char param_name[max_params][param_name_len];
  char param_vals[max_params][param_vals_len];
  char path_chain[path_inners][path_obj_len];
  int qc;
  int qp;
  char file_path[http_vals_len];
  char post_params_str[http_vals_len];
  int post_params_length;
  unsigned char key_out[24];
  int ws_conn;
};