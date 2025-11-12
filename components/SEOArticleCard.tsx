// "use client";

// import { SEOArticle } from "@/types/seo";

// interface SEOArticleCardProps {
//   article: SEOArticle;
//   onEdit: () => void;
// }

// export default function SEOArticleCard({ article, onEdit }: SEOArticleCardProps) {
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "PUBLISHED": return "bg-green-100 text-green-800";
//       case "DRAFT": return "bg-yellow-100 text-yellow-800";
//       case "ARCHIVED": return "bg-gray-100 text-gray-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getDifficultyColor = (level: string) => {
//     switch (level) {
//       case "BEGINNER": return "bg-blue-100 text-blue-800";
//       case "INTERMEDIATE": return "bg-orange-100 text-orange-800";
//       case "ADVANCED": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//       {/* Featured Image */}
//       {article.featuredImage && (
//         <div className="h-48 bg-gray-200 relative">
//           <img
//             src={article.featuredImage}
//             alt={article.featuredImageAlt}
//             className="w-full h-full object-cover"
//           />
//           {article.featured && (
//             <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//               ⭐ Featured
//             </div>
//           )}
//         </div>
//       )}

//       {/* Content */}
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
//               {article.title}
//             </h3>
//             <p className="text-sm text-gray-600 line-clamp-2 mb-2">
//               {article.summary}
//             </p>
//           </div>
//           <button
//             onClick={onEdit}
//             className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//             </svg>
//           </button>
//         </div>

//         {/* Meta Information */}
//         <div className="space-y-2 mb-4">
//           <div className="flex items-center text-sm text-gray-600">
//             <span className="mr-3">👤 {article.author}</span>
//             <span>📖 {article.readingTimeMinutes} min read</span>
//           </div>
//           <div className="flex flex-wrap gap-1">
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
//               {article.status}
//             </span>
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficultyLevel)}`}>
//               {article.difficultyLevel}
//             </span>
//             <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//               {article.articleType}
//             </span>
//           </div>
//         </div>

//         {/* Category and Tags */}
//         <div className="mb-4">
//           <div className="text-sm text-gray-700 mb-1">
//             <span className="font-medium">Category:</span> {article.category}
//             {article.subCategory && ` › ${article.subCategory}`}
//           </div>
//           <div className="flex flex-wrap gap-1">
//             {article.tags.slice(0, 3).map((tag, index) => (
//               <span
//                 key={index}
//                 className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
//               >
//                 #{tag}
//               </span>
//             ))}
//             {article.tags.length > 3 && (
//               <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
//                 +{article.tags.length - 3} more
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-3">
//           <div className="flex space-x-4">
//             <span className="flex items-center">
//               👁️ {article.viewCount.toLocaleString()}
//             </span>
//             <span className="flex items-center">
//               📤 {article.shareCount}
//             </span>
//             <span className="flex items-center">
//               🔖 {article.bookmarkCount}
//             </span>
//           </div>
//           <div className="text-xs text-gray-500">
//             {new Date(article.publishedAt).toLocaleDateString()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




















"use client";

import { SEOArticle } from "@/types/seo";

interface SEOArticleCardProps {
  article: SEOArticle;
  onEdit: () => void;
}

export default function SEOArticleCard({ article, onEdit }: SEOArticleCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED": return "bg-green-100 text-green-800";
      case "DRAFT": return "bg-yellow-100 text-yellow-800";
      case "ARCHIVED": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "BEGINNER": return "bg-blue-100 text-blue-800";
      case "INTERMEDIATE": return "bg-orange-100 text-orange-800";
      case "ADVANCED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {article.featuredImage && (
        <div className="h-48 bg-gray-200 relative">
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            className="w-full h-full object-cover"
          />
          {article.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              ⭐ Featured
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {article.summary}
            </p>
          </div>
          <button
            onClick={onEdit}
            className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-3">👤 {article.author}</span>
            <span>📖 {article.readingTimeMinutes} min read</span>
          </div>
          <div className="flex flex-wrap gap-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
              {article.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficultyLevel)}`}>
              {article.difficultyLevel}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {article.articleType}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Category:</span> {article.category}
            {article.subCategory && ` › ${article.subCategory}`}
          </div>
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-3">
          <div className="flex space-x-4">
            <span className="flex items-center">
              👁️ {article.viewCount.toLocaleString()}
            </span>
            <span className="flex items-center">
              📤 {article.shareCount}
            </span>
            <span className="flex items-center">
              🔖 {article.bookmarkCount}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}