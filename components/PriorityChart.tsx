import { NewsArticle } from "@/types/news";

interface PriorityChartProps {
  newsArticles: NewsArticle[];
}

export default function PriorityChart({ newsArticles }: PriorityChartProps) {
  // Calculate priority distribution
  const priorityStats = newsArticles.reduce((acc, article) => {
    acc[article.priority] = (acc[article.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalArticles = newsArticles.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT": return "bg-red-500";
      case "HIGH": return "bg-orange-500";
      case "MEDIUM": return "bg-yellow-500";
      case "LOW": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "URGENT": return "🚨 Urgent";
      case "HIGH": return "⚠️ High";
      case "MEDIUM": return "📋 Medium";
      case "LOW": return "📝 Low";
      default: return priority;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
      <div className="space-y-3">
        {["URGENT", "HIGH", "MEDIUM", "LOW"].map((priority) => {
          const count = priorityStats[priority] || 0;
          const percentage = totalArticles > 0 ? (count / totalArticles) * 100 : 0;
          
          return (
            <div key={priority} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  {getPriorityLabel(priority)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getPriorityColor(priority)}`}
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
          <span className="text-gray-600">Total Articles</span>
          <span className="font-semibold text-gray-900">{totalArticles}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">Breaking News</span>
          <span className="font-semibold text-red-600">
            {newsArticles.filter(article => article.breakingNews).length}
          </span>
        </div>
      </div>
    </div>
  );
}