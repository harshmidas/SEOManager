import { BlogPost } from "@/types/blog";

interface CategoryChartProps {
  blogPosts: BlogPost[];
}

export default function CategoryChart({ blogPosts }: CategoryChartProps) {
  // Calculate category distribution
  const categoryStats = blogPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalPosts = blogPosts.length;

  const getColorForIndex = (index: number) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", 
      "bg-orange-500", "bg-pink-500", "bg-indigo-500"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-3">
        {Object.entries(categoryStats).map(([category, count], index) => {
          const percentage = totalPosts > 0 ? (count / totalPosts) * 100 : 0;
          return (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getColorForIndex(index)}`}></div>
                <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                  {category}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getColorForIndex(index)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Total Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Posts</span>
          <span className="font-semibold text-gray-900">{totalPosts}</span>
        </div>
      </div>
    </div>
  );
}