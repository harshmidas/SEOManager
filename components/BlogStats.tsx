interface BlogStatsProps {
  totalPosts: number;
  publishedCount: number;
  featuredCount: number;
  totalViews: number;
  totalShares: number;
  totalComments: number;
}

export default function BlogStats({ 
  totalPosts, 
  publishedCount, 
  featuredCount, 
  totalViews, 
  totalShares, 
  totalComments 
}: BlogStatsProps) {
  const stats = [
    {
      label: "Total Posts",
      value: totalPosts,
      icon: "📝",
      color: "blue",
      change: "+12%"
    },
    {
      label: "Published",
      value: publishedCount,
      icon: "✅",
      color: "green",
      change: "+8%"
    },
    {
      label: "Featured",
      value: featuredCount,
      icon: "⭐",
      color: "purple",
      change: "+5%"
    },
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      icon: "👁️",
      color: "orange",
      change: "+23%"
    },
    {
      label: "Engagement",
      value: (totalShares + totalComments).toLocaleString(),
      icon: "💬",
      color: "pink",
      change: "+15%"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      pink: "bg-pink-100 text-pink-600"
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
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}