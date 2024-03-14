const TasksModel = require('../models/TasksModel')

// create task controller
exports.createTask = async (req, res) => {
	try {
		const reqData = req.body;
		reqData.email = req.headers['email']

		const createdTaskData = await TasksModel.create(reqData)
		res.status(200).json({ status: 'success', data: createdTaskData })
	} 
	catch (error) {
		res.status(400).json({ status: "fail", message: error })
	}
}

// delete task controller
exports.deleteTask = async (req, res) => {
	try {
		const id = req.params.id;
		const query = {_id: id};

		const removedTask = await TasksModel.deleteOne(query)
		res.status(200).json({ status: 'success', data: removedTask })
	} 
	catch (error) {
		res.status(400).json({ status: "fail", message: error })
	}
}

// update task controller
exports.updateTask = async (req, res) => {
	try {
		const id = req.params.id;
		const status = req.params.status;
		const query = {_id: id};
		const updateData = {status: status};

		const updatedTaskData = await TasksModel.updateOne(query, updateData)
		res.status(200).json({ status: 'success', data: updatedTaskData })
	} 
	catch (error) {
		res.status(400).json({ status: "fail", message: error })
	}
}

// list task by user email and status
exports.listUserTasksByStatus = async (req, res) => {
	try {
		const userEmail = req.headers['email'];
		const status = req.params.status;

		const filterTasksModelData = await TasksModel.aggregate([
			{$match: {status: status, email: userEmail}},
			{$project: {
				_id:1, title:1, description:1, status:1,
				createdDate: {
                    $dateToString: {
                        date: "$createdDate",
                        format: "%d-%m-%Y"
                    }
                }
			}}
		])

		res.status(200).json({ status: 'success', data: filterTasksModelData })
	}
	catch (error) {
		res.status(400).json({ status: "fail", message: error })
	}
}

// task status count by user email and status
exports.taskStatusCountByUser = async (req, res) => {
	try{
		const userEmail = req.headers["email"];
		const taskStatusCount = await TasksModel.aggregate([
            {$match : {"email":userEmail}},
            {$group : {_id: "$status", sum: {$count: {}}}}
		])

		res.status(200).json({ status: 'success', data: taskStatusCount })
	} 
	catch (error) {
		res.status(400).json({ status: 'fail', message: error })
	}
}