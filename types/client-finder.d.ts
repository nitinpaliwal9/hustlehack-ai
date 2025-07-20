export type FinderState = {
  platform: "youtube";
  niches: string[];
  subsMin: number;
  subsMax: number;
  recentDays: number;
  regions: string[];
  needThumbnailHelp: boolean;
  maxResults: number;
  status: "idle" | "fetching" | "analyzing" | "scoring" | "ready" | "error";
  progress: number;         // 0-100
  sessionId?: string;
  results?: ChannelResult[];
  error?: string;
};

export type ChannelResult = {
  channelId: string;
  name: string;
  url: string;
  subs: number;
  country?: string;
  lastUpload?: string;      // ISO
  avgViews?: number;
  thumbSamples: string[];   // image URLs (cached)
  notes?: string;           // short AI insight
  scores: {
    thumbnailOppty: number; // 0-100
    activity: number;
    sizeFit: number;
    overall: number;        // weighted composite
  };
  contact?: {
    email?: string;
    socials?: { type: "instagram"|"twitter"|"website"; url: string }[];
  };
};

export type FinderUsage = {
  userId: string;
  month: string; // YYYY-MM
  searchesUsed: number;
}; 