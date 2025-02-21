import fs from "fs";
import path from "path";

// Function to generate an index.ts file for a given directory
const generateIndexFile = (folderPath: string) => {
  const indexPath = path.join(folderPath, "index.ts");

  // Get all `.tsx` files except `index.ts`
  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".tsx") && file !== "index.ts")
    .map((file) => `export * from "./${file.replace(".tsx", "")}";`)
    .join("\n");

  // Write to index.ts
  fs.writeFileSync(indexPath, files);
  console.log(`✅ Generated index.ts for ${folderPath}`);
};

// Adjust this path based on your project structure
const targetFolders = [
  path.resolve(__dirname, "src/widgets/app-header"),
  path.resolve(__dirname, "src/widgets/app-sidebar"),
];

targetFolders.forEach(generateIndexFile);
