import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {loginUser} from "../redux/slices/users/asyncActions";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()

    const loginFunc = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        dispatch(loginUser({
            email,
            password
        }))
    }

    return (
        <div className="h-[650px] w-[400px]">
            <form className="flex flex-col justify-center gap-5 border-2 rounded-md" onSubmit={loginFunc}>
                <input className="m-2 pl-2 text-black border rounded-md" type="email" id="email" name="email"
                       placeholder="Enter your email"/>
                <input className="m-2 pl-2 text-black border rounded-md" type="password" id="password"
                       name="password" placeholder="Enter your password"/>
                <button
                    className="mx-40 w-20 border-4 border-green-800 rounded-full hover:bg-green-600 transition ease-in-out"
                    name="log">Sign In
                </button>
                <Link className="mx-20 mb-1" to={'/registration'}>
                    Don't have account, Sign Up!
                </Link>
            </form>
        </div>
    );
};

export default Login;