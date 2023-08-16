# Motivation
When I was faced with the need to create a system for publishing BI-information (and any other), I found that there was no ready-made solution for making an effective continuous platform for a C-application. Existing solutions (like NGINX) are forced to tear up space due to CGI/FastCGI and the like and the your application will not see incoming raw HTTP content, for example.  
I tried to assemble a set of modules that allow me to assemble an initial semi-finished product for a C-application. Next, you can develop the functionality in the desired direction.  

# Now this set includes:
- A multithreaded web server that processes requests to both static content and endpoint in the application. Works with GET, POST and Websockets. There is a parsing and transmission of parameters.
- Basic structures and initial functionality for processing tables - storage, cell access, sorting, grouping, reading and writing to a CSV file.
- Пример использования SQLite.
- Example of connection of endpoints and global application object for sharing between web session.
- An example of a simple frontend-websockets application (HTML/Javascript/WebGL) to demonstrate the operation of the web application described above.

# Activation and info
This pack is for Oracle Linux (RedHat/Fedora/Centos family)  
file ```glob3``` - compiled executable file for this Linux family

GCC build cmd:  
```gcc main_http.c -lpthread -lsqlite3 -g3 -lm -std=c99 -O3 -o glob3```

run cmd:
- ```./glob3	(interacive mode)```
- ```./glob3 -d	(daemon mode)```
- ```./glob3 -h	(start info)```

ini params (ini.txt)  
```http_port:9085```						(port)  
```http_treads:8```						(limit for count of threads in http/get/post parallels requests. WS treads - unlimited)  
```ini_def_page:./static/html_static/index_01.html```		(path for default index-html file, when http://127.0.0.1:9085)  

url examples:
- ```http://127.0.0.1:9085/test```		(for diagnostics)
- ```http://127.0.0.1:9085```			(main, default mode)
- ```http://127.0.0.1:9085/view_tbl_001```	(example for get small  html table, pre - installed examle endpoint #1)
- ```http://127.0.0.1:9085/view_tbl_002```	(example for get medium html table, pre - installed examle endpoint #2)

apps users info and login/password (for 'apps', not for server):
<table><tr><td>id</td><td>USER</td><td>PASSWORD</td></tr>
<tr><td>1</td><td>sys</td><td>mgr</td></tr>
<tr><td>3</td><td>user1</td><td>23</td></tr>
</table>
