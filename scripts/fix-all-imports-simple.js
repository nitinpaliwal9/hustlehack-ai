const fs = require('fs');
const path = require('path');

// Function to fix all import paths
function fixAllImports() {
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
      let originalContent = content;
      
      // Calculate the correct import path based on file depth
      const parts = filePath.split(path.sep);
      const appIndex = parts.indexOf('app');
      const depth = parts.length - appIndex - 1; // -1 for the page.js file
      const correctPath = '../'.repeat(depth) + 'components/ComingSoon';
      
      // Replace all incorrect import patterns
      const patterns = [
        /import ComingSoon from ['"`]\.\.\/\.\.\/\.\.\/\.\.\/components\/ComingSoon['"`];/g,
        /import ComingSoon from ['"`]\.\.\/\.\.\/\.\.\/components\/ComingSoon['"`];/g,
        /import ComingSoon from ['"`]\.\.\/\.\.\/components\/ComingSoon['"`];/g,
        /import ComingSoon from ['"`]\.\.\/components\/ComingSoon['"`];/g
      ];
      
      let wasFixed = false;
      
      for (const pattern of patterns) {
        if (content.match(pattern)) {
          content = content.replace(pattern, `import ComingSoon from '${correctPath}';`);
          wasFixed = true;
        }
      }
      
      if (wasFixed) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed: ${filePath}`);
        console.log(`   → ${correctPath}`);
        fixedCount++;
      } else {
        console.log(`✅ Already correct: ${filePath}`);
      }
      
    } catch (error) {
      console.log(`❌ Error fixing ${filePath}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Successfully fixed ${fixedCount} import paths!`);
}

// Main execution
if (require.main === module) {
  fixAllImports();
} 