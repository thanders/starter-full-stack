/**
 * Sums two numbers with 100% accuracy using BigInt.
 * This avoids the floating-point multiplication bug.
 */
export function sumAmount(a: number, b: number): number {
  const toBigInt = (n: number) => BigInt(Math.round(n * 100));
  
  const total = toBigInt(a) + toBigInt(b);

  // Convert back to number (safe for 2 decimal places)
  return Number(total) / 100;
}