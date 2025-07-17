import fs from 'fs/promises';
import path from 'path';

export async function loadInstagramPromptData() {
  const dir = path.join(process.cwd(), 'app/data/social-media-prompt-pack/instagram');
  const files = await fs.readdir(dir);
  const categories = [];
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(dir, file);
      const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
      // Support both {category, prompts} and {name, prompts}
      categories.push({
        name: data.category || data.name,
        prompts: data.prompts
      });
    }
  }
  return { name: 'Instagram', categories };
}

export async function loadBonusVault() {
  const file = path.join(process.cwd(), 'app/data/social-media-prompt-pack/bonus_vault.json');
  return JSON.parse(await fs.readFile(file, 'utf-8'));
} 