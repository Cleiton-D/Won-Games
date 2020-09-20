import SlickSlider, { Settings } from 'react-slick';

import * as S from './styles';

export type SliderSettings = Settings;

export type SliderProps = {
  children: React.ReactNode;
  settings: SliderSettings;
};

const Slider: React.FC<SliderProps> = ({ children, settings }) => (
  <S.Wrapper>
    <SlickSlider {...settings}>{children}</SlickSlider>
  </S.Wrapper>
);

export default Slider;
