import React, {ChangeEvent, useState} from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'


function App() {
    const [nameValue, setNameValue] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [surnameValue, setSurnameValue] = useState('');
    const [isSurnameValid, setIsSurnameValid] = useState(true);
    const [emailValue, setEmailValue] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value= e.target.value;
        setNameValue(value);
        const hasDigits = /\d/.test(value);
        const isValid = !hasDigits;
        setIsNameValid(isValid);
    };
    const handleSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value= e.target.value;
        setSurnameValue(value);
        const hasDigits = /\d/.test(value);
        const isValid = !hasDigits;
        setIsSurnameValid(isValid);
    };
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value= e.target.value;
        setEmailValue(value);
        const isValid = value.includes('@');
        setIsEmailValid(isValid);
    };

  return (
      <div className="bg-purple-50 min-h-screen flex flex-col justify-center items-center">
          <div className="max-w-md w-full px-4">
              <h1 className="font-sans text-3xl text-indigo-950 mb-8 font-bold">Personal info</h1>
              <div className="mb-5">
                  <p className="font-sans text-xl text-indigo-950">First Name</p>
                  <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-md border ${isNameValid ? 'bg-purple-50 focus:outline-purple-600 focus:border-purple-600' : 'bg-red-100 focus:outline-red-600 focus:border-red-600'} text-indigo-950 font-sans  font-bold border-purple-300`}
                      value={nameValue}
                      onChange={handleNameChange}
                  />
                  {!isNameValid && (
                      <div className="flex items-center mt-2">
                          <ExclamationCircleIcon className="text-red-600 mr-2 h-5 w-5"></ExclamationCircleIcon>
                          <p className="text-sm mt-2 font-sans text-indigo-950">Name should not contain any digits :).</p>
                      </div>
                  )}
              </div>
              <div className="mb-5">
                  <p className="font-sans text-xl text-indigo-950">Last Name</p>
                  <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-md border ${isSurnameValid ? 'bg-purple-50 focus:outline-purple-600 focus:border-purple-600' : 'bg-red-100 focus:outline-red-600 focus:border-red-600'} text-indigo-950 font-sans font-bold border-purple-300`}
                      value={surnameValue}
                      onChange={handleSurnameChange}
                  />
                  {!isSurnameValid && (
                      <div className="flex items-center mt-2">
                          <ExclamationCircleIcon className="text-red-600 mr-2 h-5 w-5"></ExclamationCircleIcon>
                          <p className="text-sm mt-2 font-sans text-indigo-950">Surname should not contain any digits :).</p>
                      </div>
                  )}
              </div>
              <div className="mb-5">
                  <p className="font-sans text-xl text-indigo-950">Email Address</p>
                  <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-md border ${isEmailValid ? 'bg-purple-50 focus:outline-purple-600 focus:border-purple-600' : 'bg-red-100 focus:outline-red-600 focus:border-red-600'} text-indigo-950 font-sans font-bold border-purple-300`}
                      value={emailValue}
                      onChange={handleEmailChange}
                  />
                  {!isEmailValid && (
                      <div className="flex items-center mt-2">
                          <ExclamationCircleIcon className="text-red-600 mr-2 h-5 w-5"></ExclamationCircleIcon>
                          <p className="text-sm mt-2 font-sans text-indigo-950">
                              Please use correct formatting.<br />
                              Example: address@email.com
                          </p>

                      </div>
                  )}
              </div>
          </div>
      </div>

  );
}

export default App;
