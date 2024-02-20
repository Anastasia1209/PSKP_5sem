var util = require("util");
var ee = require("events");
const { consumers } = require("stream");

util.inherits(DB, ee.EventEmitter);

var db_data = [
	{ id: 1, name: "Nastya", bday: "2003-09-12" },
	{ id: 2, name: "Irina", bday: "2003-09-12" },
	{ id: 3, name: "Artsiom", bday: "2003-09-12" },
];

function DB() {
	this.select = () => {
		return Promise.resolve(db_data);
	};
	this.insert = (user) => {
		if (!validateDate(user.bday)) return Promise.reject("incorrect data");
		if (db_data.find((userDB) => userDB.id == user.id)) {
			return Promise.reject("user already exists");
		} else {
			db_data.push(user);
			return Promise.resolve(user);
		}
	};
	this.update = (user) => {
		let index = db_data.findIndex((userDB) => userDB.id == +user.id);

		if (!validateDate(user.bday)) return Promise.reject("incorrect data");

		if (index !== -1) {
			db_data[index] = user;
			return Promise.resolve(user);
		} else return Promise.reject("user not found");
	};
	this.delete = (id) => {
		const index = db_data.findIndex((u) => u.id == id);
		if (index !== -1) {
			const deletedUser = db_data.splice(index, 1);
			return Promise.resolve(deletedUser);
		}
		return Promise.reject("user not found");
	};
}

function validateDate(dateString) {
	var dateRegex = /^(\d{4})\-(\d{2})\-(\d{2})$/;
	var match = dateRegex.exec(dateString);
	var today = new Date();
	if (match === null) {
		return false;
	}

	var day = parseInt(match[3]);
	var month = parseInt(match[2]);
	var year = parseInt(match[1]);

	if (
		day < 1 ||
		day > 31 ||
		month < 1 ||
		month > 12 ||
		year < 1800 ||
		year > 2023 ||
		new Date(dateString) > today
	) {
		return false;
	}

	return true;
}

exports.DB = DB;
