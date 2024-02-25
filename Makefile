SHELL := $(shell which bash)

$(foreach var,$(shell cat .configuration),$(eval export $(var)))
# This makes the trick! Since .configuration is included (which means it must have a format compliant with make and
# env files have it), make knows it has to re-evaluate the Makefile right after .configuration target is re-built.
# In the end it's enough to be sure every target which needs a .configuration variable depends (directly or inderectly)
# on it to be sure such variables are correctly evaluated as well.
include .configuration

BUILD_ARGS=$(foreach var,CARDANO_NODE_VERSION CONTAINER_NAME HTTP_PORT LAST_PORT NODEJS_VERSION,--build-arg ${var})
TAGS=$(foreach tag,${VERSION}-${CARDANO_NODE_VERSION} latest,-t ${CONTAINER_NAME}:${tag})

all: .nvmrc README.md
	add_ts() { while read -r line ; do echo $$(date -u +"%Y-%m-%d %H:%M:%S.%N" | cut -c1-23 ) $$line ; done } ; \
	docker build --add-host=${CONTAINER_NAME}:127.0.0.1 --progress=plain ${BUILD_ARGS} ${TAGS} . 2>&1 | add_ts | tee build.log

.configuration: scripts/configuration.ts yarn.lock
	yarn -s configuration > $@

.nvmrc: .configuration
	echo v${NODEJS_VERSION} > $@

config:
	wget "https://book.world.dev.cardano.org/environments/mainnet/alonzo-genesis.json" -O config/downloaded/alonzo-genesis.json
	wget "https://book.world.dev.cardano.org/environments/mainnet/byron-genesis.json" -O config/downloaded/byron-genesis.json
	wget "https://book.world.dev.cardano.org/environments/mainnet/conway-genesis.json" -O config/downloaded/conway-genesis.json

README.md: .configuration scripts/readme.ts
	yarn readme

yarn.lock: package.json
	yarn
	touch $@
