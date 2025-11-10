interface PressStatsProps {
  totalReleases: number;
  publishedCount: number;
  totalViews: number;
  totalShares: number;
}

export default function PressStats({ totalReleases, publishedCount, totalViews, totalShares }: PressStatsProps) {
  const stats = [
    {
      label: "Total Releases",
      value: totalReleases,
      icon: "📰",
      color: "blue"
    },
    {
      label: "Published",
      value: publishedCount,
      icon: "✅",
      color: "green"
    },
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      icon: "👁️",
      color: "purple"
    },
    {
      label: "Total Shares",
      value: totalShares.toLocaleString(),
      icon: "📤",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}