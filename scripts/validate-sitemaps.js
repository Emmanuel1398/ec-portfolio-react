import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const files = [
  'sitemap.xml',
  'characters-sitemap.xml',
  'drone-shows-sitemap.xml',
  'sitemap-index.xml'
];

let hasErrors = false;

files.forEach(file => {
  const filePath = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Validation failed: ${file} does not exist in public directory.`);
    hasErrors = true;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('<?xml')) {
    console.error(`❌ Validation failed: ${file} does not appear to be a valid XML file.`);
    hasErrors = true;
  } else {
    console.log(`✅ Validated ${file}`);
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log('✅ All sitemaps validated successfully.');
}
