const fs = require("fs/promises");
const { join } = require("path");

fs.copyFile(join(__dirname, "..", "dev.env"), ".env");
