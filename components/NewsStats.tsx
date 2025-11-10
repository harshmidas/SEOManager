interface NewsStatsProps {
  totalArticles: number;
  publishedCount: number;
  breakingNewsCount: number;
  urgentCount: number;
  totalViews: number;
  totalShares: number;
}

export default function NewsStats({ 
  totalArticles, 
  publishedCount, 
  breakingNewsCount, 
  urgentCount, 
  totalViews, 
  totalShares 
}: NewsStatsProps) {
  const stats = [
    {
      label: "Total Articles",
      value: totalArticles,
      icon: "📰",
      color: "blue",
      change: "+15%"
    },
    {
      label: "Published",
      value: publishedCount,
      icon: "✅",
      color: "green",
      change: "+8%"
    },
    {
      label: "Breaking News",
      value: breakingNewsCount,
      icon: "🚨",
      color: "red",
      change: "+25%"
    },
    {
      label: "Urgent Priority",
      value: urgentCount,
      icon: "⚡",
      color: "orange",
      change: "+12%"
    },
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      icon: "👁️",
      color: "purple",
      change: "+32%"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      red: "bg-red-100 text-red-600",
      orange: "bg-orange-100 text-orange-600",
      purple: "bg-purple-100 text-purple-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm font-medium ${
                stat.color === 'red' ? 'text-red-600' : 'text-green-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}