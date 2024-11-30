import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Set the input and output directories
const inputDir = path.join(__dirname, 'images');
const outputDir = path.join(__dirname, 'output');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Loop through all the files in the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(
      outputDir,
      path.basename(file, path.extname(file)) + '.webp'
    );

    // Convert the JPEG image to WebP
    sharp(inputPath)
      .webp()
      .toFile(outputPath, (err) => {
        if (err) {
          console.error(`Error converting ${file} to WebP:`, err);
        } else {
          console.log(`Converted ${file} to WebP successfully.`);
        }
      });
  });
});
