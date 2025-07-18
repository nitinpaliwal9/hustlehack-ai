const fs = require('fs');
const path = require('path');

// Function to fix import paths
function fixImportPaths() {
  const resourcesDir = path.join(__dirname, '../app/resources');
  const filesToFix = [];
  
  // Recursively find all page.js files
  function findPageFiles(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findPageFiles(fullPath);
      } else if (item === 'page.js') {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes('import ComingSoon from')) {
            filesToFix.push(fullPath);
          }
        } catch (error) {
          console.log(`Error reading ${fullPath}:`, error.message);
        }
      }
    }
  }
  
  findPageFiles(resourcesDir);
  
  console.log(`Found ${filesToFix.length} files to fix:`);
  
  let fixedCount = 0;
  
  for (const filePath of filesToFix) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Calculate the correct import path
      const parts = filePath.split(path.sep);
      const appIndex = parts.indexOf('app');
      const depth = parts.length - appIndex - 2; // -2 to go up to app directory and exclude page.js
      const correctPath = '../'.repeat(depth) + 'components/ComingSoon.js';
      
      // Replace the import statement
      const importRegex = /import ComingSoon from ['"`][^'"`]+['"`];/;
      const match = content.match(importRegex);
      
      if (match) {
        const newImport = `import ComingSoon from '${correctPath}';`;
        const updatedContent = content.replace(importRegex, newImport);
        fs.writeFileSync(filePath, updatedContent);
        console.log(`✅ Fixed: ${filePath}`);
        console.log(`   → ${correctPath}`);
        fixedCount++;
      }
      
    } catch (error) {
      console.log(`❌ Error fixing ${filePath}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Successfully fixed ${fixedCount} import paths!`);
}

// Main execution
if (require.main === module) {
  fixImportPaths();
} 