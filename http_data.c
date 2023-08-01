#pragma once

char responseZ_RES[512];
char responseZ[] = "HTTP/1.1 200 OK\r\n";
char responseZerrF[] = "HTTP/1.1 404 Not Found\r\n";
char responseZZ00[] = "\r\n";
char responseZZ01[] = "Content-Type: text/html; charset=UTF-8\r\n";
char responseZZ02[] = "Content-Type: text/css; charset=UTF-8\r\n";
//char responseZZ03[] = "Content-Type: text/javascript; charset=UTF-8\r\n";
char responseZZ03[] = "content-type: application/x-javascript; charset=UTF-8\r\n";
char responseZZ04[] = "Content-Type: image/gif; charset=UTF-8\r\n";
char responseZZ05[] = "Content-Type: image/jpeg; charset=UTF-8\r\n";
char responseZZ06[] = "Content-Type: image/png; charset=UTF-8\r\n";
char responseZZ07[] = "Content-Type: image/svg+xml; charset=UTF-8\r\n";
char responseZZ08[] = "Content-Type: image/tiff; charset=UTF-8\r\n";
char responseZZ09[] = "Content-Type: image/x-icon;\r\n";
char responseZZ10[] = "Content-Type: image/bmp; charset=UTF-8\r\n";
//"Content-Type: charset=UTF-8\r\n\r\n";

char response0[] = "HTTP/1.1 200 OK\r\n \r\nserver: GLOB-1.2\r\n"
"Content-Type: text/html; charset=UTF-8\r\n";

char response1[] = "<!DOCTYPE html><html><head><title>Bye-bye baby bye-bye</title>"
"<style>body { background-color: #111 }"
"h1 { font-size:4cm; text-align: center; color: black;"
" text-shadow: 0 0 2mm red}</style></head>"
"<body><h1>Goodbye, world!</br>тест</h1></body></html>\r\n";

char responseE[] = "\r\n";