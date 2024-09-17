# Set linux images
FROM node:alpine AS build

# Set workdir name
WORKDIR /app

# Copy package.json and yarn.lock file to /app workdir
COPY package.json yarn.lock ./

# Install all needed dependencies based on package.json 
RUN yarn install 

COPY . ./
CMD ["yarn", "run", "dev"]