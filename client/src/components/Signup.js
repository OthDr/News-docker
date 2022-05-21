import { useState , useEffect} from "react";
import loginValidation from "./loginValidation";
import { useNavigate } from 'react-router-dom';

const Signup = () => {




	let navigate = useNavigate(); 
	const [err, setErr] = useState(null);
	const [errors, setErrors] = useState({});
	const [isPending , setISPending] = useState(false);
	const [credentials , setCredentials] = useState({
		email:"",
		password:""
	});

	const handleClick = (e) => {
		e.preventDefault();
		setErrors(loginValidation(credentials));

		
		if(isPending == false){
			if(!errors.email && !errors.password){	
				setISPending(true);
					fetch('http://localhost:3000/v2/api/login', {
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
							navigate('/author');
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
					Reporter Account
				</h1>
					<table>

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
							 	<label htmlFor="pwd">password</label>
								<input 
								 className="pwd-input" 
								 type='password'  
								 name="password" 
								 onChange={handleChange}
								/> 
							</div> 
						</tr>	
						{errors.password &&
						<td>
							<p className="error-msg">{errors.password}</p> 
						</td>
						}


						 {isPending &&
						 	<tr className="or"> pending.. </tr>
						 
						 }
						 <tr>
						 	<button onClick={handleClick}>done</button>
						 </tr>

						 <tr className="or"> or </tr>
						 <tr className="or">
						 	<a href="/register"> create a new account </a>
						 </tr>

					</table>
			</form>

		</div>
	);
}

export default Signup;