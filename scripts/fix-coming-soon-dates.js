const fs = require('fs');
const path = require('path');

// Function to recursively find all .js files in a directory
function findJsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findJsFiles(fullPath, files);
    } else if (item.endsWith('.js') && !item.includes('ComingSoon')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix a single file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if this file uses ComingSoon component
    if (content.includes('ComingSoon') && content.includes('expectedDate={new Date(')) {
      console.log(`Fixing: ${filePath}`);
      
      // Add useMemo import if not present
      if (!content.includes('import { useMemo }')) {
        content = content.replace(
          /import ComingSoon from ['"]([^'"]+)['"];/,
          `import { useMemo } from 'react';\nimport ComingSoon from '$1';`
        );
      }
      
      // Add useMemo hook before the return statement
      if (!content.includes('const expectedDate = useMemo')) {
        content = content.replace(
          /export default function Page\(\) \{/,
          `export default function Page() {
  const expectedDate = useMemo(() => {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }, []);`
        );
      }
      
      // Replace the inline expectedDate with the memoized version
      content = content.replace(
        /expectedDate=\{new Date\(Date\.now\(\) \+ 30 \* 24 \* 60 \* 60 \* 1000\)\.toISOString\(\)\}/g,
        'expectedDate={expectedDate}'
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Main execution
console.log('🔧 Fixing ComingSoon component infinite loading issue...\n');

const resourceDir = path.join(__dirname, '../app/resources');
const files = findJsFiles(resourceDir);

console.log(`Found ${files.length} JavaScript files to check...\n`);

let fixedCount = 0;
for (const file of files) {
  const originalContent = fs.readFileSync(file, 'utf8');
  fixFile(file);
  
  // Check if the file was actually modified
  const newContent = fs.readFileSync(file, 'utf8');
  if (originalContent !== newContent) {
    fixedCount++;
  }
}

console.log(`\n🎉 Fixed ${fixedCount} files with infinite loading issues!`);
console.log('The ComingSoon pages should now load properly without infinite loops.'); 