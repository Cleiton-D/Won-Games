import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined';
import { ParsedUrlQueryInput } from 'querystring';

import { useQueryGames } from 'graphql/queries/games';
import {
  parseQueryStringToFilter,
  parseQueryStringToWhere
} from 'utils/filter';

import Base from 'templates/Base';

import GameCard from 'components/GameCard';
import Grid from 'components/Grid';
import Empty from 'components/Empty';
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';

import * as S from './styles';

export type GamesProps = {
  filterItems: ItemProps[];
};

const Games = ({ filterItems }: GamesProps) => {
  const { push, query } = useRouter();

  const exploreFiltersInitialValues = useMemo(
    () => parseQueryStringToFilter({ queryString: query, filterItems }),
    [query, filterItems]
  );

  const { data, loading, fetchMore } = useQueryGames({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  });

  const handleFilter = useCallback(
    (items: ParsedUrlQueryInput) => {
      push({
        pathname: '/games',
        query: items
      });
    },
    [push]
  );

  const handleShowMore = useCallback(() => {
    fetchMore({ variables: { limit: 15, start: data?.games.length } });
  }, [fetchMore, data]);

  if (!data) return <>loading....</>;
  const hasMoreGames =
    data?.games.length < (data?.gamesConnection?.values?.length || 0);

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          initialValues={exploreFiltersInitialValues}
          items={filterItems}
          onFilter={handleFilter}
        />

        <section>
          {data?.games.length ? (
            <>
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

              {hasMoreGames && (
                <S.ShowMore>
                  {loading ? (
                    <S.ShowMoreLoading
                      src="/img/dots.svg"
                      alt="loading more games"
                    />
                  ) : (
                    <S.ShowMoreButton role="button" onClick={handleShowMore}>
                      <span>Show More</span>
                      <ArrowDown size={35} />
                    </S.ShowMoreButton>
                  )}
                </S.ShowMore>
              )}
            </>
          ) : (
            <Empty
              title=":("
              description="We didn'd find any games with this filter"
            />
          )}
        </section>
      </S.Main>
    </Base>
  );
};

export default Games;
