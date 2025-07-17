import fs from 'fs/promises';
import path from 'path';

const PLATFORM_DIRS = [
  { name: 'Instagram', dir: 'instagram' },
  { name: 'LinkedIn', dir: 'linkedin' },
  { name: 'Twitter', dir: 'twitter' }
];

export async function loadAllPromptPlatforms() {
  const baseDir = path.join(process.cwd(), 'app/data/social-media-prompt-pack');
  const platforms = [];
  for (const { name, dir } of PLATFORM_DIRS) {
    const platformPath = path.join(baseDir, dir);
    let categories = [];
    try {
      const files = await fs.readdir(platformPath);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(platformPath, file);
          const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
          categories.push({
            name: data.category || data.name,
            prompts: data.prompts
          });
        }
      }
    } catch (err) {
      // Folder may not exist or be empty; skip
    }
    platforms.push({ name, categories });
  }
  return { platforms };
}

export async function loadBonusVault() {
  const file = path.join(process.cwd(), 'app/data/social-media-prompt-pack/bonus_vault.json');
  return JSON.parse(await fs.readFile(file, 'utf-8'));
} 