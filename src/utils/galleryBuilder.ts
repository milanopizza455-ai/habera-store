import { ProductAnglePhoto } from '../types';

export interface AngleOptions {
  backSrc?: string;
  closeupOrigin?: string;
}

/**
 * Builds 6 distinct camera views strictly from the EXACT SAME product & color:
 * 1. Full Front View
 * 2. Full Back View (when backSrc exists for this exact garment) or Three-Quarter Full Silhouette
 * 3. Left Side & Sleeve View
 * 4. Right Side & Sleeve View
 * 5. Three-Quarter Bodice & Collar View
 * 6. Close-Up Fabric, Embroidery & Stitching View
 */
export function buildSixAngleGallery(
  prefix: string,
  frontSrc: string,
  options: AngleOptions = {}
): ProductAnglePhoto[] {
  const { backSrc, closeupOrigin = '50% 58%' } = options;

  return [
    {
      id: `${prefix}-front`,
      label: 'Full Front View',
      src: frontSrc,
      objectPosition: '50% 12%',
      baseScale: 1,
    },
    backSrc
      ? {
          id: `${prefix}-back`,
          label: 'Full Back View',
          src: backSrc,
          objectPosition: '50% 12%',
          baseScale: 1,
        }
      : {
          id: `${prefix}-silhouette`,
          label: 'Full Drape & Hem',
          src: frontSrc,
          objectPosition: '50% 82%',
          baseScale: 1.4,
        },
    {
      id: `${prefix}-left`,
      label: 'Left Side & Sleeve',
      src: frontSrc,
      objectPosition: '26% 42%',
      baseScale: 1.9,
    },
    {
      id: `${prefix}-right`,
      label: 'Right Side & Sleeve',
      src: frontSrc,
      objectPosition: '74% 42%',
      baseScale: 1.9,
    },
    {
      id: `${prefix}-three-quarter`,
      label: 'Three-Quarter View',
      src: frontSrc,
      objectPosition: '50% 20%',
      baseScale: 1.55,
    },
    {
      id: `${prefix}-closeup`,
      label: 'Close-Up & Stitching',
      src: frontSrc,
      objectPosition: closeupOrigin,
      baseScale: 2.35,
    },
  ];
}
