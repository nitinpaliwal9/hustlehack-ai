const fs = require('fs');
const path = require('path');
const structure = require('./resource-structure.json');

const baseDir = path.join(__dirname, '..', 'app', 'resources');

function generatePages(obj, currentPath = '') {
  for (const key in obj) {
    const newPath = path.join(currentPath, key);
    const fullDirPath = path.join(baseDir, newPath);
    const pageFile = path.join(fullDirPath, 'page.js');

    fs.mkdirSync(fullDirPath, { recursive: true });

    const title = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const content = `
      export const metadata = {
        title: '${title} - HustleHack AI',
        description: 'Auto-generated page for ${title}'
      }

      export default function Page() {
        return (
          <div className="min-h-screen p-10">
            <h1 className="text-4xl font-bold">${title}</h1>
            <p className="mt-4 text-gray-600">This is the ${title} page. Content coming soon.</p>
          </div>
        )
      }
    `.trim();

    fs.writeFileSync(pageFile, content);
  generatePages(obj[key], newPath);
  }
}

generatePages(structure);
console.log("✅ All static pages generated!");
