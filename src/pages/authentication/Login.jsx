import React from 'react'
import ModalMUICustom from '../../components/common/Mui-Components/ModalMUICustom'

const Login = () => {
    return (
        <>
            <ModalMUICustom nameButton={"Login"} variant={"outlined"}>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" src="Images/Main-Logo/logo-pizza-4-anh-tai.png" alt="Your Company" />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-green-600 hover:text-primary">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-greetext-green-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 
                        px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greetext-green-600">Sign in</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            Not a member?
                            <a href="#" className="font-semibold text-green-600 hover:text-primary">Start a 14 day free trial</a>
                        </p>
                    </div>
                </div>
            </ModalMUICustom>
        </>
    )
}

export default Login

