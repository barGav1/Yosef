// src/components/Menu.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const hebrewClasses = ["כיתה א", "כיתה ב", "כיתה ג", "כיתה ד", "כיתה ה", "כיתה ו", "כיתה ז", "כיתה ח"];
const Subjects = ["חומש", "גמרא", "משנה", 'תכ"ל', "טעמי המקרא", "נביא", "הלכה", "מעגל השנה", "פעילויות יצירות ואחר"];
const Information = ["דפי סיכום", "עבודות", "מבחנים", "אחר"];

export default function Menu() {
  const [activeClassDropdown, setActiveClassDropdown] = useState(null);
  const [activeSubjectDropdown, setActiveSubjectDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleClassDropdown = (index) => {
    setActiveClassDropdown(activeClassDropdown === index ? null : index);
    setActiveSubjectDropdown(null);
  };

  const toggleSubjectDropdown = (e, classIndex, subjectIndex) => {
    e.stopPropagation();
    const key = `${classIndex}-${subjectIndex}`;
    setActiveSubjectDropdown(activeSubjectDropdown === key ? null : key);
  };

  return (
    <header className="fixed w-full bg-white shadow-sm z-50" dir="rtl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
            רשת בני יוסף
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:space-x-reverse md:mt-0 md:border-0">
            {hebrewClasses.map((className, classIndex) => (
              <li key={classIndex} className="relative">
                <button
                  onClick={() => toggleClassDropdown(classIndex)}
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
                >
                  {className}
                  <svg className="w-2.5 h-2.5 mr-2.5" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

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
                            <svg className="w-2.5 h-2.5 mr-2.5" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                          </button>

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
  );
}
