import { makeNewTodo } from "./make-new-todo";

describe("makeNewTodo (unit)", () => {
  test("should return a new valid todo", () => {
    // AAA -> Arrange, Act, Assert
    // Arrange -> Criar as coisas que preciso
    const expectedTodo = {
      id: expect.any(String),
      description: "meu novo todo",
      createdAt: expect.any(String),
    };

    // Act
    const newTodo = makeNewTodo("meu novo todo");

    // Assert
    // Checando apenas descrição
    expect(newTodo.description).toBe(expectedTodo.description);
    // Checando objeto inteiro
    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
