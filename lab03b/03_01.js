const { rejects } = require("assert");
const { resolve } = require("path");

const firstJob = new Promise((resolve, rejects) => {
	setTimeout(() => {
		resolve("Hello world!");
	}, 2000);
});

const doJob = async () => {
	var result = await firstJob;
	return result;
};

doJob()
	.then((result) => {
		console.log("firstJob success: " + result);
	})
	.catch((err) => {
		console.log("failed! " + err);
	})
	.finally(() => {
		console.log("finally: Well done!");
	});

// const doJobs = async () => {
//   try {
//     var result = await firstJob;
//     console.log("firstJob success: " + result);
//   } catch (error) {
//     console.log("failed!");
//   }
// };

// doJobs();
