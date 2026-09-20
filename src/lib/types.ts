export interface Podcast {
  id: string;
  title: string;
  rawTitle: string;
  dateCode: string;
  createdAt?: number;
  youtubeId: string | null;
  feishuUrl: string;
  intro: string[];
  highlights: string[];
  fullText: string;
  ytTitle: string | null;
  ytChannel: string | null;
  ytChannelUrl: string | null;
  ytViews: number | null;
  ytPublished: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  time: string;
  source: string;
  author: string;
  category?: string;
  body: string;
  url?: string;
  digest_date?: string;
  notes?: string;
}
