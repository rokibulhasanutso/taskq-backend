const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
	title: {type: String},
	description: {type: String},
	email: {type: String},
	status: {type: String},
	// createdDate: {type: Date, dafault: Date.now()},
	createdDate: {type: Date, default: Date.now()}
}, { versionKey:false });

const TasksModel = mongoose.model('tasks', TaskSchema);
module.exports = TasksModel;