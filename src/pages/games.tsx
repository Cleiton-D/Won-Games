import Games, { GamesProps } from 'templates/Games';

import gamesMock from 'components/GameCardSlider/mock';

import filterItemsMock from 'components/ExploreSidebar/mock';

export default function GamesPage(props: GamesProps) {
  return <Games {...props} />;
}

export async function getServerSideProps() {
  return {
    props: {
      filterItems: filterItemsMock,
      games: gamesMock
    }
  };
}
