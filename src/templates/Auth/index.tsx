import Heading from 'components/Heading';
import Logo from 'components/Logo';
import MediaMatch from 'components/MediaMatch';

import * as S from './styles';

type AuthProps = {
  title: string;
  children: React.ReactNode;
};

const Auth = ({ title, children }: AuthProps) => (
  <S.Wrapper>
    <MediaMatch greatherThan="medium">
      <S.BannerBlock>
        <S.BannerContent>
          <Logo id="banner" />

          <div>
            <Heading>All your favorite games in one place</Heading>
            <S.Subtitle>
              <strong>WON</strong> is the best and most complete gaming platform
            </S.Subtitle>
          </div>

          <S.Footer>Won Games 2020 © Todos os Direitos Reservados</S.Footer>
        </S.BannerContent>
      </S.BannerBlock>
    </MediaMatch>

    <S.Content>
      <S.ContentWrapper>
        <Logo color="black" size="large" id="content" />

        <Heading color="black" lineColor="secondary" lineLeft>
          {title}
        </Heading>

        {children}
      </S.ContentWrapper>
    </S.Content>
  </S.Wrapper>
);

export default Auth;