const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_TOKEN_SECRET='2F0S2E2I2F0M1I8SI';
const REFRESH_TOKEN_SECRET='2L0S1I8M2I0S2I2';

const generateAccessToken = (author) => jwt.sign(author, ACCESS_TOKEN_SECRET ,{expiresIn: '1800s'});

const generateRefreshToken = (author) => jwt.sign(author, REFRESH_TOKEN_SECRET ,{expiresIn: '1800s'});


// middleware for Token validation
const authenticateToken = (req, res, next) => {
	const authorization = req.headers['authorization'];
	
	if (typeof authorization !== 'undefined') {
		const token =  authorization.split(' ')[1]; // get token after Bearer part (token);
		//const token ='testing token';
		req.token = token ;
		jwt.verify(token , ACCESS_TOKEN_SECRET , ( err, author ) => {
			if( err ) {
				res.status(403).json({
					'error':true,
			        'message':"you are not authorized"
				});
			} else {
				req.author = author ;
				next();
			}
		});
	} else {
		res.status(403).json({
			'error':true,
			'message':"forbidden"
		});
	}


}




module.exports = {
	authenticateToken,
	generateAccessToken,
	generateRefreshToken
}