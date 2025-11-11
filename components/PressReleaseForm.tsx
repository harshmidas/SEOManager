// "use client";

// import { useState } from "react";
// import {
//   PressRelease,
//   ContactInfo,
//   DistributionConfig,
//   SEOMeta,
// } from "@/types/press";
// import { apiFetch } from "@/utils/api";

// const API_URL = "http://157.20.214.84:9292/api/v1/seo-press";
// const HEADERS = {
//   accept: "*/*",
//   "X-Tenant": "68b20dd0fb42964f2328b424",
//   "X-User-ID": "658dfb086764754f1fa564d0",
//   Authorization:
//     "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcmNoaXQubWlzaHJhQG1pZGFzY29uc3VsdGluZy5vcmciLCJpYXQiOjE3NjI4MDQ3NTgsImV4cCI6MTc2Mjg5MTE1OH0.6_JIYgzh7sdM0Z1SFVclmwSrGIxX0Pe0coOU1CueBkTJavneEWKbBcmbYf3qwxYPh__TP9g4XyUjlqB7nojIrw",
//   "Content-Type": "application/json",
// };

// interface PressReleaseFormProps {
//   release?: PressRelease | null;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const initialContactInfo: ContactInfo = {
//   mediaContactName: "",
//   mediaContactEmail: "",
//   mediaContactPhone: "",
//   prContactName: "",
//   prContactEmail: "",
//   prContactPhone: "",
//   additionalContacts: {},
// };

// const initialDistributionConfig: DistributionConfig = {
//   autoDistribute: false,
//   distributionChannels: [],
//   targetMediaOutlets: [],
//   scheduledDistributionTime: "",
//   customSettings: {},
// };

// const initialSEOMeta: SEOMeta = {
//   metaTitle: "",
//   metaDescription: "",
//   metaKeywords: [],
//   canonicalUrl: "",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: "",
//   ogType: "article",
//   noIndex: false,
//   structuredData: {},
// };

// const initialFormData: PressRelease = {
//   title: "",
//   slug: "",
//   content: "",
//   subtitle: "",
//   summary: "",
//   featuredImage: "",
//   featuredImageAlt: "",
//   mediaAssets: [],
//   companyName: "Artemis AI",
//   companyLogo: "",
//   companyWebsite: "",
//   contactInfo: initialContactInfo,
//   releaseDate: new Date().toISOString(),
//   location: "",
//   boilerplate: "",
//   category: "Technology",
//   tags: [],
//   featured: false,
//   published: false,
//   publishedAt: "",
//   distributionConfig: initialDistributionConfig,
//   distributionHistory: [],
//   seoMeta: initialSEOMeta,
//   viewCount: 0,
//   downloadCount: 0,
//   shareCount: 0,
//   relatedPressIds: [],
//   status: "DRAFT",
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   createdBy: "admin",
//   updatedBy: "admin",
//   metadata: {},
// };

// export default function PressReleaseForm({
//   release,
//   onClose,
//   onSuccess,
// }: PressReleaseFormProps) {
//   const [formData, setFormData] = useState<PressRelease>(
//     release || initialFormData
//   );
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
//       console.error("Error creating press release:", error);
//       alert(
//         "Failed to create press release. Please check the console for details."
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
//     { id: "contact", label: "Contact Info", icon: "📞" },
//     { id: "distribution", label: "Distribution", icon: "📤" },
//     { id: "seo", label: "SEO", icon: "🔍" },
//   ];

//   const categories = [
//     "Technology",
//     "Healthcare",
//     "Finance",
//     "Announcement",
//     "Partnership",
//   ];
//   const distributionChannels = [
//     "PR Newswire",
//     "BusinessWire",
//     "LinkedIn",
//     "Twitter",
//     "Facebook",
//     "Email",
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
//           placeholder="Artemis AI Launches New Staffing Automation Suite"
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
//           placeholder="artemis-ai-staffing-automation-suite"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Subtitle
//         </label>
//         <input
//           type="text"
//           value={formData.subtitle}
//           onChange={(e) => updateField("subtitle", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Revolutionizing workforce management with artificial intelligence"
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
//             Release Date
//           </label>
//           <input
//             type="datetime-local"
//             value={formData.releaseDate.slice(0, 16)}
//             onChange={(e) =>
//               updateField("releaseDate", new Date(e.target.value).toISOString())
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
//           placeholder="AI, Automation, Staffing, Healthcare"
//         />
//       </div>

//       <div className="flex items-center space-x-4">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.featured}
//             onChange={(e) => updateField("featured", e.target.checked)}
//             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Featured Release</label>
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
//     </div>
//   );

//   const renderContentTab = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Summary
//         </label>
//         <textarea
//           value={formData.summary}
//           onChange={(e) => updateField("summary", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Brief summary of the press release..."
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Content
//         </label>
//         <textarea
//           value={formData.content}
//           onChange={(e) => updateField("content", e.target.value)}
//           rows={8}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Full press release content..."
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Boilerplate
//         </label>
//         <textarea
//           value={formData.boilerplate}
//           onChange={(e) => updateField("boilerplate", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Company description..."
//         />
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
//     </div>
//   );

//   const renderContactTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Media Contact Name
//           </label>
//           <input
//             type="text"
//             value={formData.contactInfo.mediaContactName}
//             onChange={(e) =>
//               updateField("contactInfo.mediaContactName", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Media Contact Email
//           </label>
//           <input
//             type="email"
//             value={formData.contactInfo.mediaContactEmail}
//             onChange={(e) =>
//               updateField("contactInfo.mediaContactEmail", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             PR Contact Name
//           </label>
//           <input
//             type="text"
//             value={formData.contactInfo.prContactName}
//             onChange={(e) =>
//               updateField("contactInfo.prContactName", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             PR Contact Email
//           </label>
//           <input
//             type="email"
//             value={formData.contactInfo.prContactEmail}
//             onChange={(e) =>
//               updateField("contactInfo.prContactEmail", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Location
//         </label>
//         <input
//           type="text"
//           value={formData.location}
//           onChange={(e) => updateField("location", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//     </div>
//   );

//   const renderDistributionTab = () => (
//     <div className="space-y-6">
//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={formData.distributionConfig.autoDistribute}
//           onChange={(e) =>
//             updateField("distributionConfig.autoDistribute", e.target.checked)
//           }
//           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//         />
//         <label className="ml-2 text-sm text-gray-700">
//           Auto-distribute on release
//         </label>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Distribution Channels
//         </label>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//           {distributionChannels.map((channel) => (
//             <div key={channel} className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={formData.distributionConfig.distributionChannels.includes(
//                   channel
//                 )}
//                 onChange={(e) => {
//                   const current =
//                     formData.distributionConfig.distributionChannels;
//                   const updated = e.target.checked
//                     ? [...current, channel]
//                     : current.filter((c) => c !== channel);
//                   updateField(
//                     "distributionConfig.distributionChannels",
//                     updated
//                   );
//                 }}
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label className="ml-2 text-sm text-gray-700">{channel}</label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Scheduled Distribution Time
//         </label>
//         <input
//           type="datetime-local"
//           value={
//             formData.distributionConfig.scheduledDistributionTime?.slice(
//               0,
//               16
//             ) || ""
//           }
//           onChange={(e) =>
//             updateField(
//               "distributionConfig.scheduledDistributionTime",
//               new Date(e.target.value).toISOString()
//             )
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
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

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "basic":
//         return renderBasicTab();
//       case "content":
//         return renderContentTab();
//       case "contact":
//         return renderContactTab();
//       case "distribution":
//         return renderDistributionTab();
//       case "seo":
//         return renderSEOTab();
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
//               {release ? "Edit Press Release" : "Create New Press Release"}
//             </h2>
//             <p className="text-gray-600">
//               Manage your press release content and distribution
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
//                 {loading ? "Creating..." : "Create Press Release"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }






































// "use client";

// import { useState, useEffect } from "react";
// import {
//   PressRelease,
//   ContactInfo,
//   DistributionConfig,
//   SEOMeta,
// } from "@/types/press";

// const API_URL = "http://157.20.214.84:9292/api/v1/seo-press";
// const HEADERS = {
//   accept: "*/*",
//   "X-Tenant": "68b20dd0fb42964f2328b424",
//   "X-User-ID": "658dfb086764754f1fa564d0",
//   Authorization:
//     "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcmNoaXQubWlzaHJhQG1pZGFzY29uc3VsdGluZy5vcmciLCJpYXQiOjE3NjI4MDQ3NTgsImV4cCI6MTc2Mjg5MTE1OH0.6_JIYgzh7sdM0Z1SFVclmwSrGIxX0Pe0coOU1CueBkTJavneEWKbBcmbYf3qwxYPh__TP9g4XyUjlqB7nojIrw",
//   "Content-Type": "application/json",
// };

// interface PressReleaseFormProps {
//   release?: PressRelease | null;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const initialContactInfo: ContactInfo = {
//   email: "",
//   phone: "",
//   address: "",
//   city: "",
//   state: "",
//   zipCode: "",
//   country: "",
//   additionalContacts: {},
// };

// const initialDistributionConfig: DistributionConfig = {
//   autoDistribute: false,
//   distributionChannels: [],
//   targetMediaOutlets: [],
//   scheduledDistributionTime: "",
//   customSettings: {},
// };

// const initialSEOMeta: SEOMeta = {
//   metaTitle: "",
//   metaDescription: "",
//   metaKeywords: [],
//   canonicalUrl: "",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: "",
//   ogType: "article",
//   noIndex: false,
//   structuredData: {},
// };

// const initialFormData: PressRelease = {
//   title: "",
//   slug: "",
//   content: "",
//   subtitle: "",
//   summary: "",
//   featuredImage: "",
//   featuredImageAlt: "",
//   mediaAssets: [],
//   companyName: "Artemis AI",
//   companyLogo: "",
//   companyWebsite: "",
//   contactInfo: initialContactInfo,
//   releaseDate: new Date().toISOString(),
//   location: "",
//   boilerplate: "",
//   category: "Technology",
//   tags: [],
//   featured: false,
//   published: false,
//   publishedAt: "",
//   distributionConfig: initialDistributionConfig,
//   distributionHistory: [],
//   seoMeta: initialSEOMeta,
//   viewCount: 0,
//   downloadCount: 0,
//   shareCount: 0,
//   relatedPressIds: [],
//   status: "DRAFT",
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   createdBy: "admin",
//   updatedBy: "admin",
//   metadata: {},
// };

// export default function PressReleaseForm({
//   release,
//   onClose,
//   onSuccess,
// }: PressReleaseFormProps) {
//   const [formData, setFormData] = useState<PressRelease>(initialFormData);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");

//   // Initialize form data when release prop changes
//   useEffect(() => {
//     if (release) {
//       setFormData(release);
//     } else {
//       setFormData(initialFormData);
//     }
//   }, [release]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const url = release ? `${API_URL}/${release.id}` : API_URL;
//       const method = release ? "PUT" : "POST";

//       // Prepare the data for API
//       const apiData = {
//         ...formData,
//         // Ensure proper formatting for dates
//         releaseDate: new Date(formData.releaseDate).toISOString(),
//         publishedAt: formData.published ? new Date().toISOString() : "",
//         // Ensure arrays are properly formatted
//         tags: Array.isArray(formData.tags) ? formData.tags : [],
//         mediaAssets: Array.isArray(formData.mediaAssets) ? formData.mediaAssets : [],
//         relatedPressIds: Array.isArray(formData.relatedPressIds) ? formData.relatedPressIds : [],
//         distributionConfig: {
//           ...formData.distributionConfig,
//           distributionChannels: Array.isArray(formData.distributionConfig.distributionChannels) 
//             ? formData.distributionConfig.distributionChannels 
//             : [],
//           targetMediaOutlets: Array.isArray(formData.distributionConfig.targetMediaOutlets) 
//             ? formData.distributionConfig.targetMediaOutlets 
//             : [],
//         },
//         seoMeta: {
//           ...formData.seoMeta,
//           metaKeywords: Array.isArray(formData.seoMeta.metaKeywords) 
//             ? formData.seoMeta.metaKeywords 
//             : [],
//         },
//       };

//       console.log("Sending data:", JSON.stringify(apiData, null, 2));

//       const response = await fetch(url, {
//         method,
//         headers: HEADERS,
//         body: JSON.stringify(apiData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const result = await response.json();
//       console.log("Success:", result);
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error("Error creating/updating press release:", error);
//       alert(
//         `Failed to ${release ? "update" : "create"} press release. Please check the console for details.`
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
//     { id: "contact", label: "Contact Info", icon: "📞" },
//     { id: "distribution", label: "Distribution", icon: "📤" },
//     { id: "seo", label: "SEO", icon: "🔍" },
//   ];

//   const categories = [
//     "Technology",
//     "Healthcare",
//     "Finance",
//     "Announcement",
//     "Partnership",
//   ];
//   const distributionChannels = [
//     "PR Newswire",
//     "BusinessWire",
//     "LinkedIn",
//     "Twitter",
//     "Facebook",
//     "Email",
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
//           placeholder="Artemis AI Launches New Staffing Automation Suite"
//           required
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
//           placeholder="artemis-ai-staffing-automation-suite"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Subtitle
//         </label>
//         <input
//           type="text"
//           value={formData.subtitle}
//           onChange={(e) => updateField("subtitle", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Revolutionizing workforce management with artificial intelligence"
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
//             Release Date
//           </label>
//           <input
//             type="datetime-local"
//             value={formData.releaseDate.slice(0, 16)}
//             onChange={(e) =>
//               updateField("releaseDate", new Date(e.target.value).toISOString())
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
//               e.target.value.split(",").map((tag) => tag.trim()).filter(tag => tag)
//             )
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="AI, Automation, Staffing, Healthcare"
//         />
//       </div>

//       <div className="flex items-center space-x-4">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.featured}
//             onChange={(e) => updateField("featured", e.target.checked)}
//             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Featured Release</label>
//         </div>

//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.published}
//             onChange={(e) => {
//               updateField("published", e.target.checked);
//               if (e.target.checked) {
//                 updateField("status", "PUBLISHED");
//                 updateField("publishedAt", new Date().toISOString());
//               } else {
//                 updateField("status", "DRAFT");
//                 updateField("publishedAt", "");
//               }
//             }}
//             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Published</label>
//         </div>
//       </div>
//     </div>
//   );

//   const renderContentTab = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Summary
//         </label>
//         <textarea
//           value={formData.summary}
//           onChange={(e) => updateField("summary", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Brief summary of the press release..."
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Content
//         </label>
//         <textarea
//           value={formData.content}
//           onChange={(e) => updateField("content", e.target.value)}
//           rows={8}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Full press release content..."
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Boilerplate
//         </label>
//         <textarea
//           value={formData.boilerplate}
//           onChange={(e) => updateField("boilerplate", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Company description..."
//         />
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

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Media Assets (URLs, comma-separated)
//         </label>
//         <input
//           type="text"
//           value={formData.mediaAssets.join(", ")}
//           onChange={(e) =>
//             updateField(
//               "mediaAssets",
//               e.target.value.split(",").map((url) => url.trim()).filter(url => url)
//             )
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="https://example.com/image1.jpg, https://example.com/video.mp4"
//         />
//       </div>
//     </div>
//   );

//   const renderContactTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             value={formData.contactInfo.email}
//             onChange={(e) =>
//               updateField("contactInfo.email", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Phone
//           </label>
//           <input
//             type="tel"
//             value={formData.contactInfo.phone}
//             onChange={(e) =>
//               updateField("contactInfo.phone", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Address
//         </label>
//         <input
//           type="text"
//           value={formData.contactInfo.address}
//           onChange={(e) =>
//             updateField("contactInfo.address", e.target.value)
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             City
//           </label>
//           <input
//             type="text"
//             value={formData.contactInfo.city}
//             onChange={(e) =>
//               updateField("contactInfo.city", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             State
//           </label>
//           <input
//             type="text"
//             value={formData.contactInfo.state}
//             onChange={(e) =>
//               updateField("contactInfo.state", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             ZIP Code
//           </label>
//           <input
//             type="text"
//             value={formData.contactInfo.zipCode}
//             onChange={(e) =>
//               updateField("contactInfo.zipCode", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Country
//           </label>
//           <input
//             type="text"
//             value={formData.contactInfo.country}
//             onChange={(e) =>
//               updateField("contactInfo.country", e.target.value)
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Location
//         </label>
//         <input
//           type="text"
//           value={formData.location}
//           onChange={(e) => updateField("location", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//     </div>
//   );

//   const renderDistributionTab = () => (
//     <div className="space-y-6">
//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={formData.distributionConfig.autoDistribute}
//           onChange={(e) =>
//             updateField("distributionConfig.autoDistribute", e.target.checked)
//           }
//           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//         />
//         <label className="ml-2 text-sm text-gray-700">
//           Auto-distribute on release
//         </label>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Distribution Channels
//         </label>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//           {distributionChannels.map((channel) => (
//             <div key={channel} className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={formData.distributionConfig.distributionChannels.includes(
//                   channel
//                 )}
//                 onChange={(e) => {
//                   const current =
//                     formData.distributionConfig.distributionChannels;
//                   const updated = e.target.checked
//                     ? [...current, channel]
//                     : current.filter((c) => c !== channel);
//                   updateField(
//                     "distributionConfig.distributionChannels",
//                     updated
//                   );
//                 }}
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label className="ml-2 text-sm text-gray-700">{channel}</label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Target Media Outlets (comma-separated)
//         </label>
//         <input
//           type="text"
//           value={formData.distributionConfig.targetMediaOutlets.join(", ")}
//           onChange={(e) =>
//             updateField(
//               "distributionConfig.targetMediaOutlets",
//               e.target.value.split(",").map((outlet) => outlet.trim()).filter(outlet => outlet)
//             )
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="TechCrunch, VentureBeat, Business Insider"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Scheduled Distribution Time
//         </label>
//         <input
//           type="datetime-local"
//           value={
//             formData.distributionConfig.scheduledDistributionTime?.slice(
//               0,
//               16
//             ) || ""
//           }
//           onChange={(e) =>
//             updateField(
//               "distributionConfig.scheduledDistributionTime",
//               new Date(e.target.value).toISOString()
//             )
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
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
//               e.target.value.split(",").map((k) => k.trim()).filter(k => k)
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

//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={formData.seoMeta.noIndex}
//           onChange={(e) => updateField("seoMeta.noIndex", e.target.checked)}
//           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//         />
//         <label className="ml-2 text-sm text-gray-700">No Index</label>
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "basic":
//         return renderBasicTab();
//       case "content":
//         return renderContentTab();
//       case "contact":
//         return renderContactTab();
//       case "distribution":
//         return renderDistributionTab();
//       case "seo":
//         return renderSEOTab();
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
//               {release ? "Edit Press Release" : "Create New Press Release"}
//             </h2>
//             <p className="text-gray-600">
//               Manage your press release content and distribution
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
//                 {loading 
//                   ? (release ? "Updating..." : "Creating...") 
//                   : (release ? "Update Press Release" : "Create Press Release")
//                 }
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
import {
  PressRelease,
  ContactInfo,
  DistributionConfig,
  SEOMeta,
} from "@/types/press";

const API_URL = "http://157.20.214.84:9292/api/v1/seo-press";
const HEADERS = {
  accept: "*/*",
  "X-Tenant": "68b20dd0fb42964f2328b424",
  "X-User-ID": "658dfb086764754f1fa564d0",
  Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcmNoaXQubWlzaHJhQG1pZGFzY29uc3VsdGluZy5vcmciLCJpYXQiOjE3NjI4MDQ3NTgsImV4cCI6MTc2Mjg5MTE1OH0.6_JIYgzh7sdM0Z1SFVclmwSrGIxX0Pe0coOU1CueBkTJavneEWKbBcmbYf3qwxYPh__TP9g4XyUjlqB7nojIrw",
  "Content-Type": "application/json",
};

interface PressReleaseFormProps {
  release?: PressRelease | null;
  onClose: () => void;
  onSuccess: () => void;
}

// Updated to match the API structure from curl
const initialContactInfo: ContactInfo = {
  mediaContactName: "",
  mediaContactEmail: "",
  mediaContactPhone: "",
  prContactName: "",
  prContactEmail: "",
  prContactPhone: "",
  additionalContacts: {
    mediaRelations: "",
    investorRelations: "",
    customerSupport: "",
  },
};

const initialDistributionConfig: DistributionConfig = {
  autoDistribute: false,
  distributionChannels: [],
  targetMediaOutlets: [],
  scheduledDistributionTime: "",
  customSettings: {
    pressEmbargo: "",
    contactFollowUp: "",
    priority: "medium",
  },
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
  structuredData: {
    "@type": "NewsArticle",
    headline: "",
    datePublished: "",
    publisher: "Artemis AI",
    author: "Artemis AI Communications",
  },
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
  metadata: {
    internalNotes: "",
    region: "",
    priority: "medium",
  },
};

export default function PressReleaseForm({
  release,
  onClose,
  onSuccess,
}: PressReleaseFormProps) {
  const [formData, setFormData] = useState<PressRelease>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Initialize form data when release prop changes
  useEffect(() => {
    if (release) {
      setFormData(release);
    } else {
      setFormData(initialFormData);
    }
  }, [release]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = release ? `${API_URL}/${release.id}` : API_URL;
      const method = release ? "PUT" : "POST";

      // Prepare the data for API - matching the curl structure exactly
      const apiData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        subtitle: formData.subtitle,
        summary: formData.summary,
        featuredImage: formData.featuredImage,
        featuredImageAlt: formData.featuredImageAlt,
        mediaAssets: Array.isArray(formData.mediaAssets) ? formData.mediaAssets : [],
        companyName: formData.companyName,
        companyLogo: formData.companyLogo,
        companyWebsite: formData.companyWebsite,
        contactInfo: {
          mediaContactName: formData.contactInfo.mediaContactName || "",
          mediaContactEmail: formData.contactInfo.mediaContactEmail || "",
          mediaContactPhone: formData.contactInfo.mediaContactPhone || "",
          prContactName: formData.contactInfo.prContactName || "",
          prContactEmail: formData.contactInfo.prContactEmail || "",
          prContactPhone: formData.contactInfo.prContactPhone || "",
          additionalContacts: {
            mediaRelations: formData.contactInfo.additionalContacts?.mediaRelations || "",
            investorRelations: formData.contactInfo.additionalContacts?.investorRelations || "",
            customerSupport: formData.contactInfo.additionalContacts?.customerSupport || "",
          },
        },
        releaseDate: new Date(formData.releaseDate).toISOString(),
        location: formData.location,
        boilerplate: formData.boilerplate,
        category: formData.category,
        tags: Array.isArray(formData.tags) ? formData.tags : [],
        featured: formData.featured,
        published: formData.published,
        publishedAt: formData.published ? new Date().toISOString() : "",
        distributionConfig: {
          autoDistribute: formData.distributionConfig.autoDistribute,
          distributionChannels: Array.isArray(formData.distributionConfig.distributionChannels) 
            ? formData.distributionConfig.distributionChannels 
            : [],
          targetMediaOutlets: Array.isArray(formData.distributionConfig.targetMediaOutlets) 
            ? formData.distributionConfig.targetMediaOutlets 
            : [],
          scheduledDistributionTime: formData.distributionConfig.scheduledDistributionTime 
            ? new Date(formData.distributionConfig.scheduledDistributionTime).toISOString() 
            : "",
          customSettings: {
            pressEmbargo: formData.distributionConfig.customSettings?.pressEmbargo || "",
            contactFollowUp: formData.distributionConfig.customSettings?.contactFollowUp || "",
            priority: formData.distributionConfig.customSettings?.priority || "medium",
          },
        },
        distributionHistory: Array.isArray(formData.distributionHistory) ? formData.distributionHistory : [],
        seoMeta: {
          metaTitle: formData.seoMeta.metaTitle,
          metaDescription: formData.seoMeta.metaDescription,
          metaKeywords: Array.isArray(formData.seoMeta.metaKeywords) 
            ? formData.seoMeta.metaKeywords 
            : [],
          canonicalUrl: formData.seoMeta.canonicalUrl,
          ogTitle: formData.seoMeta.ogTitle,
          ogDescription: formData.seoMeta.ogDescription,
          ogImage: formData.seoMeta.ogImage,
          ogType: formData.seoMeta.ogType,
          noIndex: formData.seoMeta.noIndex,
          structuredData: {
            "@type": "NewsArticle",
            headline: formData.seoMeta.structuredData?.headline || formData.title,
            datePublished: formData.seoMeta.structuredData?.datePublished || new Date().toISOString().split('T')[0],
            publisher: formData.seoMeta.structuredData?.publisher || "Artemis AI",
            author: formData.seoMeta.structuredData?.author || "Artemis AI Communications",
          },
        },
        viewCount: formData.viewCount || 0,
        downloadCount: formData.downloadCount || 0,
        shareCount: formData.shareCount || 0,
        relatedPressIds: Array.isArray(formData.relatedPressIds) ? formData.relatedPressIds : [],
        status: formData.published ? "PUBLISHED" : "DRAFT",
        createdAt: formData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: formData.createdBy || "admin",
        updatedBy: formData.updatedBy || "admin",
        metadata: {
          internalNotes: formData.metadata?.internalNotes || "",
          region: formData.metadata?.region || "",
          priority: formData.metadata?.priority || "medium",
        },
      };

      console.log("Sending data:", JSON.stringify(apiData, null, 2));

      const response = await fetch(url, {
        method,
        headers: HEADERS,
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating/updating press release:", error);
      alert(
        `Failed to ${release ? "update" : "create"} press release. Please check the console for details.`
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
    { id: "contact", label: "Contact Info", icon: "📞" },
    { id: "distribution", label: "Distribution", icon: "📤" },
    { id: "seo", label: "SEO", icon: "🔍" },
    { id: "advanced", label: "Advanced", icon: "⚙️" },
  ];

  const categories = [
    "Technology",
    "Healthcare",
    "Finance",
    "Announcement",
    "Partnership",
  ];
  const distributionChannels = [
    "PR Newswire",
    "BusinessWire",
    "LinkedIn",
    "Twitter",
    "Facebook",
    "Email",
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
          placeholder="Artemis AI Launches New Staffing Automation Suite"
          required
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
          placeholder="artemis-ai-staffing-automation-suite"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subtitle
        </label>
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
            Release Date
          </label>
          <input
            type="datetime-local"
            value={formData.releaseDate.slice(0, 16)}
            onChange={(e) =>
              updateField("releaseDate", new Date(e.target.value).toISOString())
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Logo URL
          </label>
          <input
            type="url"
            value={formData.companyLogo}
            onChange={(e) => updateField("companyLogo", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://cdn.artemis.ai/assets/logo.png"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Website
          </label>
          <input
            type="url"
            value={formData.companyWebsite}
            onChange={(e) => updateField("companyWebsite", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://www.theartemis.ai"
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
              e.target.value.split(",").map((tag) => tag.trim()).filter(tag => tag)
            )
          }
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
            onChange={(e) => {
              updateField("published", e.target.checked);
              if (e.target.checked) {
                updateField("status", "PUBLISHED");
                updateField("publishedAt", new Date().toISOString());
              } else {
                updateField("status", "DRAFT");
                updateField("publishedAt", "");
              }
            }}
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary
        </label>
        <textarea
          value={formData.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief summary of the press release..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => updateField("content", e.target.value)}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Full press release content..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Boilerplate
        </label>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Media Assets (URLs, comma-separated)
        </label>
        <input
          type="text"
          value={formData.mediaAssets.join(", ")}
          onChange={(e) =>
            updateField(
              "mediaAssets",
              e.target.value.split(",").map((url) => url.trim()).filter(url => url)
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://cdn.artemis.ai/press/launch-video.mp4, https://cdn.artemis.ai/press/product-screenshot.png"
        />
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Media Contacts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Media Contact Name
          </label>
          <input
            type="text"
            value={formData.contactInfo.mediaContactName || ""}
            onChange={(e) =>
              updateField("contactInfo.mediaContactName", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Shreya Patel"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Media Contact Email
          </label>
          <input
            type="email"
            value={formData.contactInfo.mediaContactEmail || ""}
            onChange={(e) =>
              updateField("contactInfo.mediaContactEmail", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="press@artemis.ai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Media Contact Phone
          </label>
          <input
            type="tel"
            value={formData.contactInfo.mediaContactPhone || ""}
            onChange={(e) =>
              updateField("contactInfo.mediaContactPhone", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1-415-555-3278"
          />
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900">PR Contacts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PR Contact Name
          </label>
          <input
            type="text"
            value={formData.contactInfo.prContactName || ""}
            onChange={(e) =>
              updateField("contactInfo.prContactName", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Vikas Sharma"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PR Contact Email
          </label>
          <input
            type="email"
            value={formData.contactInfo.prContactEmail || ""}
            onChange={(e) =>
              updateField("contactInfo.prContactEmail", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="pr@artemis.ai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PR Contact Phone
          </label>
          <input
            type="tel"
            value={formData.contactInfo.prContactPhone || ""}
            onChange={(e) =>
              updateField("contactInfo.prContactPhone", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1-415-555-9876"
          />
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900">Additional Contacts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Media Relations
          </label>
          <input
            type="email"
            value={formData.contactInfo.additionalContacts?.mediaRelations || ""}
            onChange={(e) =>
              updateField("contactInfo.additionalContacts.mediaRelations", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="media@artemis.ai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investor Relations
          </label>
          <input
            type="email"
            value={formData.contactInfo.additionalContacts?.investorRelations || ""}
            onChange={(e) =>
              updateField("contactInfo.additionalContacts.investorRelations", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="investors@artemis.ai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Support
          </label>
          <input
            type="email"
            value={formData.contactInfo.additionalContacts?.customerSupport || ""}
            onChange={(e) =>
              updateField("contactInfo.additionalContacts.customerSupport", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="support@artemis.ai"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => updateField("location", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="San Francisco, CA"
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
          onChange={(e) =>
            updateField("distributionConfig.autoDistribute", e.target.checked)
          }
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm text-gray-700">
          Auto-distribute on release
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Distribution Channels
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {distributionChannels.map((channel) => (
            <div key={channel} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.distributionConfig.distributionChannels.includes(
                  channel
                )}
                onChange={(e) => {
                  const current =
                    formData.distributionConfig.distributionChannels;
                  const updated = e.target.checked
                    ? [...current, channel]
                    : current.filter((c) => c !== channel);
                  updateField(
                    "distributionConfig.distributionChannels",
                    updated
                  );
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">{channel}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Media Outlets (comma-separated)
        </label>
        <input
          type="text"
          value={formData.distributionConfig.targetMediaOutlets.join(", ")}
          onChange={(e) =>
            updateField(
              "distributionConfig.targetMediaOutlets",
              e.target.value.split(",").map((outlet) => outlet.trim()).filter(outlet => outlet)
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="TechCrunch, VentureBeat, Business Insider"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Scheduled Distribution Time
        </label>
        <input
          type="datetime-local"
          value={
            formData.distributionConfig.scheduledDistributionTime?.slice(
              0,
              16
            ) || ""
          }
          onChange={(e) =>
            updateField(
              "distributionConfig.scheduledDistributionTime",
              new Date(e.target.value).toISOString()
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Press Embargo Time
          </label>
          <input
            type="datetime-local"
            value={
              formData.distributionConfig.customSettings?.pressEmbargo?.slice(0, 16) || ""
            }
            onChange={(e) =>
              updateField(
                "distributionConfig.customSettings.pressEmbargo",
                new Date(e.target.value).toISOString()
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Follow-up Time
          </label>
          <input
            type="datetime-local"
            value={
              formData.distributionConfig.customSettings?.contactFollowUp?.slice(0, 16) || ""
            }
            onChange={(e) =>
              updateField(
                "distributionConfig.customSettings.contactFollowUp",
                new Date(e.target.value).toISOString()
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
        <select
          value={formData.distributionConfig.customSettings?.priority || "medium"}
          onChange={(e) =>
            updateField("distributionConfig.customSettings.priority", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
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
              e.target.value.split(",").map((k) => k.trim()).filter(k => k)
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

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.seoMeta.noIndex}
          onChange={(e) => updateField("seoMeta.noIndex", e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm text-gray-700">No Index</label>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Related Press IDs (comma-separated)
        </label>
        <input
          type="text"
          value={formData.relatedPressIds.join(", ")}
          onChange={(e) =>
            updateField(
              "relatedPressIds",
              e.target.value.split(",").map((id) => id.trim()).filter(id => id)
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="pr_20250915_002, pr_20250722_003"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Internal Notes
        </label>
        <textarea
          value={formData.metadata?.internalNotes || ""}
          onChange={(e) => updateField("metadata.internalNotes", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="First public announcement of the AI suite launch."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <input
            type="text"
            value={formData.metadata?.region || ""}
            onChange={(e) => updateField("metadata.region", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="North America"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={formData.metadata?.priority || "medium"}
            onChange={(e) => updateField("metadata.priority", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Created By
          </label>
          <input
            type="text"
            value={formData.createdBy}
            onChange={(e) => updateField("createdBy", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="shreya@artemis.ai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Updated By
          </label>
          <input
            type="text"
            value={formData.updatedBy}
            onChange={(e) => updateField("updatedBy", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="vikas@artemis.ai"
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
      case "contact":
        return renderContactTab();
      case "distribution":
        return renderDistributionTab();
      case "seo":
        return renderSEOTab();
      case "advanced":
        return renderAdvancedTab();
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
              {release ? "Edit Press Release" : "Create New Press Release"}
            </h2>
            <p className="text-gray-600">
              Manage your press release content and distribution
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
                  ? (release ? "Updating..." : "Creating...") 
                  : (release ? "Update Press Release" : "Create Press Release")
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}