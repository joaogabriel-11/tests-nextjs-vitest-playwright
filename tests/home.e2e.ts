import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { test, expect, Page } from "playwright/test";

const HOME_URL = "/";
const HEADING = "Lista de tarefas";
const INPUT = "Tarefa";
const BUTTON = "Criar tarefa";
const BUTTON_BUSY = "Criando tarefa...";
const NEW_TODO_TEXT = "New Todo";

const getHeading = (p: Page) => p.getByRole("heading", { name: HEADING });
const getInput = (p: Page) => p.getByRole("textbox", { name: INPUT });
const getBtn = (p: Page) => p.getByRole("button", { name: BUTTON });
const getBtnBusy = (p: Page) => p.getByRole("button", { name: BUTTON_BUSY });

const getAll = (p: Page) => ({
  heading: getHeading(p),
  input: getInput(p),
  btn: getBtn(p),
  btnBusy: getBtnBusy(p),
});

test.beforeEach(async ({ page }) => {
  const { deleteTodoNoWhere } = await makeTestTodoRepository();
  await deleteTodoNoWhere();

  await page.goto(HOME_URL);
});

test.afterAll(async () => {
  const { deleteTodoNoWhere } = await makeTestTodoRepository();
  await deleteTodoNoWhere();
});

test.describe("<Home /> (E2E)", () => {
  test.describe("Render", () => {
    test("should have the correct html title", async ({ page }) => {
      await expect(page).toHaveTitle("Testes com Vitest e Playwrigth");
    });

    test("should render the header, input and button to create TODOs", async ({
      page,
    }) => {
      await expect(getHeading(page)).toBeVisible();
      await expect(getInput(page)).toBeVisible();
      await expect(getBtn(page)).toBeVisible();
    });
  });

  test.describe("Creation", () => {
    test("should allow creating a TODO", async ({ page }) => {
      const { btn, input } = getAll(page);

      await input.fill(NEW_TODO_TEXT);
      await btn.click();

      const createdTodo = page
        .getByRole("listitem")
        .filter({ hasText: NEW_TODO_TEXT });
      await expect(createdTodo).toBeVisible();
    });

    test("should trim the input description", async ({ page }) => {
      const { btn, input } = getAll(page);

      const textToBeTrimmed = "   no spaces here     ";
      const textTrimmed = textToBeTrimmed.trim();

      await input.fill(textToBeTrimmed);
      await btn.click();

      const createdTodo = page
        .getByRole("listitem")
        .filter({ hasText: textTrimmed });
      const createdTodoText = await createdTodo.textContent();

      await expect(createdTodoText).toBe(textTrimmed);
    });

    test("should allow me to create more than one TODO", async ({ page }) => {
      const { btn, input } = getAll(page);

      const todo1 = "Todo1";
      const todo2 = "Todo2";

      await input.fill(todo1);
      await btn.click();

      const todo1Item = page.getByRole("listitem").filter({ hasText: todo1 });
      await expect(todo1Item).toBeVisible();

      await input.fill(todo2);
      await btn.click();

      const todo2Item = page.getByRole("listitem").filter({ hasText: todo2 });
      await expect(todo2Item).toBeVisible();
    });

    test("should disable the button while creating the TODO", async ({
      page,
    }) => {
      const { btn, input } = getAll(page);

      await input.fill(NEW_TODO_TEXT);
      await btn.click();

      await expect(getBtnBusy(page)).toBeVisible();
      await expect(getBtnBusy(page)).toBeDisabled();

      const createdTodo = page
        .getByRole("listitem")
        .filter({ hasText: NEW_TODO_TEXT });
      await expect(createdTodo).toBeVisible();

      await expect(btn).toBeVisible();
      await expect(btn).toBeEnabled();
    });

    test("should disable the input while creating the TODO", async ({
      page,
    }) => {
      const { btn, input } = getAll(page);

      await input.fill(NEW_TODO_TEXT);
      await btn.click();

      await expect(input).toBeDisabled();

      const createdTodo = page
        .getByRole("listitem")
        .filter({ hasText: NEW_TODO_TEXT });
      await expect(createdTodo).toBeVisible();

      await expect(input).toBeEnabled();
    });
  });

  // Exclusão
  // Erros
});
