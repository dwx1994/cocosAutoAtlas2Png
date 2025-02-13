const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "output2");
const outputDir = path.join(__dirname, "output2_rotated");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, file);

    sharp(inputFile)
      .rotate(-90)
      .toFile(outputFile, (err, info) => {
        if (err) {
          console.error("Error processing file:", err);
        } else {
          console.log("Processed file:", info);
        }
      });
  });
});
