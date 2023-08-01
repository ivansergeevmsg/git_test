#pragma once
#ifndef B8624C3E_33F4_4882_B5C6_593709E77A30
#define B8624C3E_33F4_4882_B5C6_593709E77A30


#endif /* B8624C3E_33F4_4882_B5C6_593709E77A30 */

#include <wchar.h>
#include <time.h>

//typedef struct tsrt {int[][3];} tsrt;
//#define tsrt int[][3] 
//typedef int tsrt[][3];
typedef int tsrt[3];
//typedef int tsrt3[3];

union muu{  //one cell data struct
    double  p_d;
    wchar_t *p_w;
    clock_t p_t;
    int ni;
};
typedef union muu mu;

struct row_mu{ // one col in row - cell
    mu  vv; // uni val in cell of row
    int ni; // null indicator
    int vt; // type
};
typedef struct row_mu rr_mu;

struct ptt{     //one column struct
    mu  *pv; // data   arr
    int *pn; // null_i arr
    int  vt; // type
    int  vz; // arr length
    int  sort_id;  // sorting present
    int  sort_dir; // sorting present dir
    int  sort_ni;  // sorting present nulls
    wchar_t cname[256];
};
typedef struct ptt pt;

struct ptbl{    //tbl obj
    pt  *cc; // columns' arr (pointers)
    int  cq; // cols' arr length
    int  zq; // rows count
    int *sort_mask;    // ready for sort
    //int *sort_mask_dir;  // ready for sort_dir
    //int *sort_mask_ni; // ready for sort nulls
    int  sort_q;    // length sort_mask
};
typedef struct ptbl ptb;

struct srt_vt{     //one sort row struct
    ptb *ptb; // parent tbl obj
    int  rr;  // rownum
    int  x;   
};
typedef struct srt_vt pvt;

struct pvtbl{    //proxy tbl obj
    ptb **pptb;   // Array of uses tbl-sources
    int  ptb_n;   // Arr size
    int **ptb_rr; // Array of row-mask tbl-sources
    int *cc;      // cols in sources
//    int  cc_n;    // cols arr size
    int *cc_tbl;  // tbl-sources of this cols
//    pt  *cc; // columns' arr (pointers)
    int  cq; // cols' arr length
    int  zq; // rows count
//    int *sort_mask;    // ready for sort
//    int  sort_q;    // length sort_mask
};
typedef struct pvtbl pvtb;

struct test_struct{
    int field1;
    double field2;
    wchar_t field3[100];
    wchar_t *field4;
};
typedef struct test_struct tts;


extern inline int set_null_cell(ptb *mt,int c, int n, int v_bool);
extern ptb* create_tbl_as(ptb *mt,int *c_set, int c_set_n);