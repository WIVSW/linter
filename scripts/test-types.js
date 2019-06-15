const {promisify} = require('util');
const exec = promisify(require('child_process').exec);

exec('./scripts/build.sh')
	.then(() => console.log('All types are correct!'));