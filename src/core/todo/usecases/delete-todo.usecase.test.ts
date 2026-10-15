import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { deleteTodoUseCase } from "./delete-todo.usecase";

describe("deleteTodoUseCase (integration)", () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test("should return error if ID was invalid", async () => {
    const result = await deleteTodoUseCase("");

    expect(result).toStrictEqual({
      errors: ["ID invalido"],
      success: false,
    });
  });

  test("should return success if TODO already exists in DB", async () => {
    const { insertTodoDb, todos } = await makeTestTodoRepository();
    await insertTodoDb().values(todos);

    const result = await deleteTodoUseCase(todos[0].id);

    expect(result).toStrictEqual({
      success: true,
      todo: todos[0],
    });
  });

  test("should return error if TODO doesnt exists in DB", async () => {
    const result = await deleteTodoUseCase("this-does-not-exist");

    expect(result).toStrictEqual({
      errors: ["Todo não existe"],
      success: false,
    });
  });
});
