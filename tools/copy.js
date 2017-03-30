/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import chokidar from 'chokidar';
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs';
import pkg from '../package.json';
import { format } from './run';
const glob = require('glob');
const webpackConfig = require('./webpack.config');
/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
/*  await makeDir('build');
  await Promise.all([
    writeFile('build/package.json', JSON.stringify({
      private: true,
      engines: pkg.engines,
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node server.js',
      },
    }, null, 2)),
    copyFile('LICENSE.txt', 'build/LICENSE.txt'),
    copyDir('public', 'build/public'),
  ]);*/
  const urls = Object.keys(webpackConfig.default[0].entry);
  const ejsFiles = await(files('src/**/*.ejs'));

  await(makeDir('dist/src/client'));
  //await(makeDir('dist/src/client/bridge'));
  //await(Promise.all(urls.map(url => makeDir(`dist/src/client/${url}`))));
  await(Promise.all([
      ...ejsFiles.map(ejs => copyFile(ejs, `dist/${ejs}`))
    ]
  ));

  if (process.argv.includes('--watch')) {
    const watcher = chokidar.watch([
      'public/**/*',
    ], { ignoreInitial: true });

    watcher.on('all', async (event, filePath) => {
      const start = new Date();
      const src = path.relative('./', filePath);
      const dist = path.join('build/', src.startsWith('src') ? path.relative('src', src) : src);
      switch (event) {
        case 'add':
        case 'change':
          await makeDir(path.dirname(dist));
          await copyFile(filePath, dist);
          break;
        case 'unlink':
        case 'unlinkDir':
          cleanDir(dist, { nosort: true, dot: true });
          break;
        default:
          return;
      }
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.log(`[${format(end)}] ${event} '${dist}' after ${time} ms`);
    });
  }
}

function files (pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, function (err, files) {
      if (!err) {
        resolve(files)
      } else {
        reject(err)
      }
    })
  })
}

export default copy;
