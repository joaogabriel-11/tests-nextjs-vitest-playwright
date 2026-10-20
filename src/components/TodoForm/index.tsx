'use client';
import { CreateTodoAction } from '@/core/todo/actions/todo.action.types';
import { sanitizeStr } from '@/utils/sanitize-str';
import { useRef, useState, useTransition } from 'react';
import { InputText } from '../InputText';
import { Button } from '../Button';
import { CirclePlusIcon } from 'lucide-react';

export type TodoFormProps = {
  action: CreateTodoAction;
};

export function TodoForm({ action }: TodoFormProps) {
  const [isPending, startTransition] = useTransition();
  const [inputError, setInputError] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  function handleCreateTodo(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const input = ref.current;

    if (!input) return;

    const description = sanitizeStr(input.value);

    startTransition(async () => {
      const result = await action(description);

      if (!result.success) {
        setInputError(result.errors[0]);
        return;
      }

      input.value = '';
      setInputError('');
    });
  }

  return (
    <form onSubmit={handleCreateTodo} className='flex flex-col flex-1 gap-6'>
      <InputText
        name='description'
        labelText='Tarefa'
        placeholder='Digite sua tarefa...'
        disabled={isPending}
        errorMessage={inputError}
        ref={ref}
      />

      <Button type='submit' disabled={isPending}>
        <CirclePlusIcon />
        {!isPending && <span>Criar tarefa</span>}
        {isPending && <span>Criando tarefa...</span>}
      </Button>
    </form>
  );
}
