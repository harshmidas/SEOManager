import { BlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: () => void;
  viewMode: "grid" | "list";
}

export default function BlogPostCard({ post, onEdit, viewMode }: BlogPostCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED": return "bg-green-100 text-green-800";
      case "DRAFT": return "bg-yellow-100 text-yellow-800";
      case "SCHEDULED": return "bg-blue-100 text-blue-800";
      case "ARCHIVED": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 group">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="flex-shrink-0 w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                  {post.status}
                </span>
                {post.featured && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
                <span className="text-sm text-gray-500">{post.readingTimeMinutes} min read</span>
              </div>

              <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors mb-2">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{post.author}</span>
                  </div>
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.category}</span>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>👁️</span>
                    <span>{post.viewCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>💬</span>
                    <span>{post.commentCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>📤</span>
                    <span>{post.shareCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 group">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                {post.status}
              </span>
              {post.featured && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author and Meta */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{post.author}</p>
            <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
          </div>
        </div>

        {/* Category and Tags */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="text-gray-900 font-medium">{post.category}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Analytics and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <span>👁️</span>
              <span>{post.viewCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>💬</span>
              <span>{post.commentCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📤</span>
              <span>{post.shareCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⏱️</span>
              <span>{post.readingTimeMinutes}m</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}