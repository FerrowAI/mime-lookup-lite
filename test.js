const { fromExtension, fromMime, lookup, isCompressible, register } = require("./dist/index");

console.log("=== MIME Lookup Lite Demo ===\n");

// Extension to MIME
console.log("Extension -> MIME:");
console.log(`  .jpg -> ${fromExtension("jpg")}`);
console.log(`  .pdf -> ${fromExtension("pdf")}`);
console.log(`  .ts -> ${fromExtension(".ts")}\n`);

// MIME to extension
console.log("MIME -> Extension:");
console.log(`  image/png -> ${fromMime("image/png")}`);
console.log(`  text/html -> ${fromMime("text/html")}\n`);

// Full lookup
console.log("Full lookup:");
const entry = lookup("json");
console.log(`  json ->`, JSON.stringify(entry));

// Compressibility
console.log("\nCompressibility:");
console.log(`  text/plain: ${isCompressible("text/plain")}`);
console.log(`  image/jpeg: ${isCompressible("image/jpeg")}`);
console.log(`  application/zip: ${isCompressible("application/zip")}\n`);

// Custom registration
console.log("Custom registration:");
register("custom", "application/x-custom", "UTF-8", true);
console.log(`  custom -> ${fromExtension("custom")}`);
console.log(`  lookup(custom) ->`, JSON.stringify(lookup("custom")));
