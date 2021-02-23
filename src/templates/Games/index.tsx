import { useCallback } from 'react';
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined';

import { useQueryGames } from 'graphql/queries/games';

import Base from 'templates/Base';

import GameCard, { GameCardProps } from 'components/GameCard';
import Grid from 'components/Grid';
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';

import * as S from './styles';

export type GamesProps = {
  games?: GameCardProps[];
  filterItems: ItemProps[];
};

const Games = ({ filterItems }: GamesProps) => {
  const { data, loading, fetchMore } = useQueryGames({
    variables: { limit: 15 }
  });

  const handleFilter = useCallback(() => {
    return;
  }, []);

  const handleShowMore = useCallback(() => {
    fetchMore({ variables: { limit: 15, start: data?.games.length } });
  }, [fetchMore, data]);

  return (
    <Base>
      <S.Main>
        <ExploreSidebar items={filterItems} onFilter={handleFilter} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <section>
            <Grid>
              {data?.games.map((game) => (
                <GameCard
                  key={game.name}
                  title={game.name}
                  slug={game.slug}
                  developer={game.developers[0].name}
                  image={`http://127.0.0.1:1337${game.cover!.url}`}
                  price={game.price}
                />
              ))}
            </Grid>

            <S.ShowMore role="button" onClick={handleShowMore}>
              <span>Show More</span>
              <ArrowDown size={35} />
            </S.ShowMore>
          </section>
        )}
      </S.Main>
    </Base>
  );
};

export default Games;
