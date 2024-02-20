const rpcws = require("rpc-websockets").Server;

let server = new rpcws({ port: 4000, host: "localhost" });

server.setAuth((l) => {
	return l.login == "1111" && l.password == "1111";
});

server
	.register("sum", (params) => {
		let sum = 0;
		params.forEach((elem) => {
			if (Number.isInteger(elem)) sum += elem;
		});
		return sum;
	})
	.public();

server
	.register("mul", (params) => {
		let mul = 1;
		params.forEach((elem) => {
			if (Number.isInteger(elem)) mul *= elem;
		});
		return mul;
	})
	.public();

server
	.register("square", (params) => {
		return params.length === 2
			? params[0] * params[1]
			: Math.PI * params[0] ** 2;
	})
	.public();

server
	.register("fact", (params) => {
		if (params.length !== 1) return [1];
		return factorial(params);
	})
	.protected();

server
	.register("fib", (params) => {
		if (params.length !== 1) return [1];
		return fibonacci(params - 1);
	})
	.protected();

server
	.register("fibs", (params) => {
		if (params.length !== 1) return [1];
		return fibonacciSingleNumber(params - 1);
	})
	.protected();

function factorial(n) {
	return n == 1 || n == 0 ? 1 : n * factorial(n - 1);
}

function fibonacci(n) {
	n += 1;
	let result = [];
	if (n <= 0) {
		return result;
	} else if (n === 1) {
		result.push(0);
		return result;
	} else if (n === 2) {
		result.push(0, 1);
		return result;
	} else {
		result = [0, 1];
		for (let i = 2; i < n; i++) {
			result.push(result[i - 1] + result[i - 2]);
		}
		return result;
	}
}

function fibonacciSingleNumber(n) {
	let a = 0,
		b = 1,
		temp;
	if (n === 0) return a;
	for (let i = 2; i <= n; i++) {
		temp = a + b;
		a = b;
		b = temp;
	}
	return b;
}
