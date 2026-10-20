import { render, screen } from '@testing-library/react';
import { Button } from '.';
import { userEvent } from '@testing-library/user-event';

const VARIANT_DEFAULT_CLASSES = 'bg-blue-600 hover:bg-blue-700 text-blue-100';
const VARIANT_DANGER_CLASSES = 'bg-red-600 hover:bg-red-700 text-red-100';
const VARIANT_GHOST_CLASSES = 'bg-slate-300 hover:bg-slate-400 text-slate-950';

const SIZE_MD_CLASSES =
  'text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2';
const SIZE_SM_CLASSES =
  'text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1';
const SIZE_LG_CLASSES =
  'text-lg/tight py-4 px-6 rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3';

const DISABLED_CLASSES =
  'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed';

describe('<Button />', () => {
  describe('props padrão e JSX', () => {
    test('should render button with default props (only with children)', async () => {
      render(<Button>Enviar formulário</Button>);

      const button = screen.getByRole('button', {
        name: /enviar formulário/i,
      });

      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES);
      expect(button).toHaveClass(SIZE_MD_CLASSES);

      // expect(button).toMatchSnapshot();
    });

    test('verifies that standard JSX properties work correctly', async () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} type='submit' aria-hidden='false'>
          Enviar formulário
        </Button>,
      );

      const button = screen.getByText('Enviar formulário');

      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('variants (cores)', () => {
    test('check if default applies the correct color', async () => {
      render(
        <Button variant='default' title='o botão'>
          Enviar formulário
        </Button>,
      );

      const button = screen.getByTitle(/o botão/i);

      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES);
    });

    test('check if danger applies the correct color', async () => {
      render(
        <Button variant='danger' title='o botão'>
          Enviar formulário
        </Button>,
      );

      const button = screen.getByTitle(/o botão/i);

      expect(button).toHaveClass(VARIANT_DANGER_CLASSES);
    });

    test('check if ghost applies the correct color', async () => {
      render(<Button variant='ghost'>Enviar formulário</Button>);

      const button = screen.getByRole('button', {
        name: /enviar formulário/i,
      });

      expect(button).toHaveClass(VARIANT_GHOST_CLASSES);
    });
  });

  describe('size (tamanhos)', () => {
    test('size sm should be smaller', async () => {
      render(<Button size='sm'>Enviar formulário</Button>);

      const button = screen.getByRole('button', {
        name: 'Enviar formulário',
      });

      expect(button).toHaveClass(SIZE_SM_CLASSES);
    });

    test('size md should be medium', async () => {
      render(<Button>Enviar formulário</Button>);

      const button = screen.getByRole('button', {
        name: 'Enviar formulário',
      });

      expect(button).toHaveClass(SIZE_MD_CLASSES);
    });

    test('size lg should be bigger', async () => {
      render(<Button size='lg'>Enviar formulário</Button>);

      const button = screen.getByRole('button', {
        name: 'Enviar formulário',
      });

      expect(button).toHaveClass(SIZE_LG_CLASSES);
    });
  });

  describe('disabled', () => {
    test('classes para estado desativado estão corretas', async () => {
      render(<Button disabled>Enviar formulário</Button>);

      const button = screen.getByRole('button', {
        name: 'Enviar formulário',
      });

      expect(button).toHaveClass(DISABLED_CLASSES);
      expect(button).toBeDisabled();
    });
  });
});
