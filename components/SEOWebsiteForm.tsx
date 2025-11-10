"use client";

import { useState } from "react";
import { SEOWebsite, SEOConfig, BrandingConfig, JobFeedConfig, AnalyticsConfig, CustomScripts, ContactInfo, SocialLinks } from "@/types/seo";
import { apiFetch } from "@/utils/api";

const API_URL = "http://157.20.214.84:9292/api/v1/seo-websites";
const HEADERS = {
  "X-Tenant": "68b20dd0fb42964f2328b424",
  "X-User-ID": "658dfb086764754f1fa564d0",
  "Content-Type": "application/json",
};

interface SEOWebsiteFormProps {
  website?: SEOWebsite | null;
  onClose: () => void;
  onSuccess: () => void;
}

const initialSEOConfig: SEOConfig = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  robotsTxt: "User-agent: *\nAllow: /",
  sitemapUrl: "",
  favicon: "",
  ogImage: "",
  twitterCard: "summary_large_image",
  structuredData: { organization: "", websiteType: "" },
  indexable: true,
  canonicalUrl: ""
};

const initialBrandingConfig: BrandingConfig = {
  logo: "",
  primaryColor: "#004AAD",
  secondaryColor: "#FFCC00",
  fontFamily: "Inter, Arial, sans-serif",
  customCss: "",
  headerHtml: "",
  footerHtml: "",
  bannerImage: ""
};

const initialJobFeedConfig: JobFeedConfig = {
  jobCategories: [],
  locations: [],
  jobsPerPage: 20,
  sortOrder: "recent",
  showSalary: true,
  showCompanyLogo: true,
  enableApply: true,
  applyRedirectUrl: "",
  customFilters: { experience: "0-10 years", jobType: "Full-time" }
};

const initialFormData: SEOWebsite = {
  name: "",
  domain: "",
  baseUrl: "",
  description: "",
  active: true,
  seoConfig: initialSEOConfig,
  brandingConfig: initialBrandingConfig,
  jobFeedConfig: initialJobFeedConfig,
  analyticsConfig: {
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",
    linkedInInsightTag: "",
    customTracking: { hotjarId: "" }
  },
  customScripts: {
    headerScripts: "",
    footerScripts: "",
    externalScripts: []
  },
  contactInfo: {
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    additionalContacts: { HR: "" }
  },
  socialLinks: {
    linkedin: "",
    facebook: "",
    twitter: ""
  },
  metadata: {
    theme: "default-blue",
    deploymentEnvironment: "production"
  },
  status: "ACTIVE",
  createdBy: "admin",
  updatedBy: "admin"
};

export default function SEOWebsiteForm({ website, onClose, onSuccess }: SEOWebsiteFormProps) {
  const [formData, setFormData] = useState<SEOWebsite>(website || initialFormData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      onSuccess();
    } catch (error) {
      console.error("Error creating SEO website:", error);
      alert("Failed to create SEO website. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (path: string, value: any) => {
    setFormData(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] = { ...current[keys[i]] };
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "📝" },
    { id: "seo", label: "SEO Config", icon: "🔍" },
    { id: "branding", label: "Branding", icon: "🎨" },
    { id: "jobs", label: "Job Feed", icon: "💼" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "contact", label: "Contact", icon: "📞" },
  ];

  const renderBasicTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="theartemisai Careers Portal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
          <input
            type="text"
            value={formData.domain}
            onChange={(e) => updateField("domain", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="theartemis.ai"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Base URL</label>
        <input
          type="url"
          value={formData.baseUrl}
          onChange={(e) => updateField("baseUrl", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://theartemis.ai"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your website..."
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.active}
          onChange={(e) => updateField("active", e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm text-gray-700">Active Website</label>
      </div>
    </div>
  );

  const renderSEOTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
          <input
            type="text"
            value={formData.seoConfig.metaTitle}
            onChange={(e) => updateField("seoConfig.metaTitle", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
          <input
            type="url"
            value={formData.seoConfig.canonicalUrl}
            onChange={(e) => updateField("seoConfig.canonicalUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
        <textarea
          value={formData.seoConfig.metaDescription}
          onChange={(e) => updateField("seoConfig.metaDescription", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma-separated)</label>
        <input
          type="text"
          value={formData.seoConfig.metaKeywords.join(", ")}
          onChange={(e) => updateField("seoConfig.metaKeywords", e.target.value.split(",").map(k => k.trim()))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="jobs, careers, IT jobs, healthcare jobs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
          <input
            type="url"
            value={formData.seoConfig.ogImage}
            onChange={(e) => updateField("seoConfig.ogImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
          <input
            type="url"
            value={formData.seoConfig.favicon}
            onChange={(e) => updateField("seoConfig.favicon", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic": return renderBasicTab();
      case "seo": return renderSEOTab();
      // Add other tab renderers here
      default: return renderBasicTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {website ? "Edit Website" : "Create New Website"}
            </h2>
            <p className="text-gray-600">Configure your website settings</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit}>
            {renderTabContent()}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Website"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}