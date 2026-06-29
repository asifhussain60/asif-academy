const H = { sm: 'h-2', md: 'h-5', lg: 'h-10' } as const;

export function Spacer({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <div className={H[size]} aria-hidden />;
}
