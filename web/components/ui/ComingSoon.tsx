import Link from "next/link";

interface ComingSoonProps {
  label: string;
}

export default function ComingSoon({ label }: ComingSoonProps) {
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center px-4 py-20"
      aria-labelledby="coming-soon-heading"
    >
      <div className="max-w-sm w-full text-center">

        {/* Flame icon */}
        <div className="mx-auto mb-6 w-12 h-12 flex items-center justify-center">
          <svg
            width="28"
            height="36"
            viewBox="0 0 28 36"
            fill="none"
            aria-hidden="true"
            className="text-accent-bronze"
          >
            <path
              d="M14 2C14 2 20 8 20 15c0 3.314-2.686 6-6 6s-6-2.686-6-6c0-2.5 1-4.5 1-4.5C9 14 9 18 13 20c0 0-5-2-5-7C8 9 11 5 14 2Z"
              fill="currentColor"
              opacity="0.35"
            />
            <path
              d="M14 4C14 4 22 10.5 22 18c0 4.418-3.582 8-8 8s-8-3.582-8-8c0-3 1.5-5.5 3-7 0 3 2 5.5 5 6.5C12 15 11 10 14 4Z"
              fill="currentColor"
              opacity="0.65"
            />
            <path
              d="M14 10c0 0 5 5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4.5 2.5-5.5 0 2 1 3.5 2.5 4-.5-2.5-.5-5 0-8.5Z"
              fill="currentColor"
            />
            <line
              x1="14"
              y1="26"
              x2="14"
              y2="34"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </div>

        <p className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">
          Coming Soon
        </p>

        <h1
          id="coming-soon-heading"
          className="font-serif text-3xl md:text-4xl italic text-text-primary mb-4"
        >
          {label}
        </h1>

        <div className="memorial-divider" aria-hidden="true" />

        <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-xs mx-auto">
          We are lovingly preparing this section of the memorial. Please check back soon — it will be ready before the service.
        </p>

        <Link
          href="/guestbook"
          className="inline-block px-6 py-2.5 text-sm tracking-wide border border-accent-umber text-accent-umber hover:bg-accent-umber hover:text-bg-base transition-colors duration-200"
        >
          Leave a tribute in the Guestbook
        </Link>
      </div>
    </section>
  );
}
