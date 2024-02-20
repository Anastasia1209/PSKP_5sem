function firstJob() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("Hello, World!");
		}, 2000);
	});
}

firstJob()
	.then((result) => {
		console.log("Promise result:", result);
	})
	.catch((error) => {
		console.error("Promise error:", error);
	});

async function executeAsync() {
	try {
		const result = await firstJob();
		console.log("Async result:", result);
	} catch (error) {
		console.error("Async error:", error);
	}
}

executeAsync();
