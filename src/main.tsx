import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthGuard } from './auth/AuthGuard';

// Self-hosted fonts (no CDN dependency during a live talk).
import '@fontsource-variable/caveat';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/comic-neue/400.css';
import '@fontsource/comic-neue/700.css';

import './theme/theme.css';
import { router } from './app/router';
import { useDeck } from './app/store';
import { getHighlighter } from './blocks/shiki';

// Apply persisted theme (index.html already set it pre-paint; keep store + DOM in sync).
document.documentElement.setAttribute('data-theme', useDeck.getState().theme);

// Pre-warm the syntax highlighter so the first code slide paints instantly.
void getHighlighter();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <AuthGuard>
        <RouterProvider router={router} />
      </AuthGuard>
    </Auth0Provider>
  </StrictMode>,
);
