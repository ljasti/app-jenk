FROM node:carbon

# Create app directory
#WORKDIR /opt/appdata/app1

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

#RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY app1 /opt/appdata/app1
RUN apt-get update 
RUN apt-get install curl
RUN apt-get install git
#RUN apt-get install openssh 
RUN apt-get install ansible -y 
RUN apt-get install bash 
RUN apt-get install bash-completion 
#RUN apt-get install sudo
#RUN apt-get install python

WORKDIR /opt/appdata/app1
RUN cd /opt/appdata/app1
#RUN npm update &&  npm install -g --unsafe-perm angular-cli tslint typescript
RUN npm update &&  npm install -g --unsafe-perm @angular/cli@latest tslint typescript
CMD [ "npm", "start" ]
RUN chmod +x /opt/appdata/app1/build.sh

