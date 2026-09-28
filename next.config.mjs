/**
 * Plain JS config (D-24): Hostinger's build servers have an old glibc, so Next's
 * native SWC cannot load and a TypeScript config cannot be compiled there.
 * @type {import('next').NextConfig}
 */
const wooHost = new URL(process.env.WOO_URL || "https://admin.konouzmarket.com").hostname;

const nextConfig = {
  images: {
    // Product photos come from the WordPress media library (D-27).
    remotePatterns: [{ protocol: "https", hostname: wooHost, pathname: "/wp-content/uploads/**" }],
  },
};

export default nextConfig;
