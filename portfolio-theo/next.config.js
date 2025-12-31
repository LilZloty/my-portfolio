/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Transpile Three.js packages for better compatibility
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // Optimize images
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Webpack configuration for shaders and 3D assets
  webpack: (config) => {
    // Add support for GLSL shaders
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader'],
    });
    
    return config;
  },
};

module.exports = nextConfig;
