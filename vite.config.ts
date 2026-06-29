import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const OVERRIDES_FILE = fileURLToPath(new URL('./talkingpoints.overrides.json', import.meta.url));

/**
 * Dev-only write-back for presenter talking-point edits. GET returns the overrides map; POST merges
 * one slide-step edit and writes it to disk (gated to the Foundations module). The file is excluded
 * from the watcher (below) so saving never reloads the presenter mid-talk. No-op in production.
 */
function talkingPointsWriteback(): Plugin {
  const read = (): Record<string, unknown> => {
    try {
      return JSON.parse(fs.readFileSync(OVERRIDES_FILE, 'utf8'));
    } catch {
      return {};
    }
  };
  return {
    name: 'talking-points-writeback',
    configureServer(server) {
      server.middlewares.use('/__present/talking-points', (req, res) => {
        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(read()));
          return;
        }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (c) => (body += c));
          req.on('end', () => {
            try {
              const { moduleId, lessonId, slideId, step, before, after } = JSON.parse(body);
              if (moduleId !== '01-foundations') {
                res.statusCode = 403;
                res.end('{"error":"foundations only"}');
                return;
              }
              const data = read() as Record<string, { before: string[]; after: string[]; updatedAt: string }>;
              const key = `${moduleId}/${lessonId}/${slideId}/${step}`;
              data[key] = {
                before: data[key]?.before ?? before, // preserve the true original across re-edits
                after,
                updatedAt: new Date().toISOString(),
              };
              fs.writeFileSync(OVERRIDES_FILE, JSON.stringify(data, null, 2));
              res.setHeader('Content-Type', 'application/json');
              res.end('{"ok":true}');
            } catch {
              res.statusCode = 400;
              res.end('{"error":"bad request"}');
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end();
      });
    },
  };
}

// base: './' keeps the built deck portable (loads from any path / file://).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), talkingPointsWriteback()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Honor an injected PORT (e.g. the preview harness's assigned port); fall back to Vite's default.
  // Never watch the overrides file — writing it must not reload the presenter mid-presentation.
  server: {
    ...(process.env.PORT ? { port: Number(process.env.PORT), strictPort: true } : {}),
    watch: { ignored: ['**/talkingpoints.overrides.json'] },
  },
});
