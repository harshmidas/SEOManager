  // "use client";

  // import { useState } from "react";
  // import { SEOWebsite, SEOConfig, BrandingConfig, JobFeedConfig, AnalyticsConfig, CustomScripts, ContactInfo, SocialLinks } from "@/types/seo";
  // import { apiFetch } from "@/utils/api";

  // const API_URL = "http://157.20.214.84:9292/api/v1/seo-websites";
  // const HEADERS = {
  //   "X-Tenant": "68b20dd0fb42964f2328b424",
  //   "X-User-ID": "658dfb086764754f1fa564d0",
  //   "Content-Type": "application/json",
  // };

  // interface SEOWebsiteFormProps {
  //   website?: SEOWebsite | null;
  //   onClose: () => void;
  //   onSuccess: () => void;
  // }

  // const initialSEOConfig: SEOConfig = {
  //   metaTitle: "",
  //   metaDescription: "",
  //   metaKeywords: [],
  //   robotsTxt: "User-agent: *\nAllow: /",
  //   sitemapUrl: "",
  //   favicon: "",
  //   ogImage: "",
  //   twitterCard: "summary_large_image",
  //   structuredData: { organization: "", websiteType: "" },
  //   indexable: true,
  //   canonicalUrl: ""
  // };

  // const initialBrandingConfig: BrandingConfig = {
  //   logo: "",
  //   primaryColor: "#004AAD",
  //   secondaryColor: "#FFCC00",
  //   fontFamily: "Inter, Arial, sans-serif",
  //   customCss: "",
  //   headerHtml: "",
  //   footerHtml: "",
  //   bannerImage: ""
  // };

  // const initialJobFeedConfig: JobFeedConfig = {
  //   jobCategories: [],
  //   locations: [],
  //   jobsPerPage: 20,
  //   sortOrder: "recent",
  //   showSalary: true,
  //   showCompanyLogo: true,
  //   enableApply: true,
  //   applyRedirectUrl: "",
  //   customFilters: { experience: "0-10 years", jobType: "Full-time" }
  // };

  // const initialFormData: SEOWebsite = {
  //   name: "",
  //   domain: "",
  //   baseUrl: "",
  //   description: "",
  //   active: true,
  //   seoConfig: initialSEOConfig,
  //   brandingConfig: initialBrandingConfig,
  //   jobFeedConfig: initialJobFeedConfig,
  //   analyticsConfig: {
  //     googleAnalyticsId: "",
  //     googleTagManagerId: "",
  //     facebookPixelId: "",
  //     linkedInInsightTag: "",
  //     customTracking: { hotjarId: "" }
  //   },
  //   customScripts: {
  //     headerScripts: "",
  //     footerScripts: "",
  //     externalScripts: []
  //   },
  //   contactInfo: {
  //     email: "",
  //     phone: "",
  //     address: "",
  //     city: "",
  //     state: "",
  //     zipCode: "",
  //     country: "India",
  //     additionalContacts: { HR: "" }
  //   },
  //   socialLinks: {
  //     linkedin: "",
  //     facebook: "",
  //     twitter: ""
  //   },
  //   metadata: {
  //     theme: "default-blue",
  //     deploymentEnvironment: "production"
  //   },
  //   status: "ACTIVE",
  //   createdBy: "admin",
  //   updatedBy: "admin"
  // };

  // export default function SEOWebsiteForm({ website, onClose, onSuccess }: SEOWebsiteFormProps) {
  //   const [formData, setFormData] = useState<SEOWebsite>(website || initialFormData);
  //   const [loading, setLoading] = useState(false);
  //   const [activeTab, setActiveTab] = useState("basic");

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     try {
  //       const response = await fetch(API_URL, {
  //         method: "POST",
  //         headers: HEADERS,
  //         body: JSON.stringify(formData),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const result = await response.json();
  //       console.log("Success:", result);
  //       onSuccess();
  //     } catch (error) {
  //       console.error("Error creating SEO website:", error);
  //       alert("Failed to create SEO website. Please check the console for details.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const updateField = (path: string, value: any) => {
  //     setFormData(prev => {
  //       const keys = path.split('.');
  //       const updated = { ...prev };
  //       let current: any = updated;
        
  //       for (let i = 0; i < keys.length - 1; i++) {
  //         current = current[keys[i]] = { ...current[keys[i]] };
  //       }
        
  //       current[keys[keys.length - 1]] = value;
  //       return updated;
  //     });
  //   };

  //   const tabs = [
  //     { id: "basic", label: "Basic Info", icon: "📝" },
  //     { id: "seo", label: "SEO Config", icon: "🔍" },
  //     { id: "branding", label: "Branding", icon: "🎨" },
  //     { id: "jobs", label: "Job Feed", icon: "💼" },
  //     { id: "analytics", label: "Analytics", icon: "📊" },
  //     { id: "contact", label: "Contact", icon: "📞" },
  //   ];

  //   const renderBasicTab = () => (
  //     <div className="space-y-6">
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Website Name</label>
  //           <input
  //             type="text"
  //             value={formData.name}
  //             onChange={(e) => updateField("name", e.target.value)}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             placeholder="theartemisai Careers Portal"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
  //           <input
  //             type="text"
  //             value={formData.domain}
  //             onChange={(e) => updateField("domain", e.target.value)}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             placeholder="theartemis.ai"
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Base URL</label>
  //         <input
  //           type="url"
  //           value={formData.baseUrl}
  //           onChange={(e) => updateField("baseUrl", e.target.value)}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //           placeholder="https://theartemis.ai"
  //         />
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
  //         <textarea
  //           value={formData.description}
  //           onChange={(e) => updateField("description", e.target.value)}
  //           rows={3}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //           placeholder="Describe your website..."
  //         />
  //       </div>

  //       <div className="flex items-center">
  //         <input
  //           type="checkbox"
  //           checked={formData.active}
  //           onChange={(e) => updateField("active", e.target.checked)}
  //           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
  //         />
  //         <label className="ml-2 text-sm text-gray-700">Active Website</label>
  //       </div>
  //     </div>
  //   );

  //   const renderSEOTab = () => (
  //     <div className="space-y-6">
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
  //           <input
  //             type="text"
  //             value={formData.seoConfig.metaTitle}
  //             onChange={(e) => updateField("seoConfig.metaTitle", e.target.value)}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
  //           <input
  //             type="url"
  //             value={formData.seoConfig.canonicalUrl}
  //             onChange={(e) => updateField("seoConfig.canonicalUrl", e.target.value)}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
  //         <textarea
  //           value={formData.seoConfig.metaDescription}
  //           onChange={(e) => updateField("seoConfig.metaDescription", e.target.value)}
  //           rows={3}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //         />
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma-separated)</label>
  //         <input
  //           type="text"
  //           value={formData.seoConfig.metaKeywords.join(", ")}
  //           onChange={(e) => updateField("seoConfig.metaKeywords", e.target.value.split(",").map(k => k.trim()))}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //           placeholder="jobs, careers, IT jobs, healthcare jobs"
  //         />
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
  //           <input
  //             type="url"
  //             value={formData.seoConfig.ogImage}
  //             onChange={(e) => updateField("seoConfig.ogImage", e.target.value)}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
  //           <input
  //             type="url"
  //             value={formData.seoConfig.favicon}
  //             onChange={(e) => updateField("seoConfig.favicon", e.target.value)}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );

  //   const renderTabContent = () => {
  //     switch (activeTab) {
  //       case "basic": return renderBasicTab();
  //       case "seo": return renderSEOTab();
  //       // Add other tab renderers here
  //       default: return renderBasicTab();
  //     }
  //   };

  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  //       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
  //         {/* Header */}
  //         <div className="flex items-center justify-between p-6 border-b border-gray-200">
  //           <div>
  //             <h2 className="text-2xl font-bold text-gray-900">
  //               {website ? "Edit Website" : "Create New Website"}
  //             </h2>
  //             <p className="text-gray-600">Configure your website settings</p>
  //           </div>
  //           <button
  //             onClick={onClose}
  //             className="text-gray-400 hover:text-gray-600 transition-colors"
  //           >
  //             <span className="text-2xl">×</span>
  //           </button>
  //         </div>

  //         {/* Tabs */}
  //         <div className="border-b border-gray-200">
  //           <div className="flex space-x-8 px-6 overflow-x-auto">
  //             {tabs.map((tab) => (
  //               <button
  //                 key={tab.id}
  //                 onClick={() => setActiveTab(tab.id)}
  //                 className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
  //                   activeTab === tab.id
  //                     ? "border-blue-500 text-blue-600"
  //                     : "border-transparent text-gray-500 hover:text-gray-700"
  //                 }`}
  //               >
  //                 <span>{tab.icon}</span>
  //                 <span className="font-medium">{tab.label}</span>
  //               </button>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Form Content */}
  //         <div className="p-6 overflow-y-auto max-h-[60vh]">
  //           <form onSubmit={handleSubmit}>
  //             {renderTabContent()}

  //             {/* Form Actions */}
  //             <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-8">
  //               <button
  //                 type="button"
  //                 onClick={onClose}
  //                 className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
  //               >
  //                 Cancel
  //               </button>
  //               <button
  //                 type="submit"
  //                 disabled={loading}
  //                 className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
  //               >
  //                 {loading ? "Creating..." : "Create Website"}
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }









































  "use client";

  import { useState, useEffect } from "react";
  import { SEOWebsite, SEOConfig, BrandingConfig, JobFeedConfig, AnalyticsConfig, CustomScripts, ContactInfo } from "@/types/seo";

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

  // Helper function to deeply merge objects
  const deepMerge = (target: any, source: any) => {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  };

  const initialSEOConfig: SEOConfig = {
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    robotsTxt: "User-agent: *\nAllow: /",
    sitemapUrl: "",
    favicon: "",
    ogImage: "",
    twitterCard: "summary_large_image",
    structuredData: {},
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
    customFilters: {}
  };

  const initialAnalyticsConfig: AnalyticsConfig = {
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",
    linkedInInsightTag: "",
    customTracking: {}
  };

  const initialCustomScripts: CustomScripts = {
    headerScripts: "",
    footerScripts: "",
    externalScripts: []
  };

  const initialContactInfo: ContactInfo = {
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    additionalContacts: {}
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
    analyticsConfig: initialAnalyticsConfig,
    customScripts: initialCustomScripts,
    contactInfo: initialContactInfo,
    socialLinks: {linkedin: "", facebook: "", twitter: ""},
    metadata: {},
    status: "DRAFT",
    createdBy: "admin" ,
    updatedBy: "admin"
  };

  export default function SEOWebsiteForm({ website, onClose, onSuccess }: SEOWebsiteFormProps) {
    const [formData, setFormData] = useState<SEOWebsite>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("basic");

    // Initialize form data when website prop changes
    useEffect(() => {
      if (website) {
        // Deep merge to ensure all nested objects are properly initialized
        const mergedData = deepMerge(initialFormData, website);
        setFormData(mergedData);
      } else {
        setFormData(initialFormData);
      }
    }, [website]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const isEdit = !!website?.id;
        const url = isEdit ? `${API_URL}/${website.id}` : API_URL;
        const method = isEdit ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
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
        console.error("Error saving SEO website:", error);
        alert(`Failed to ${website ? 'update' : 'create'} SEO website. Please check the console for details.`);
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

    const updateNestedArrayField = (path: string, value: string) => {
      const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
      updateField(path, arrayValue);
    };

    const updateNestedObjectField = (path: string, key: string, value: string) => {
      setFormData(prev => {
        const keys = path.split('.');
        const updated = { ...prev };
        let current: any = updated;
        
        for (let i = 0; i < keys.length; i++) {
          current = current[keys[i]] = { ...current[keys[i]] };
        }
        
        current[key] = value;
        return updated;
      });
    };

    const tabs = [
      { id: "basic", label: "Basic Info", icon: "📝" },
      { id: "seo", label: "SEO Config", icon: "🔍" },
      { id: "branding", label: "Branding", icon: "🎨" },
      { id: "jobs", label: "Job Feed", icon: "💼" },
      { id: "analytics", label: "Analytics", icon: "📊" },
      { id: "scripts", label: "Custom Scripts", icon: "⚡" },
      { id: "contact", label: "Contact", icon: "📞" },
    ];

    const renderBasicTab = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="theartemisai Careers Portal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domain *</label>
            <input
              type="text"
              required
              value={formData.domain}
              onChange={(e) => updateField("domain", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="theartemis.ai"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Base URL *</label>
          <input
            type="url"
            required
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
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
              placeholder="Page Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
            <input
              type="url"
              value={formData.seoConfig.canonicalUrl}
              onChange={(e) => updateField("seoConfig.canonicalUrl", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/canonical-url"
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
            placeholder="Page description for search engines"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma-separated)</label>
          <input
            type="text"
            value={formData.seoConfig.metaKeywords?.join(", ") || ""}
            onChange={(e) => updateNestedArrayField("seoConfig.metaKeywords", e.target.value)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sitemap URL</label>
            <input
              type="url"
              value={formData.seoConfig.sitemapUrl}
              onChange={(e) => updateField("seoConfig.sitemapUrl", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Card Type</label>
            <select
              value={formData.seoConfig.twitterCard}
              onChange={(e) => updateField("seoConfig.twitterCard", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary Large Image</option>
              <option value="app">App</option>
              <option value="player">Player</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Robots.txt</label>
          <textarea
            value={formData.seoConfig.robotsTxt}
            onChange={(e) => updateField("seoConfig.robotsTxt", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="User-agent: *&#10;Allow: /"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.seoConfig.indexable}
            onChange={(e) => updateField("seoConfig.indexable", e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Allow search engines to index this website</label>
        </div>
      </div>
    );

    const renderBrandingTab = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
            <input
              type="url"
              value={formData.brandingConfig.logo}
              onChange={(e) => updateField("brandingConfig.logo", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image URL</label>
            <input
              type="url"
              value={formData.brandingConfig.bannerImage}
              onChange={(e) => updateField("brandingConfig.bannerImage", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={formData.brandingConfig.primaryColor}
                onChange={(e) => updateField("brandingConfig.primaryColor", e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={formData.brandingConfig.primaryColor}
                onChange={(e) => updateField("brandingConfig.primaryColor", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="#004AAD"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={formData.brandingConfig.secondaryColor}
                onChange={(e) => updateField("brandingConfig.secondaryColor", e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={formData.brandingConfig.secondaryColor}
                onChange={(e) => updateField("brandingConfig.secondaryColor", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="#FFCC00"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
          <input
            type="text"
            value={formData.brandingConfig.fontFamily}
            onChange={(e) => updateField("brandingConfig.fontFamily", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Inter, Arial, sans-serif"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
          <textarea
            value={formData.brandingConfig.customCss}
            onChange={(e) => updateField("brandingConfig.customCss", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Add your custom CSS here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Header HTML</label>
            <textarea
              value={formData.brandingConfig.headerHtml}
              onChange={(e) => updateField("brandingConfig.headerHtml", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Custom header HTML"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Footer HTML</label>
            <textarea
              value={formData.brandingConfig.footerHtml}
              onChange={(e) => updateField("brandingConfig.footerHtml", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Custom footer HTML"
            />
          </div>
        </div>
      </div>
    );

    const renderJobFeedTab = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Categories (comma-separated)</label>
            <input
              type="text"
              value={formData.jobFeedConfig.jobCategories?.join(", ") || ""}
              onChange={(e) => updateNestedArrayField("jobFeedConfig.jobCategories", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="IT, Healthcare, Marketing, Sales"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Locations (comma-separated)</label>
            <input
              type="text"
              value={formData.jobFeedConfig.locations?.join(", ") || ""}
              onChange={(e) => updateNestedArrayField("jobFeedConfig.locations", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="New York, Remote, London, Bangalore"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jobs Per Page</label>
            <input
              type="number"
              value={formData.jobFeedConfig.jobsPerPage}
              onChange={(e) => updateField("jobFeedConfig.jobsPerPage", parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
            <select
              value={formData.jobFeedConfig.sortOrder}
              onChange={(e) => updateField("jobFeedConfig.sortOrder", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="relevant">Most Relevant</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Apply Redirect URL</label>
            <input
              type="url"
              value={formData.jobFeedConfig.applyRedirectUrl}
              onChange={(e) => updateField("jobFeedConfig.applyRedirectUrl", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://company.com/apply"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.jobFeedConfig.showSalary}
              onChange={(e) => updateField("jobFeedConfig.showSalary", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">Show Salary</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.jobFeedConfig.showCompanyLogo}
              onChange={(e) => updateField("jobFeedConfig.showCompanyLogo", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">Show Company Logo</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.jobFeedConfig.enableApply}
              onChange={(e) => updateField("jobFeedConfig.enableApply", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">Enable Apply</label>
          </div>
        </div>
      </div>
    );

    const renderAnalyticsTab = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
            <input
              type="text"
              value={formData.analyticsConfig.googleAnalyticsId}
              onChange={(e) => updateField("analyticsConfig.googleAnalyticsId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Tag Manager ID</label>
            <input
              type="text"
              value={formData.analyticsConfig.googleTagManagerId}
              onChange={(e) => updateField("analyticsConfig.googleTagManagerId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="GTM-XXXXXX"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
            <input
              type="text"
              value={formData.analyticsConfig.facebookPixelId}
              onChange={(e) => updateField("analyticsConfig.facebookPixelId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Insight Tag</label>
            <input
              type="text"
              value={formData.analyticsConfig.linkedInInsightTag}
              onChange={(e) => updateField("analyticsConfig.linkedInInsightTag", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    );

    const renderScriptsTab = () => (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Header Scripts</label>
          <textarea
            value={formData.customScripts.headerScripts}
            onChange={(e) => updateField("customScripts.headerScripts", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Custom scripts for head section"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Footer Scripts</label>
          <textarea
            value={formData.customScripts.footerScripts}
            onChange={(e) => updateField("customScripts.footerScripts", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Custom scripts for footer section"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">External Scripts (one per line)</label>
          <textarea
            value={formData.customScripts.externalScripts?.join("\n") || ""}
            onChange={(e) => updateField("customScripts.externalScripts", e.target.value.split("\n").filter(s => s.trim()))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="https://cdn.example.com/script1.js&#10;https://cdn.example.com/script2.js"
          />
        </div>
      </div>
    );

    const renderContactTab = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.contactInfo.email}
              onChange={(e) => updateField("contactInfo.email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="contact@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.contactInfo.phone}
              onChange={(e) => updateField("contactInfo.phone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={formData.contactInfo.address}
            onChange={(e) => updateField("contactInfo.address", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="123 Main Street"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={formData.contactInfo.city}
              onChange={(e) => updateField("contactInfo.city", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input
              type="text"
              value={formData.contactInfo.state}
              onChange={(e) => updateField("contactInfo.state", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="NY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              value={formData.contactInfo.zipCode}
              onChange={(e) => updateField("contactInfo.zipCode", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10001"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <input
            type="text"
            value={formData.contactInfo.country}
            onChange={(e) => updateField("contactInfo.country", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="United States"
          />
        </div>
      </div>
    );

    const renderTabContent = () => {
      switch (activeTab) {
        case "basic": return renderBasicTab();
        case "seo": return renderSEOTab();
        case "branding": return renderBrandingTab();
        case "jobs": return renderJobFeedTab();
        case "analytics": return renderAnalyticsTab();
        case "scripts": return renderScriptsTab();
        case "contact": return renderContactTab();
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
                  {loading ? (website ? "Updating..." : "Creating...") : (website ? "Update Website" : "Create Website")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }








