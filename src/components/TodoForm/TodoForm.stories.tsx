import type { Meta, StoryObj } from "@storybook/react";
import { TodoForm } from ".";
import { fn } from "storybook/test";
import { CreateTodoAction } from "@/core/todo/actions/todo.action.types";
import { todoActionStoryMock } from "@/core/__tests__/mocks/todo-action-story";

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
    action: todoActionStoryMock.create.success,
  },
};

export const WithError: Story = {
  args: {
    action: todoActionStoryMock.create.error,
  },
};
