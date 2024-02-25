ARG NODEJS_VERSION

FROM node:${NODEJS_VERSION}-alpine

ARG CARDANO_NODE_VERSION
ARG CONTAINER_NAME
ARG HTTP_PORT
ARG LAST_PORT

WORKDIR /var/cardano

RUN \
    wget -nv "https://update-cardano-mainnet.iohk.io/cardano-node-releases/cardano-node-${CARDANO_NODE_VERSION}-linux.tar.gz" -O cardano-node.tar.gz && \
    tar -xzf cardano-node.tar.gz && \
    rm cardano-node.tar.gz

WORKDIR /var/export
WORKDIR /var/localnet

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn --verbose --frozen-lockfile --production

COPY config config

COPY tsconfig.json tsconfig.json
COPY src/*.ts .

ENV CONTAINER_NAME=${CONTAINER_NAME}
ENV PATH="$PATH:/var/cardano"
ENV NODE_OPTIONS="--require ts-node/register"

RUN \
    mkdir config/prepared ; \
    mkdir config/prepared ; \
    BUILD=true node localnet

EXPOSE ${HTTP_PORT}-${LAST_PORT}

CMD node localnet
ENTRYPOINT []
