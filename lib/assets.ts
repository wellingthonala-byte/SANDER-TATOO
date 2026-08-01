/**
 * Prefixes a path in `public/` with the deployment base path.
 *
 * Next rewrites `_next/*` URLs for `basePath` on its own, but files served
 * straight out of `public/` are not touched — and with the unoptimized loader
 * (static export) neither is an <Image> src. Anything under `public/` must go
 * through here so it keeps working when the site lives on a subpath, such as a
 * GitHub project page at /SANDER-TATOO/.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
