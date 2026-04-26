/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages static export. Repo lives at /antibullying so we set basePath
  // and assetPrefix so all links resolve correctly under the project URL.
  ...(isPages
    ? {
        output: 'export',
        basePath: '/antibullying',
        assetPrefix: '/antibullying/',
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};
export default nextConfig;
