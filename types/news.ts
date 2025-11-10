export interface Update {
  timestamp: string;
  updateType: string;
  content: string;
  updatedBy: string;
}

export interface SEOMeta {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  articlePublishedTime: string;
  articleModifiedTime: string;
  articleSection: string;
  articleTags: string[];
  noIndex: boolean;
  structuredData: Record<string, any>;
}

export interface NewsArticle {
  id?: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  featuredImage: string;
  featuredImageAlt: string;
  mediaGallery: string[];
  reporter: string;
  location: string;
  dateline: string;
  category: string;
  tags: string[];
  breakingNews: boolean;
  published: boolean;
  publishedAt: string;
  expiresAt: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  source: string;
  sourceUrl: string;
  seoMeta: SEOMeta;
  viewCount: number;
  shareCount: number;
  relatedNewsIds: string[];
  updates: Update[];
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  metadata: Record<string, any>;
}