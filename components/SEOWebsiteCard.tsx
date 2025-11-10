import { SEOWebsite } from "@/types/seo";

interface SEOWebsiteCardProps {
  website: SEOWebsite;
  onEdit: () => void;
}

export default function SEOWebsiteCard({ website, onEdit }: SEOWebsiteCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {website.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{website.name}</h3>
              <p className="text-sm text-gray-600">{website.domain}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            website.active 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {website.active ? 'Active' : 'Inactive'}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {website.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Canonical URL:</span>
            <span className="text-gray-900 font-medium truncate ml-2 max-w-[120px]">
              {website.seoConfig.canonicalUrl}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status:</span>
            <span className="text-gray-900 font-medium">{website.status}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
              {website.jobFeedConfig.jobCategories.length} Categories
            </span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
              {website.jobFeedConfig.locations.length} Locations
            </span>
          </div>
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}