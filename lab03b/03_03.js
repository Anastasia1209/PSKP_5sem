const { rejects } = require("assert");
const { resolve } = require("path");
const { isNumber } = require("util");

const thirdJob = (data) =>
	new Promise((resolve, rejects) => {
		if (isFinite(data)) {
			if (data % 2 === 0) {
				setTimeout(() => {
					rejects("Even");
				}, 2000);
			} else {
				setTimeout(() => {
					resolve("Odd");
				}, 1000);
			}
		} else {
			rejects("Error");
		}
	});

const doJob = async function () {
	var resultJob = await thirdJob(5);
	return resultJob;
};

doJob()
	.then((result) => {
		console.log("thirdJob success: " + result);
	})
	.catch((err) => {
		console.log("failed! " + err);
	})
	.finally(() => {
		console.log("finally: Well done!");
	});

// const doJobs = async () => {
//   try {
//     var result = await thirdJob(5);
//     console.log("thirdJob success: " + result);
//   } catch (error) {
//     console.log("failed! " + error);
//   }
// };

// doJobs();
