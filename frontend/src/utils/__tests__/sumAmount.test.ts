import { assertEquals } from "@std/assert";
import { sumAmount } from "../sumAmount.ts";

Deno.test("sumAmount", async (t) => {
  await t.step("should sum two positive numbers correctly", () => {
    assertEquals(sumAmount(10.5, 20.3), 30.8);
  });

  await t.step("should handle decimal precision without floating-point errors", () => {
    assertEquals(sumAmount(0.1, 0.2), 0.3);
  });

  await t.step("should sum two payment amounts", () => {
    assertEquals(sumAmount(25.54, 10.25), 35.79);
  });

  await t.step("should handle zero values", () => {
    assertEquals(sumAmount(0, 15.50), 15.50);
    assertEquals(sumAmount(0, 0), 0);
  });

  await t.step("should handle negative numbers", () => {
    assertEquals(sumAmount(50.00, -10.25), 39.75);
  });

  await t.step("should handle large payment amounts", () => {
    assertEquals(sumAmount(999.99, 1000.01), 2000.00);
  });
});