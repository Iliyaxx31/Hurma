export type IconName = "bag" | "search" | "arrow" | "leaf" | "sun" | "heart" | "close" | "box" | "check" | "moon" | "spark";
export function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    arrow: <path d="M20 12H4m6-6-6 6 6 6"/>,
    leaf: <><path d="M20 3C7 2 1 8 5 16c7 5 15 0 15-13Z"/><path d="m4 21 12-12"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/></>,
    heart: <path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-4 5 3 10 8 14 5-4 12-9 8-14Z"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    box: <path d="m12 3 9 5v10l-9 5-9-5V8l9-5Zm0 10v10M3 8l9 5 9-5M8 5l9 5"/>,
    moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>,
    spark: <path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z"/>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export function Palm() {
  return <svg width="48" height="58" viewBox="0 0 48 58" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M22 53c3-14 4-25 2-35M16 54h18M24 18C17 6 7 9 3 16c8-3 14-2 21 2Zm0 0C31 6 40 9 45 16c-8-3-14-2-21 2Zm0 0C16 15 5 20 4 30c5-7 11-10 20-12Zm0 0c8-3 19 2 20 12-5-7-11-10-20-12Zm0 0C18 9 20 3 25 2c5 5 4 10-1 16Z"/><path d="m24 29 4 2m-5 7 4 2m-6 7 5 2"/></svg>;
}
