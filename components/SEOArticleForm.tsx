// "use client";

// import { useState, useEffect } from "react";
// import { SEOArticle, SEOArticleMeta, TableOfContentsItem, Reference } from "@/types/seo";

// const API_URL = "http://157.20.214.84:9292/api/v1/seo-articles";
// const HEADERS = {
//   "X-Tenant": "68b20dd0fb42964f2328b424",
//   "X-User-ID": "658dfb086764754f1fa564d0",
//   "Content-Type": "application/json",
// };

// interface SEOArticleFormProps {
//   article?: SEOArticle | null;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const initialSEOArticleMeta: SEOArticleMeta = {
//   metaTitle: "",
//   metaDescription: "",
//   metaKeywords: [],
//   canonicalUrl: "",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: "",
//   ogType: "article",
//   noIndex: false,
//   structuredData: {}
// };

// const initialFormData: SEOArticle = {
//   id: "",
//   title: "",
//   slug: "",
//   content: "",
//   summary: "",
//   featuredImage: "",
//   featuredImageAlt: "",
//   galleryImages: [],
//   author: "",
//   authorBio: "",
//   authorAvatar: "",
//   authorLinkedIn: "",
//   category: "",
//   subCategory: "",
//   tags: [],
//   featured: false,
//   published: false,
//   publishedAt: new Date().toISOString(),
//   articleType: "BLOG",
//   difficultyLevel: "BEGINNER",
//   seoMeta: initialSEOArticleMeta,
//   viewCount: 0,
//   shareCount: 0,
//   bookmarkCount: 0,
//   readingTimeMinutes: 0,
//   tableOfContents: [],
//   references: [],
//   relatedArticleIds: [],
//   status: "DRAFT",
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   createdBy: "admin",
//   updatedBy: "admin",
//   metadata: {}
// };

// export default function SEOArticleForm({ article, onClose, onSuccess }: SEOArticleFormProps) {
//   const [formData, setFormData] = useState<SEOArticle>(initialFormData);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");

//   // Initialize form data when article prop changes
//   useEffect(() => {
//     if (article) {
//       setFormData(article);
//     } else {
//       setFormData(initialFormData);
//     }
//   }, [article]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const isEdit = !!article?.id;
//       const url = isEdit ? `${API_URL}/${article.id}` : API_URL;
//       const method = isEdit ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
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
//       console.error("Error saving SEO article:", error);
//       alert(`Failed to ${article ? 'update' : 'create'} SEO article. Please check the console for details.`);
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

//   const updateArrayField = (path: string, value: string) => {
//     const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
//     updateField(path, arrayValue);
//   };

//   const addTableOfContentsItem = () => {
//     const newItem: TableOfContentsItem = {
//       id: `item-${Date.now()}`,
//       title: "",
//       level: 1,
//       anchor: ""
//     };
//     setFormData(prev => ({
//       ...prev,
//       tableOfContents: [...prev.tableOfContents, newItem]
//     }));
//   };

//   const updateTableOfContentsItem = (index: number, field: keyof TableOfContentsItem, value: any) => {
//     setFormData(prev => {
//       const updatedTOC = [...prev.tableOfContents];
//       updatedTOC[index] = { ...updatedTOC[index], [field]: value };
//       return { ...prev, tableOfContents: updatedTOC };
//     });
//   };

//   const removeTableOfContentsItem = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       tableOfContents: prev.tableOfContents.filter((_, i) => i !== index)
//     }));
//   };

//   const addReference = () => {
//     const newReference: Reference = {
//       title: "",
//       url: "",
//       author: "",
//       accessedDate: new Date().toISOString(),
//       type: ""
//     };
//     setFormData(prev => ({
//       ...prev,
//       references: [...prev.references, newReference]
//     }));
//   };

//   const updateReference = (index: number, field: keyof Reference, value: any) => {
//     setFormData(prev => {
//       const updatedReferences = [...prev.references];
//       updatedReferences[index] = { ...updatedReferences[index], [field]: value };
//       return { ...prev, references: updatedReferences };
//     });
//   };

//   const removeReference = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       references: prev.references.filter((_, i) => i !== index)
//     }));
//   };

//   const tabs = [
//     { id: "basic", label: "Basic Info", icon: "📝" },
//     { id: "content", label: "Content", icon: "📄" },
//     { id: "seo", label: "SEO Config", icon: "🔍" },
//     { id: "toc", label: "Table of Contents", icon: "📑" },
//     { id: "references", label: "References", icon: "📚" },
//     { id: "settings", label: "Settings", icon: "⚙️" },
//   ];

//   const renderBasicTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
//           <input
//             type="text"
//             required
//             value={formData.title}
//             onChange={(e) => updateField("title", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Getting Started with React 19"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
//           <input
//             type="text"
//             required
//             value={formData.slug}
//             onChange={(e) => updateField("slug", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="getting-started-with-react-19"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
//         <textarea
//           value={formData.summary}
//           onChange={(e) => updateField("summary", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="Brief summary of the article..."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//           <input
//             type="text"
//             required
//             value={formData.category}
//             onChange={(e) => updateField("category", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Web Development"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
//           <input
//             type="text"
//             value={formData.subCategory}
//             onChange={(e) => updateField("subCategory", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="React"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
//         <input
//           type="text"
//           value={formData.tags.join(", ")}
//           onChange={(e) => updateArrayField("tags", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="React, JavaScript, Tutorial"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Article Type</label>
//           <select
//             value={formData.articleType}
//             onChange={(e) => updateField("articleType", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="BLOG">Blog</option>
//             <option value="TUTORIAL">Tutorial</option>
//             <option value="GUIDE">Guide</option>
//             <option value="NEWS">News</option>
//             <option value="REVIEW">Review</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
//           <select
//             value={formData.difficultyLevel}
//             onChange={(e) => updateField("difficultyLevel", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="BEGINNER">Beginner</option>
//             <option value="INTERMEDIATE">Intermediate</option>
//             <option value="ADVANCED">Advanced</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Reading Time (minutes)</label>
//           <input
//             type="number"
//             value={formData.readingTimeMinutes}
//             onChange={(e) => updateField("readingTimeMinutes", parseInt(e.target.value))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             min="1"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderContentTab = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
//         <textarea
//           required
//           value={formData.content}
//           onChange={(e) => updateField("content", e.target.value)}
//           rows={12}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
//           placeholder="Write your article content here..."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
//           <input
//             type="url"
//             value={formData.featuredImage}
//             onChange={(e) => updateField("featuredImage", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image Alt Text</label>
//           <input
//             type="text"
//             value={formData.featuredImageAlt}
//             onChange={(e) => updateField("featuredImageAlt", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (one URL per line)</label>
//         <textarea
//           value={formData.galleryImages.join("\n")}
//           onChange={(e) => updateField("galleryImages", e.target.value.split("\n").filter(url => url.trim()))}
//           rows={4}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
//           placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
//           <input
//             type="text"
//             required
//             value={formData.author}
//             onChange={(e) => updateField("author", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Author Avatar URL</label>
//           <input
//             type="url"
//             value={formData.authorAvatar}
//             onChange={(e) => updateField("authorAvatar", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Author Bio</label>
//         <textarea
//           value={formData.authorBio}
//           onChange={(e) => updateField("authorBio", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Author LinkedIn URL</label>
//         <input
//           type="url"
//           value={formData.authorLinkedIn}
//           onChange={(e) => updateField("authorLinkedIn", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
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
//             value={formData.seoMeta.metaTitle}
//             onChange={(e) => updateField("seoMeta.metaTitle", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
//           <input
//             type="url"
//             value={formData.seoMeta.canonicalUrl}
//             onChange={(e) => updateField("seoMeta.canonicalUrl", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
//         <textarea
//           value={formData.seoMeta.metaDescription}
//           onChange={(e) => updateField("seoMeta.metaDescription", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma-separated)</label>
//         <input
//           type="text"
//           value={formData.seoMeta.metaKeywords.join(", ")}
//           onChange={(e) => updateArrayField("seoMeta.metaKeywords", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
//           <input
//             type="text"
//             value={formData.seoMeta.ogTitle}
//             onChange={(e) => updateField("seoMeta.ogTitle", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
//           <input
//             type="url"
//             value={formData.seoMeta.ogImage}
//             onChange={(e) => updateField("seoMeta.ogImage", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
//         <textarea
//           value={formData.seoMeta.ogDescription}
//           onChange={(e) => updateField("seoMeta.ogDescription", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
//       </div>

//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={formData.seoMeta.noIndex}
//           onChange={(e) => updateField("seoMeta.noIndex", e.target.checked)}
//           className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//         />
//         <label className="ml-2 text-sm text-gray-700">No Index (prevent search engines from indexing)</label>
//       </div>
//     </div>
//   );

//   const renderTOCTab = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">Table of Contents</h3>
//         <button
//           type="button"
//           onClick={addTableOfContentsItem}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
//         >
//           Add Item
//         </button>
//       </div>

//       {formData.tableOfContents.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No table of contents items added yet.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {formData.tableOfContents.map((item, index) => (
//             <div key={item.id} className="border border-gray-200 rounded-lg p-4">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={item.title}
//                     onChange={(e) => updateTableOfContentsItem(index, 'title', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
//                   <select
//                     value={item.level}
//                     onChange={(e) => updateTableOfContentsItem(index, 'level', parseInt(e.target.value))}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   >
//                     <option value={1}>H1</option>
//                     <option value={2}>H2</option>
//                     <option value={3}>H3</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Anchor</label>
//                   <input
//                     type="text"
//                     value={item.anchor}
//                     onChange={(e) => updateTableOfContentsItem(index, 'anchor', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <button
//                     type="button"
//                     onClick={() => removeTableOfContentsItem(index)}
//                     className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderReferencesTab = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">References</h3>
//         <button
//           type="button"
//           onClick={addReference}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
//         >
//           Add Reference
//         </button>
//       </div>

//       {formData.references.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No references added yet.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {formData.references.map((reference, index) => (
//             <div key={index} className="border border-gray-200 rounded-lg p-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={reference.title}
//                     onChange={(e) => updateReference(index, 'title', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
//                   <input
//                     type="url"
//                     value={reference.url}
//                     onChange={(e) => updateReference(index, 'url', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
//                   <input
//                     type="text"
//                     value={reference.author}
//                     onChange={(e) => updateReference(index, 'author', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                   <input
//                     type="text"
//                     value={reference.type}
//                     onChange={(e) => updateReference(index, 'type', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <button
//                     type="button"
//                     onClick={() => removeReference(index)}
//                     className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderSettingsTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//           <select
//             value={formData.status}
//             onChange={(e) => updateField("status", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="DRAFT">Draft</option>
//             <option value="PUBLISHED">Published</option>
//             <option value="ARCHIVED">Archived</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Published Date</label>
//           <input
//             type="datetime-local"
//             value={formData.publishedAt.slice(0, 16)}
//             onChange={(e) => updateField("publishedAt", new Date(e.target.value).toISOString())}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.featured}
//             onChange={(e) => updateField("featured", e.target.checked)}
//             className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Featured Article</label>
//         </div>
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.published}
//             onChange={(e) => updateField("published", e.target.checked)}
//             className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Published</label>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Related Article IDs (comma-separated)</label>
//         <input
//           type="text"
//           value={formData.relatedArticleIds.join(", ")}
//           onChange={(e) => updateArrayField("relatedArticleIds", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="art-001, art-002, art-003"
//         />
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "basic": return renderBasicTab();
//       case "content": return renderContentTab();
//       case "seo": return renderSEOTab();
//       case "toc": return renderTOCTab();
//       case "references": return renderReferencesTab();
//       case "settings": return renderSettingsTab();
//       default: return renderBasicTab();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {article ? "Edit Article" : "Create New Article"}
//             </h2>
//             <p className="text-gray-600">Manage your article content and SEO settings</p>
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
//                     ? "border-green-500 text-green-600"
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
//                 className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (article ? "Updating..." : "Creating...") : (article ? "Update Article" : "Create Article")}
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
// import { SEOArticle, SEOArticleMeta, TableOfContentsItem, Reference } from "@/types/seo";

// const API_URL = "http://157.20.214.84:9292/api/v1/seo-articles";
// const HEADERS = {
//   "accept": "*/*",
//   "X-Tenant": "68b20dd0fb42964f2328b424",
//   "X-User-ID": "system",
//   "Content-Type": "application/json",
// };

// interface SEOArticleFormProps {
//   article?: SEOArticle | null;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const initialSEOArticleMeta: SEOArticleMeta = {
//   metaTitle: "",
//   metaDescription: "",
//   metaKeywords: [],
//   canonicalUrl: "",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: "",
//   ogType: "article",
//   noIndex: false,
//   structuredData: {}
// };

// const initialFormData: SEOArticle = {
//   id: "",
//   title: "",
//   slug: "",
//   content: "",
//   summary: "",
//   featuredImage: "",
//   featuredImageAlt: "",
//   galleryImages: [],
//   author: "",
//   authorBio: "",
//   authorAvatar: "",
//   authorLinkedIn: "",
//   category: "",
//   subCategory: "",
//   tags: [],
//   featured: false,
//   published: false,
//   publishedAt: new Date().toISOString(),
//   articleType: "BLOG",
//   difficultyLevel: "BEGINNER",
//   seoMeta: initialSEOArticleMeta,
//   viewCount: 0,
//   shareCount: 0,
//   bookmarkCount: 0,
//   readingTimeMinutes: 0,
//   tableOfContents: [],
//   references: [],
//   relatedArticleIds: [],
//   status: "DRAFT",
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   createdBy: "admin",
//   updatedBy: "admin",
//   metadata: {}
// };

// export default function SEOArticleForm({ article, onClose, onSuccess }: SEOArticleFormProps) {
//   const [formData, setFormData] = useState<SEOArticle>(initialFormData);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");

//   useEffect(() => {
//     if (article) {
//       setFormData(article);
//     } else {
//       setFormData(initialFormData);
//     }
//   }, [article]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const isEdit = !!article?.id;
//       const url = isEdit ? `${API_URL}/${article.id}` : API_URL;
//       const method = isEdit ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: HEADERS,
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       await response.json();
//       onSuccess();
//     } catch (error) {
//       console.error("Error saving SEO article:", error);
//       alert(`Failed to ${article ? 'update' : 'create'} SEO article. Please check the console for details.`);
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

//   const updateArrayField = (path: string, value: string) => {
//     const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
//     updateField(path, arrayValue);
//   };

//   const addTableOfContentsItem = () => {
//     const newItem: TableOfContentsItem = {
//       id: `item-${Date.now()}`,
//       title: "",
//       level: 1,
//       anchor: ""
//     };
//     setFormData(prev => ({
//       ...prev,
//       tableOfContents: [...prev.tableOfContents, newItem]
//     }));
//   };

//   const updateTableOfContentsItem = (index: number, field: keyof TableOfContentsItem, value: any) => {
//     setFormData(prev => {
//       const updatedTOC = [...prev.tableOfContents];
//       updatedTOC[index] = { ...updatedTOC[index], [field]: value };
//       return { ...prev, tableOfContents: updatedTOC };
//     });
//   };

//   const removeTableOfContentsItem = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       tableOfContents: prev.tableOfContents.filter((_, i) => i !== index)
//     }));
//   };

//   const addReference = () => {
//     const newReference: Reference = {
//       title: "",
//       url: "",
//       author: "",
//       accessedDate: new Date().toISOString(),
//       type: ""
//     };
//     setFormData(prev => ({
//       ...prev,
//       references: [...prev.references, newReference]
//     }));
//   };

//   const updateReference = (index: number, field: keyof Reference, value: any) => {
//     setFormData(prev => {
//       const updatedReferences = [...prev.references];
//       updatedReferences[index] = { ...updatedReferences[index], [field]: value };
//       return { ...prev, references: updatedReferences };
//     });
//   };

//   const removeReference = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       references: prev.references.filter((_, i) => i !== index)
//     }));
//   };

//   const tabs = [
//     { id: "basic", label: "Basic Info", icon: "📝" },
//     { id: "content", label: "Content", icon: "📄" },
//     { id: "seo", label: "SEO Config", icon: "🔍" },
//     { id: "toc", label: "Table of Contents", icon: "📑" },
//     { id: "references", label: "References", icon: "📚" },
//     { id: "settings", label: "Settings", icon: "⚙️" },
//   ];

//   const renderBasicTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
//           <input
//             type="text"
//             required
//             value={formData.title}
//             onChange={(e) => updateField("title", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Getting Started with React 19"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
//           <input
//             type="text"
//             required
//             value={formData.slug}
//             onChange={(e) => updateField("slug", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="getting-started-with-react-19"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
//         <textarea
//           value={formData.summary}
//           onChange={(e) => updateField("summary", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="Brief summary of the article..."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//           <input
//             type="text"
//             required
//             value={formData.category}
//             onChange={(e) => updateField("category", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Web Development"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
//           <input
//             type="text"
//             value={formData.subCategory}
//             onChange={(e) => updateField("subCategory", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="React"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
//         <input
//           type="text"
//           value={formData.tags.join(", ")}
//           onChange={(e) => updateArrayField("tags", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="React, JavaScript, Tutorial"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Article Type</label>
//           <select
//             value={formData.articleType}
//             onChange={(e) => updateField("articleType", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="BLOG">Blog</option>
//             <option value="TUTORIAL">Tutorial</option>
//             <option value="GUIDE">Guide</option>
//             <option value="NEWS">News</option>
//             <option value="REVIEW">Review</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
//           <select
//             value={formData.difficultyLevel}
//             onChange={(e) => updateField("difficultyLevel", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="BEGINNER">Beginner</option>
//             <option value="INTERMEDIATE">Intermediate</option>
//             <option value="ADVANCED">Advanced</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Reading Time (minutes)</label>
//           <input
//             type="number"
//             value={formData.readingTimeMinutes}
//             onChange={(e) => updateField("readingTimeMinutes", parseInt(e.target.value))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             min="1"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderContentTab = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
//         <textarea
//           required
//           value={formData.content}
//           onChange={(e) => updateField("content", e.target.value)}
//           rows={12}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
//           placeholder="Write your article content here..."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
//           <input
//             type="url"
//             value={formData.featuredImage}
//             onChange={(e) => updateField("featuredImage", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image Alt Text</label>
//           <input
//             type="text"
//             value={formData.featuredImageAlt}
//             onChange={(e) => updateField("featuredImageAlt", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (one URL per line)</label>
//         <textarea
//           value={formData.galleryImages.join("\n")}
//           onChange={(e) => updateField("galleryImages", e.target.value.split("\n").filter(url => url.trim()))}
//           rows={4}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
//           placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
//           <input
//             type="text"
//             required
//             value={formData.author}
//             onChange={(e) => updateField("author", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Author Avatar URL</label>
//           <input
//             type="url"
//             value={formData.authorAvatar}
//             onChange={(e) => updateField("authorAvatar", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Author Bio</label>
//         <textarea
//           value={formData.authorBio}
//           onChange={(e) => updateField("authorBio", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Author LinkedIn URL</label>
//         <input
//           type="url"
//           value={formData.authorLinkedIn}
//           onChange={(e) => updateField("authorLinkedIn", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
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
//             value={formData.seoMeta.metaTitle}
//             onChange={(e) => updateField("seoMeta.metaTitle", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
//           <input
//             type="url"
//             value={formData.seoMeta.canonicalUrl}
//             onChange={(e) => updateField("seoMeta.canonicalUrl", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
//         <textarea
//           value={formData.seoMeta.metaDescription}
//           onChange={(e) => updateField("seoMeta.metaDescription", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma-separated)</label>
//         <input
//           type="text"
//           value={formData.seoMeta.metaKeywords.join(", ")}
//           onChange={(e) => updateArrayField("seoMeta.metaKeywords", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
//           <input
//             type="text"
//             value={formData.seoMeta.ogTitle}
//             onChange={(e) => updateField("seoMeta.ogTitle", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
//           <input
//             type="url"
//             value={formData.seoMeta.ogImage}
//             onChange={(e) => updateField("seoMeta.ogImage", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
//         <textarea
//           value={formData.seoMeta.ogDescription}
//           onChange={(e) => updateField("seoMeta.ogDescription", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//         />
//       </div>

//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={formData.seoMeta.noIndex}
//           onChange={(e) => updateField("seoMeta.noIndex", e.target.checked)}
//           className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//         />
//         <label className="ml-2 text-sm text-gray-700">No Index (prevent search engines from indexing)</label>
//       </div>
//     </div>
//   );

//   const renderTOCTab = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">Table of Contents</h3>
//         <button
//           type="button"
//           onClick={addTableOfContentsItem}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
//         >
//           Add Item
//         </button>
//       </div>

//       {formData.tableOfContents.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No table of contents items added yet.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {formData.tableOfContents.map((item, index) => (
//             <div key={item.id} className="border border-gray-200 rounded-lg p-4">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={item.title}
//                     onChange={(e) => updateTableOfContentsItem(index, 'title', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
//                   <select
//                     value={item.level}
//                     onChange={(e) => updateTableOfContentsItem(index, 'level', parseInt(e.target.value))}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   >
//                     <option value={1}>H1</option>
//                     <option value={2}>H2</option>
//                     <option value={3}>H3</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Anchor</label>
//                   <input
//                     type="text"
//                     value={item.anchor}
//                     onChange={(e) => updateTableOfContentsItem(index, 'anchor', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <button
//                     type="button"
//                     onClick={() => removeTableOfContentsItem(index)}
//                     className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderReferencesTab = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">References</h3>
//         <button
//           type="button"
//           onClick={addReference}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
//         >
//           Add Reference
//         </button>
//       </div>

//       {formData.references.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No references added yet.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {formData.references.map((reference, index) => (
//             <div key={index} className="border border-gray-200 rounded-lg p-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={reference.title}
//                     onChange={(e) => updateReference(index, 'title', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
//                   <input
//                     type="url"
//                     value={reference.url}
//                     onChange={(e) => updateReference(index, 'url', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
//                   <input
//                     type="text"
//                     value={reference.author}
//                     onChange={(e) => updateReference(index, 'author', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                   <input
//                     type="text"
//                     value={reference.type}
//                     onChange={(e) => updateReference(index, 'type', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <button
//                     type="button"
//                     onClick={() => removeReference(index)}
//                     className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderSettingsTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//           <select
//             value={formData.status}
//             onChange={(e) => updateField("status", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="DRAFT">Draft</option>
//             <option value="PUBLISHED">Published</option>
//             <option value="ARCHIVED">Archived</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Published Date</label>
//           <input
//             type="datetime-local"
//             value={formData.publishedAt.slice(0, 16)}
//             onChange={(e) => updateField("publishedAt", new Date(e.target.value).toISOString())}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.featured}
//             onChange={(e) => updateField("featured", e.target.checked)}
//             className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Featured Article</label>
//         </div>
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.published}
//             onChange={(e) => updateField("published", e.target.checked)}
//             className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Published</label>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Related Article IDs (comma-separated)</label>
//         <input
//           type="text"
//           value={formData.relatedArticleIds.join(", ")}
//           onChange={(e) => updateArrayField("relatedArticleIds", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="art-001, art-002, art-003"
//         />
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "basic": return renderBasicTab();
//       case "content": return renderContentTab();
//       case "seo": return renderSEOTab();
//       case "toc": return renderTOCTab();
//       case "references": return renderReferencesTab();
//       case "settings": return renderSettingsTab();
//       default: return renderBasicTab();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {article ? "Edit Article" : "Create New Article"}
//             </h2>
//             <p className="text-gray-600">Manage your article content and SEO settings</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <span className="text-2xl">×</span>
//           </button>
//         </div>

//         <div className="border-b border-gray-200">
//           <div className="flex space-x-8 px-6 overflow-x-auto">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? "border-green-500 text-green-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <span>{tab.icon}</span>
//                 <span className="font-medium">{tab.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[60vh]">
//           <form onSubmit={handleSubmit}>
//             {renderTabContent()}

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
//                 className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (article ? "Updating..." : "Creating...") : (article ? "Update Article" : "Create Article")}
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
// import { SEOArticle, SEOArticleMeta, TableOfContentsItem, Reference } from "@/types/seo";

// const API_URL = "http://157.20.214.84:9292/api/v1/seo-articles";
// const HEADERS = {
//   "accept": "*/*",
//   "X-Tenant": "68b20dd0fb42964f2328b424",
//   "X-User-ID": "system",
//   "Content-Type": "application/json",
// };

// interface SEOArticleFormProps {
//   article?: SEOArticle | null;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const initialSEOArticleMeta: SEOArticleMeta = {
//   metaTitle: "",
//   metaDescription: "",
//   metaKeywords: [],
//   canonicalUrl: "",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: "",
//   ogType: "website",
//   twitterCard: "summary_large_image", // Added missing field
//   noIndex: false,
//   noFollow: false, // Added missing field
//   structuredData: {}
// };

// const initialFormData: SEOArticle = {
//   id: "",
//   title: "",
//   slug: "",
//   content: "",
//   summary: "",
//   featuredImage: "",
//   featuredImageAlt: "",
//   galleryImages: [],
//   author: "",
//   authorBio: "", // Added missing field
//   authorAvatar: "", // Added missing field
//   authorLinkedIn: "", // Added missing field
//   category: "",
//   subCategory: "",
//   tags: [],
//   featured: false,
//   published: false,
//   publishedAt: new Date().toISOString(),
//   articleType: "TUTORIAL", // Changed default to match your API
//   difficultyLevel: "BEGINNER",
//   seoMeta: initialSEOArticleMeta,
//   viewCount: 0,
//   shareCount: 0,
//   bookmarkCount: 0,
//   readingTimeMinutes: 0,
//   tableOfContents: [],
//   references: [],
//   relatedArticleIds: [],
//   status: "DRAFT",
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   createdBy: "system", // Changed to match your API
//   updatedBy: "system", // Changed to match your API
//   metadata: {}
// };

// export default function SEOArticleForm({ article, onClose, onSuccess }: SEOArticleFormProps) {
//   const [formData, setFormData] = useState<SEOArticle>(initialFormData);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");

//   useEffect(() => {
//     if (article) {
//       setFormData(article);
//     } else {
//       setFormData(initialFormData);
//     }
//   }, [article]);

//   // Prepare the API payload according to your curl structure
//   const prepareApiPayload = (data: SEOArticle) => {
//     return {
//       title: data.title,
//       slug: data.slug,
//       content: data.content,
//       summary: data.summary,
//       featuredImage: data.featuredImage,
//       featuredImageAlt: data.featuredImageAlt,
//       galleryImages: data.galleryImages,
//       author: data.author,
//       authorBio: data.authorBio,
//       authorAvatar: data.authorAvatar,
//       authorLinkedIn: data.authorLinkedIn,
//       category: data.category,
//       subCategory: data.subCategory,
//       tags: data.tags,
//       featured: data.featured,
//       published: data.published,
//       publishedAt: data.publishedAt,
//       articleType: data.articleType,
//       difficultyLevel: data.difficultyLevel,
//       seoMeta: {
//         metaTitle: data.seoMeta.metaTitle,
//         metaDescription: data.seoMeta.metaDescription,
//         metaKeywords: data.seoMeta.metaKeywords,
//         canonicalUrl: data.seoMeta.canonicalUrl,
//         ogTitle: data.seoMeta.ogTitle,
//         ogDescription: data.seoMeta.ogDescription,
//         ogImage: data.seoMeta.ogImage,
//         twitterCard: data.seoMeta.twitterCard || "summary_large_image",
//         noIndex: data.seoMeta.noIndex,
//         noFollow: data.seoMeta.noFollow || false
//       },
//       viewCount: data.viewCount,
//       shareCount: data.shareCount,
//       bookmarkCount: data.bookmarkCount,
//       readingTimeMinutes: data.readingTimeMinutes,
//       tableOfContents: data.tableOfContents,
//       references: data.references,
//       relatedArticleIds: data.relatedArticleIds,
//       status: data.status,
//       createdBy: data.createdBy,
//       updatedBy: data.updatedBy
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const isEdit = !!article?.id;
//       const url = isEdit ? `${API_URL}/${article.id}` : API_URL;
//       const method = isEdit ? "PUT" : "POST";

//       const apiPayload = prepareApiPayload(formData);

//       console.log("Sending payload:", apiPayload); // For debugging

//       const response = await fetch(url, {
//         method,
//         headers: HEADERS,
//         body: JSON.stringify(apiPayload),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("API Error:", errorText);
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const result = await response.json();
//       console.log("API Response:", result); // For debugging
      
//       onSuccess();
//     } catch (error) {
//       console.error("Error saving SEO article:", error);
//       alert(`Failed to ${article ? 'update' : 'create'} SEO article. Please check the console for details.`);
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

//   const updateArrayField = (path: string, value: string) => {
//     const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
//     updateField(path, arrayValue);
//   };

//   const addTableOfContentsItem = () => {
//     const newItem: TableOfContentsItem = {
//       id: `item-${Date.now()}`,
//       title: "",
//       level: 1,
//       anchor: ""
//     };
//     setFormData(prev => ({
//       ...prev,
//       tableOfContents: [...prev.tableOfContents, newItem]
//     }));
//   };

//   const updateTableOfContentsItem = (index: number, field: keyof TableOfContentsItem, value: any) => {
//     setFormData(prev => {
//       const updatedTOC = [...prev.tableOfContents];
//       updatedTOC[index] = { ...updatedTOC[index], [field]: value };
//       return { ...prev, tableOfContents: updatedTOC };
//     });
//   };

//   const removeTableOfContentsItem = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       tableOfContents: prev.tableOfContents.filter((_, i) => i !== index)
//     }));
//   };

//   const addReference = () => {
//     const newReference: Reference = {
//       title: "",
//       url: "",
//       author: "",
//       accessedDate: new Date().toISOString(),
//       type: ""
//     };
//     setFormData(prev => ({
//       ...prev,
//       references: [...prev.references, newReference]
//     }));
//   };

//   const updateReference = (index: number, field: keyof Reference, value: any) => {
//     setFormData(prev => {
//       const updatedReferences = [...prev.references];
//       updatedReferences[index] = { ...updatedReferences[index], [field]: value };
//       return { ...prev, references: updatedReferences };
//     });
//   };

//   const removeReference = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       references: prev.references.filter((_, i) => i !== index)
//     }));
//   };

//   const tabs = [
//     { id: "basic", label: "Basic Info", icon: "📝" },
//     { id: "content", label: "Content", icon: "📄" },
//     { id: "seo", label: "SEO Config", icon: "🔍" },
//     { id: "toc", label: "Table of Contents", icon: "📑" },
//     { id: "references", label: "References", icon: "📚" },
//     { id: "settings", label: "Settings", icon: "⚙️" },
//   ];

//   const renderBasicTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
//           <input
//             type="text"
//             required
//             value={formData.title}
//             onChange={(e) => updateField("title", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Getting Started with React 19 and Next.js 16"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
//           <input
//             type="text"
//             required
//             value={formData.slug}
//             onChange={(e) => updateField("slug", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="getting-started-with-react-19-and-nextjs-16"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
//         <textarea
//           value={formData.summary}
//           onChange={(e) => updateField("summary", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="Learn how to set up and build your first web app using React 19 and Next.js 16 with Turbopack..."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//           <input
//             type="text"
//             required
//             value={formData.category}
//             onChange={(e) => updateField("category", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Web Development"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
//           <input
//             type="text"
//             value={formData.subCategory}
//             onChange={(e) => updateField("subCategory", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="React"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
//         <input
//           type="text"
//           value={formData.tags.join(", ")}
//           onChange={(e) => updateArrayField("tags", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="React 19, Next.js 16, Turbopack, JavaScript, Frontend Development"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Article Type</label>
//           <select
//             value={formData.articleType}
//             onChange={(e) => updateField("articleType", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="BLOG">Blog</option>
//             <option value="TUTORIAL">Tutorial</option>
//             <option value="GUIDE">Guide</option>
//             <option value="NEWS">News</option>
//             <option value="REVIEW">Review</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
//           <select
//             value={formData.difficultyLevel}
//             onChange={(e) => updateField("difficultyLevel", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="BEGINNER">Beginner</option>
//             <option value="INTERMEDIATE">Intermediate</option>
//             <option value="ADVANCED">Advanced</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Reading Time (minutes)</label>
//           <input
//             type="number"
//             value={formData.readingTimeMinutes}
//             onChange={(e) => updateField("readingTimeMinutes", parseInt(e.target.value) || 0)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             min="1"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderContentTab = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
//         <textarea
//           required
//           value={formData.content}
//           onChange={(e) => updateField("content", e.target.value)}
//           rows={12}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
//           placeholder="Write your article content here..."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
//           <input
//             type="url"
//             value={formData.featuredImage}
//             onChange={(e) => updateField("featuredImage", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="https://cdn.techblog.com/articles/react19-nextjs16-cover.jpg"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image Alt Text</label>
//           <input
//             type="text"
//             value={formData.featuredImageAlt}
//             onChange={(e) => updateField("featuredImageAlt", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="React 19 and Next.js 16 setup tutorial banner"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (one URL per line)</label>
//         <textarea
//           value={formData.galleryImages.join("\n")}
//           onChange={(e) => updateField("galleryImages", e.target.value.split("\n").filter(url => url.trim()))}
//           rows={4}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
//           placeholder="https://cdn.techblog.com/articles/react19-screenshot1.jpg&#10;https://cdn.techblog.com/articles/react19-screenshot2.jpg"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
//           <input
//             type="text"
//             required
//             value={formData.author}
//             onChange={(e) => updateField("author", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Harsh Mehta"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Author Avatar URL</label>
//           <input
//             type="url"
//             value={formData.authorAvatar}
//             onChange={(e) => updateField("authorAvatar", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="https://cdn.techblog.com/authors/harsh-mehta-avatar.jpg"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Author Bio</label>
//         <textarea
//           value={formData.authorBio}
//           onChange={(e) => updateField("authorBio", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="Harsh Mehta is a full-stack developer and technical writer specializing in React, Next.js, and cloud deployment."
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Author LinkedIn URL</label>
//         <input
//           type="url"
//           value={formData.authorLinkedIn}
//           onChange={(e) => updateField("authorLinkedIn", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="https://linkedin.com/in/harshmehta-dev"
//         />
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
//             value={formData.seoMeta.metaTitle}
//             onChange={(e) => updateField("seoMeta.metaTitle", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Getting Started with React 19 and Next.js 16 | Beginner's Guide"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
//           <input
//             type="url"
//             value={formData.seoMeta.canonicalUrl}
//             onChange={(e) => updateField("seoMeta.canonicalUrl", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="https://www.techblog.com/tutorials/getting-started-with-react-19-and-nextjs-16"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
//         <textarea
//           value={formData.seoMeta.metaDescription}
//           onChange={(e) => updateField("seoMeta.metaDescription", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="A complete step-by-step guide for beginners to set up and build modern web apps using React 19 and Next.js 16 with Turbopack."
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma-separated)</label>
//         <input
//           type="text"
//           value={formData.seoMeta.metaKeywords.join(", ")}
//           onChange={(e) => updateArrayField("seoMeta.metaKeywords", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="React 19 tutorial, Next.js 16 setup, Turbopack guide, modern web development, React beginner tutorial"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
//           <input
//             type="text"
//             value={formData.seoMeta.ogTitle}
//             onChange={(e) => updateField("seoMeta.ogTitle", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Learn React 19 and Next.js 16 - Beginner Tutorial"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
//           <input
//             type="url"
//             value={formData.seoMeta.ogImage}
//             onChange={(e) => updateField("seoMeta.ogImage", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="https://cdn.techblog.com/articles/react19-ogimage.jpg"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
//         <textarea
//           value={formData.seoMeta.ogDescription}
//           onChange={(e) => updateField("seoMeta.ogDescription", e.target.value)}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="Step-by-step tutorial on building web apps using React 19 and Next.js 16. Perfect for beginners starting with modern frontend development."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Card</label>
//           <select
//             value={formData.seoMeta.twitterCard || "summary_large_image"}
//             onChange={(e) => updateField("seoMeta.twitterCard", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="summary">Summary</option>
//             <option value="summary_large_image">Summary Large Image</option>
//             <option value="app">App</option>
//             <option value="player">Player</option>
//           </select>
//         </div>
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.seoMeta.noIndex}
//             onChange={(e) => updateField("seoMeta.noIndex", e.target.checked)}
//             className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">No Index</label>
//         </div>
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.seoMeta.noFollow || false}
//             onChange={(e) => updateField("seoMeta.noFollow", e.target.checked)}
//             className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">No Follow</label>
//         </div>
//       </div>
//     </div>
//   );

//   const renderTOCTab = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">Table of Contents</h3>
//         <button
//           type="button"
//           onClick={addTableOfContentsItem}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
//         >
//           Add Item
//         </button>
//       </div>

//       {formData.tableOfContents.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No table of contents items added yet.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {formData.tableOfContents.map((item, index) => (
//             <div key={item.id} className="border border-gray-200 rounded-lg p-4">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={item.title}
//                     onChange={(e) => updateTableOfContentsItem(index, 'title', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                     placeholder="Introduction"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
//                   <select
//                     value={item.level}
//                     onChange={(e) => updateTableOfContentsItem(index, 'level', parseInt(e.target.value))}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                   >
//                     <option value={1}>H1</option>
//                     <option value={2}>H2</option>
//                     <option value={3}>H3</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Anchor</label>
//                   <input
//                     type="text"
//                     value={item.anchor}
//                     onChange={(e) => updateTableOfContentsItem(index, 'anchor', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                     placeholder="introduction"
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <button
//                     type="button"
//                     onClick={() => removeTableOfContentsItem(index)}
//                     className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderReferencesTab = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">References</h3>
//         <button
//           type="button"
//           onClick={addReference}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
//         >
//           Add Reference
//         </button>
//       </div>

//       {formData.references.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No references added yet.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {formData.references.map((reference, index) => (
//             <div key={index} className="border border-gray-200 rounded-lg p-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={reference.title}
//                     onChange={(e) => updateReference(index, 'title', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                     placeholder="React 19 Official Documentation"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
//                   <input
//                     type="url"
//                     value={reference.url}
//                     onChange={(e) => updateReference(index, 'url', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                     placeholder="https://react.dev/blog/2025/10/30/react-19"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
//                   <input
//                     type="text"
//                     value={reference.author}
//                     onChange={(e) => updateReference(index, 'author', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                     placeholder="React Team"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                   <input
//                     type="text"
//                     value={reference.type}
//                     onChange={(e) => updateReference(index, 'type', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
//                     placeholder="Official Documentation"
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <button
//                     type="button"
//                     onClick={() => removeReference(index)}
//                     className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderSettingsTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//           <select
//             value={formData.status}
//             onChange={(e) => updateField("status", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           >
//             <option value="DRAFT">Draft</option>
//             <option value="PUBLISHED">Published</option>
//             <option value="ARCHIVED">Archived</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Published Date</label>
//           <input
//             type="datetime-local"
//             value={formData.publishedAt.slice(0, 16)}
//             onChange={(e) => updateField("publishedAt", new Date(e.target.value).toISOString())}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.featured}
//             onChange={(e) => updateField("featured", e.target.checked)}
//             className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Featured Article</label>
//         </div>
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={formData.published}
//             onChange={(e) => updateField("published", e.target.checked)}
//             className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//           />
//           <label className="ml-2 text-sm text-gray-700">Published</label>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Related Article IDs (comma-separated)</label>
//         <input
//           type="text"
//           value={formData.relatedArticleIds.join(", ")}
//           onChange={(e) => updateArrayField("relatedArticleIds", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           placeholder="art-20251020-react-hooks-guide, art-20250915-deploy-nextjs-vercel"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Created By</label>
//           <input
//             type="text"
//             value={formData.createdBy}
//             onChange={(e) => updateField("createdBy", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="system"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Updated By</label>
//           <input
//             type="text"
//             value={formData.updatedBy}
//             onChange={(e) => updateField("updatedBy", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="system"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "basic": return renderBasicTab();
//       case "content": return renderContentTab();
//       case "seo": return renderSEOTab();
//       case "toc": return renderTOCTab();
//       case "references": return renderReferencesTab();
//       case "settings": return renderSettingsTab();
//       default: return renderBasicTab();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {article ? "Edit Article" : "Create New Article"}
//             </h2>
//             <p className="text-gray-600">Manage your article content and SEO settings</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <span className="text-2xl">×</span>
//           </button>
//         </div>

//         <div className="border-b border-gray-200">
//           <div className="flex space-x-8 px-6 overflow-x-auto">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? "border-green-500 text-green-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <span>{tab.icon}</span>
//                 <span className="font-medium">{tab.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[60vh]">
//           <form onSubmit={handleSubmit}>
//             {renderTabContent()}

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
//                 className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (article ? "Updating..." : "Creating...") : (article ? "Update Article" : "Create Article")}
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
import { SEOArticle, SEOArticleMeta, TableOfContentsItem, Reference } from "@/types/seo";

const API_URL = "http://157.20.214.84:9292/api/v1/seo-articles";
const HEADERS = {
  "accept": "*/*",
  "X-Tenant": "68b20dd0fb42964f2328b424",
  "X-User-ID": "system",
  "Content-Type": "application/json",
};

interface SEOArticleFormProps {
  article?: SEOArticle | null;
  onClose: () => void;
  onSuccess: () => void;
}

const initialSEOArticleMeta: SEOArticleMeta = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "website",
  twitterCard: "summary_large_image",
  noIndex: false,
  noFollow: false,
  structuredData: {}
};

const initialFormData: SEOArticle = {
  id: "",
  title: "",
  slug: "",
  content: "",
  summary: "",
  featuredImage: "",
  featuredImageAlt: "",
  galleryImages: [],
  author: "",
  authorBio: "",
  authorAvatar: "",
  authorLinkedIn: "",
  category: "",
  subCategory: "",
  tags: [],
  featured: false,
  published: false,
  publishedAt: new Date().toISOString(),
  articleType: "RESEARCH",
  difficultyLevel: "INTERMEDIATE",
  seoMeta: initialSEOArticleMeta,
  viewCount: 0,
  shareCount: 0,
  bookmarkCount: 0,
  readingTimeMinutes: 0,
  tableOfContents: [],
  references: [],
  relatedArticleIds: [],
  status: "DRAFT",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: "system",
  updatedBy: "system",
  metadata: {}
};

export default function SEOArticleForm({ article, onClose, onSuccess }: SEOArticleFormProps) {
  const [formData, setFormData] = useState<SEOArticle>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      setFormData(initialFormData);
    }
  }, [article]);

  // Prepare the API payload according to your curl structure
  const prepareApiPayload = (data: SEOArticle) => {
    return {
      title: data.title,
      slug: data.slug,
      content: data.content,
      summary: data.summary,
      featuredImage: data.featuredImage,
      featuredImageAlt: data.featuredImageAlt,
      galleryImages: data.galleryImages,
      author: data.author,
      authorBio: data.authorBio,
      authorAvatar: data.authorAvatar,
      authorLinkedIn: data.authorLinkedIn,
      category: data.category,
      subCategory: data.subCategory,
      tags: data.tags,
      featured: data.featured,
      published: data.published,
      publishedAt: data.publishedAt,
      articleType: data.articleType,
      difficultyLevel: data.difficultyLevel,
      seoMeta: {
        metaTitle: data.seoMeta.metaTitle,
        metaDescription: data.seoMeta.metaDescription,
        metaKeywords: data.seoMeta.metaKeywords,
        canonicalUrl: data.seoMeta.canonicalUrl,
        ogTitle: data.seoMeta.ogTitle,
        ogDescription: data.seoMeta.ogDescription,
        ogImage: data.seoMeta.ogImage,
        twitterCard: data.seoMeta.twitterCard || "summary_large_image",
        noIndex: data.seoMeta.noIndex,
        noFollow: data.seoMeta.noFollow || false
      },
      viewCount: data.viewCount,
      shareCount: data.shareCount,
      bookmarkCount: data.bookmarkCount,
      readingTimeMinutes: data.readingTimeMinutes,
      tableOfContents: data.tableOfContents,
      references: data.references,
      relatedArticleIds: data.relatedArticleIds,
      status: data.status,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isEdit = !!article?.id;
      const url = isEdit ? `${API_URL}/${article.id}` : API_URL;
      const method = isEdit ? "PUT" : "POST";

      const apiPayload = prepareApiPayload(formData);

      console.log("Sending payload:", apiPayload);

      const response = await fetch(url, {
        method,
        headers: HEADERS,
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      
      onSuccess();
    } catch (error) {
      console.error("Error saving SEO article:", error);
      alert(`Failed to ${article ? 'update' : 'create'} SEO article. Please check the console for details.`);
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

  const updateArrayField = (path: string, value: string) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    updateField(path, arrayValue);
  };

  const addTableOfContentsItem = () => {
    const newItem: TableOfContentsItem = {
      id: `item-${Date.now()}`,
      title: "",
      level: 1,
      anchor: ""
    };
    setFormData(prev => ({
      ...prev,
      tableOfContents: [...prev.tableOfContents, newItem]
    }));
  };

  const updateTableOfContentsItem = (index: number, field: keyof TableOfContentsItem, value: any) => {
    setFormData(prev => {
      const updatedTOC = [...prev.tableOfContents];
      updatedTOC[index] = { ...updatedTOC[index], [field]: value };
      return { ...prev, tableOfContents: updatedTOC };
    });
  };

  const removeTableOfContentsItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tableOfContents: prev.tableOfContents.filter((_, i) => i !== index)
    }));
  };

  const addReference = () => {
    const newReference: Reference = {
      title: "",
      url: "",
      author: "",
      accessedDate: new Date().toISOString(),
      type: ""
    };
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, newReference]
    }));
  };

  const updateReference = (index: number, field: keyof Reference, value: any) => {
    setFormData(prev => {
      const updatedReferences = [...prev.references];
      updatedReferences[index] = { ...updatedReferences[index], [field]: value };
      return { ...prev, references: updatedReferences };
    });
  };

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "📝" },
    { id: "content", label: "Content", icon: "📄" },
    { id: "seo", label: "SEO Config", icon: "🔍" },
    { id: "toc", label: "Table of Contents", icon: "📑" },
    { id: "references", label: "References", icon: "📚" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const renderBasicTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter article title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="article-url-slug"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
        <textarea
          value={formData.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Brief summary of the article content"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <input
            type="text"
            required
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Main category"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
          <input
            type="text"
            value={formData.subCategory}
            onChange={(e) => updateField("subCategory", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Sub category"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags.join(", ")}
          onChange={(e) => updateArrayField("tags", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Article Type</label>
          <select
            value={formData.articleType}
            onChange={(e) => updateField("articleType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="BLOG">Blog</option>
            <option value="TUTORIAL">Tutorial</option>
            <option value="GUIDE">Guide</option>
            <option value="NEWS">News</option>
            <option value="REVIEW">Review</option>
            <option value="RESEARCH">Research</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
          <select
            value={formData.difficultyLevel}
            onChange={(e) => updateField("difficultyLevel", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reading Time (minutes)</label>
          <input
            type="number"
            value={formData.readingTimeMinutes}
            onChange={(e) => updateField("readingTimeMinutes", parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            min="1"
            placeholder="5"
          />
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => updateField("content", e.target.value)}
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
          placeholder="Write your article content here..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
          <input
            type="url"
            value={formData.featuredImage}
            onChange={(e) => updateField("featuredImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="https://example.com/images/featured-image.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image Alt Text</label>
          <input
            type="text"
            value={formData.featuredImageAlt}
            onChange={(e) => updateField("featuredImageAlt", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Descriptive alt text for the image"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (one URL per line)</label>
        <textarea
          value={formData.galleryImages.join("\n")}
          onChange={(e) => updateField("galleryImages", e.target.value.split("\n").filter(url => url.trim()))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
          placeholder="https://example.com/images/image1.jpg&#10;https://example.com/images/image2.jpg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
          <input
            type="text"
            required
            value={formData.author}
            onChange={(e) => updateField("author", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Author name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author Avatar URL</label>
          <input
            type="url"
            value={formData.authorAvatar}
            onChange={(e) => updateField("authorAvatar", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="https://example.com/avatars/author.jpg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Author Bio</label>
        <textarea
          value={formData.authorBio}
          onChange={(e) => updateField("authorBio", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Brief biography of the author"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Author LinkedIn URL</label>
        <input
          type="url"
          value={formData.authorLinkedIn}
          onChange={(e) => updateField("authorLinkedIn", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="https://linkedin.com/in/author-profile"
        />
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
            value={formData.seoMeta.metaTitle}
            onChange={(e) => updateField("seoMeta.metaTitle", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="SEO meta title for search engines"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
          <input
            type="url"
            value={formData.seoMeta.canonicalUrl}
            onChange={(e) => updateField("seoMeta.canonicalUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="https://yourdomain.com/article-path"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
        <textarea
          value={formData.seoMeta.metaDescription}
          onChange={(e) => updateField("seoMeta.metaDescription", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="SEO meta description for search results"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma-separated)</label>
        <input
          type="text"
          value={formData.seoMeta.metaKeywords.join(", ")}
          onChange={(e) => updateArrayField("seoMeta.metaKeywords", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="keyword1, keyword2, keyword3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
          <input
            type="text"
            value={formData.seoMeta.ogTitle}
            onChange={(e) => updateField("seoMeta.ogTitle", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Open Graph title for social media"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
          <input
            type="url"
            value={formData.seoMeta.ogImage}
            onChange={(e) => updateField("seoMeta.ogImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="https://example.com/images/og-image.jpg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
        <textarea
          value={formData.seoMeta.ogDescription}
          onChange={(e) => updateField("seoMeta.ogDescription", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Open Graph description for social media"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Card</label>
          <select
            value={formData.seoMeta.twitterCard || "summary_large_image"}
            onChange={(e) => updateField("seoMeta.twitterCard", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="summary">Summary</option>
            <option value="summary_large_image">Summary Large Image</option>
            <option value="app">App</option>
            <option value="player">Player</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.seoMeta.noIndex}
            onChange={(e) => updateField("seoMeta.noIndex", e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label className="ml-2 text-sm text-gray-700">No Index</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.seoMeta.noFollow || false}
            onChange={(e) => updateField("seoMeta.noFollow", e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label className="ml-2 text-sm text-gray-700">No Follow</label>
        </div>
      </div>
    </div>
  );

  const renderTOCTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Table of Contents</h3>
        <button
          type="button"
          onClick={addTableOfContentsItem}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          Add Item
        </button>
      </div>

      {formData.tableOfContents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No table of contents items added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {formData.tableOfContents.map((item, index) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateTableOfContentsItem(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="Section title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={item.level}
                    onChange={(e) => updateTableOfContentsItem(index, 'level', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  >
                    <option value={1}>H1</option>
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Anchor</label>
                  <input
                    type="text"
                    value={item.anchor}
                    onChange={(e) => updateTableOfContentsItem(index, 'anchor', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="section-anchor"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeTableOfContentsItem(index)}
                    className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderReferencesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">References</h3>
        <button
          type="button"
          onClick={addReference}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          Add Reference
        </button>
      </div>

      {formData.references.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No references added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {formData.references.map((reference, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={reference.title}
                    onChange={(e) => updateReference(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="Reference title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={reference.url}
                    onChange={(e) => updateReference(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="https://example.com/reference"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={reference.author}
                    onChange={(e) => updateReference(index, 'author', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <input
                    type="text"
                    value={reference.type}
                    onChange={(e) => updateReference(index, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="Research Report, Article, etc."
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeReference(index)}
                    className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Published Date</label>
          <input
            type="datetime-local"
            value={formData.publishedAt.slice(0, 16)}
            onChange={(e) => updateField("publishedAt", new Date(e.target.value).toISOString())}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label className="ml-2 text-sm text-gray-700">Featured Article</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => updateField("published", e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label className="ml-2 text-sm text-gray-700">Published</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Related Article IDs (comma-separated)</label>
        <input
          type="text"
          value={formData.relatedArticleIds.join(", ")}
          onChange={(e) => updateArrayField("relatedArticleIds", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="art-001, art-002, art-003"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Created By</label>
          <input
            type="text"
            value={formData.createdBy}
            onChange={(e) => updateField("createdBy", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="system"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Updated By</label>
          <input
            type="text"
            value={formData.updatedBy}
            onChange={(e) => updateField("updatedBy", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="system"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic": return renderBasicTab();
      case "content": return renderContentTab();
      case "seo": return renderSEOTab();
      case "toc": return renderTOCTab();
      case "references": return renderReferencesTab();
      case "settings": return renderSettingsTab();
      default: return renderBasicTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {article ? "Edit Article" : "Create New Article"}
            </h2>
            <p className="text-gray-600">Manage your article content and SEO settings</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit}>
            {renderTabContent()}

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
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (article ? "Updating..." : "Creating...") : (article ? "Update Article" : "Create Article")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}