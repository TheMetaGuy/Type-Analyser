@echo off

echo ==================================================
echo ====== copying src and distribution files ========
if exist src-copy rmdir /s /q src-copy
if exist dist-copy rmdir /s /q dist-copy
md src-copy
md dist-copy
copy ..\src\*.js src-copy\*.js
copy ..\dist\*.js dist-copy\*.js
echo . 
echo ========= Running Karma Browser tests   ===============
echo                  ---- NOTE ----- 
echo these are run with the Browser versions targeted 
echo by the babel-preset-env section in package.json.  
echo =======================================================
npm run test:karma

