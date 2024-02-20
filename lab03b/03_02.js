const { rejects } = require("assert");
const { resolve } = require("path");

const secondJob = new Promise((resolve, rejects) => {
	setTimeout(() => {
		rejects("Error!!!");
	}, 3000);
});

const doJob = async () => {
	var result = await secondJob;
	return result;
};

doJob()
	.then((result) => {
		console.log("SecondJob success: " + result);
	})
	.catch((err) => {
		console.log("failed! " + err);
	})
	.finally(() => {
		console.log("finally: Well done!");
	});

// const doJobs = async () => {
//   try {
//     var result = await secondJob;
//     console.log("firstJob success: " + result);
//   } catch (error) {
//     console.log("failed! " + error);
//   }
// };

// doJobs();
