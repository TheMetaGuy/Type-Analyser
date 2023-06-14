@echo off

echo ==================================================
echo ====== copying src and distribution files ========
copy ..\src\*.js src-copy\*.js
copy ..\dist\*.js dist-copy\*.js

echo ========= Running Karma Browser tests   ==========
npm run test:karma

