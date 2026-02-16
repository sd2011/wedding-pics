const fs = require('fs');
const path = require('path');

// Create necessary directories
const directories = [
  path.join(process.cwd(), 'public', 'uploads'),
  path.join(process.cwd(), 'data'),
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

// Create empty photos.json if it doesn't exist
const photosJsonPath = path.join(process.cwd(), 'data', 'photos.json');
if (!fs.existsSync(photosJsonPath)) {
  fs.writeFileSync(photosJsonPath, JSON.stringify([], null, 2));
  console.log(`Created photos.json`);
} else {
  console.log(`photos.json already exists`);
}

console.log('Initialization complete!');