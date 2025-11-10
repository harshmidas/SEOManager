"use client";

import { useState } from "react";
import { NewsArticle, SEOMeta, Update } from "@/types/news";
import { apiFetch } from "@/utils/api";

const API_URL = "http://192.168.1.42:9291/api/v1/seo-news";
const HEADERS = {
  "accept": "*/*",
  "X-Tenant": "68cc764fbfc57730593b4a32",
  "X-User-ID": "658dfb086764754f1fa564d0",
  "Content-Type": "application/json",
};

interface NewsArticleFormProps {
  article?: NewsArticle | null;
  onClose: () => void;
  onSuccess: () => void;
}

const initialSEOMeta: SEOMeta = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "article",
  articlePublishedTime: "",
  articleModifiedTime: "",
  articleSection: "",
  articleTags: [],
  noIndex: false,
  structuredData: {}
};

const initialFormData: NewsArticle = {
  title: "",
  slug: "",
  content: "",
  summary: "",
  featuredImage: "",
  featuredImageAlt: "",
  mediaGallery: [],
  reporter: "",
  location: "",
  dateline: "",
  category: "Technology",
  tags: [],
  breakingNews: false,
  published: false,
  publishedAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  priority: "MEDIUM",
  source: "Arthur Global Media",
  sourceUrl: "",
  seoMeta: initialSEOMeta,
  viewCount: 0,
  shareCount: 0,
  relatedNewsIds: [],
  updates: [],
  status: "DRAFT",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: "admin",
  updatedBy: "admin",
  metadata: {}
};

export default function NewsArticleForm({ article, onClose, onSuccess }: NewsArticleFormProps) {
  const [formData, setFormData] = useState<NewsArticle>(article || initialFormData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [content, setContent] = useState(formData.content);
  const [mediaGallery, setMediaGallery] = useState<string[]>(formData.mediaGallery);
  const [newMediaUrl, setNewMediaUrl] = useState("");

  const categories = ["Technology", "Politics", "Business", "Health", "Entertainment", "Sports"];
  const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        content,
        mediaGallery
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      onSuccess();
    } catch (error) {
      console.error("Error creating news article:", error);
      alert("Failed to create news article. Please check the console for details.");
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

  const addMediaUrl = () => {
    if (newMediaUrl.trim() && !mediaGallery.includes(newMediaUrl.trim())) {
      setMediaGallery([...mediaGallery, newMediaUrl.trim()]);
      setNewMediaUrl("");
    }
  };

  const removeMediaUrl = (index: number) => {
    setMediaGallery(mediaGallery.filter((_, i) => i !== index));
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "📝" },
    { id: "content", label: "Content", icon: "📄" },
    { id: "media", label: "Media", icon: "🖼️" },
    { id: "seo", label: "SEO", icon: "🔍" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const renderBasicTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Headline *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="AI Revolutionizes Real-Time News Reporting in 2025"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="ai-revolutionizes-real-time-news-reporting-2025"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
        <textarea
          value={formData.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="Brief summary of the news story..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => updateField("priority", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reporter</label>
          <input
            type="text"
            value={formData.reporter}
            onChange={(e) => updateField("reporter", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Rachel Kim"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => updateField("location", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="New York, USA"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags.join(", ")}
          onChange={(e) => updateField("tags", e.target.value.split(",").map(tag => tag.trim()))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="Artificial Intelligence, Journalism, Automation"
        />
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 font-mono text-sm"
          placeholder="Write your news article content here..."
        />
        <div className="mt-2 text-sm text-gray-500">
          Word count: {content.split(/\s+/).filter(word => word.length > 0).length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
          <input
            type="url"
            value={formData.featuredImage}
            onChange={(e) => updateField("featuredImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
          <input
            type="text"
            value={formData.featuredImageAlt}
            onChange={(e) => updateField("featuredImageAlt", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      {formData.featuredImage && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Featured Image Preview:</p>
          <img
            src={formData.featuredImage}
            alt="Preview"
            className="max-h-48 rounded-lg border"
          />
        </div>
      )}
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Add Media URL</label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={newMediaUrl}
            onChange={(e) => setNewMediaUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <button
            type="button"
            onClick={addMediaUrl}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Media Gallery ({mediaGallery.length} items)
        </label>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {mediaGallery.map((url, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <img
                  src={url}
                  alt={`Media ${index + 1}`}
                  className="w-12 h-12 object-cover rounded border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-sm text-gray-600 truncate flex-1">{url}</span>
              </div>
              <button
                type="button"
                onClick={() => removeMediaUrl(index)}
                className="text-red-600 hover:text-red-700 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          {mediaGallery.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No media added yet
            </p>
          )}
        </div>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
        <textarea
          value={formData.seoMeta.metaDescription}
          onChange={(e) => updateField("seoMeta.metaDescription", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma-separated)</label>
        <input
          type="text"
          value={formData.seoMeta.metaKeywords.join(", ")}
          onChange={(e) => updateField("seoMeta.metaKeywords", e.target.value.split(",").map(k => k.trim()))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
          <input
            type="url"
            value={formData.seoMeta.canonicalUrl}
            onChange={(e) => updateField("seoMeta.canonicalUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
          <input
            type="url"
            value={formData.seoMeta.ogImage}
            onChange={(e) => updateField("seoMeta.ogImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.breakingNews}
            onChange={(e) => updateField("breakingNews", e.target.checked)}
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ml-2 text-sm text-gray-700">Breaking News</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => updateField("published", e.target.checked)}
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ml-2 text-sm text-gray-700">Published</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          value={formData.status}
          onChange={(e) => updateField("status", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
          <input
            type="datetime-local"
            value={formData.publishedAt.slice(0, 16)}
            onChange={(e) => updateField("publishedAt", new Date(e.target.value).toISOString())}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
          <input
            type="datetime-local"
            value={formData.expiresAt.slice(0, 16)}
            onChange={(e) => updateField("expiresAt", new Date(e.target.value).toISOString())}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
          <input
            type="text"
            value={formData.source}
            onChange={(e) => updateField("source", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Source URL</label>
          <input
            type="url"
            value={formData.sourceUrl}
            onChange={(e) => updateField("sourceUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic": return renderBasicTab();
      case "content": return renderContentTab();
      case "media": return renderMediaTab();
      case "seo": return renderSEOTab();
      case "settings": return renderSettingsTab();
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
              {article ? "Edit News Article" : "Create News Article"}
            </h2>
            <p className="text-gray-600">Manage breaking news and real-time content</p>
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
                    ? "border-red-500 text-red-600"
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
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create News Article"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}