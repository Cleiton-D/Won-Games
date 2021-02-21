import Base from 'templates/Base';
import Empty from 'components/Empty';

export default function Page404() {
  return (
    <Base>
      <Empty
        title="404 Not Found"
        description="Ops.. this page does not exist. Go back to the store and enjoy our offers."
        hasLink
      />
    </Base>
  );
}
