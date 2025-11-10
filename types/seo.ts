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