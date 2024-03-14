const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers['token'];
		const decode = JWT.verify(token, 'secretkey_auth1234');
		const email = decode['data'];

		req.headers.email = email;
		next();
	} 
	catch (error) {
		res.status(401).json({status: "fail", message: "Unauthorized"})
	}
}