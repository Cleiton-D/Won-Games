import { Download } from '@styled-icons/boxicons-solid/Download';

import * as S from './styles';

export type PaymentInfoProps = {
  number: string;
  flag: string;
  image: string;
  purchaseDate: string;
};

export type GameItemProps = {
  image: string;
  title: string;
  price: string;
  downloadLink?: string;
  paymentInfo?: PaymentInfoProps;
};

const GameItem = ({
  image,
  title,
  price,
  downloadLink,
  paymentInfo
}: GameItemProps) => (
  <S.Wrapper>
    <S.GameContent>
      <S.ImageBox>
        <img src={image} alt={title} />
      </S.ImageBox>
      <S.Content>
        <S.Title>
          {title}
          {!!downloadLink && (
            <S.Downloadlink
              href={downloadLink}
              target="_blank"
              aria-label={`Get ${title} here`}
            >
              <Download size={22} />
            </S.Downloadlink>
          )}
        </S.Title>
        <S.Price>{price}</S.Price>
      </S.Content>
    </S.GameContent>

    {!!paymentInfo && (
      <S.PaymentContent>
        <span>{paymentInfo.purchaseDate}</span>
        <S.CardInfo>
          <span>{paymentInfo.number}</span>
          <img src={paymentInfo.image} alt={paymentInfo.flag} />
        </S.CardInfo>
      </S.PaymentContent>
    )}
  </S.Wrapper>
);

export default GameItem;
