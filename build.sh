#!/bin/bash  

echo " Running build scripts on startup "
cd /opt/appdata/app1
npm install
npm install @angular/cdk --save
npm install -g @angular/cli@latest 
npm run build

ng build  2>&1 /dev/null
echo " Running of build scripts was sucessful "
#cd /opt/appbuilding-api
npm install
npm start
