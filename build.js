const fs = require('fs');
const path = require('path');

// Output directory
const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Copy index.html to dist/index.html
const sourceFile = path.join(__dirname, 'index.html');
const destFile = path.join(distDir, 'index.html');

try {
    fs.copyFileSync(sourceFile, destFile);
    console.log('✅ Build successful: index.html copied to dist/index.html');
} catch (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
}
