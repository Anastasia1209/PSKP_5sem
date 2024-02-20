const { rejects, CallTracker } = require("assert");
const { resolve } = require("path");

let num = 1234567891234567;
const createOrder = (card) =>
	new Promise((resolve, rejects) => {
		if (card.toString().length == 16 && validateCard()) {
			setTimeout(() => {
				resolve(generateUUID());
			}, 5000);
		} else {
			rejects("Card is not valid");
		}
	});

const makePromise = (card) =>
	createOrder(card)
		.then((result) => {
			console.log("Card number: " + card);
			console.log("Order ID: " + result);
			proceedToPayment()
				.then((result) => {
					console.log(result);
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log("failed! " + err);
		});

function validateCard() {
	return Math.floor(Math.random() * 2) == 1;
}

const proceedToPayment = () =>
	new Promise((resolve, rejects) => {
		if (validateCard()) {
			resolve("Payment successfull");
		} else {
			rejects("Payment failed");
		}
	});

function generateUUID() {
	let uuid = "";
	for (let i = 0; i < 32; i++) {
		const randomDigit = Math.floor(Math.random() * 16);
		if (i === 12) {
			uuid += "4";
		} else if (i === 16) {
			uuid += (randomDigit & 3) | 8;
		} else {
			uuid += randomDigit.toString(16);
		}
	}
	return uuid;
}
//makePromise(num);

const doJobs = async (card) => {
	try {
		var getOrder = await createOrder(card);
		console.log("Card number: " + card);
		console.log("Order ID: " + getOrder);
		var getPayment = await proceedToPayment();
		console.log(getPayment);
	} catch (error) {
		console.log(error);
	}
};

doJobs(num);
