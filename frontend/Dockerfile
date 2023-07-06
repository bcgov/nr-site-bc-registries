# RedHat UBI 8 with nodejs 16
# FROM registry.access.redhat.com/ubi8/ubi as builder
FROM ubuntu:latest as builder
# RUN dnf module install -y nodejs:16
RUN apt-get update
ENV NODE_VERSION=18.0.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
RUN chmod -R 777 /root/.nvm/versions/node/v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# Install packages, build and keep only prod packages
WORKDIR /app
COPY . ./
RUN apt-get update -y
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 \
    libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 \
    libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
    libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 \
    libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
    fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils \
    wget libgbm-dev

RUN npm config set user 0
RUN npm config set unsafe-perm true
RUN npm ci --only=prod && \
    npm run build

# Set node to production 
ENV NODE_ENV production

# Expose port - mostly a convention, for readability
EXPOSE 3000

# Start up command
ENTRYPOINT  ["node", "dist/src/main"]