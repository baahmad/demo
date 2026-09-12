'use client';

import { AppVersion } from '@/lib/versions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VersionPreviewProps {
  version: AppVersion;
  appName: string;
}

export function VersionPreview({ version, appName }: VersionPreviewProps) {
  const getStyleColor = (style: string) => {
    switch (style) {
      case 'modern':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'classic':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'minimal':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-gray-900/50 border border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-white">{version.version}</CardTitle>
          <Badge className={getStyleColor(version.style)} variant="outline">
            {version.style}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-4">{version.description}</p>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Features:</h4>
          <div className="flex flex-wrap gap-2">
            {version.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-gray-800 text-gray-300 border-gray-700">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}