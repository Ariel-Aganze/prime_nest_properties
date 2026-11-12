import { useState } from 'react';
import { FALLBACK_IMAGE, classNames } from '../../utils/helpers';

/** Lazy-loaded image with a soft fade-in and a branded fallback on error. */
export default function SmartImage({ src, alt, className = '', eager = false, ...props }) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);

  // Reset when the caller swaps the image (e.g. gallery navigation).
  if (src !== prevSrc) {
    setPrevSrc(src);
    setCurrent(src);
    setLoaded(false);
  }

  return (
    <img
      src={current}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (current !== FALLBACK_IMAGE) setCurrent(FALLBACK_IMAGE);
      }}
      className={classNames(
        'bg-navy-900 transition-opacity duration-700',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...props}
    />
  );
}
