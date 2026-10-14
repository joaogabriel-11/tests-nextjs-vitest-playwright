import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { createTodoUseCase } from "./create-todo.usecase";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";

describe("createTodoUseCase (integration)", () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test("should return error if validation fail", async () => {
    const result = (await createTodoUseCase("")) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  test("should return TODO if validation pass", async () => {
    const description = "Isso deve funcionar";
    const result = (await createTodoUseCase(description)) as ValidTodo;

    (expect(result.success).toBe(true),
      expect(result.todo).toStrictEqual({
        createdAt: expect.any(String),
        description: "Isso deve funcionar",
        id: expect.any(String),
      }));
  });

  test("should return error if repository fail", async () => {
    // Cria o todo uma vez
    const description = "Isso so funciona 1 vez";
    (await createTodoUseCase(description)) as ValidTodo;

    // Tenta criar o todo e deve retornar erro
    const result = (await createTodoUseCase(description)) as InvalidTodo;

    (expect(result.success).toBe(false),
      expect(result.errors).toStrictEqual([
        "Já existe um todo com o ID ou descrição enviados",
      ]));
  });
});
