    import React, {ChangeEvent, useEffect, useState} from 'react';
    import { ExclamationCircleIcon } from '@heroicons/react/16/solid'


    function App() {
        const [nameValue, setNameValue] = useState('');
        const [isNameValid, setIsNameValid] = useState(true);
        const [surnameValue, setSurnameValue] = useState('');
        const [isSurnameValid, setIsSurnameValid] = useState(true);
        const [emailValue, setEmailValue] = useState('');
        const [isEmailValid, setIsEmailValid] = useState(true);
        const [ageValue, setAgeValue] = useState(8);
        const [uploadedFile, setUploadedFile] = useState<File | null>(null);


        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                setUploadedFile(file);
            }
        };


        const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value);
            setAgeValue(value);
        };
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
                      <label htmlFor="First_name" className="block mb-2 font-medium text-indigo-950 text-xl dark:text-white">First Name</label>
                      <input
                          id = "First_name"
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
                      <label htmlFor="Last_name" className="block mb-2 font-medium text-indigo-950 text-xl dark:text-white">Last Name</label>
                      <input
                          id="Last_name"
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
                      <label htmlFor="Email" className="block mb-2 font-medium text-indigo-950 text-xl dark:text-white">Email Address</label>
                      <input
                          id="Email"
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
                  <div className="relative mb-8">
                      <label htmlFor="steps-range" className="block mb-6 font-medium text-indigo-950 text-xl dark:text-white">Age</label>
                      <input  id="steps-range" type="range" min="8" max="100" step="1" value={ageValue} onChange={handleAgeChange}
                             className="w-full h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-700"/>
                      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 top-1/2">8</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 absolute right-0 top-1/2">100</span>
                      <div className="relative border-purple-300">
                        <span className="text-sm text-gray-500 dark:text-gray-400  absolute -bottom-7 -left-1/2 transform -translate-x-1/2 bg-white px-2 rounded-md shadow-md" style={{ left: `calc(${(ageValue - 8) / (100 - 8) * 100}% - 0.5rem)` }}>
                            {ageValue}
                        </span>
                      </div>
                  </div>
                  <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file"
                             className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                  className="font-semibold">Upload a file</span> or drag and drop here</p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange}/>
                      </label>
                  </div>
                  {uploadedFile && (
                      <div className="flex items-center mt-2">
                          <p className="text-sm mt-2 font-sans text-indigo-950">{uploadedFile.name} uploaded successfully!</p>
                      </div>
                  )}
              </div>
          </div>

      );
    }

    export default App;
