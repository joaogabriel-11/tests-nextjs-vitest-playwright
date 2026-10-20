import { render, screen } from '@testing-library/react';
import { InputText, InputTextProps } from '.';
import userEvent from '@testing-library/user-event';

type Props = Partial<InputTextProps>;

const makeInput = (p: Props = {}) => {
  return (
    <InputText
      labelText='label'
      placeholder='placeholder'
      type='text'
      disabled={false}
      required={true}
      readOnly={false}
      {...p}
    />
  );
};

const renderInput = (p?: Props) => {
  const renderResult = render(makeInput(p));
  const input = screen.getByRole('textbox');
  return { renderResult, input };
};

const input = (p?: Props) => renderInput(p).input;

describe('<InputText />', () => {
  describe('default behavior', () => {
    test('render with label', async () => {
      const el = input({ labelText: 'novo label' });
      expect(el).toBeInTheDocument();
    });

    test('render with placeholder', async () => {
      const el = input({ placeholder: 'novo placeholder' });
      expect(el).toHaveAttribute('placeholder', 'novo placeholder');
    });

    test('render without placeholder', async () => {
      const el = input({ placeholder: undefined });
      expect(el).not.toHaveAttribute('placeholder');
    });

    test('render without label', async () => {
      input({ labelText: undefined });
      const label = screen.queryByRole('novo label');
      expect(label).not.toBeInTheDocument();
    });

    test('uses labelText as aria-label when possible', async () => {
      expect(input()).toHaveAttribute('aria-label', 'label');
    });

    test('uses placeholder as fallback for aria-label', async () => {
      expect(input({ labelText: undefined })).toHaveAttribute(
        'aria-label',
        'placeholder',
      );
    });

    test('displays the default value correctly', async () => {
      expect(input({ defaultValue: 'default' })).toHaveAttribute(
        'value',
        'default',
      );
    });

    test('accepts other JSX props (name, maxLength)', async () => {
      const el = input({ name: 'name', maxLength: 14 });
      expect(el).toHaveAttribute('name', 'name');
      expect(el).toHaveAttribute('maxLength', '14');
    });
  });

  describe('accessibility', () => {
    test('does not display an error message by default', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
      expect(el).not.toHaveAttribute('aria-describedby');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('does not mark the input as invalid by default', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
    });

    test('renders an error message when errorMessage is passed', async () => {
      const el = input({ errorMessage: 'error' });
      const error = screen.getByRole('alert');
      const errorId = error.getAttribute('id');

      expect(el).toHaveAttribute('aria-invalid', 'true');
      expect(el).toHaveAttribute('aria-describedby', errorId);
      expect(error).toBeInTheDocument();
    });
  });

  describe('interactive behavior', () => {
    test('updates the value as the user types', async () => {
      const user = userEvent.setup();
      const el = input();
      await user.type(el, 'teste iterativo');

      expect(el).toHaveValue('teste iterativo');
    });
  });

  describe('visual states', () => {
    test('applies visual classes when disabled', async () => {
      const el = input({ disabled: true });
      expect(el).toHaveClass(
        'disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder-slate-300',
      );
    });

    test('applies visual classes when read-only', async () => {
      const el = input({ readOnly: true });
      expect(el).toHaveClass('read-only:bg-slate-100');
    });

    test('adds error class (red ring) when invalid', async () => {
      const el = input({ errorMessage: 'error' });
      expect(el).toHaveClass(
        'ring-red-500 focus:ring-red-700 placeholder-red-200',
      );
    });

    test('preserves custom developer classes', async () => {
      const el = input({ className: 'developer-class' });
      expect(el).toHaveClass('developer-class');
    });
  });
});
