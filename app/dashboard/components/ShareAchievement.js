import { useState } from 'react';
import { Copy, Twitter, Linkedin } from 'lucide-react';

export default function ShareAchievement({ achievement }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const shareText = `I just unlocked the ${achievement.title} achievement on HustleHack AI! 🎉 #HustleHackAI`;
  const shareUrl = 'https://hustlehack-ai.com'; // Consider making this dynamic if possible

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      .then(() => setCopySuccess(true))
      .catch((err) => console.error('Copy failed', err));
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={copyToClipboard}
        className="flex items-center px-3 py-1"
        style={{ background: 'var(--bg-surface)' }}
      >
        <Copy className="w-4 h-4 mr-2" />
        {copySuccess ? 'Copied!' : 'Copy'}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-3 py-1"
        style={{ background: 'var(--bg-primary)' }}
      >
        <Twitter className="w-4 h-4 mr-2" />
        Tweet
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-3 py-1"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <Linkedin className="w-4 h-4 mr-2" />
        Share
      </a>
    </div>
  );
}
