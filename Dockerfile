FROM node:10

RUN node --version

WORKDIR /usr/src/app

# Copy all files to working dir
COPY . .

# Installing all the dependencies
RUN npm install

EXPOSE 3000

# Starting node js 
CMD ["npm", "start"]
