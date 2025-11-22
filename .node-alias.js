// Register module aliases for Node.js scripts
import path from "path";
import { fileURLToPath } from "url";
import Module from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = Module.createRequire(import.meta.url);

// Register @ alias to point to project root
const resolve = Module.prototype.resolveFilename;
Module.prototype.resolveFilename = function (request, parent, ...args) {
  if (request.startsWith("@/")) {
    const newRequest = path.join(__dirname, request.slice(2));
    return resolve.call(this, newRequest, parent, ...args);
  }
  return resolve.call(this, request, parent, ...args);
};
