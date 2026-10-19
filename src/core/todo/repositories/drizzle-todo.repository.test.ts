import {
  insertTestTodos,
  makeTestTodoRepository,
} from "@/core/__tests__/utils/make-test-todo-repository";

describe("DrizzleTodoRepository (integration)", () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  describe("findAll", () => {
    test("should return an empty array if the table is clean", async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });

    test("should return all TODOs in descending order", async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.findAll();
      expect(result[0].createdAt).toBe("date 4");
      expect(result[1].createdAt).toBe("date 3");
      expect(result[2].createdAt).toBe("date 2");
      expect(result[3].createdAt).toBe("date 1");
      expect(result[4].createdAt).toBe("date 0");
    });
  });

  describe("create", () => {
    test("creates a whole if the data is valid", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const newTodo = await repository.create(todos[0]);
      expect(newTodo).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test("fails if there is the same description in the table", async () => {
      const { repository, todos } = await makeTestTodoRepository();

      // Cria um novo todo
      await repository.create(todos[0]);

      // Tenta criar um outro todo com a mesma descrição
      const anotherTodo = {
        id: "any id",
        description: todos[0].description,
        createdAt: "any date",
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe um todo com o ID ou descrição enviados"],
      });
    });

    test("fails if there is the same ID in the table", async () => {
      const { repository, todos } = await makeTestTodoRepository();

      // Cria um novo todo
      await repository.create(todos[0]);

      // Tenta criar um outro todo com o mesmo ID
      const anotherTodo = {
        id: todos[0].id,
        description: "any description",
        createdAt: "any date",
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe um todo com o ID ou descrição enviados"],
      });
    });

    test("fails if there is the same ID and Description", async () => {
      const { repository, todos } = await makeTestTodoRepository();

      await repository.create(todos[0]);

      const anotherTodo = {
        id: todos[0].id,
        description: todos[0].description,
        createdAt: "any date",
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe um todo com o ID ou descrição enviados"],
      });
    });
  });

  describe("remove", () => {
    test("deletes a whole if it exists", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.remove(todos[0].id);

      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test("Fails to delete if the whole does not exist", async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.remove("any id");

      expect(result).toStrictEqual({
        success: false,
        errors: ["Todo não existe"],
      });
    });
  });
});
