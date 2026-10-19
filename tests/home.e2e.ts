import { test, expect } from "playwright/test";

test.describe("<Home /> (E2E)", () => {
  // Renderização
  test.describe("Render", () => {
    test("should have the correct html title", async ({ page }) => {
      await page.goto("/");

      await page.waitForTimeout(5000);
    });
  });

  // Criação
  // Exclusão
  // Erros
});
