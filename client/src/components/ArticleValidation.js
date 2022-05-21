const ArticleValidation = (data) => {

	let errors={};

	if(!data.title){
		errors.title = "title is required";
	}
	if(!data.country && data.country.length != 2  ){
		errors.country = "country code is required";
	}
	if(!data.category){
		errors.category = "category is required";
	}
	if(!data.description ){
		errors.description = "description is required";
	}
	if(!data.content ){
		errors.content = "content	 is required";
	}
	

	return errors;

}

export default ArticleValidation