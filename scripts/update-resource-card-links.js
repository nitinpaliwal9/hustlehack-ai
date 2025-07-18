const fs = require('fs');
const path = require('path');

// Function to update resource card links
function updateResourceCardLinks() {
  const filePath = path.join(__dirname, '../app/resources/page.js');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Define the mappings for href="#" to proper coming soon pages
    const linkMappings = [
      {
        oldLink: 'href="#" className="card-link" aria-label="Boost Income with Freelancer\'s Arsenal"',
        newLink: 'href="/resources/toolkits-and-templates/freelancers-arsenal" className="card-link" aria-label="Boost Income with Freelancer\'s Arsenal"'
      },
      {
        oldLink: 'href="#" className="card-link" style={{color: \'var(--gray-500)\'}} aria-label="Notify me when AI Automation Scripts are available"',
        newLink: 'href="/resources/toolkits-and-templates/ai-automation-scripts" className="card-link" style={{color: \'var(--gray-500)\'}} aria-label="Notify me when AI Automation Scripts are available"'
      },
      {
        oldLink: 'href="#" className="card-link" aria-label="Start Learning AI for Beginners"',
        newLink: 'href="/resources/free-guides-and-blueprints/ai-for-beginners" className="card-link" aria-label="Start Learning AI for Beginners"'
      },
      {
        oldLink: 'href="#" className="card-link" aria-label="Download Growth Hacking with AI Guide"',
        newLink: 'href="/resources/free-guides-and-blueprints/growth-hacking-with-ai" className="card-link" aria-label="Download Growth Hacking with AI Guide"'
      },
      {
        oldLink: 'href="#" className="card-link" aria-label="Get Student Success Blueprint"',
        newLink: 'href="/resources/free-guides-and-blueprints/student-success-blueprint" className="card-link" aria-label="Get Student Success Blueprint"'
      },
      {
        oldLink: 'href="#" className="card-link" aria-label="Explore AI Side Hustle Ideas"',
        newLink: 'href="/resources/free-guides-and-blueprints/ai-side-hustle-ideas" className="card-link" aria-label="Explore AI Side Hustle Ideas"'
      },
      {
        oldLink: 'href="#" className="drop-link" aria-label="View AI Content Calendar Mastery Drop"',
        newLink: 'href="/resources/weekly-drop-archive/week-15-jan-2025" className="drop-link" aria-label="View AI Content Calendar Mastery Drop"'
      },
      {
        oldLink: 'href="#" className="drop-link" aria-label="Access Student Research Assistant Drop"',
        newLink: 'href="/resources/weekly-drop-archive/week-14-jan-2025" className="drop-link" aria-label="Access Student Research Assistant Drop"'
      },
      {
        oldLink: 'href="#" className="drop-link" aria-label="Get Viral Video Scripts Pack"',
        newLink: 'href="/resources/weekly-drop-archive/week-13-jan-2025" className="drop-link" aria-label="Get Viral Video Scripts Pack"'
      },
      {
        oldLink: 'href="#" className="drop-link" aria-label="Download AI Email Marketing Suite"',
        newLink: 'href="/resources/weekly-drop-archive/week-12-dec-2024" className="drop-link" aria-label="Download AI Email Marketing Suite"'
      },
      {
        oldLink: 'href="#" className="drop-link" aria-label="View Freelancer Proposal Generator Drop"',
        newLink: 'href="/resources/weekly-drop-archive/week-11-dec-2024" className="drop-link" aria-label="View Freelancer Proposal Generator Drop"'
      },
      {
        oldLink: 'href="#" className="drop-link" aria-label="Automate Social Media with AI"',
        newLink: 'href="/resources/weekly-drop-archive/week-10-dec-2024" className="drop-link" aria-label="Automate Social Media with AI"'
      },
      {
        oldLink: 'href="#" className="card-link" aria-label="Watch 60-Second AI Tips Series"',
        newLink: 'href="/resources/reels-and-video-shorts/60-second-ai-tips" className="card-link" aria-label="Watch 60-Second AI Tips Series"'
      },
      {
        oldLink: 'href="#" className="card-link" aria-label="Start Watching Tool Tutorials"',
        newLink: 'href="/resources/reels-and-video-shorts/tool-tutorials" className="card-link" aria-label="Start Watching Tool Tutorials"'
      },
      {
        oldLink: 'href="#" className="card-link" aria-label="Get Inspired by Success Stories"',
        newLink: 'href="/resources/reels-and-video-shorts/success-stories" className="card-link" aria-label="Get Inspired by Success Stories"'
      }
    ];
    
    // Apply all the mappings
    let updatedContent = content;
    let updateCount = 0;
    
    linkMappings.forEach(mapping => {
      if (updatedContent.includes(mapping.oldLink)) {
        updatedContent = updatedContent.replace(mapping.oldLink, mapping.newLink);
        updateCount++;
        console.log(`✅ Updated: ${mapping.oldLink.split('aria-label="')[1].split('"')[0]}`);
      }
    });
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`\n🎉 Successfully updated ${updateCount} resource card links!`);
    console.log('All href="#" links now point to proper coming soon pages.');
    
  } catch (error) {
    console.error('❌ Error updating resource card links:', error.message);
  }
}

// Main execution
if (require.main === module) {
  updateResourceCardLinks();
} 