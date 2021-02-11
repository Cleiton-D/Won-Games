import { useMemo } from 'react';
import { Apple, Windows, Linux } from '@styled-icons/fa-brands';

import Heading from 'components/Heading';
import MediaMatch from 'components/MediaMatch';

import * as S from './styles';

type Platform = 'windows' | 'linux' | 'mac';

type Rating = 'BR0' | 'BR10' | 'BR12' | 'BR14' | 'BR16' | 'BR18';

export type GameDetailsProps = {
  developer: string;
  platforms: Platform[];
  releaseDate: string;
  rating: Rating;
  genres: string[];
};

const platformIcons = {
  linux: <Linux title="Linux" size={18} />,
  mac: <Apple title="Mac" size={18} />,
  windows: <Windows title="Windows" size={18} />
};

const GameDetails = ({
  developer,
  platforms,
  releaseDate,
  rating,
  genres
}: GameDetailsProps) => {
  const formattedReleaseDate = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(new Date(releaseDate)),
    [releaseDate]
  );

  const formattedRating = useMemo(
    () => (rating === 'BR0' ? 'FREE' : `${rating.replace('BR', '')}+`),
    [rating]
  );

  return (
    <S.Wrapper>
      <MediaMatch greatherThan="small">
        <Heading lineLeft lineColor="secondary">
          Game Details
        </Heading>
      </MediaMatch>

      <S.Content>
        <S.Block>
          <S.Label>Developer</S.Label>
          <S.Description>{developer}</S.Description>
        </S.Block>

        <S.Block>
          <S.Label>Release Date</S.Label>
          <S.Description>{formattedReleaseDate}</S.Description>
        </S.Block>

        <S.Block>
          <S.Label>Platforms</S.Label>
          <S.IconsWrapper>
            {platforms.map((platform) => (
              <S.Icon key={platform}>{platformIcons[platform]}</S.Icon>
            ))}
          </S.IconsWrapper>
        </S.Block>

        <S.Block>
          <S.Label>Publisher</S.Label>
          <S.Description>2K</S.Description>
        </S.Block>

        <S.Block>
          <S.Label>Rating</S.Label>
          <S.Description>{formattedRating}</S.Description>
        </S.Block>

        <S.Block>
          <S.Label>Genres</S.Label>
          <S.Description>{genres.join(' / ')}</S.Description>
        </S.Block>
      </S.Content>
    </S.Wrapper>
  );
};
export default GameDetails;
