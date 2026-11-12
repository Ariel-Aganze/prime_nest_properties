import Reveal from './Reveal';
import { classNames } from '../../utils/helpers';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false, className = '' }) {
  const centered = align === 'center';
  return (
    <Reveal className={classNames(centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}>
      {eyebrow && (
        <p className={classNames('eyebrow', centered && 'justify-center', light && 'text-gold-400')}>{eyebrow}</p>
      )}
      <h2
        className={classNames(
          'mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]',
          light ? 'text-white' : 'text-navy-900',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={classNames('mt-5 text-base leading-relaxed sm:text-lg', light ? 'text-navy-100/80' : 'text-charcoal-500')}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
