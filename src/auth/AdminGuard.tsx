import { useAuth0 } from '@auth0/auth0-react';
import type { ReactNode } from 'react';
import { ADMIN_EMAIL } from './admin';

export function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth0();
  if (isLoading) return null;
  if (user?.email !== ADMIN_EMAIL) {
    return (
      <div className="grid h-dvh place-items-center bg-bg text-fg">
        <p className="font-mono text-sm text-fg-subtle">Not authorized.</p>
      </div>
    );
  }
  return <>{children}</>;
}
