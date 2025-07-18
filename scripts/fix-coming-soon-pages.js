const fs = require('fs');
const path = require('path');

// Function to get page title from file path
function getPageTitle(filePath) {
  const parts = filePath.split(path.sep);
  const fileName = parts[parts.length - 2]; // Get the directory name, not the file name
  
  if (fileName === 'page') {
    // If it's a page.js file, get the parent directory name
    const parentDir = parts[parts.length - 3];
    return parentDir
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Function to get category from file path
function getCategory(filePath) {
  const parts = filePath.split(path.sep);
  if (parts.includes('ai-tools-stack')) return 'AI Tool';
  if (parts.includes('toolkits-and-templates')) return 'Toolkit';
  if (parts.includes('free-guides-and-blueprints')) return 'Guide';
  if (parts.includes('reels-and-video-shorts')) return 'Video Content';
  if (parts.includes('weekly-drop-archive')) return 'Weekly Drop';
  return 'Resource';
}

// Function to calculate correct import path
function getImportPath(filePath) {
  const parts = filePath.split(path.sep);
  const appIndex = parts.indexOf('app');
  const resourcesIndex = parts.indexOf('resources');
  
  // Count how many levels deep we are from the app directory
  const depth = parts.length - appIndex - 1; // -1 for the page.js file
  
  return '../'.repeat(depth) + 'components/ComingSoon';
}

// Function to generate new page content
function generateNewPageContent(filePath) {
  const title = getPageTitle(filePath);
  const category = getCategory(filePath);
  const importPath = getImportPath(filePath);
  
  return `'use client';

import ComingSoon from '${importPath}';

export default function Page() {
  return (
    <ComingSoon 
      title="${title}"
      description="We're crafting amazing ${category.toLowerCase()} content just for you. Get ready for exclusive templates, tools, and strategies that will supercharge your productivity!"
      category="${category}"
      expectedDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()}
      showNotificationSignup={true}
    />
  );
}`;
}

// Function to find all coming soon pages
function findComingSoonPages(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findComingSoonPages(fullPath, files);
    } else if (item === 'page.js') {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('ComingSoon') && content.includes('title="Page"')) {
          files.push(fullPath);
        }
      } catch (error) {
        console.log(`Error reading ${fullPath}:`, error.message);
      }
    }
  }
  
  return files;
}

// Main execution
function main() {
  const resourcesDir = path.join(__dirname, '../app/resources');
  const comingSoonPages = findComingSoonPages(resourcesDir);
  
  console.log(`Found ${comingSoonPages.length} pages to fix:`);
  
  for (const filePath of comingSoonPages) {
    try {
      const newContent = generateNewPageContent(filePath);
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Fixed: ${filePath}`);
    } catch (error) {
      console.log(`❌ Error fixing ${filePath}:`, error.message);
    }
  }
  
  console.log('\n🎉 All coming soon pages have been fixed!');
}

if (require.main === module) {
  main();
} 