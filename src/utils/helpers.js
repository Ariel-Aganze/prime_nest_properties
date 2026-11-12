/** Build an optimised Unsplash image URL from a photo id. */
export const unsplash = (id, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const formatCurrency = (value) => currency.format(value);

/** Price label that respects sale vs. rental listings. */
export const formatPrice = (property) =>
  property.status === 'For Rent'
    ? `${formatCurrency(property.price)}/mo`
    : formatCurrency(property.price);

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

/** Inline SVG used when a remote image fails to load. */
export const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#162745"/><stop offset="1" stop-color="#0a1426"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><g fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(340 240)"><path d="M0 50 60 0l60 50" stroke="#c69a42" stroke-width="8"/><path d="M22 40v60h76V40" stroke="#ffffff" stroke-opacity=".7" stroke-width="7"/></g><text x="400" y="400" fill="#c69a42" font-family="Georgia,serif" font-size="26" text-anchor="middle" letter-spacing="4">PRIMENEST</text></svg>`,
  );
