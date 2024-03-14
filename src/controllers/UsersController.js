const JWT = require('jsonwebtoken');
const UsersModel = require("../models/UsersModel")

// user registration
exports.registration = async (req, res) => {
	try {
		const data = req.body
		const result = await UsersModel.create(data)

		if (!result) {
			return res.status(400).json({status: 'fail', message: 'Failed to create user'})
		}

		return res.status(201).json({status: 'success', message: "User created successfully"})
	}
	catch (error) {
		return res.status(500).json({status: 'server error', message: "Internal server error"})
	}
} 


// user login
exports.login = async (req, res) => {
	try {
		const userData = await UsersModel.findOne({email: req.body.email})

		// check user
		if (!userData) {
			res.status(400).json({status: 'fail', message: 'User Not Found'})
		}
		else if (userData.password !== req.body.password) {
			res.status(400).json({status: 'fail', message: 'Worng Password'})
		}
		else {
			const payload = {
				exp: Math.floor(Date.now()/1000) + (24*60*60), // expire after one day
				data: userData['email']
			}
			const token = JWT.sign(payload, 'secretkey_auth1234')

			res.status(200).json({status: 'success', data: userData, token: token})
		}
	}
	catch (error) {
		res.status(500).json({ status:'server error', message: error })
	}
}


// Profile update
exports.profileUpdate = async (req, res) => {
	try {
		const email = req.headers.email;
		const reqData = req.body;
		const updateData = await UsersModel.updateOne({email : email}, reqData);
	
		res.status(200).json({ status: 'success', data: updateData });
	}
	catch (error) {
		res.status(400).json({ status: 'fail', message: error })
	}
}