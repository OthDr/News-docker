import { useState , useEffect} from "react";
import regValidation from "./regValidation";
import { useNavigate } from 'react-router-dom';



const Register = () => {


	const accessToken = window.localStorage.getItem("accessToken");

	let navigate = useNavigate();

	const [errors, setErrors] = useState({});
	const [err, setErr] = useState(null);
	const [isPending , setISPending] = useState(false);
	const [credentials , setCredentials] = useState({
		firstname:"",
		lastname:"",
		email:"",
		password:""
	});


	const handleClick = (e) => {
		e.preventDefault();
		setErrors(regValidation(credentials));
		// post request

		if(isPending == false){
			if(!errors.email && !errors.password){	
				setISPending(true);
					fetch('http://localhost:3000/v2/api/authors', {
						method: 'POST',
						headers: { "Content-Type":"application/json" },
						body: JSON.stringify(credentials)
					})
					.then(async (response)=>{
						const res = await response.json();
						
						const accessToken = res.accessToken;
						await window.localStorage.setItem("accessToken", accessToken);

						setISPending(false);
						if(res.error == false){
							navigate('/signup');
						}
					})
					.catch((e)=>{
						console.log(e.message);
						setErr(e.message);
						setISPending(false);
					});
			}
		}




		
	}


	const handleChange = (e) => {
		setCredentials({
			...credentials, [e.target.name]:e.target.value,
		});
	}
	return (
		<div className="container">
			<form className="registration-form">
				<h1 style={{align:"center"}}>
					Reporter Registration
				</h1>
					<table>
						<tr>
							<div className="fname"> 
								<label htmlFor="firstname">first name</label> 
								<input 
								 className="fname-input" 
								 type="text"  
								 name="firstname"
								 onChange={handleChange}
								/>
							</div> 
						</tr>
						{errors.firstname &&
						<tr>
							<p className="error-msg">{errors.firstname}</p> 
						</tr>
						}

						<tr>
							<div className="lname"> 
								<label htmlFor="lastname">last name</label>
								<input 
								 className="lname-input" 
								 type='text'  
								 name="lastname" 
								 onChange={handleChange}
								/>  
							</div> 
						</tr>
						{errors.lastname &&
						<tr>
							<p className="error-msg">{errors.lastname}</p> 
						</tr>
						}
						<tr>
							<div className="email">
								<label htmlFor="email">email</label>
								<input 
								 className="email-input" 
								 type="text"  
								 name="email"
								 onChange={handleChange}
								/> 
							</div> 
						</tr>
						{errors.email &&
						<td>
							<p className="error-msg">{errors.email}</p> 
						</td>
						}
						<tr>
							<div className="password"> 
								<label htmlFor="password">password</label>
								<input 
								 className="pwd-input" 
								 type='password'  
								 name="password"
								 onChange={handleChange} 
								/> 
							</div> 
						</tr>	
						{errors.password &&
						<tr>
							<p className="error-msg">{errors.password}</p> 
						</tr>
						}

						{isPending &&
						 	<tr className="or"> pending.. </tr>
						 
						 }
						 <tr>
						 	<button onClick={handleClick}>Done</button>
						 </tr>
						 <tr className="or"> or </tr>
						 <tr className="or">
						 	<a href="/signup"> Already have an account? </a>
						 </tr>
					</table>

			</form>
		</div>
	);
}

export default Register;