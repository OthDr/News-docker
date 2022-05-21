const regValidation = (data) => {

	let errors={};

	if(!data.firstname){
		errors.firstname = "firstname is required";
	}
	if(!data.email ){
		errors.email = "email is required";
	}else if(!/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = "email is invalid";
	}
	if(!data.lastname){
		errors.lastname = "lastname is required";
	}
	if(!data.password ){
		errors.password = "password is required";
	}else if(data.password.length < 6){
		errors.password = "minimum number of caracters is 8";
	}

	return errors;

}

export default regValidation;