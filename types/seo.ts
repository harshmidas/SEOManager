export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  robotsTxt: string;
  sitemapUrl: string;
  favicon: string;
  ogImage: string;
  twitterCard: string;
  structuredData: Record<string, any>;
  indexable: boolean;
  canonicalUrl: string;
}

export interface BrandingConfig {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customCss: string;
  headerHtml: string;
  footerHtml: string;
  bannerImage: string;
}

export interface JobFeedConfig {
  jobCategories: string[];
  locations: string[];
  jobsPerPage: number;
  sortOrder: string;
  showSalary: boolean;
  showCompanyLogo: boolean;
  enableApply: boolean;
  applyRedirectUrl: string;
  customFilters: Record<string, any>;
}

export interface AnalyticsConfig {
  googleAnalyticsId: string;
  googleTagManagerId: string;
  facebookPixelId: string;
  linkedInInsightTag: string;
  customTracking: Record<string, any>;
}

export interface CustomScripts {
  headerScripts: string;
  footerScripts: string;
  externalScripts: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  additionalContacts: Record<string, any>;
}

export interface SocialLinks {
  linkedin: string;
  facebook: string;
  twitter: string;
}

export interface SEOWebsite {
  id?: string;
  name: string;
  domain: string;
  baseUrl: string;
  description: string;
  active: boolean;
  seoConfig: SEOConfig;
  brandingConfig: BrandingConfig;
  jobFeedConfig: JobFeedConfig;
  analyticsConfig: AnalyticsConfig;
  customScripts: CustomScripts;
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  metadata: Record<string, any>;
  status: string;
  createdBy: string;
  updatedBy: string;
}

// Add these interfaces to your existing seo.ts file

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  anchor: string;
}

export interface Reference {
  title: string;
  url: string;
  author: string;
  accessedDate: string;
  type: string;
}

export interface SEOArticleMeta {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  noIndex: boolean;
  structuredData: Record<string, any>;
}

export interface SEOArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  featuredImage: string;
  featuredImageAlt: string;
  galleryImages: string[];
  author: string;
  authorBio: string;
  authorAvatar: string;
  authorLinkedIn: string;
  category: string;
  subCategory: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  articleType: "TUTORIAL" | "GUIDE" | "BLOG" | "NEWS" | "REVIEW";
  difficultyLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  seoMeta: SEOArticleMeta;
  viewCount: number;
  shareCount: number;
  bookmarkCount: number;
  readingTimeMinutes: number;
  tableOfContents: TableOfContentsItem[];
  references: Reference[];
  relatedArticleIds: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  metadata: Record<string, any>;
}