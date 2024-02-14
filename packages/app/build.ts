// import { build } from 'esbuild';
// import { clean } from 'esbuild-plugin-clean';
// import esbuildPluginTsc from 'esbuild-plugin-tsc';
// import { dependencies, devDependencies } from './package.json';

// build({
//   entryPoints: ['src/app.ts'],
//   outfile: 'dist/index.js',
//   external: Object.keys(dependencies)
//     .filter((k) => !k.includes('microslot-services'))
//     .concat(Object.keys(devDependencies)),
//   platform: 'node',
//   bundle: true,
//   minify: true,
//   plugins: [
//     clean({
//       patterns: ['./dist/*'],
//     }),
//     esbuildPluginTsc(),
//   ],
//   sourcemap: 'inline',
// });
