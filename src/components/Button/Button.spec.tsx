import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart';

import { render, screen } from 'utils/test-utils';

import Button from '.';

describe('<Button />', () => {
  it('should render the medium size by default', () => {
    render(<Button>Buy now</Button>);

    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      height: '4rem',
      padding: '0.8rem 3.2rem',
      'font-size': '1.4rem'
    });
  });

  it('should render the small size', () => {
    render(<Button size="small">Buy now</Button>);

    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      height: '3rem',
      'font-size': '1.2rem'
    });
  });

  it('should render the large size', () => {
    render(<Button size="large">Buy now</Button>);

    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      height: '5rem',
      padding: '0.8rem 4.8rem',
      'font-size': '1.6rem'
    });
  });

  it('should render fullWidth version', () => {
    render(<Button fullWidth>Buy now</Button>);

    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      width: '100%'
    });
  });

  it('should render an icon version', () => {
    render(<Button icon={AddShoppingCart}>Buy now</Button>);

    expect(screen.getByText(/buy now/i)).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render a minimal version', () => {
    render(
      <Button icon={AddShoppingCart} minimal>
        Buy now
      </Button>
    );

    expect(screen.getByRole('button', { name: /buy now/i })).toHaveStyle({
      background: 'none',
      color: '#F231A5'
    });

    expect(screen.getByRole('button', { name: /buy now/i })).toHaveStyleRule(
      'background',
      'none',
      {
        modifier: ':hover'
      }
    );
  });

  it('should render a disabled button', () => {
    render(<Button disabled>Buy now</Button>);

    expect(screen.getByRole('button', { name: /buy now/i })).toHaveStyleRule(
      'cursor',
      'not-allowed',
      {
        modifier: ':disabled'
      }
    );
  });

  it('should render Button as a link', () => {
    render(
      <Button as="a" href="/link">
        Buy now
      </Button>
    );

    expect(screen.getByRole('link', { name: /buy now/i })).toHaveAttribute(
      'href',
      '/link'
    );
  });
});
