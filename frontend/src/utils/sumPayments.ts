/**
 * Sums an array of payment amounts with 100% accuracy using BigInt.
 * This avoids floating-point arithmetic errors when dealing with decimal amounts.
 * 
 * @param amounts - Array of payment amounts (e.g., [25.54, 10.25, 5.00])
 * @returns The total sum as a number with 2 decimal places
 */
export function sumPayments(amounts: number[]): number {
  const toBigInt = (n: number) => BigInt(Math.round(n * 100));
  
  const total = amounts.reduce((sum, amount) => {
    return sum + toBigInt(amount);
  }, BigInt(0));

  // Convert back to number (safe for 2 decimal places)
  return Number(total) / 100;
}
