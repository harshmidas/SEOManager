// "use client";

// import { useState, useEffect } from "react";
// import { SEOArticle } from "@/types/seo";
// import { apiFetch } from "@/utils/api";
// import SEOArticleCard from "@/components/SEOArticleCard";
// import SEOArticleForm from "@/components/SEOArticleForm";

// const API_URL = "http://157.20.214.84:9292/api/v1/seo-articles";
// const HEADERS = {
//   "X-Tenant": "68b20dd0fb42964f2328b424",
//   "X-User-ID": "658dfb086764754f1fa564d0",
// };

// export default function SeoArticlesPage() {
//   const [articles, setArticles] = useState<SEOArticle[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [selectedArticle, setSelectedArticle] = useState<SEOArticle | null>(null);

//   const loadArticles = async () => {
//     try {
//       setLoading(true);
//       const data = await apiFetch<SEOArticle[]>(API_URL, { headers: HEADERS });
//       setArticles(data || []);
//     } catch (error) {
//       console.error("Failed to load articles:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreate = () => {
//     setSelectedArticle(null);
//     setShowForm(true);
//   };

//   const handleEdit = (article: SEOArticle) => {
//     setSelectedArticle(article);
//     setShowForm(true);
//   };

//   const handleFormClose = () => {
//     setShowForm(false);
//     setSelectedArticle(null);
//     loadArticles(); // Refresh the list
//   };

//   // Load articles on component mount
//   useEffect(() => {
//     loadArticles();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">SEO Articles</h1>
//               <p className="text-gray-600 mt-2">Manage your articles and content marketing</p>
//             </div>
//             <button
//               onClick={handleCreate}
//               className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
//             >
//               <span>+</span>
//               <span>Create New Article</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <span className="text-blue-600 text-xl">📄</span>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Articles</p>
//                 <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <span className="text-green-600 text-xl">👁️</span>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Views</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {articles.reduce((sum, article) => sum + article.viewCount, 0).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <span className="text-purple-600 text-xl">📈</span>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Published</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {articles.filter(article => article.published).length}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <span className="text-yellow-600 text-xl">⭐</span>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Featured</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {articles.filter(article => article.featured).length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//           </div>
//         ) : articles.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl">📝</span>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
//               <p className="text-gray-600 mb-6">Start creating amazing content for your audience</p>
//               <button
//                 onClick={handleCreate}
//                 className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
//               >
//                 Create First Article
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//             {articles.map((article) => (
//               <SEOArticleCard
//                 key={article.id}
//                 article={article}
//                 onEdit={() => handleEdit(article)}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Form Modal */}
//       {showForm && (
//         <SEOArticleForm
//           article={selectedArticle}
//           onClose={handleFormClose}
//           onSuccess={handleFormClose}
//         />
//       )}
//     </div>
//   );
// }






















"use client";

import { useState, useEffect } from "react";
import { SEOArticle } from "@/types/seo";
import SEOArticleCard from "@/components/SEOArticleCard";
import SEOArticleForm from "@/components/SEOArticleForm";

const API_URL = "http://157.20.214.84:9292/api/v1/seo-articles";
const HEADERS = {
  "accept": "*/*",
  "X-Tenant": "68b20dd0fb42964f2328b424",
  "X-User-ID": "system",
};

export default function SeoArticlesPage() {
  const [articles, setArticles] = useState<SEOArticle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<SEOArticle | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched articles:", data);
      setArticles(data || []);
    } catch (error) {
      console.error("Failed to load articles:", error);
      setError(error instanceof Error ? error.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedArticle(null);
    setShowForm(true);
  };

  const handleEdit = (article: SEOArticle) => {
    setSelectedArticle(article);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedArticle(null);
    loadArticles();
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleManualRefresh = () => {
    loadArticles();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SEO Articles</h1>
              <p className="text-gray-600 mt-2">Manage your articles and content marketing</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleManualRefresh}
                className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>Refresh</span>
              </button>
              <button
                onClick={handleCreate}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
              >
                <span>+</span>
                <span>Create New Article</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-red-400">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading articles</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={loadArticles}
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">📄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-xl">👁️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.reduce((sum, article) => sum + article.viewCount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(article => article.published).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-yellow-600 text-xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(article => article.featured).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading articles...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-600 mb-6">Start creating amazing content for your audience</p>
              <button
                onClick={handleCreate}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Create First Article
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {articles.map((article) => (
              <SEOArticleCard
                key={article.id}
                article={article}
                onEdit={() => handleEdit(article)}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <SEOArticleForm
          article={selectedArticle}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}
    </div>
  );
}