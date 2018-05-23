FROM node:8.6-alpine

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
#COPY app1 /opt/appdata/jenkinsplaybook

# Install Utilities
RUN apk  update   \
 && apk add -q \
 curl \
 git \
 openssh \
 ansible \
 bash \
 bash-completion \
 sudo \
 python
# && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
#RUN apk add --update $PACKAGES \
#    && pip install awscli==$AWSCLI_VERSION \
#    && pip install --upgrade pip \
#    &&  pip install boto \
#    && apk --purge -v del py-pip \
#    && rm -rf /var/cache/apk/*
# Install nodejs
#RUN npm update &&  npm install -g angular-cli tslint typescript && mkdir /etc/ansible


#RUN apk update -y
#RUN apk install curl -y
#RUN apk install git -y
#RUN apt-get install openssh 
#RUN apk install ansible -y 
#RUN apk install bash 
#RUN apk install bash-completion 
#RUN apk install vim -y
#RUN apt-get install sudo
#RUN apt-get install python

WORKDIR /opt/appdata/app1
RUN cd /opt/appdata/app1
RUN npm update &&  npm install -g --unsafe-perm angular-cli tslint typescript
#RUN npm update &&  npm install -g --unsafe-perm @angular/cli@latest tslint typescript
CMD [ "npm", "start" ]
RUN chmod +x /opt/appdata/app1/build.sh
EXPOSE 8000
