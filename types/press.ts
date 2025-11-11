export interface ContactInfo {
  mediaContactName: string;
  mediaContactEmail: string;
  mediaContactPhone: string;
  prContactName: string;
  prContactEmail: string;
  prContactPhone: string;
  additionalContacts: {
    mediaRelations: string;
    investorRelations: string;
    customerSupport: string;
  };
}

export interface DistributionConfig {
  autoDistribute: boolean;
  distributionChannels: string[];
  targetMediaOutlets: string[];
  scheduledDistributionTime: string;
  customSettings: Record<string, any>;
}

export interface DistributionHistory {
  distributedAt: string;
  channel: string;
  status: string;
  responseMessage: string;
  metadata: Record<string, any>;
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
  noIndex: boolean;
  structuredData: Record<string, any>;
}

export interface PressRelease {
  id?: string;
  title: string;
  slug: string;
  content: string;
  subtitle: string;
  summary: string;
  featuredImage: string;
  featuredImageAlt: string;
  mediaAssets: string[];
  companyName: string;
  companyLogo: string;
  companyWebsite: string;
  contactInfo: ContactInfo;
  releaseDate: string;
  location: string;
  boilerplate: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  distributionConfig: DistributionConfig;
  distributionHistory: DistributionHistory[];
  seoMeta: SEOMeta;
  viewCount: number;
  downloadCount: number;
  shareCount: number;
  relatedPressIds: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  metadata: Record<string, any>;
}
