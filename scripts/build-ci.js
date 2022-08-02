const { exec } = require('child_process');

if (process.env.BUILD_TYPE === 'API') {
    console.log('Running npm run build:server');
    exec('npm run build:server');
} else {
    console.log('Running npm run build:front');
    exec('npm run build:front');
}

console.log('Build done');
