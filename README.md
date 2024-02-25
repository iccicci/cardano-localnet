# cardano-localnet

Cardano local test network

## Usage

### Container name

This image is designed to be used inside a **docker-compose** infrastructure with container name:

<!-- BEGIN GENERATED CONTAINER NAME -->

```
cardano-localnet
```

<!-- END GENERATED CONTAINER NAME -->

### Ports

The container exposes following ports:

- `80`: the HTTP server which serves metadata files.
- `23000-23999`: the `cardano-node`s, only the configured number of nodes are started: only the relative ports can be
  actually used to connect to the local test network, starting from `23000`.

### Exported data

All relevant files are exported in `/var/export` directory, mount a shared volume to access the files from the extern of the container.

TODO

## Configuration

### Default IDE

The development environment is designed to be integrated with **MS VSCode**. Once opened the directory, the IDE will
prompt to install suggested extensions: install them.

### Global configuration

The global configuration is inside the `package.json` file, in following part:

<!-- BEGIN GENERATED CONFIGURATION -->

```
{
  "configuration": {
    "cardano_node": "1.35.5",
    "http_port": 23000,
    "node_js": "20.10.0"
  },
  "name": "cardano-localnet",
  "version": "0.0.0"
}
```

<!-- END GENERATED CONFIGURATION -->

- `name` - the name used to tag the built image and expected to be the container name.
- `version` - the version of the _pseudo-package_, it is used to tag the built image;
- `configuration.cardano_node` - the used version of `cardano-node`, it is used to tag the built image as well (mainly for reference);
- `configuration.http_port` - the port exposed by the image to server the HTTP server; followed by the ports of the `cardano-node`s.
- `configuration.node_js` - the version of **Node.js**, used both in the development environment and inside the built image.

### Test network configuration

TODO

### Image build

The build procedure is driven by **make**: to build the image issue the `make` command.

## Development

TODO
