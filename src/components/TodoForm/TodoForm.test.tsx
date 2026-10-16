import userEvent from "@testing-library/user-event";
import { TodoForm } from ".";
import { render, screen, waitFor } from "@testing-library/react";

const user = userEvent.setup();

describe("<TodoForm /> (integration)", () => {
  test("should render all form components", async () => {
    const { btn, input } = renderForm();
    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("should call the action with the correct values", async () => {
    const { btn, input, action } = renderForm();
    await user.type(input, "tasks");
    await user.click(btn);

    expect(action).toHaveBeenCalledExactlyOnceWith("tasks");
  });

  test("should cut spaces from the beginning and end of the description (trim)", async () => {
    const { btn, input, action } = renderForm();
    await user.type(input, "   tasks  ");
    await user.click(btn);

    expect(action).toHaveBeenCalledExactlyOnceWith("tasks");
  });

  test("should clear the input if the form returns success", async () => {
    const { btn, input } = renderForm();
    await user.type(input, "tasks");
    await user.click(btn);

    expect(input).toHaveValue("");
  });

  test("should disable the button while sending the action", async () => {
    const { btn, input } = renderForm({ delay: 30 });
    await user.type(input, "tasks");
    await user.click(btn);

    await waitFor(() => expect(btn).toBeDisabled());
    await waitFor(() => expect(btn).toBeEnabled());
  });

  test("should disable the input while sending the action", async () => {
    const { btn, input } = renderForm({ delay: 30 });
    await user.type(input, "tasks");
    await user.click(btn);

    await waitFor(() => expect(input).toBeDisabled());
    await waitFor(() => expect(input).toBeEnabled());
  });

  test("should change the button text while sending the action", async () => {
    const { btn, input } = renderForm({ delay: 30 });
    await user.type(input, "tasks");
    await user.click(btn);

    await waitFor(() => expect(btn).toHaveAccessibleName("Criando tarefa..."));
    await waitFor(() => expect(btn).toHaveAccessibleName("Criar tarefa"));
  });

  test("should show the error when the action returns error", async () => {
    const { btn, input } = renderForm({ success: false });
    await user.type(input, "tasks");
    await user.click(btn);

    const error = await screen.findByRole("alert");

    expect(error).toHaveTextContent("falha ao criar todo");
    expect(input).toHaveAttribute("aria-describedby", error.id);
  });

  test("should keep the text entered in the input if the action returns an error", async () => {
    const { btn, input } = renderForm({ success: false });
    await user.type(input, "tasks");
    await user.click(btn);

    expect(input).toHaveValue("tasks");
  });
});

type RenderForm = {
  delay?: number;
  success?: boolean;
};

function renderForm({ delay = 0, success = true }: RenderForm = {}) {
  const actionSuccessResult = {
    success: true,
    todo: { id: "id", description: "description", createdAt: "createdAt" },
  };
  const actionErrorResult = {
    success: false,
    errors: ["falha ao criar todo"],
  };
  const actionResult = success ? actionSuccessResult : actionErrorResult;

  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise((r) => setTimeout(r, delay));
    return actionResult;
  });
  const action = delay > 0 ? actionDelayed : actionNoDelay;

  render(<TodoForm action={action} />);

  const input = screen.getByLabelText("Tarefa");
  const btn = screen.getByRole("button");

  return { input, btn, action };
}
