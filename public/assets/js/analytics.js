// Import and initialize Vercel Web Analytics
import { inject } from '../../node_modules/@vercel/analytics/dist/index.mjs';

// Inject the analytics script
inject({
    mode: 'auto', // Automatically detect environment
    debug: true   // Enable debug logging in development
});
