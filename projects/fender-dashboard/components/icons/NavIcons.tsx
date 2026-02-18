/**
 * Nav icons copied from Fender component-library for sidebar chrome.
 * Inline SVGs to avoid build/import issues.
 */

const size = 24;

export function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m12 2.348 10.996 6.284a1 1 0 0 1-.992 1.736L21 9.795V19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9.795l-1.004.573a1 1 0 0 1-.992-1.736L12 2.348ZM11 20h2v-4h-2v4Zm4 0v-6H9v6H6a1 1 0 0 1-1-1V8.652l7-4 7 4V19a1 1 0 0 1-1 1h-3Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function FlowsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.021 4.497a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 0 1 2.5 2.5v2a2.5 2.5 0 0 1-2.5 2.5H13v.03c.002.32.117.818.449 1.219.305.368.874.755 2.002.75.747-.002 1.39.149 1.925.454.54.307.907.737 1.149 1.192.46.865.475 1.847.475 2.358h1.5a2.5 2.5 0 0 1 2.5 2.5v2a2.5 2.5 0 0 1-2.5 2.5h-5a2.5 2.5 0 0 1-2.5-2.5v-2a2.5 2.5 0 0 1 2.5-2.5h2.52H17c0-.511-.038-1.036-.241-1.42a.94.94 0 0 0-.373-.393c-.171-.098-.455-.192-.927-.19-1.593.005-2.727-.55-3.459-1.37-.732.82-1.866 1.375-3.458 1.37-.473-.002-.757.092-.928.19a.94.94 0 0 0-.373.394C7.038 13.963 7 14.489 7 15h-.993 2.496a2.5 2.5 0 0 1 2.5 2.5v2a2.5 2.5 0 0 1-2.5 2.5h-5a2.5 2.5 0 0 1-2.5-2.5v-2a2.5 2.5 0 0 1 2.5-2.5H5c0-.511.016-1.493.475-2.358a2.939 2.939 0 0 1 1.148-1.192c.535-.306 1.18-.456 1.926-.454 1.128.005 1.697-.382 2.002-.75.332-.402.447-.899.449-1.22v-.029H9.521a2.5 2.5 0 0 1-2.5-2.5v-2Zm4.583 4.5.385.003.385-.003h-.77Zm-2.083-5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-5ZM3.503 17a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-5ZM15 17.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PaperAirplaneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20.356 14.854c2.192-1.149 2.192-4.287 0-5.436L6.496 2.16C4.124.916 1.41 3.099 2.115 5.684l1.76 6.452-1.76 6.452c-.705 2.585 2.01 4.768 4.383 3.525l13.859-7.26ZM5.548 3.97l13.859 7.26c.73.382.73 1.428 0 1.81l-13.86 7.26c-.79.415-1.695-.313-1.46-1.175l1.627-5.967h5.355a1.023 1.023 0 1 0 0-2.046H5.714L4.087 5.147c-.235-.862.67-1.59 1.46-1.175Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 6.5a4.488 4.488 0 0 1-1.416 3.277 6.526 6.526 0 0 1 2.836 3.035 5.525 5.525 0 0 1 1.369-1.098 3.5 3.5 0 1 1 5.422 0A5.498 5.498 0 0 1 23 16.5V19a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-3.5a6.499 6.499 0 0 1 3.416-5.723A4.5 4.5 0 1 1 12 6.5Zm-7 0a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm16 10a3.5 3.5 0 1 0-7 0V20h6a1 1 0 0 0 1-1v-2.5Zm-9-1a4.5 4.5 0 1 0-9 0V19a1 1 0 0 0 1 1h8v-4.5Zm5.5-4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M4 19V2H2v17a3 3 0 0 0 3 3h17v-2H5a1 1 0 0 1-1-1Z"
      />
      <path
        fill="currentColor"
        d="M14 5a1 1 0 1 0-2 0v12a1 1 0 1 0 2 0V5ZM9 13a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4ZM18 8a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
}

export function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M17 10a1 1 0 0 1-1 1H8a1 1 0 1 1 0-2h8a1 1 0 0 1 1 1ZM13 15a1 1 0 1 0 0-2H8a1 1 0 1 0 0 2h5Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 1.536-.405 2.97-1 4.23V21h-4.77c-1.26.595-2.694 1-4.23 1-5.523 0-10-4.477-10-10Zm10-8a8 8 0 1 0 0 16c1.25 0 2.456-.35 3.555-.895l.21-.105H19v-3.235l.105-.21C19.65 14.455 20 13.25 20 12a8 8 0 0 0-8-8Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path fill="currentColor" d="M17 11H7v2h10v-2ZM7 7h10v2H7V7ZM17 15H7v2h10v-2Z" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5ZM4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function NewspaperIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 7h8v6H6V7Zm2 2v2h4V9H8Z"
        clipRule="evenodd"
      />
      <path fill="currentColor" d="M6 17h8v-2H6v2Z" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5 22a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5ZM4 6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14H5a1 1 0 0 1-1-1V6Zm14 14h1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1v12Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
