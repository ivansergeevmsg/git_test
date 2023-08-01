#pragma once
#include <stdio.h>
#include <stdlib.h>
#include <sqlite3.h>
//#include <sqlite3ext.h>

#include <string.h>

static int callback(void *NotUsed, int argc, char **argv, char **azColName) {
   int i;
   for(i = 0; i<argc; i++) {
      printf("%s = %s\n", azColName[i], argv[i] ? argv[i] : "NULL");
   }
   printf("\n");
   return 0;
}

static int callback2(void *NotUsed, int argc, char **argv, char **azColName) {
   int i;
   for(i = 0; i<argc; i++) {
      printf("%s (%s) | ", azColName[i], argv[i] ? argv[i] : "NULL");
   }
   printf("\n");
   return 0;
}

int db_open(sqlite3 **db, char *db_file)
{
    char *zErrMsg = 0;
    int rc;

    /* Open database */
    rc = sqlite3_open(db_file, db);
    
    if( rc ) {
        fprintf(stderr, "Can't open database: %s\n", sqlite3_errmsg(*db));
        return(0);
    } else {
        fprintf(stdout, "Opened database successfully\n");
    }

    return 0;
}

int db_uni_cmd(sqlite3 **db, char *sql, int res_info) {
   char *zErrMsg = 0;
   int rc;
   
   /* Create SQL statement */

   /* Execute SQL statement */
   rc = sqlite3_exec(*db, sql, callback2, 0, &zErrMsg);
   
   if( rc != SQLITE_OK ){
      fprintf(stderr, "SQL error: %s\n", zErrMsg);
      sqlite3_free(zErrMsg);
   } else if(res_info==1) {
      fprintf(stdout, "CMD exec successfully\n");
   }
   return 0;
}

int main_sqlite_1()
{
   sqlite3 *db;
   char *zErrMsg = 0;
   int rc;
   char *db_file = "test2.db";
   char *sql1 = "CREATE TABLE COMPANY("  \
      "ID INT PRIMARY KEY     NOT NULL," \
      "R_ID INT NOT NULL," \
      "L_ID INT NOT NULL," \
      "NAME           TEXT    NOT NULL," \
      "AGE            INT     NOT NULL," \
      "ADDRESS        CHAR(50)," \
      "SALARY         REAL );";

   char sql2[1024] = "INSERT INTO COMPANY (ID, NAME,AGE,ADDRESS,SALARY) "  \
      "VALUES (1, 'Paul', 32, 'California', 20000.00 ); " \
      "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) "  \
      "VALUES (2, 'Allen', 25, 'Texas', 15000.00 ); "     \
      "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)" \
      "VALUES (3, 'Teddy', 23, 'Norway', 20000.00 );" \
      "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)" \
      "VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00 );";

   char sql22[1024];

   char *sql3 = "SELECT * from COMPANY LIMIT 20";
   
   db_open(&db,db_file);

   
   db_uni_cmd(&db, sql1,1);

   

   db_uni_cmd(&db, "delete from COMPANY ; ",1);

   //db_uni_cmd(&db, sql2);
   char *str1="INSERT INTO COMPANY (ID,R_ID,L_ID,NAME,AGE,ADDRESS,SALARY) VALUES (";
   char nstr[100];
   
   for(int i=0;i<100;i++)
   {
      sql22[0]='\0';
      strcpy(sql22,str1);
      sprintf(nstr,"%d,",i*4+1);
      strcat(sql22, nstr);
      sprintf(nstr,"%d,",i);   
      strcat(sql22, nstr);
      sprintf(nstr,"%d,",1);
      strcat(sql22, nstr);
      strcat(sql22, " 'Ф_Paul', 32, 'California', 20000.00 ); ");

      strcat(sql22,str1);
      sprintf(nstr,"%d,",i*4+2);
      strcat(sql22, nstr);
      sprintf(nstr,"%d,",i);
      strcat(sql22, nstr);
      sprintf(nstr,"%d,",2);
      strcat(sql22, nstr);
      strcat(sql22, " 'Allen', 25, 'Texas', 15000.00 ); ");

      strcat(sql22,str1);
      sprintf(nstr,"%d,",i*4+3);
      strcat(sql22, nstr);
      sprintf(nstr,"%d,",i);
      strcat(sql22, nstr);
      sprintf(nstr,"%d,",3);
      strcat(sql22, nstr);
      strcat(sql22, " 'Teddy', 23, 'Norway', 20000.00 ); ");

      strcat(sql22,str1);
      sprintf(nstr,"%d,",i*4+4);
      strcat(sql22, nstr);
      sprintf(nstr,"%d,",i);
      strcat(sql22, nstr);
      sprintf(nstr,"%d,",4);
      strcat(sql22, nstr);
      strcat(sql22, " 'Mark', 25, 'Rich-Mond ', 65000.00 ); ");

      db_uni_cmd(&db, sql22,0);
   }
   
   for(int i=0;i<10;i++)
   {
      ;//sqlite_exec_printf(db,  "INSERT INTO COMPANY (ID,R_ID,L_ID,NAME,AGE,ADDRESS,SALARY) VALUES('%q')",  0, 0, 0, "_");
   }
   
   db_uni_cmd(&db, "SELECT * from COMPANY LIMIT 20 OFFSET 0",1);
   db_uni_cmd(&db, "select count(*) as q from COMPANY ; ",1);

   db_uni_cmd(&db, "SELECT t.L_ID, count(*) as q from COMPANY t group by t.L_ID LIMIT 20",1);
   db_uni_cmd(&db, "SELECT t.* from COMPANY t where t.id>30000 and t.id<33000 order by t.salary desc LIMIT 20",1);

   sqlite3_close(db);

   return 0;
}

int main_sqlite_2()
{
   //char* sql = "SELECT name, state FROM people WHERE state = ?1;";
   sqlite3 *db; // pointer to our db
   sqlite3_stmt *pstmt; // prepared statements corresponding to sql
   //const unsigned char *name,*state; // text columns from our queries
   const unsigned char *c0,*c1,*c2,*c3,*c4,*c5,*c6; // text columns from our queries
   //char *zErrMsg = 0;
   int rc; // return code from sqlite library

   int argv = 3;
   char **argc=NULL;

   char *db_file = "test3.db";

   if (argv != 3)
   {
      printf("usage: %s db state\n",argc[0]);
      return(1);
   }

   // 1 open the database
   //rc = sqlite3_open_v2(db_file, &db, SQLITE_OPEN_READONLY, NULL);
   rc = sqlite3_open_v2(db_file, &db, SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE, NULL);
   if (rc)
   {
      fprintf(stderr, "Can't open database: %s\n", sqlite3_errmsg(db));
      sqlite3_close_v2(db);
      return(1);
   }

   db_uni_cmd(&db, "delete from COMPANY ; ",1);

   char* sql_insert = "INSERT INTO COMPANY (ID,R_ID,L_ID,NAME,AGE,ADDRESS,SALARY) VALUES (?1,?2,?3,?4,?5,?6,?7);";

   //rc = sqlite3_prepare_v3(db, sql_insert, -1, 0, &pstmt, NULL);
   rc = sqlite3_prepare_v2(db, sql_insert, -1, &pstmt, NULL);
   if (rc)
   {
      fprintf(stderr, "Couldn't prepare sql statement: %s\n", sqlite3_errmsg(db));
      sqlite3_finalize(pstmt);
      sqlite3_close_v2(db);
      return(1);
   }

   db_uni_cmd(&db, "BEGIN;",1);

   int rret=0;
   char x0[20];
   char x1[20];
   for(int i=0;i<30;i++)
   {
      sprintf(x0,"%d",(i*4+1));
      sprintf(x1,"%d",(i));
      rc = sqlite3_bind_text(pstmt, 1, x0, -1, SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 2, x1, -1, SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 3, "1", 1, SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 4, "Ф_Paul", strlen("Ф_Paul"), SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 5, "32", 2, SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 6, "California", strlen("California"), SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 7, "20000.00", strlen("20000.00"), SQLITE_STATIC);
      rret=sqlite3_step(pstmt);
      sqlite3_reset(pstmt);

      sprintf(x0,"%d",(i*4+2));
      sprintf(x1,"%d",(i));
      rc = sqlite3_bind_text(pstmt, 1, x0, -1, SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 2, x1, -1, SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 3, "2", 1, SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 4, "Allen", strlen("Allen"), SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 5, "25", 2, SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 6, "Texas", strlen("Texas"), SQLITE_STATIC);
      rc = sqlite3_bind_text(pstmt, 7, "15000.00", strlen("15000.00"), SQLITE_STATIC);
      rret=sqlite3_step(pstmt);
      sqlite3_reset(pstmt);

      sprintf(x0,"%d",(i*4+3));
      sprintf(x1,"%d",(i));
      rc = sqlite3_bind_text(pstmt, 1, x0, -1, NULL);
      rc = sqlite3_bind_text(pstmt, 2, x1, -1, NULL);
      rc = sqlite3_bind_text(pstmt, 3, "3", -1, NULL);
      rc = sqlite3_bind_text(pstmt, 4, "Teddy", -1, NULL);
      rc = sqlite3_bind_text(pstmt, 5, "23", -1, NULL);
      rc = sqlite3_bind_text(pstmt, 6, "Norway", -1, NULL);
      rc = sqlite3_bind_text(pstmt, 7, "20000.00", -1, NULL);
      rret=sqlite3_step(pstmt);
      sqlite3_reset(pstmt);

      sprintf(x0,"%d",(i*4+4));
      sprintf(x1,"%d",(i));
      rc = sqlite3_bind_text(pstmt, 1, x0, -1, NULL);
      rc = sqlite3_bind_text(pstmt, 2, x1, -1, NULL);
      rc = sqlite3_bind_text(pstmt, 3, "4", -1, NULL);
      rc = sqlite3_bind_text(pstmt, 4, "Mark", -1, NULL);
      rc = sqlite3_bind_text(pstmt, 5, "25", -1, NULL);
      rc = sqlite3_bind_text(pstmt, 6, "Rich-Mond", -1, NULL);
      rc = sqlite3_bind_text(pstmt, 7, "65000.00", -1, NULL);
      rret=sqlite3_step(pstmt);
      sqlite3_reset(pstmt);
   }

   db_uni_cmd(&db, "COMMIT;",1);

   char* sql = "SELECT t.* from COMPANY t WHERE t.id=?1 or 1=1 LIMIT 20;";
   // 2 create a prepared statement
   rc = sqlite3_prepare_v3(db, sql, -1, 0, &pstmt, NULL);
   if (rc)
   {
      fprintf(stderr, "Couldn't prepare sql statement: %s\n", sqlite3_errmsg(db));
      sqlite3_finalize(pstmt);
      sqlite3_close_v2(db);
      return(1);
   }

   // 3 bind the ?1 in the prepared statement
   // to our text we passed into the program
   //rc = sqlite3_bind_text(pstmt, 1, argc[2], -1, NULL);
   rc = sqlite3_bind_text(pstmt, 1, "1", -1, NULL);
   if (rc)
   {
      fprintf(stderr, "Couldn't bind to prepared sql stmt: %s\n", sqlite3_errmsg(db));
      sqlite3_finalize(pstmt);
      sqlite3_close_v2(db);
      return(1);
   }

   // 4 fetch columns from our query
   while(sqlite3_step(pstmt) == SQLITE_ROW)
   {
      c0 = sqlite3_column_text(pstmt,0);
      c1 = sqlite3_column_text(pstmt,1);
      c2 = sqlite3_column_text(pstmt,2);
      c3 = sqlite3_column_text(pstmt,3);
      c4 = sqlite3_column_text(pstmt,4);
      c5 = sqlite3_column_text(pstmt,5);
      c6 = sqlite3_column_text(pstmt,6);
      printf("c0: %s c1: %s c2: %s c3: %s c4: %s c5: %s c6: %s\n",c0,c1,c2,c3,c4,c5,c6);
   }

   db_uni_cmd(&db, "select count(*) as q from COMPANY ; ",1);
   db_uni_cmd(&db, "SELECT t.L_ID, count(*) as q from COMPANY t group by t.L_ID LIMIT 20",1);

   // 5 close the prepared statement
   sqlite3_finalize(pstmt);

   // 6 close the database
   sqlite3_close_v2(db);

   if(rret!=0)
   {
      printf("rret");
   }

   return 0;
}

//sqlite3_column_count(stmt);
//sqlite3_column_name(stmt, i);
//sqlite3_column_type(stmt, i);