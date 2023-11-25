FROM ubuntu:22.04

ENV NODE_VERSION "18.17.1"
ENV ARCH "arm64"


RUN mkdir -p /home/sdk
RUN mkdir -p /home/sdk/nodejs
RUN mkdir -p /home/prod
RUN mkdir -p /home/dev

WORKDIR /home

# Dependencies
RUN apt-get update && apt-get install -y libsndfile-dev wget zip

# NodeJs
RUN wget "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz"
RUN tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
    && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
    && node --version \
    && npm --version


# Server code
ADD ./ /home/prod/
RUN cd /home/prod/ && npm install && npm run build