import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@copilotkit/react-core', '@copilotkit/react-ui', '@copilotkit/runtime'],
  async rewrites() {
    return [
      {
        source: '/api/py/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:8000'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
