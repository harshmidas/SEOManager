import { NewsArticle } from "@/types/news";

interface NewsArticleCardProps {
  article: NewsArticle;
  onEdit: () => void;
}

export default function NewsArticleCard({ article, onEdit }: NewsArticleCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED": return "bg-green-100 text-green-800";
      case "DRAFT": return "bg-yellow-100 text-yellow-800";
      case "SCHEDULED": return "bg-blue-100 text-blue-800";
      case "ARCHIVED": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT": return "bg-red-100 text-red-800 border border-red-200";
      case "HIGH": return "bg-orange-100 text-orange-800";
      case "MEDIUM": return "bg-yellow-100 text-yellow-800";
      case "LOW": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = new Date(article.expiresAt) < new Date();

  return (
    <div className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 group ${
      article.breakingNews ? 'border-l-4 border-l-red-500' : ''
    } ${isExpired ? 'opacity-60' : ''}`}>
      {/* Featured Image */}
      {article.featuredImage && (
        <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden relative">
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.breakingNews && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                🚨 Breaking
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3 flex space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
              {article.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(article.priority)}`}>
              {article.priority}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          
          {/* Reporter and Location */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{article.reporter}</span>
              <span>•</span>
              <span>{article.location}</span>
            </div>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {article.summary}
        </p>

        {/* Category and Tags */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="text-gray-900 font-medium">{article.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Source:</span>
            <span className="text-gray-900 font-medium">{article.source}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Updates Indicator */}
        {article.updates && article.updates.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 text-sm text-blue-800">
              <span>🔄</span>
              <span>Updated {article.updates.length} time(s)</span>
            </div>
            <p className="text-xs text-blue-600 mt-1 line-clamp-1">
              Latest: {article.updates[article.updates.length - 1].content}
            </p>
          </div>
        )}

        {/* Expiry Warning */}
        {isExpired && (
          <div className="mb-4 p-2 bg-yellow-50 rounded border border-yellow-200">
            <p className="text-xs text-yellow-800 text-center">
              ⚠️ This article has expired
            </p>
          </div>
        )}

        {/* Analytics and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <span>👁️</span>
              <span>{article.viewCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📤</span>
              <span>{article.shareCount}</span>
            </div>
            {article.mediaGallery.length > 0 && (
              <div className="flex items-center space-x-1">
                <span>🖼️</span>
                <span>{article.mediaGallery.length}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}