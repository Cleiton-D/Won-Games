import { useCallback } from 'react';
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined';

import Base from 'templates/Base';

import GameCard, { GameCardProps } from 'components/GameCard';
import Grid from 'components/Grid';
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';

import * as S from './styles';

export type GamesProps = {
  games?: GameCardProps[];
  filterItems: ItemProps[];
};

const Games = ({ games = [], filterItems }: GamesProps) => {
  const handleFilter = useCallback(() => {
    return;
  }, []);

  const handleShowMore = useCallback(() => {
    return;
  }, []);

  return (
    <Base>
      <S.Main>
        <ExploreSidebar items={filterItems} onFilter={handleFilter} />

        <section>
          <Grid>
            {games.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </Grid>

          <S.ShowMore role="button" onClick={handleShowMore}>
            <span>Show More</span>
            <ArrowDown size={35} />
          </S.ShowMore>
        </section>
      </S.Main>
    </Base>
  );
};

export default Games;
