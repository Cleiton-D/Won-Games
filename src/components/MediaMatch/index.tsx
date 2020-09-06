import { useEffect, useCallback, useState } from 'react';
import { DefaultBreakpoints, defaultBreakpoints } from 'styled-media-query';

type breakpoint = keyof DefaultBreakpoints;

export type MediaMathProps = {
  lessThan?: breakpoint;
  greatherThan?: breakpoint;
};

const MediaMatch: React.FC<MediaMathProps> = ({
  children,
  lessThan,
  greatherThan
}) => {
  const [show, setShow] = useState(false);

  const handleMedia = useCallback(function (this: MediaQueryList) {
    if (this.matches) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  const createMedia = useCallback(
    (type: string, value: breakpoint | undefined) => {
      if (value) {
        const query = `(${type}: ${defaultBreakpoints[value]})`;

        const media = window.matchMedia(query);
        handleMedia.call(media);
        media.addListener(handleMedia);

        return media;
      }
    },
    [handleMedia]
  );

  useEffect(() => {
    const greatherMedia = createMedia('min-width', greatherThan);
    const lessMedia = createMedia('max-width', lessThan);

    return () => {
      if (greatherMedia) greatherMedia.removeListener(handleMedia);
      if (lessMedia) lessMedia.removeListener(handleMedia);
    };
  }, [greatherThan, lessThan, createMedia, handleMedia]);

  return <>{show && children}</>;
};

export default MediaMatch;
