import {registerUser} from "../redux/slices/users/asyncActions";
import React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";

const Registration: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const registrationFunc = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        dispatch(registerUser({
            email,
            username,
            password
        }));
    };

    return (
        <div className="h-[650px] w-[400px]">
            <form className="flex flex-col justify-center gap-5 border-2 rounded-md" onSubmit={registrationFunc}>
                <input className="m-2 pl-2 text-black border rounded-md" type='email' id='email' name='email' placeholder='Enter your email'/>
                <input className="m-2 pl-2 text-black border rounded-md" id='username' name='username' placeholder="username" type="text"/>
                <input className="m-2 pl-2 text-black border rounded-md" type='password' id='password' name='password' placeholder='Enter your password'/>
                <button
                    className="mx-40 mb-2 w-20 border-4 border-green-800 rounded-full hover:bg-green-600 transition ease-in-out"
                    name='log'
                    type='submit'
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Registration;