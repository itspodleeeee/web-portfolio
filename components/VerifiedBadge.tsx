export const VerifiedBadge = ({
  className,
  label = "Verified"
}: {
  className?: string;
  label?: string;
}) => {
  return (
    <span className={className} aria-label={label} title={label}>
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        className="h-full w-full"
      >
        {/* simple rosette-like badge */}
        <path
          fill="#3B82F6"
          d="M12 1.8l2.2 1.4 2.6-.4 1.2 2.4 2.4 1.2-.4 2.6L22.2 12l-1.4 2.2.4 2.6-2.4 1.2-1.2 2.4-2.6-.4L12 22.2l-2.2-1.4-2.6.4-1.2-2.4-2.4-1.2.4-2.6L1.8 12l1.4-2.2-.4-2.6 2.4-1.2 1.2-2.4 2.6.4L12 1.8z"
        />
        <path
          fill="#ffffff"
          d="M10.3 15.6 7.6 13a1 1 0 1 1 1.4-1.4l1.9 1.9 4.1-4.1a1 1 0 1 1 1.4 1.4l-4.8 4.8a1 1 0 0 1-1.3 0z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
};

