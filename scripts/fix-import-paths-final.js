const fs = require('fs');
const path = require('path');

// Function to calculate correct import path
function getCorrectImportPath(filePath) {
  const parts = filePath.split(path.sep);
  const appIndex = parts.indexOf('app');
  
  if (appIndex === -1) {
    return null;
  }
  
  // Count how many levels deep we are from the app directory
  const depth = parts.length - appIndex - 1; // -1 for the page.js file
  
  return '../'.repeat(depth) + 'components/ComingSoon';
}

// Function to fix all import paths
function fixAllImportPaths() {
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
      const content = fs.readFileSync(filePath, 'utf8');
      const correctImportPath = getCorrectImportPath(filePath);
      
      if (!correctImportPath) {
        console.log(`❌ Skipping ${filePath} - could not calculate import path`);
        continue;
      }
      
      // Find the current import line
      const importRegex = /import ComingSoon from ['"`][^'"`]+['"`];/;
      const match = content.match(importRegex);
      
      if (match) {
        const currentImport = match[0];
        const newImport = `import ComingSoon from '${correctImportPath}';`;
        
        if (currentImport !== newImport) {
          const updatedContent = content.replace(importRegex, newImport);
          fs.writeFileSync(filePath, updatedContent);
          console.log(`✅ Fixed: ${filePath}`);
          console.log(`   ${currentImport} → ${newImport}`);
          fixedCount++;
        } else {
          console.log(`✅ Already correct: ${filePath}`);
        }
      } else {
        console.log(`❌ Could not find import statement in ${filePath}`);
      }
      
    } catch (error) {
      console.log(`❌ Error fixing ${filePath}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Successfully fixed ${fixedCount} import paths!`);
}

// Main execution
if (require.main === module) {
  fixAllImportPaths();
} 