const sqr = (number) =>
	new Promise((resolve, rejects) => {
		if (isFinite(number)) {
			setTimeout(() => {
				resolve(Math.pow(number, 2));
			}, 3000);
		} else {
			rejects("Not a number");
		}
	});

const thr = (number) =>
	new Promise((resolve, rejects) => {
		if (isFinite(number)) {
			setTimeout(() => {
				resolve(Math.pow(number, 3));
			}, 1000);
		} else {
			rejects("Not a number");
		}
	});

const qdr = (number) =>
	new Promise((resolve, rejects) => {
		if (isFinite(number)) {
			setTimeout(() => {
				resolve(Math.pow(number, 4));
			}, 2000);
		} else {
			rejects("Not a number");
		}
	});

Promise.race([sqr("m"), thr("n"), qdr(3)])
	.then((data) => {
		console.log("result: " + data);
	})
	.catch((err) => {
		console.log("failed: " + err);
	});

Promise.any([sqr(1), thr("h"), qdr(3)])
	.then((data) => {
		console.log("result: " + data);
	})
	.catch((err) => {
		console.log("failed: " + err);
	});
