interface SectionHeadingProps {
  title: string;
  accent: string;
  subtitle?: string;
  center?: boolean;
  accentFirst?: boolean;
  /** Override heading text color (default: text-foreground dark) */
  headingClassName?: string;
  /** Override subtitle text color */
  subtitleClassName?: string;
}

export function SectionHeading({
  title,
  accent,
  subtitle,
  center = true,
  accentFirst = false,
  headingClassName = 'text-[#1A1A2E] dark:text-sop-foreground',
  subtitleClassName = 'text-[#6B7280] dark:text-sop-muted',
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'text-center' : ''} mb-12`}>
      <h2
        className={`heading-l font-bold ${headingClassName}`}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {accentFirst ? (
          <><span className="text-[#F97316]">{accent}</span>{' '}{title}</>
        ) : (
          <>{title}{' '}<span className="text-[#F97316]">{accent}</span></>
        )}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${center ? 'mx-auto' : ''} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
