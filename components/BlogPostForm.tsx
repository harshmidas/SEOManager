// "use client";

// import { useState } from "react";
// import { BlogPost, SEOMeta } from "@/types/blog";
// import { apiFetch } from "@/utils/api";

// const API_URL = "http://157.20.214.84:9292/api/v1/seo-blogs";
// const HEADERS = {
//   accept: "*/*",
//   "X-Tenant": "68b20dd0fb42964f2328b424",
//   "X-User-ID": "system",
//   "Content-Type": "application/json",
// };

// interface BlogPostFormProps {
//   post?: BlogPost | null;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const initialSEOMeta: SEOMeta = {
//   metaTitle: "",
//   metaDescription: "",
//   metaKeywords: [],
//   canonicalUrl: "",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: "",
//   twitterCard: "summary_large_image",
//   twitterTitle: "",
//   twitterDescription: "",
//   twitterImage: "",
//   structuredData: {},
//   noIndex: false,
//   noFollow: false,
// };

// const initialFormData: BlogPost = {
//   title: "",
//   slug: "",
//   content: "",
//   excerpt: "",
//   featuredImage: "",
//   featuredImageAlt: "",
//   author: "",
//   authorBio: "",
//   authorAvatar: "",
//   category: "Healthcare Technology",
//   tags: [],
//   featured: false,
//   published: false,
//   publishedAt: new Date().toISOString(),
//   scheduledFor: null,
//   seoMeta: initialSEOMeta,
//   viewCount: 0,
//   shareCount: 0,
//   commentCount: 0,
//   readingTimeMinutes: 5,
//   relatedBlogIds: [],
//   status: "DRAFT",
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   createdBy: "admin",
//   updatedBy: "admin",
//   metadata: {},
// };

// export default function BlogPostForm({
//   post,
//   onClose,
//   onSuccess,
// }: BlogPostFormProps) {
//   const [formData, setFormData] = useState<BlogPost>(post || initialFormData);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");
//   const [content, setContent] = useState(formData.content);

//   const categories = [
//     "Healthcare Technology",
//     "AI",
//     "Staffing",
//     "Innovation",
//     "Industry Insights",
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Calculate reading time based on content
//       const wordCount = content.split(/\s+/).length;
//       const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

//       const submitData = {
//         ...formData,
//         content,
//         readingTimeMinutes: readingTime,
//       };

//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: HEADERS,
//         body: JSON.stringify(submitData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Success:", result);
//       onSuccess();
//     } catch (error) {
//       console.error("Error creating blog post:", error);
//       alert(
//         "Failed to create blog post. Please check the console for details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateField = (path: string, value: any) => {
//     setFormData((prev) => {
//       const keys = path.split(".");
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
//     { id: "content", label: "Content", icon: "📄" },
//     { id: "author", label: "Author", icon: "👤" },
//     { id: "seo", label: "SEO", icon: "🔍" },
//     { id: "settings", label: "Settings", icon: "⚙️" },
//   ];

//   const renderBasicTab = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Title *
//         </label>
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(e) => updateField("title", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="The Future of Healthcare Automation..."
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Slug *
//         </label>
//         <input
//           type="text"
//           value={formData.slug}
//           onChange={(e) => updateField("slug", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="future-of-healthcare-automation"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Excerpt
//         </label>
//         <textarea
//           value={formData.excerpt}
//           onChange={(e) => updateField("excerpt", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Brief summary of the blog post..."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Category
//           </label>
//           <select
//             value={formData.category}
//             onChange={(e) => updateField("category", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Published Date
//           </label>
//           <input
//             type="datetime-local"
//             value={formData.publishedAt.slice(0, 16)}
//             onChange={(e) =>
//               updateField("publishedAt", new Date(e.target.value).toISOString())
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Tags (comma-separated)
//         </label>
//         <input
//           type="text"
//           value={formData.tags.join(", ")}
//           onChange={(e) =>
//             updateField(
//               "tags",
//               e.target.value.split(",").map((tag) => tag.trim())
//             )
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="AI, Healthcare, Automation, Innovation"
//         />
//       </div>
//     </div>
//   );

//   const renderContentTab = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Content
//         </label>
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           rows={12}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
//           placeholder="Write your blog post content here..."
//         />
//         <div className="mt-2 text-sm text-gray-500">
//           Word count:{" "}
//           {content.split(/\s+/).filter((word) => word.length > 0).length}•
//           Estimated reading time: {Math.ceil(content.split(/\s+/).length / 200)}{" "}
//           minutes
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Featured Image URL
//           </label>
//           <input
//             type="url"
//             value={formData.featuredImage}
//             onChange={(e) => updateField("featuredImage", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Image Alt Text
//           </label>
//           <input
//             type="text"
//             value={formData.featuredImageAlt}
//             onChange={(e) => updateField("featuredImageAlt", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       {formData.featuredImage && (
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-sm font-medium text-gray-700 mb-2">
//             Image Preview:
//           </p>
//           <img
//             src={formData.featuredImage}
//             alt="Preview"
//             className="max-h-48 rounded-lg border"
//           />
//         </div>
//       )}
//     </div>
//   );

//   const renderAuthorTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Author Name
//           </label>
//           <input
//             type="text"
//             value={formData.author}
//             onChange={(e) => updateField("author", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Author Avatar URL
//           </label>
//           <input
//             type="url"
//             value={formData.authorAvatar}
//             onChange={(e) => updateField("authorAvatar", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Author Bio
//         </label>
//         <textarea
//           value={formData.authorBio}
//           onChange={(e) => updateField("authorBio", e.target.value)}
//           rows={4}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Author biography..."
//         />
//       </div>

//       {formData.authorAvatar && (
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-sm font-medium text-gray-700 mb-2">
//             Avatar Preview:
//           </p>
//           <img
//             src={formData.authorAvatar}
//             alt="Author preview"
//             className="w-16 h-16 rounded-full border"
//           />
//         </div>
//       )}
//     </div>
//   );

//   const renderSEOTab = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Meta Title
//         </label>
//         <input
//           type="text"
//           value={formData.seoMeta.metaTitle}
//           onChange={(e) => updateField("seoMeta.metaTitle", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Meta Description
//         </label>
//         <textarea
//           value={formData.seoMeta.metaDescription}
//           onChange={(e) =>
//             updateField("seoMeta.metaDescription", e.target.value)
//           }
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Meta Keywords (comma-separated)
//         </label>
//         <input
//           type="text"
//           value={formData.seoMeta.metaKeywords.join(", ")}
//           onChange={(e) =>
//             updateField(
//               "seoMeta.metaKeywords",
//               e.target.value.split(",").map((k) => k.trim())
//             )
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Canonical URL
//           </label>
//           <input
//             type="url"
//             value={formData.seoMeta.canonicalUrl}
//             onChange={(e) =>
//               updateField("seoMeta.canonicalUrl", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             OG Image URL
//           </label>
//           <input
//             type="url"
//             value={formData.seoMeta.ogImage}
//             onChange={(e) => updateField("seoMeta.ogImage", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderSettingsTab = () => (
//     <div className="space-y-6">
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.featured}
//             onChange={(e) => updateField("featured", e.target.checked)}
//             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Featured Post</label>
//         </div>

//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.published}
//             onChange={(e) => updateField("published", e.target.checked)}
//             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Published</label>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Status
//         </label>
//         <select
//           value={formData.status}
//           onChange={(e) => updateField("status", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="DRAFT">Draft</option>
//           <option value="PUBLISHED">Published</option>
//           <option value="SCHEDULED">Scheduled</option>
//           <option value="ARCHIVED">Archived</option>
//         </select>
//       </div>

//       {formData.status === "SCHEDULED" && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Schedule For
//           </label>
//           <input
//             type="datetime-local"
//             value={formData.scheduledFor?.slice(0, 16) || ""}
//             onChange={(e) =>
//               updateField(
//                 "scheduledFor",
//                 new Date(e.target.value).toISOString()
//               )
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Reading Time (minutes)
//           </label>
//           <input
//             type="number"
//             value={formData.readingTimeMinutes}
//             onChange={(e) =>
//               updateField("readingTimeMinutes", parseInt(e.target.value))
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             min="1"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "basic":
//         return renderBasicTab();
//       case "content":
//         return renderContentTab();
//       case "author":
//         return renderAuthorTab();
//       case "seo":
//         return renderSEOTab();
//       case "settings":
//         return renderSettingsTab();
//       default:
//         return renderBasicTab();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {post ? "Edit Blog Post" : "Create New Blog Post"}
//             </h2>
//             <p className="text-gray-600">
//               Manage your blog content and SEO optimization
//             </p>
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
//                 {loading ? "Creating..." : "Create Blog Post"}
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
import { BlogPost, SEOMeta } from "@/types/blog";
import { apiFetch } from "@/utils/api";

const API_URL = "http://157.20.214.84:9292/api/v1/seo-blogs";
const HEADERS = {
  accept: "*/*",
  "X-Tenant": "68b20dd0fb42964f2328b424",
  "X-User-ID": "system",
  "Content-Type": "application/json",
};

interface BlogPostFormProps {
  post?: BlogPost | null;
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
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  structuredData: {},
  noIndex: false,
  noFollow: false,
};

const initialFormData: BlogPost = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  featuredImage: "",
  featuredImageAlt: "",
  author: "",
  authorBio: "",
  authorAvatar: "",
  category: "Healthcare Technology",
  tags: [],
  featured: false,
  published: false,
  publishedAt: new Date().toISOString(),
  scheduledFor: null,
  seoMeta: initialSEOMeta,
  viewCount: 0,
  shareCount: 0,
  commentCount: 0,
  readingTimeMinutes: 5,
  relatedBlogIds: [],
  status: "DRAFT",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: "admin",
  updatedBy: "admin",
  metadata: {},
};

export default function BlogPostForm({
  post,
  onClose,
  onSuccess,
}: BlogPostFormProps) {
  const [formData, setFormData] = useState<BlogPost>(post || initialFormData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [content, setContent] = useState(formData.content);

  // Update form data when post prop changes
  useEffect(() => {
    if (post) {
      setFormData(post);
      setContent(post.content);
    } else {
      setFormData(initialFormData);
      setContent("");
    }
  }, [post]);

  const categories = [
    "Healthcare Technology",
    "AI",
    "Staffing",
    "Innovation",
    "Industry Insights",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calculate reading time based on content
      const wordCount = content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

      const submitData = {
        ...formData,
        content,
        readingTimeMinutes: readingTime,
        updatedAt: new Date().toISOString(),
        updatedBy: "admin",
      };

      let response;
      if (post && post.id) {
        // Update existing post - PUT request
        response = await fetch(`${API_URL}/${post.id}`, {
          method: "PUT",
          headers: HEADERS,
          body: JSON.stringify(submitData),
        });
      } else {
        // Create new post - POST request
        response = await fetch(API_URL, {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify(submitData),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      onSuccess();
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert(
        `Failed to ${post ? "update" : "create"} blog post. Please check the console for details.`
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (path: string, value: any) => {
    setFormData((prev) => {
      const keys = path.split(".");
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
    { id: "author", label: "Author", icon: "👤" },
    { id: "seo", label: "SEO", icon: "🔍" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const renderBasicTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="The Future of Healthcare Automation..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug *
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="future-of-healthcare-automation"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Excerpt
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief summary of the blog post..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Published Date
          </label>
          <input
            type="datetime-local"
            value={formData.publishedAt.slice(0, 16)}
            onChange={(e) =>
              updateField("publishedAt", new Date(e.target.value).toISOString())
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={formData.tags.join(", ")}
          onChange={(e) =>
            updateField(
              "tags",
              e.target.value.split(",").map((tag) => tag.trim())
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="AI, Healthcare, Automation, Innovation"
        />
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          placeholder="Write your blog post content here..."
        />
        <div className="mt-2 text-sm text-gray-500">
          Word count:{" "}
          {content.split(/\s+/).filter((word) => word.length > 0).length}•
          Estimated reading time: {Math.ceil(content.split(/\s+/).length / 200)}{" "}
          minutes
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image URL
          </label>
          <input
            type="url"
            value={formData.featuredImage}
            onChange={(e) => updateField("featuredImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Alt Text
          </label>
          <input
            type="text"
            value={formData.featuredImageAlt}
            onChange={(e) => updateField("featuredImageAlt", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {formData.featuredImage && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Image Preview:
          </p>
          <img
            src={formData.featuredImage}
            alt="Preview"
            className="max-h-48 rounded-lg border"
          />
        </div>
      )}
    </div>
  );

  const renderAuthorTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Name
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => updateField("author", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Avatar URL
          </label>
          <input
            type="url"
            value={formData.authorAvatar}
            onChange={(e) => updateField("authorAvatar", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Author Bio
        </label>
        <textarea
          value={formData.authorBio}
          onChange={(e) => updateField("authorBio", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Author biography..."
        />
      </div>

      {formData.authorAvatar && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Avatar Preview:
          </p>
          <img
            src={formData.authorAvatar}
            alt="Author preview"
            className="w-16 h-16 rounded-full border"
          />
        </div>
      )}
    </div>
  );

  const renderSEOTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta Title
        </label>
        <input
          type="text"
          value={formData.seoMeta.metaTitle}
          onChange={(e) => updateField("seoMeta.metaTitle", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta Description
        </label>
        <textarea
          value={formData.seoMeta.metaDescription}
          onChange={(e) =>
            updateField("seoMeta.metaDescription", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta Keywords (comma-separated)
        </label>
        <input
          type="text"
          value={formData.seoMeta.metaKeywords.join(", ")}
          onChange={(e) =>
            updateField(
              "seoMeta.metaKeywords",
              e.target.value.split(",").map((k) => k.trim())
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Canonical URL
          </label>
          <input
            type="url"
            value={formData.seoMeta.canonicalUrl}
            onChange={(e) =>
              updateField("seoMeta.canonicalUrl", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OG Image URL
          </label>
          <input
            type="url"
            value={formData.seoMeta.ogImage}
            onChange={(e) => updateField("seoMeta.ogImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.seoMeta.noIndex}
            onChange={(e) => updateField("seoMeta.noIndex", e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">No Index</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.seoMeta.noFollow}
            onChange={(e) => updateField("seoMeta.noFollow", e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">No Follow</label>
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
            checked={formData.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Featured Post</label>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => updateField("status", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {formData.status === "SCHEDULED" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Schedule For
          </label>
          <input
            type="datetime-local"
            value={formData.scheduledFor?.slice(0, 16) || ""}
            onChange={(e) =>
              updateField(
                "scheduledFor",
                e.target.value ? new Date(e.target.value).toISOString() : null
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reading Time (minutes)
          </label>
          <input
            type="number"
            value={formData.readingTimeMinutes}
            onChange={(e) =>
              updateField("readingTimeMinutes", parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return renderBasicTab();
      case "content":
        return renderContentTab();
      case "author":
        return renderAuthorTab();
      case "seo":
        return renderSEOTab();
      case "settings":
        return renderSettingsTab();
      default:
        return renderBasicTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {post ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <p className="text-gray-600">
              Manage your blog content and SEO optimization
            </p>
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
                {loading 
                  ? (post ? "Updating..." : "Creating...") 
                  : (post ? "Update Blog Post" : "Create Blog Post")
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}