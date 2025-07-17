'use server';
import { loadAllPromptPlatforms } from './loadInstagramPromptData';
import PremiumContentClient from './PremiumContentClient';

export default async function PremiumContentServer() {
  const platformData = await loadAllPromptPlatforms();
  return <PremiumContentClient platformData={platformData} />;
} 