/**
 * Plain JS config (D-24): Hostinger's build servers have an old glibc, so Next's
 * native SWC cannot load and a TypeScript config cannot be compiled there.
 * @type {import('next').NextConfig}
 */
const nextConfig = {};

export default nextConfig;
