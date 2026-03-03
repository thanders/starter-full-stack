import { assertEquals } from "@std/assert";
import { sumPayments } from "../sumPayments.ts";

Deno.test("sumPayments", async (t) => {
  await t.step("should sum an array of payment amounts", () => {
    assertEquals(sumPayments([25.54, 10.25, 5.00]), 40.79);
  });

  await t.step("should handle an empty array", () => {
    assertEquals(sumPayments([]), 0);
  });

  await t.step("should handle a single payment amount", () => {
    assertEquals(sumPayments([25.54]), 25.54);
  });

  await t.step("should handle decimal precision without floating-point errors", () => {
    assertEquals(sumPayments([0.1, 0.2, 0.3]), 0.6);
  });

  await t.step("should sum multiple payment amounts with varied decimals", () => {
    assertEquals(sumPayments([100.00, 50.50, 25.25, 10.99]), 186.74);
  });

  await t.step("should handle negative amounts", () => {
    assertEquals(sumPayments([50.00, -10.25, 15.50]), 55.25);
  });

  await t.step("should handle large arrays of payments", () => {
    const payments = Array(100).fill(1.99);
    assertEquals(sumPayments(payments), 199.00);
  });

  await t.step("should maintain precision with many decimal operations", () => {
    assertEquals(sumPayments([0.01, 0.02, 0.03, 0.04, 0.05]), 0.15);
  });
});