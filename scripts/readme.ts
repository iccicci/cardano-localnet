import { createWriteStream, readFileSync } from "fs";

const { configuration, name, version } = JSON.parse(readFileSync("package.json", "utf8"));
const lines = readFileSync("README.md", "utf8").split("\n");
const out = createWriteStream("README.md");

let beginConfig = true;
let beginContainer = true;
let endConfig = true;
let endContainer = true;

while(lines[lines.length - 1] === "") lines.pop();

for(const line of lines) {
  const print = () => out.write(`${line}\n`);

  if(beginContainer) {
    print();

    if(line === "<!-- BEGIN GENERATED CONTAINER NAME -->") {
      beginContainer = false;
      out.write("\n```\n");
      out.write(name);
      out.write("\n```\n\n");
    }
  } else if(endContainer) {
    if(line === "<!-- END GENERATED CONTAINER NAME -->") {
      endContainer = false;
      print();
    }
  } else if(beginConfig) {
    print();

    if(line === "<!-- BEGIN GENERATED CONFIGURATION -->") {
      beginConfig = false;
      out.write("\n```\n");
      out.write(JSON.stringify({ configuration, name, version }, null, 2));
      out.write("\n```\n\n");
    }
  } else if(endConfig) {
    if(line === "<!-- END GENERATED CONFIGURATION -->") {
      endConfig = false;
      print();
    }
  } else print();
}
