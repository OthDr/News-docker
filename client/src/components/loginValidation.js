const loginValidation = (data) => {

	let errors={};

	if(!data.email ){
		errors.email = "email is required";
	}else if(!/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = "email is invalid";
	}
	if(!data.password ){
		errors.password = "password is required";
	}else if(data.password.length < 6){
		errors.password = "minimum number of caracters is 8";
	}else if(data.password.length < 6){
		errors.password = "minimum number of caracters is 8";
	}

	return errors;

}

export default loginValidation;