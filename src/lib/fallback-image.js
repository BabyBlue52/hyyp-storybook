import fallbackSvg from '@/assets/images/fallback.svg';

export const FALLBACK_IMAGE_URL = fallbackSvg;

export function resolveImageUrl(src) {
    return src?.trim() ? src : FALLBACK_IMAGE_URL;
}
