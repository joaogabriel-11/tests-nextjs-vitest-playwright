import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  test("should return errors when descriptions.length is less than 4 caracteres", () => {
    const description = "abc";
    const result = validateTodoDescription(description);
    expect(result.errors).toStrictEqual([
      "Descrição precisa ter mais de 3 caracteres",
    ]);
    expect(result.success).toBe(false);
  });

  test("should return success when descriptions.length has more than 3 caracteres", () => {
    const description = "abcd";
    const result = validateTodoDescription(description);
    expect(result.errors).toStrictEqual([]);
    expect(result.success).toBe(true);
  });
});
