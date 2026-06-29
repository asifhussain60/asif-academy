import { useAuth0 } from '@auth0/auth0-react';
import welcomeHero from '../curricula/claude-code/assets/welcome-hero.png';

export function LoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Left panel: brand ───────────────────────────── */}
      <div style={{
        flex: '1 1 55%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '3rem',
        overflow: 'hidden',
        minHeight: '100vh',
      }}>
        {/* Hero image */}
        <img
          src={welcomeHero}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0.35,
          }}
        />

        {/* Gradient overlay — bottom-up so text is legible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, var(--bg) 30%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, var(--bg) 0%, transparent 60%)',
        }} />

        {/* Top-left logo mark */}
        <div style={{ position: 'absolute', top: '2.5rem', left: '3rem', zIndex: 10 }}>
          <AcademyMark />
        </div>

        {/* Bottom text */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '480px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {['Claude Code', 'Agentic AI', 'Skills & Hooks', 'MCP Servers'].map(tag => (
              <span key={tag} style={{
                fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em',
                textTransform: 'uppercase', padding: '0.25rem 0.625rem',
                borderRadius: '999px', border: '1px solid var(--border)',
                color: 'var(--fg-muted)', background: 'var(--surface)',
              }}>{tag}</span>
            ))}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--fg)',
            lineHeight: 1.1,
            margin: '0 0 1rem',
          }}>
            Learn by doing,<br />
            <span style={{ color: 'var(--accent)' }}>not just watching.</span>
          </h1>

          <p style={{ color: 'var(--fg-muted)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
            Interactive courses that teach you to think with AI as a collaborator — not a crutch.
          </p>
        </div>
      </div>

      {/* ── Right panel: sign-in card ────────────────────── */}
      <div style={{
        flex: '0 0 min(420px, 45%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        borderLeft: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <div style={{ width: '100%', maxWidth: '320px' }}>

          {/* Card header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{
              fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '0.75rem',
            }}>Asif Academy</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem', fontWeight: 700,
              color: 'var(--fg)', margin: '0 0 0.5rem', lineHeight: 1.2,
            }}>Welcome back</h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', margin: 0 }}>
              Sign in to continue to your courses.
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={() => loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })}
            disabled={isLoading}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.75rem', width: '100%',
              padding: '0.875rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              background: 'var(--surface-2)',
              color: 'var(--fg)',
              fontSize: '0.9375rem', fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              transition: 'background 0.15s, border-color 0.15s',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            {isLoading ? (
              <span style={{
                width: '18px', height: '18px',
                border: '2px solid var(--border)',
                borderTopColor: 'var(--accent)',
                borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
                display: 'inline-block',
              }} />
            ) : <GoogleIcon />}
            <span>{isLoading ? 'Signing in…' : 'Continue with Google'}</span>
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            margin: '2rem 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--fg-subtle)' }}>access</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Info block */}
          <div style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius)',
            background: 'var(--accent-soft)',
            border: '1px solid rgba(224,129,92,0.2)',
          }}>
            <p style={{
              fontSize: '0.8125rem', color: 'var(--fg-muted)',
              margin: 0, lineHeight: 1.6,
            }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Invite-only access.</span>{' '}
              Courses are currently by invitation. Contact Asif to request access.
            </p>
          </div>

          {/* Footer */}
          <p style={{
            marginTop: '2.5rem', fontSize: '0.72rem',
            color: 'var(--fg-subtle)', textAlign: 'center',
          }}>
            Powered by Auth0 · Google OAuth
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          [data-login-left] { display: none !important; }
          [data-login-right] { flex: 1 !important; border-left: none !important; }
        }
      `}</style>
    </div>
  );
}

function AcademyMark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px',
        background: 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 2L16 6v6l-7 4-7-4V6l7-4z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
          <path d="M9 2v10M2 6l7 4 7-4" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.875rem', fontWeight: 700,
        color: 'var(--fg)', letterSpacing: '-0.01em',
      }}>Asif Academy</span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
