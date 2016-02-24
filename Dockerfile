FROM node:5

# Get needed libraries
RUN apt-get update
RUN apt-get install -y libelf1

# Create node user
RUN groupadd node && useradd -m -g node node

# Get express-isomorphic-dispatcher files
WORKDIR /home/node/express-isomorphic-dispatcher/

COPY ./flowlib ./flowlib
COPY ./.flowconfig ./.flowconfig
COPY ./.babelrc ./.babelrc
COPY ./package.json	./package.json
COPY ./src ./src

RUN chown node:node ./
RUN chown -R node:node ./*

# Install express-isomorphic-dispatcher
USER node
RUN npm install
USER root

# Get the examples files
WORKDIR /home/node/express-isomorphic-dispatcher/example/

COPY ./example/.babelrc ./.babelrc
COPY ./example/browserify.js ./browserify.js
COPY ./example/package.json	./package.json
COPY ./example/src ./src

RUN chown node:node ./
RUN chown -R node:node ./*

# Install the example
USER node
RUN npm install

# Start server
CMD npm run start
EXPOSE 8080