This pack is for Oracle Linux (RedHat/Fedora/Centos family)

GCC build cmd:
gcc main_http.c -lpthread -lsqlite3 -g3 -lm -std=c99 -O3 -o glob3

run cmd:
./glob3		(interacive mode)
./glob3 -d	(daemon mode)
./glob3 -h	(start info)

ini params (ini.txt)
http_port:9085						(port)
http_treads:8						(limit for count of threads in http/get/post parallels requests. WS treads - unlimited)
ini_def_page:./static/html_static/index_01.html		(path for default index-html file, when http://127.0.0.1:9085)

url examples:
http://127.0.0.1:9085/test		(for diagnostics)
http://127.0.0.1:9085			(main, default mode)
http://127.0.0.1:9085/view_tbl_001	(example for get small  html table, pre - installed examle endpoint #1)
http://127.0.0.1:9085/view_tbl_002	(example for get medium html table, pre - installed examle endpoint #2)

apps users info and login/password (for apps, not for server):
id	USER	PASSWORD
1	sys	mgr
3	user1	23
