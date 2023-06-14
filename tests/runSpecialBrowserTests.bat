@echo off

echo ==================================================
echo ====== copying src and distribution files ========
copy ..\src\*.js src-copy\*.js
copy ..\dist\*.js dist-copy\*.js

rem Start Http server with no console output and with specific URL
http-server -p 9090 -s -o specialTests.html
