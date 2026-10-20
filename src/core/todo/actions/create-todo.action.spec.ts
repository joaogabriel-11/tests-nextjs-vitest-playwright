import { makeTestTodoMocks } from '@/core/__tests__/utils/make-test-todo-mocks';
import { createTodoAction } from './create-todo.action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  test('should call createTodoUseCase with the correct values', async () => {
    const { createTodoUseCaseSpy } = makeTestTodoMocks();
    const expectedParamCall = 'Usecase should be called with this';
    await createTodoAction(expectedParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  test('should call revalidatePath if usecase return success', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = 'Usecase should be called with this';
    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  test('should return the same value from usecase if success', async () => {
    const { successResult } = makeTestTodoMocks();
    const description = 'Usecase should be called with this';
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
  });

  test('should return the same value from usecase if error', async () => {
    const { createTodoUseCaseSpy, errorResult } = makeTestTodoMocks();
    const description = 'Usecase should be called with this';

    createTodoUseCaseSpy.mockResolvedValue(errorResult);

    const result = await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
});
