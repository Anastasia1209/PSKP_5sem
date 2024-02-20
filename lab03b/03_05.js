const sqr = (number) =>
	new Promise((resolve, rejects) => {
		if (isFinite(number)) {
			resolve(Math.pow(number, 2));
		} else {
			rejects("Not a number");
		}
	});

const thr = (number) =>
	new Promise((resolve, rejects) => {
		if (isFinite(number)) {
			resolve(Math.pow(number, 3));
		} else {
			rejects("Not a number");
		}
	});

const qdr = (number) =>
	new Promise((resolve, rejects) => {
		if (isFinite(number)) {
			resolve(Math.pow(number, 4));
		} else {
			rejects("Not a number");
		}
	});

Promise.all([sqr(1), thr(2), qdr("m")])
	.then((data) => {
		console.log("result: " + data);
	})
	.catch((err) => {
		console.log("failed: " + err);
	});
