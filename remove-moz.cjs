const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "docs/assets");
const files = fs.readdirSync(dir);

files
  .filter((f) => f.endsWith(".css"))
  .forEach((file) => {
    const filePath = path.join(dir, file);
    let css = fs.readFileSync(filePath, "utf8");
    const cleaned = css.replace(/[\w-]*?:\s?-moz-available(\s?!important)?;?/g, "");
    fs.writeFileSync(filePath, cleaned);
    console.log(`Removed -moz-available from ${file}`);
  });
