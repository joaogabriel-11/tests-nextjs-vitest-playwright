type validateTodoDescription = {
  sucess: boolean;
  errors: string[];
};

export function validateTodoDescription(
  description: string,
): validateTodoDescription {
  const errors = [];

  if (description.length <= 3) {
    errors.push("Descrição precisa ter mais de 3 caracteres");
  }

  return {
    sucess: errors.length === 0,
    errors,
  };
}
