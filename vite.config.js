import { defineConfig } from 'vite';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

async function loadApiHandler(relPath) {
  const fullPath = path.resolve(process.cwd(), relPath);
  const mod = await import(pathToFileURL(fullPath).href);
  return mod.default || mod;
}

function apiDepositPlugin() {
  return {
    name: 'api-deposit-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
        if (url.pathname === '/checkout' || url.pathname === '/payment') {
          req.url = '/checkout.html';
          return next();
        }
        if (url.pathname === '/admin' || url.pathname === '/admin/') {
          req.url = '/admin.html';
          return next();
        }
        if (url.pathname === '/api/deposit' || url.pathname === '/api/create-payment' || url.pathname === '/api/notify' || url.pathname.startsWith('/api/crypto')) {
          let bodyStr = '';
          req.on('data', chunk => { bodyStr += chunk; });
          req.on('end', async () => {
            try {
              req.body = bodyStr ? JSON.parse(bodyStr) : {};
            } catch (e) {
              try {
                req.body = Object.fromEntries(new URLSearchParams(bodyStr));
              } catch (e2) {
                req.body = {};
              }
            }

            // Express/Vercel-like response helpers
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
            res.send = (text) => {
              res.end(String(text));
              return res;
            };

            try {
              if (url.pathname.startsWith('/api/crypto')) {
                const cryptoHandler = await loadApiHandler('api/crypto.js');
                await cryptoHandler(req, res);
              } else if (url.pathname === '/api/deposit') {
                const depositHandler = await loadApiHandler('api/deposit.js');
                await depositHandler(req, res);
              } else if (url.pathname === '/api/create-payment') {
                const createPaymentHandler = await loadApiHandler('api/create-payment.js');
                await createPaymentHandler(req, res);
              } else if (url.pathname === '/api/notify') {
                const notifyHandler = await loadApiHandler('api/notify.js');
                await notifyHandler(req, res);
              }
            } catch (err) {
              console.error('[API Dev Middleware] Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'অভ্যন্তরীণ ত্রুটি ঘটেছে' }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [apiDepositPlugin()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: true,
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {}
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: true
  }
});
