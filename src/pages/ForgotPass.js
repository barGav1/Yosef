import React from 'react';
import '../styles/Home.css';
import resumeIcon from '../Files/Resume_icon.png';


const ForgotPass = () => {
  return (

<div>
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img className="h-16 w-auto" src={resumeIcon} alt=""/> 
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div class = "flex justify-center text-center"> 
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forgot your password?
              </h1>              </div>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                      </div>
                  </div>
                  <button type="submit" class="w-full px-4 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700">Reset my password</button>
              </form>
          </div>
      </div>
  </div>
</section>
</div>
  );
};

export default ForgotPass;
