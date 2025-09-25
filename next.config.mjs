/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 75, 80, 90, 100],
    remotePatterns: [
      new URL(
        'https://rsnuhukehgukcsfhovek.supabase.co/storage/v1/object/public/cabin-images/**'
      ),
    ],
  },
};

export default nextConfig;
