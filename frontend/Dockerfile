FROM ubuntu:20.04 as builder

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

RUN apt-get update
ENV NODE_VERSION=16.14.0
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
    libgbm-dev wget gnupg2

# Download and install Google Chrome (deb package, not snap)
RUN wget -q -O /tmp/google-chrome-stable_current_amd64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y /tmp/google-chrome-stable_current_amd64.deb && \
    rm /tmp/google-chrome-stable_current_amd64.deb

# Set up directories and adjust permissions
RUN mkdir -p /root/.local/share/fonts \
  && mkdir -p /root/.config/puppeteer \
  && chmod -R 777 /root/.local \
  && chmod -R 777 /root/.config \
  && mkdir -p /.local \
  && chmod -R 777 /.local

RUN npm config set user 0
RUN npm config set unsafe-perm true
RUN npm ci --only=prod && \
    npm list rimraf && \
    npm run build

# Make node/npm/npx available outside /root for random OpenShift UIDs.
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/local/bin/node && \
    cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/local/bin/npm && \
    cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/npx /usr/local/bin/npx && \
    chmod 755 /usr/local/bin/node /usr/local/bin/npm /usr/local/bin/npx

# Add tiny init process to reap zombie/defunct child processes.
ENV TINI_VERSION=v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static-amd64 /tini
RUN chmod +x /tini

# Set node to production 
ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Expose port - mostly a convention, for readability
EXPOSE 3000

# Start up command
ENTRYPOINT  ["/tini", "--", "/usr/local/bin/node", "dist/src/main"]