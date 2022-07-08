import { FC, useRef } from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import logo from '../assets/logo.png';

const Login = (props: any) => {
	// const emailValue: any = useRef('');
	// const passwordValue: any = useRef('');

	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});
	const [ logInResponse, setLogInResponse ] = useState({
		data: ''
	});

	// event handlers
	function handleChange (e: ChangeEvent<HTMLInputElement>) {
		setFormData((prevData) => {
			return {
				...prevData,
				[e.target.name]: e.target.value
			};
		});
	}

	function handleSubmit (e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('logging in...');
		async function logIn () {
			const apiSettings = {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password
				})
			};
			const response = await fetch('http://206.189.91.54//api/v1/auth/sign_in', apiSettings);
			const data = await response.json();
			setLogInResponse(data);
		}
		logIn();
	}

	return (
		<div>
			<div className="mt-40">
				<div className="flex justify-center w-96 m-auto">
					<img src={logo} className="object-cover" alt="Slack logo" />
				</div>

				<div className="mb-8">
					<h2 className="flex justify-center text-5xl font-extrabold pb-3">Login to Slack</h2>
					<p className="flex justify-center text-xl">Start collaborating with your team!</p>
				</div>

				<div className="w-maximum m-auto">
					<form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
						<div className="mb-4">
							{logInResponse.data && <h2 className="text-l bg-green-400 flex justify-center items-center">Success</h2>}
							<label className="block mt-3 text-gray-700 text-2xl font-bold mb-4" htmlFor="email">
								Email
							</label>
							<input
								className="shadow mb-5 appearance-none text-lg border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder="Enter your email"
								name="email"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-2">
							<label className="block text-gray-700 text-2xl font-bold mb-4" htmlFor="password">
								Password
							</label>
							<input
								className="shadow mb-5 appearance-none text-lg border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								type="password"
								placeholder="Enter your password"
								name="password"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-4 flex justify-center text-2xl">
							<button
								className="bg-violet-700 w-full mt-5 transition-all hover:bg-violet-900 text-white font-medium py-3 px-6 rounded focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Log In
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;