import { PressRelease } from "@/types/press";

interface DistributionChartProps {
  pressReleases: PressRelease[];
}

export default function DistributionChart({ pressReleases }: DistributionChartProps) {
  // Calculate distribution stats
  const distributionStats = pressReleases.reduce((acc, release) => {
    release.distributionConfig.distributionChannels.forEach(channel => {
      acc[channel] = (acc[channel] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const totalDistributions = Object.values(distributionStats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution Channels</h3>
      <div className="space-y-3">
        {Object.entries(distributionStats).map(([channel, count]) => {
          const percentage = totalDistributions > 0 ? (count / totalDistributions) * 100 : 0;
          return (
            <div key={channel} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{channel}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}