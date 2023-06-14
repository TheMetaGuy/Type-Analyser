@echo off

echo ==================================================
echo ====== copying src and distribution files ========
if exist src-copy rmdir /s /q src-copy
if exist dist-copy rmdir /s /q dist-copy
md src-copy
md dist-copy
copy ..\src\*.js src-copy\*.js
copy ..\dist\*.js dist-copy\*.js

rem Start Http server with no console output and with specific URL
http-server -p 9090 -s -o specialTests.html
