import userEvent from '@testing-library/user-event';
import { render, screen } from 'utils/test-utils';

import { CartContextDefaultValues } from 'hooks/use-cart';

import GameItem from '.';

const props = {
  id: '1',
  image: 'https://source.unsplash.com/user/willianjusten/151x70',
  title: 'Red Dead Redemption 2',
  price: 'R$ 215,00'
};

describe('<GameItem />', () => {
  it('should render the item', () => {
    render(<GameItem {...props} />);

    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument();

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.image
    );

    expect(screen.getByText('R$ 215,00')).toBeInTheDocument();
  });

  it('should render remove if the item is inside the cart and call remove', () => {
    const removeFromCart = jest.fn();

    const cartProviderProps = {
      ...CartContextDefaultValues,
      isInCart: () => true,
      removeFromCart
    };

    render(<GameItem {...props} />, { cartProviderProps });

    const removeLink = screen.getByText(/remove/i);
    expect(removeLink).toBeInTheDocument();

    userEvent.click(removeLink);
    expect(removeFromCart).toHaveBeenCalledWith('1');
  });

  it('should render the item with download link', () => {
    const downloadLink = 'https://link';

    render(<GameItem {...props} downloadLink={downloadLink} />);

    expect(
      screen.getByRole('link', { name: `Get ${props.title} here` })
    ).toHaveAttribute('href', downloadLink);
  });

  it('should render the payment info', () => {
    const paymentInfo = {
      flag: 'mastercard',
      image: '/img/master-card.png',
      number: '**** **** **** 4326',
      purchaseDate: 'Purchase made on 07/20/2020 at 20:32'
    };

    render(<GameItem {...props} paymentInfo={paymentInfo} />);

    expect(screen.getByRole('img', { name: paymentInfo.flag })).toHaveAttribute(
      'src',
      paymentInfo.image
    );

    expect(screen.getByText(paymentInfo.number)).toBeInTheDocument();
    expect(screen.getByText(paymentInfo.purchaseDate)).toBeInTheDocument();
  });
});
