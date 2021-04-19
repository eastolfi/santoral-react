const { exec } = require('child_process');

if (process.env.BUILD_TYPE === 'API') {
    exec('npm run build:server');
} else {
    exec('npm run build:front');
}
