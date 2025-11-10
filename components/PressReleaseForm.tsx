"use client";

import { useState } from "react";
import { PressRelease, ContactInfo, DistributionConfig, SEOMeta } from "@/types/press";
import { apiFetch } from "@/utils/api";

const API_URL = "http://192.168.1.42:9291/api/v1/seo-press";
const HEADERS = {
  "accept": "*/*",
  "X-Tenant": "68cc764fbfc57730593b4a32",
  "X-User-ID": "658dfb086764754f1fa564d0",
  "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcmNoaXQubWlzaHJhQG1pZGFzY29uc3VsdGluZy5vcmciLCJpYXQiOjE3NjI4MDQ3NTgsImV4cCI6MTc2Mjg5MTE1OH0.6_JIYgzh7sdM0Z1SFVclmwSrGIxX0Pe0coOU1CueBkTJavneEWKbBcmbYf3qwxYPh__TP9g4XyUjlqB7nojIrw",
  "Content-Type": "application/json",
};

interface PressReleaseFormProps {
  release?: PressRelease | null;
  onClose: () => void;
  onSuccess: () => void;
}

const initialContactInfo: ContactInfo = {
  mediaContactName: "",
  mediaContactEmail: "",
  mediaContactPhone: "",
  prContactName: "",
  prContactEmail: "",
  prContactPhone: "",
  additionalContacts: {}
};

const initialDistributionConfig: DistributionConfig = {
  autoDistribute: false,
  distributionChannels: [],
  targetMediaOutlets: [],
  scheduledDistributionTime: "",
  customSettings: {}
};

const initialSEOMeta: SEOMeta = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "article",
  noIndex: false,
  structuredData: {}
};

const initialFormData: PressRelease = {
  title: "",
  slug: "",
  content: "",
  subtitle: "",
  summary: "",
  featuredImage: "",
  featuredImageAlt: "",
  mediaAssets: [],
  companyName: "Artemis AI",
  companyLogo: "",
  companyWebsite: "",
  contactInfo: initialContactInfo,
  releaseDate: new Date().toISOString(),
  location: "",
  boilerplate: "",
  category: "Technology",
  tags: [],
  featured: false,
  published: false,
  publishedAt: "",
  distributionConfig: initialDistributionConfig,
  distributionHistory: [],
  seoMeta: initialSEOMeta,
  viewCount: 0,
  downloadCount: 0,
  shareCount: 0,
  relatedPressIds: [],
  status: "DRAFT",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: "admin",
  updatedBy: "admin",
  metadata: {}
};

export default function PressReleaseForm({ release, onClose, onSuccess }: PressReleaseFormProps) {
  const [formData, setFormData] = useState<PressRelease>(release || initialFormData);
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
      console.error("Error creating press release:", error);
      alert("Failed to create press release. Please check the console for details.");
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
    { id: "content", label: "Content", icon: "📄" },
    { id: "contact", label: "Contact Info", icon: "📞" },
    { id: "distribution", label: "Distribution", icon: "📤" },
    { id: "seo", label: "SEO", icon: "🔍" },
  ];

  const categories = ["Technology", "Healthcare", "Finance", "Announcement", "Partnership"];
  const distributionChannels = ["PR Newswire", "BusinessWire", "LinkedIn", "Twitter", "Facebook", "Email"];

  const renderBasicTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Artemis AI Launches New Staffing Automation Suite"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="artemis-ai-staffing-automation-suite"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) => updateField("subtitle", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Revolutionizing workforce management with artificial intelligence"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Release Date</label>
          <input
            type="datetime-local"
            value={formData.releaseDate.slice(0, 16)}
            onChange={(e) => updateField("releaseDate", new Date(e.target.value).toISOString())}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags.join(", ")}
          onChange={(e) => updateField("tags", e.target.value.split(",").map(tag => tag.trim()))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="AI, Automation, Staffing, Healthcare"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Featured Release</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => updateField("published", e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Published</label>
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
        <textarea
          value={formData.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief summary of the press release..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => updateField("content", e.target.value)}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Full press release content..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Boilerplate</label>
        <textarea
          value={formData.boilerplate}
          onChange={(e) => updateField("boilerplate", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Company description..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
          <input
            type="url"
            value={formData.featuredImage}
            onChange={(e) => updateField("featuredImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
          <input
            type="text"
            value={formData.featuredImageAlt}
            onChange={(e) => updateField("featuredImageAlt", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Media Contact Name</label>
          <input
            type="text"
            value={formData.contactInfo.mediaContactName}
            onChange={(e) => updateField("contactInfo.mediaContactName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Media Contact Email</label>
          <input
            type="email"
            value={formData.contactInfo.mediaContactEmail}
            onChange={(e) => updateField("contactInfo.mediaContactEmail", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PR Contact Name</label>
          <input
            type="text"
            value={formData.contactInfo.prContactName}
            onChange={(e) => updateField("contactInfo.prContactName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PR Contact Email</label>
          <input
            type="email"
            value={formData.contactInfo.prContactEmail}
            onChange={(e) => updateField("contactInfo.prContactEmail", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => updateField("location", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderDistributionTab = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.distributionConfig.autoDistribute}
          onChange={(e) => updateField("distributionConfig.autoDistribute", e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm text-gray-700">Auto-distribute on release</label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Distribution Channels</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {distributionChannels.map(channel => (
            <div key={channel} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.distributionConfig.distributionChannels.includes(channel)}
                onChange={(e) => {
                  const current = formData.distributionConfig.distributionChannels;
                  const updated = e.target.checked
                    ? [...current, channel]
                    : current.filter(c => c !== channel);
                  updateField("distributionConfig.distributionChannels", updated);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">{channel}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Distribution Time</label>
        <input
          type="datetime-local"
          value={formData.distributionConfig.scheduledDistributionTime?.slice(0, 16) || ""}
          onChange={(e) => updateField("distributionConfig.scheduledDistributionTime", new Date(e.target.value).toISOString())}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderSEOTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
        <input
          type="text"
          value={formData.seoMeta.metaTitle}
          onChange={(e) => updateField("seoMeta.metaTitle", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
        <textarea
          value={formData.seoMeta.metaDescription}
          onChange={(e) => updateField("seoMeta.metaDescription", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma-separated)</label>
        <input
          type="text"
          value={formData.seoMeta.metaKeywords.join(", ")}
          onChange={(e) => updateField("seoMeta.metaKeywords", e.target.value.split(",").map(k => k.trim()))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
          <input
            type="url"
            value={formData.seoMeta.canonicalUrl}
            onChange={(e) => updateField("seoMeta.canonicalUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
          <input
            type="url"
            value={formData.seoMeta.ogImage}
            onChange={(e) => updateField("seoMeta.ogImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic": return renderBasicTab();
      case "content": return renderContentTab();
      case "contact": return renderContactTab();
      case "distribution": return renderDistributionTab();
      case "seo": return renderSEOTab();
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
              {release ? "Edit Press Release" : "Create New Press Release"}
            </h2>
            <p className="text-gray-600">Manage your press release content and distribution</p>
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
                {loading ? "Creating..." : "Create Press Release"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}