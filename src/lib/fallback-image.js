/** Inline SVG placeholder shown when no image is available. */
const FALLBACK_IMAGE =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">' +
            '<rect width="600" height="400" fill="#DCE6F2"/>' +
            '<g fill="#37515F" opacity="0.5">' +
            '<rect x="120" y="80" width="360" height="240" rx="8" fill="none" stroke="#37515F" stroke-width="2" stroke-dasharray="14 14"/>' +
            '<circle cx="240" cy="180" r="22"/>' +
            '<polygon points="180,300 280,210 360,260 460,180 460,300"/>' +
            '</g>' +
            '</svg>'
    );

/**
 * Convert a stored image reference (URL, base64, or data URL) into a value
 * usable as `<img src>`. Returns a built-in placeholder when the input is empty
 * or not a recognized format.
 */
export function resolveImageUrl(input) {
    if (input == null) return FALLBACK_IMAGE;
    const s = typeof input === 'string' ? input.trim() : '';
    if (!s) return FALLBACK_IMAGE;

    if (s.startsWith('data:') || s.startsWith('blob:')) return s;
    if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s;

    if (/^[A-Za-z0-9+/=]+$/.test(s)) {
        return `data:image/jpeg;base64,${s}`;
    }

    return FALLBACK_IMAGE;
}

export { FALLBACK_IMAGE };
