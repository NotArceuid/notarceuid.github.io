import adapter from '@sveltejs/adapter-static';
import { relative, sep } from 'node:path';

const config = {
  compilerOptions: {
    runes: ({ filename }) => {
      const relativePath = relative(import.meta.dirname, filename);
      const pathSegments = relativePath.toLowerCase().split(sep);
      return pathSegments.includes('node_modules') ? undefined : true;
    }
  },
  kit: {
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (path.startsWith('/soap-game')) return;
        throw new Error(message);
      }
    },
    adapter: adapter({
      fallback: '404.html'  
    }),
    paths: {
      base: ''    
    }
  }
};

export default config;
