const fs = require("node:fs/promises");

fs.rm("./dist", { recursive: true, force: true });
