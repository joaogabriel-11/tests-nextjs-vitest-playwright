import type { Meta, StoryObj } from "@storybook/react";
import { TodoForm } from ".";
import { fn } from "storybook/test";
import { CreateTodoAction } from "@/core/todo/actions/todo.action.types";

const meta: Meta<typeof TodoForm> = {
  title: "Components/Forms/TodoForms",
  component: TodoForm,
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto p-12">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    action: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TodoForm>;

export const Default: Story = {
  args: {
    action: fn(async () => {
      return {
        success: true,
        todo: { id: "id", description: "description", createdAt: "createdAt" },
      };
    }) as CreateTodoAction,
  },
};

export const WithError: Story = {
  args: {
    action: fn(async () => {
      return {
        success: false,
        errors: ["falha ao criar todo"],
      };
    }) as CreateTodoAction,
  },
};
