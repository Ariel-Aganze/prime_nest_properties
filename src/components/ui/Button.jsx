import { Link } from 'react-router-dom';
import { classNames } from '../../utils/helpers';

const variants = {
  gold: 'bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-gold',
  navy: 'bg-navy-900 text-white hover:bg-navy-800 shadow-luxe',
  outline: 'border border-navy-900/20 text-navy-900 hover:border-gold-500 hover:text-gold-700 bg-transparent',
  'outline-light': 'border border-white/40 text-white hover:border-gold-400 hover:text-gold-300 bg-white/5 backdrop-blur-sm',
  ghost: 'text-navy-900 hover:text-gold-600',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
};

/**
 * Polymorphic button: renders a router <Link> when `to` is given,
 * an <a> when `href` is given, otherwise a native <button>.
 */
export default function Button({
  to,
  href,
  variant = 'gold',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props
}) {
  const classes = classNames(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
