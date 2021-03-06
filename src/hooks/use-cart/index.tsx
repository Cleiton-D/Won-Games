import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import { useQueryGames } from 'graphql/queries/games';
import { getStorageItem } from 'utils/localStorage';
import { cartMapper } from 'utils/mappers';
import formatCurrency from 'utils/formatCurrency';
import { useStoragedValue } from 'hooks/use-storaged-value';

const CART_KEY = 'cartItems';

type CartItem = {
  id: string;
  image: string;
  title: string;
  price: string;
};

export type CartContextData = {
  items: CartItem[];
  quantity: number;
  total: string;
  loading: boolean;
  isInCart: (id: string) => boolean;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const CartContextDefaultValues = {
  items: [],
  quantity: 0,
  total: '$0.00',
  loading: false,
  isInCart: () => false,
  addToCart: () => null,
  removeFromCart: () => null,
  clearCart: () => null
};

export const CartContext = createContext<CartContextData>(
  CartContextDefaultValues
);

export type CartProviderProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  useEffect(() => {
    const data = getStorageItem(CART_KEY);

    if (data) {
      setCartItems(data);
    }
  }, []);

  useStoragedValue(CART_KEY, cartItems);

  const { data, loading } = useQueryGames({
    skip: !cartItems.length,
    variables: {
      where: {
        id: cartItems
      }
    }
  });

  const totalPrice = useMemo(() => {
    const price = data?.games.reduce((acc, game) => acc + game.price, 0);
    return formatCurrency(price || 0);
  }, [data]);

  const isInCart = useCallback((id: string) => cartItems.includes(id), [
    cartItems
  ]);

  const addToCart = useCallback((id: string) => {
    setCartItems((currentItems) => [...currentItems, id]);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: cartMapper(data?.games),
        quantity: cartItems.length,
        total: totalPrice,
        loading,
        isInCart,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
