const fs = require('fs');
const path = require('path');

// Function to get page title from file path
function getPageTitle(filePath) {
  const fileName = path.basename(filePath, '.js');
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Function to get category from file path
function getCategory(filePath) {
  const parts = filePath.split('/');
  if (parts.includes('ai-tools-stack')) return 'AI Tool';
  if (parts.includes('toolkits-and-templates')) return 'Toolkit';
  if (parts.includes('free-guides-and-blueprints')) return 'Guide';
  if (parts.includes('reels-and-video-shorts')) return 'Video Content';
  if (parts.includes('weekly-drop-archive')) return 'Weekly Drop';
  return 'Resource';
}

// Function to generate new page content
function generateNewPageContent(filePath) {
  const title = getPageTitle(filePath);
  const category = getCategory(filePath);
  
  // Calculate the relative path to the components directory
  const pathParts = filePath.split('/');
  const appIndex = pathParts.indexOf('app');
  const resourcesIndex = pathParts.indexOf('resources');
  const depth = pathParts.length - resourcesIndex - 1; // -1 for the page.js file
  
  const importPath = '../'.repeat(depth) + 'components/ComingSoon';
  
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
        if (content.includes('Content coming soon')) {
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
  
  console.log(`Found ${comingSoonPages.length} coming soon pages:`);
  
  for (const filePath of comingSoonPages) {
    try {
      const newContent = generateNewPageContent(filePath);
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Updated: ${filePath}`);
    } catch (error) {
      console.log(`❌ Error updating ${filePath}:`, error.message);
    }
  }
  
  console.log('\n🎉 All coming soon pages have been updated!');
}

if (require.main === module) {
  main();
} 