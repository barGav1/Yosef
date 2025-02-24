import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Default() {
  const [activeClassDropdown, setActiveClassDropdown] = useState(null);
  const [activeSubjectDropdown, setActiveSubjectDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleClassDropdown = (index) => {
    if (activeClassDropdown === index) {
      setActiveClassDropdown(null);
    } else {
      setActiveClassDropdown(index);
    }
    // Close subject dropdown when switching classes
    setActiveSubjectDropdown(null);
  };
  
  const toggleSubjectDropdown = (e, classIndex, subjectIndex) => {
    e.stopPropagation(); // Prevent triggering the class dropdown toggle
    
    if (activeSubjectDropdown === `${classIndex}-${subjectIndex}`) {
      setActiveSubjectDropdown(null);
    } else {
      setActiveSubjectDropdown(`${classIndex}-${subjectIndex}`);
    }
  };
  
  // Hebrew class names from א to ח
  const hebrewClasses = ["כיתה א", "כיתה ב", "כיתה ג", "כיתה ד", "כיתה ה", "כיתה ו", "כיתה ז", "כיתה ח"];
  
  // Subjects
  const Subjects = ["חומש", "גמרא", "משנה", 'תכ"ל', "טעמי המקרא", "נביא", "הלכה", "מעגל השנה", "פעילויות יצירות ואחר"];

  // Information categories
  const Information = ["דפי סיכום", "עבודות", "מבחנים", "אחר"];
  
  return (
    <div className="bg-white min-h-screen">
      <header className="fixed w-full bg-white shadow-sm z-50" dir="rtl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
              רשת בני יוסף
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">פתח תפריט</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          
          {/* Desktop and mobile menu */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:space-x-reverse md:mt-0 md:border-0">
              {hebrewClasses.map((className, classIndex) => (
                <li key={classIndex} className="relative">
                  <button
                    onClick={() => toggleClassDropdown(classIndex)}
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                  >
                    {className}
                    <svg className="w-2.5 h-2.5 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  
                  {/* Class dropdown */}
                  {activeClassDropdown === classIndex && (
                    <div className="absolute z-10 font-normal bg-teal-50 divide-y divide-teal-100 rounded-lg shadow w-44 mt-2 right-0">
                      <ul className="py-2 text-sm text-teal-800">
                        {Subjects.map((subject, subjectIndex) => (
                          <li key={subjectIndex} className="relative">
                            <button
                              onClick={(e) => toggleSubjectDropdown(e, classIndex, subjectIndex)}
                              className="flex items-center justify-between w-full px-4 py-2 hover:bg-teal-100 text-right"
                            >
                              {subject}
                              <svg className="w-2.5 h-2.5 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                              </svg>
                            </button>
                            
                            {/* Information dropdown (nested within subject) */}
                            {activeSubjectDropdown === `${classIndex}-${subjectIndex}` && (
                              <div className="absolute z-20 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-40 right-full top-0 mr-1">
                                <ul className="py-2 text-sm text-gray-700">
                                  {Information.map((info, infoIndex) => (
                                    <li key={infoIndex}>
                                      <Link 
                                        to={`/class/${classIndex+1}/subject/${subjectIndex+1}/info/${infoIndex+1}`} 
                                        className="block px-4 py-2 hover:bg-gray-100 text-right"
                                      >
                                        {info}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Hero section with proper spacing */}
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-300 to-blue-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center" dir="rtl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
            ברוך הבא לאתר של רשת בני יוסף 
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              פה תוכלו למצוא מידע מקצועי הנלמד במוסדות בני יוסף
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">

            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-300 to-blue-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Default;