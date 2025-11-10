export interface SEOMeta {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  structuredData: Record<string, any>;
  noIndex: boolean;
  noFollow: boolean;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  scheduledFor: string | null;
  seoMeta: SEOMeta;
  viewCount: number;
  shareCount: number;
  commentCount: number;
  readingTimeMinutes: number;
  relatedBlogIds: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  metadata: Record<string, any>;
}