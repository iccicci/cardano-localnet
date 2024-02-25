import { readFileSync } from "fs";

const { configuration, name, version } = JSON.parse(readFileSync("package.json", "utf8"));
const { cardano_node, http_port, node_js } = configuration;

process.stdout.write(
  `${[
    `CONTAINER_NAME=${name}`,
    `CARDANO_NODE_VERSION=${cardano_node}`,
    `HTTP_PORT=${http_port}`,
    `LAST_PORT=${http_port + 100}`,
    `NODEJS_VERSION=${node_js}`,
    `VERSION=${version}`
  ].join("\n")}\n`
);
