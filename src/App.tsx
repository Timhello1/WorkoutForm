    import React, {ChangeEvent, useEffect, useState} from 'react';
    import { ExclamationCircleIcon,XCircleIcon,ChevronLeftIcon,ChevronRightIcon } from '@heroicons/react/16/solid'
    import {Button} from "flowbite-react";



    function App() {
        const [nameValue, setNameValue] = useState('');
        const [isNameValid, setIsNameValid] = useState(true);
        const [surnameValue, setSurnameValue] = useState('');
        const [isSurnameValid, setIsSurnameValid] = useState(true);
        const [emailValue, setEmailValue] = useState('');
        const [isEmailValid, setIsEmailValid] = useState(true);
        const [ageValue, setAgeValue] = useState(8);
        const [uploadedFile, setUploadedFile] = useState<File | null>(null);
        const [timeSlots, setTimeSlots] = useState<string[]>([]);
        const [selectedTime, setSelectedTime] = useState<string>('');
        const [holidays, setHolidays] = useState<any[]>([]);
        const [isObservanceSelected, setIsObservanceSelected] = useState(false);
        const [NameObservanceSelected, setNameObservanceSelected] = useState("");


        const [selectedDate, setSelectedDate] = useState<Date | null>(null);
        const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
        const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

        const handleTimeSlotClick = (time: string) => {
            setSelectedTime((prevTime) => (prevTime === time ? '' : time));
        };

        const handlePrevMonth = () => {
            setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
            setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
            setSelectedDate(null);
            setSelectedTime('')
            setTimeSlots([])
            setIsObservanceSelected(false)
        };

        const handleNextMonth = () => {
            setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
            setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
            setSelectedDate(null);
            setSelectedTime('')
            setTimeSlots([])
            setIsObservanceSelected(false)
        };

        const handleDateClick = (day: number) => {
            const clickedDate = new Date(currentYear, currentMonth, day);
            const isSunday = clickedDate.getDay() === 0;

            const holidaysForCurrentMonth = holidays.filter(holiday => {
                const holidayDate = new Date(holiday.date);
                return holidayDate.getMonth() === currentMonth && holidayDate.getDate() === day;
            });

            const isHoliday = isSunday || holidaysForCurrentMonth.some(holiday => holiday.type === "NATIONAL_HOLIDAY");
            const observanceHoliday = holidaysForCurrentMonth.find(holiday => holiday.type === "OBSERVANCE");

            if (observanceHoliday) {
                if(!isHoliday){
                    setIsObservanceSelected(true);
                    setSelectedDate(clickedDate);
                    setTimeSlots(["11:00", "13:30", "17:30", "19:00"]);
                    setNameObservanceSelected(observanceHoliday.name)
                }
            } else {
                setIsObservanceSelected(false);
                if (!isHoliday) {
                    setSelectedDate(clickedDate);
                    setTimeSlots(["12:00", "14:00", "16:30", "18:30", "20:00"]);
                }
            }
        };



        useEffect(() => {
            const fetchHolidays = async () => {
                try {
                    const response = await fetch('https://api.api-ninjas.com/v1/holidays?country=PL&year=2023', {
                        headers: {
                            'X-API-KEY': '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch holidays');
                    }

                    const data = await response.json();
                    setHolidays(data);
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching holidays:', error);
                }
            };

            fetchHolidays();
        }, []);

        const renderTimeSlots = () => {
            return timeSlots.map(slot => (
                <div key={slot} className={`border border-purple-300 p-2 mb-2.5 w-20 rounded-lg justify-center items-center flex cursor-pointer ${selectedTime === slot ? 'border-purple-600 border-4' : 'bg-white '}`} onClick={() => handleTimeSlotClick(slot)}>
                    {slot}
                </div>
            ));
        };

        const renderCalendar = () => {
            const firstDayOfMonthDate = new Date(currentYear, currentMonth, 1);
            const firstDayOfMonth = firstDayOfMonthDate.getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

            const abbreviatedDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

            const calendarDays: JSX.Element[] = [];


            for (let i = 0; i < 7; i++) {
                calendarDays.push(
                    <div key={`day-${i}`} className="flex justify-center items-center h-8 w-8 text-indigo-950 font-semibold">
                        {abbreviatedDays[i]}
                    </div>
                );
            }


            const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
            for (let i = 0; i < daysFromPrevMonth; i++) {
                calendarDays.push(
                    <div key={`empty-${i}`} className="flex justify-center items-center cursor-pointer h-8 w-8 rounded-full text-indigo-950 font-semibold"></div>
                );
            }


            const holidaysForCurrentMonth = holidays.filter(holiday => new Date(holiday.date).getMonth() === currentMonth);


            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = new Date(currentYear, currentMonth, day);
                const isSunday = currentDate.getDay() === 0;
                const holiday = holidaysForCurrentMonth.find(holiday => new Date(holiday.date).getDate() === day && holiday.type === "NATIONAL_HOLIDAY");

                calendarDays.push(
                    <div
                        key={day}
                        className={`flex justify-center items-center cursor-pointer h-8 w-8 rounded-full hover:bg-gray-200 ${isSunday ? 'text-gray-400' : ''} ${holiday ? 'text-gray-400' : ''} ${selectedDate && selectedDate.getDate() === day ? 'bg-purple-600 text-white' : ''}`}
                        onClick={() => handleDateClick(day)}
                    >
                        {day}
                    </div>
                );
            }

            return (
                <div className="grid grid-cols-7 gap-1 w-3/ justify-center ">
                    {calendarDays}
                </div>
            );
        };

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

        const handleSend = async () => {
            if (
                nameValue !== '' &&
                isNameValid &&
                surnameValue !== '' &&
                isSurnameValid &&
                emailValue !== '' &&
                isEmailValid &&
                uploadedFile &&
                selectedTime !== '' &&
                selectedDate
            ) {
                const formData = new FormData();
                formData.append('name', nameValue);
                formData.append('surname', surnameValue);
                formData.append('email', emailValue);
                formData.append('photo', uploadedFile);
                formData.append('time', selectedTime);
                formData.append('date', selectedDate.toISOString()); // Convert date to ISO string format

                try {
                    const response = await fetch('http://letsworkout.pl/submit', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('Failed to submit application');
                    }

                    // Handle success
                    console.log('Application submitted successfully!');
                } catch (error) {
                    console.error('Error submitting application:', error);
                }
            } else {
                console.log('Please fill in all required fields.');
            }
        };

        const handleDragOver = (e: any) => {
            e.preventDefault();
        };

        const handleDrop = (e: any) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
                setUploadedFile(file);
            }
        };

        const handleRemoveFile = (e: React.MouseEvent<SVGSVGElement>) => {
            e.preventDefault();
            setUploadedFile(null);
            const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
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
                  <label className="block  font-medium text-indigo-950 text-xl dark:text-white" htmlFor="dropzone-file">Photo</label>
                  <div className="flex items-center justify-center w-full mb-7" onDragOver={handleDragOver}
                       onDrop={handleDrop}>
                      <label htmlFor="dropzone-file"
                             className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {uploadedFile ? (
                                  <div className="flex">
                                      <p className="font-semibold mt-2 mr-2 font-sans text-indigo-950">{uploadedFile.name}</p>
                                      <XCircleIcon className="mt-3 h-5 w-5 hover:text-red-500" onClick={handleRemoveFile}></XCircleIcon>
                                  </div>
                              ) : (
                                  <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold text-purple-600 underline">Upload a file</span> or drag and drop here</p>
                              )}
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange}/>
                      </label>
                  </div>
                  <h1 className="font-sans text-3xl text-indigo-950 mb-8 font-semibold">Personal info</h1>
                  <div>
                      <label htmlFor="calendar" className="text-indigo-950 text-xl font-semibold">Date</label>
                      {selectedDate && (
                          <label htmlFor="time" className="text-indigo-950 text-xl font-semibold ml-72">Time</label>
                      )}

                  </div>
                  <div className="flex ">
                      <div id="calendar" className="border-2 border-purple-300 rounded-lg justify-center w-3/4 p-4">
                          <div className="flex justify-between mb-4 ">
                              <ChevronLeftIcon className="h-6 w-6 text-purple-400 hover:text-gray-950" onClick={handlePrevMonth}></ChevronLeftIcon>
                              <h2 className="text-xl font-semibold ">
                                  {new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                              </h2>
                              <ChevronRightIcon className="h-6 w-6 text-purple-400 hover:text-gray-950" onClick={handleNextMonth}></ChevronRightIcon>
                          </div>
                          <div className="mt-4">{renderCalendar()}</div>
                      </div>
                      <div id="time" className="ml-5">
                          {renderTimeSlots()}
                      </div>
                  </div>
                  <div>
                      {isObservanceSelected && (
                          <div className="flex">
                              <ExclamationCircleIcon className="text-gray-400 mt-1 h-5 w-5"></ExclamationCircleIcon>
                              <p className="text-indigo-950 ml-2">It is {NameObservanceSelected}.</p>
                          </div>

                      )}
                  </div>
              </div>

              <div className="mt-10">
                  <button
                      className={`w-full px-36 py-3 mt-6 rounded-md bg-purple-700 text-white mb-5 cursor-pointer hover:bg-purple-900 ${!(
                          nameValue !== '' &&
                          isNameValid &&
                          surnameValue !== '' &&
                          isSurnameValid &&
                          emailValue !== '' &&
                          isEmailValid &&
                          uploadedFile &&
                          selectedTime !== '' &&
                          selectedDate
                      ) && 'opacity-50 cursor-not-allowed'}`}
                      disabled={!(
                          nameValue !== '' &&
                          isNameValid &&
                          surnameValue !== '' &&
                          isSurnameValid &&
                          emailValue !== '' &&
                          isEmailValid &&
                          uploadedFile &&
                          selectedTime !== '' &&
                          selectedDate
                      )}
                      onClick={handleSend}
                  >
                      Send Application
                  </button>
              </div>
          </div>


      );
    }

    export default App;
