const {promisify} = require('util');
const exec = promisify(require('child_process').exec);

exec('./scripts/build.sh')
	.then((data) => {
		if (data.stderr) {
			console.warn(data.stderr);
		} else {
			console.log('All types are correct!');
		}
	});
