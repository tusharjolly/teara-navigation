export type CalibrationPoint = {
  lat: number;
  lng: number;
  x: number;
  y: number;
};

export type CalibrationConfig = {
  /** At least two reference points; three gives better fit */
  referencePoints: CalibrationPoint[];
};

/**
 * Simple affine fit using two reference points (lat/lng -> SVG x/y).
 * For better accuracy, replace with a least-squares fit over 3+ refs.
 */
export function projectLatLngToSvg(
  lat: number,
  lng: number,
  config: CalibrationConfig
): { x: number; y: number } | null {
  const refs = config.referencePoints;
  if (refs.length < 2) return null;

  const [a, b] = refs;
  const latScale = (b.y - a.y) / (b.lat - a.lat || 1e-6);
  const lngScale = (b.x - a.x) / (b.lng - a.lng || 1e-6);

  const x = a.x + (lng - a.lng) * lngScale;
  const y = a.y + (lat - a.lat) * latScale;

  return { x, y };
}

// Example config (replace with real campus refs)
export const exampleCalibration: CalibrationConfig = {
  referencePoints: [
    { lat: -37.7875, lng: 175.3180, x: 120, y: 240 },
    { lat: -37.7880, lng: 175.3190, x: 260, y: 380 },
  ],
};
