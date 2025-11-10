import { PressRelease } from "@/types/press";

interface PressReleaseCardProps {
  release: PressRelease;
  onEdit: () => void;
}

export default function PressReleaseCard({ release, onEdit }: PressReleaseCardProps) {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 group">
      {/* Featured Image */}
      {release.featuredImage && (
        <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden">
          <img
            src={release.featuredImage}
            alt={release.featuredImageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(release.status)}`}>
                {release.status}
              </span>
              {release.featured && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {release.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{release.subtitle}</p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="text-gray-900 font-medium">{release.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Release Date:</span>
            <span className="text-gray-900 font-medium">{formatDate(release.releaseDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Location:</span>
            <span className="text-gray-900 font-medium">{release.location}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {release.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {release.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {release.tags.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              +{release.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Analytics and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <span>👁️</span>
              <span>{release.viewCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📤</span>
              <span>{release.shareCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📥</span>
              <span>{release.downloadCount.toLocaleString()}</span>
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