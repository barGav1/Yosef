import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../Files/Home.png";
import ResumeViewer from "../Files/ResumeViewer.png";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Cookies from "js-cookie";
import axios from "axios";

const userId = Cookies.get("userId");
const InputField = ({ label, name, value, placeholder, onChange }) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 text-gray-700"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const TextAreaField = ({ label, name, value, placeholder, onChange }) => (
  <div className="form-group mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 text-gray-700"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const MonthDropdown = ({ label, name, value, onChange }) => (
  <div className="form-group mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 bg-white text-black"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Month</option>
      {months.map((month, index) => (
        <option key={index} value={month.value}>
          {month.label}
        </option>
      ))}
    </select>
  </div>
);

const YearDropdown = ({ label, name, value, onChange }) => (
  <div className="form-group mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 bg-white text-black"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Year</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
);

const LevelsDropdown = ({ label, name, value, onChange }) => (
  <div className="form-group mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 bg-white text-black"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Level</option>
      {levels.map((level, index) => (
        <option key={index} value={level.value}>
          {level.label}
        </option>
      ))}
    </select>
  </div>
);

const months = [...Array(12).keys()].map((i) => ({
  value: i + 1,
  label: new Date(0, i).toLocaleString("en", { month: "long" }),
}));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1987 }, (_, i) => 1988 + i);
const levels = [
  { value: 1, label: "Novice" },
  { value: 2, label: "Competent" },
  { value: 3, label: "Proficient" },
  { value: 4, label: "Expert" },
];

const ResumeMaker = () => {
  const { resumeNumber } = useParams();
  const navigate = useNavigate();

  const initialUserData = {
    name: "",
    email: "",
    linkedin: "",
    github: "",
    summary: "",
    education: [{ degree: "", institution: "", startYear: "", endYear: "" }],
    militaryService: { role: "", unit: "", startYear: "", endYear: "" },
    skills: ["", "", "", ""],
    experiences: [
      {
        title: "",
        workplace: "",
        startYear: "",
        startMonth: "",
        endYear: "",
        endMonth: "",
        description: "",
      },
    ],
    languages: [{ lang: "", level: "" }],
  };

  const [userData, setUserData] = useState(initialUserData);
  const [skillCounter, setSkillCount] = useState(4);
  const [expCounter, setExpCounter] = useState(1);
  const [eduCounter, setEduCounter] = useState(1);
  const [langCounter, setLangCounter] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId && resumeNumber) {
        try {
          const response = await axios.get(
            `https://resumebackend-production.up.railway.app/users/${userId}/resumes/${resumeNumber}`
          );
          if (response.status === 200) {
            setUserData(response.data);
          }
        } catch (error) {
          console.error("Error fetching resume data:", error);
          navigate("/"); // Redirect if there is an error
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [resumeNumber, navigate]);

  const handleChange = (event, index, section) => {
    const { name, value } = event.target;
    if (section === "skills") {
      const updatedSkills = [...userData[section]];
      updatedSkills[index] = value;
      setUserData({
        ...userData,
        [section]: updatedSkills,
      });
    } else if (
      section === "experiences" ||
      section === "education" ||
      section === "languages"
    ) {
      const updatedSection = [...userData[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      setUserData({
        ...userData,
        [section]: updatedSection,
      });
    } else if (section === "militaryService") {
      setUserData({
        ...userData,
        [section]: { ...userData[section], [name]: value },
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const addSkill = (event) => {
    if (skillCounter < 12) {
      setSkillCount(skillCounter + 1);
      setUserData({
        ...userData,
        skills: [...userData.skills, ""],
      });
    }
    event.preventDefault();
  };

  const removeSkill = (event) => {
    if (skillCounter > 4) {
      setSkillCount(skillCounter - 1);
      setUserData({
        ...userData,
        skills: userData.skills.slice(0, -1),
      });
    }
    event.preventDefault();
  };

  const addExp = (event) => {
    if (expCounter < 3) {
      setExpCounter(expCounter + 1);
      setUserData({
        ...userData,
        experiences: [
          ...userData.experiences,
          {
            title: "",
            workplace: "",
            startYear: "",
            startMonth: "",
            endYear: "",
            endMonth: "",
            description: "",
          },
        ],
      });
    }
    event.preventDefault();
  };

  const removeExp = (event) => {
    if (expCounter > 1) {
      setExpCounter(expCounter - 1);
      setUserData({
        ...userData,
        experiences: userData.experiences.slice(0, -1),
      });
    }
    event.preventDefault();
  };

  const addEducation = (event) => {
    if (eduCounter < 3) {
      setEduCounter(eduCounter + 1);
      setUserData({
        ...userData,
        education: [
          ...userData.education,
          { degree: "", institution: "", startYear: "", endYear: "" },
        ],
      });
    }
    event.preventDefault();
  };

  const removeEducation = (event) => {
    if (eduCounter > 1) {
      setEduCounter(eduCounter - 1);
      setUserData({
        ...userData,
        education: userData.education.slice(0, -1),
      });
    }
    event.preventDefault();
  };

  const addLanguage = (event) => {
    if (langCounter < 4) {
      setLangCounter(langCounter + 1);
      setUserData({
        ...userData,
        languages: [...userData.languages, { lang: "", level: "" }],
      });
    }
    event.preventDefault();
  };

  const removeLanguage = (event) => {
    if (langCounter > 1) {
      setLangCounter(langCounter - 1);
      setUserData({
        ...userData,
        languages: userData.languages.slice(0, -1),
      });
    }
    event.preventDefault();
  };

  const generateResumePreview = () => (
    <div
      id="resume-preview"
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-full"
    >
      <div className="border-b border-gray-300 pb-6 mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {userData.name}
        </h1>
        <p className="text-xl text-gray-700">{userData.title}</p>
        <ul className="list-none mt-4 flex justify-center space-x-4">
          <li>
            <a
              href={`mailto:${userData.email}`}
              className="text-blue-600 hover:underline"
            >
              {userData.email}
            </a>
          </li>
          <li>
            <a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={userData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
          Summary
        </h2>
        <p className="text-gray-700">{userData.summary}</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
          Experience
        </h2>
        <ul className="list-none">
          {userData.experiences.map((exp, i) => (
            <li key={i} className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-800">
                  {exp.title} ({exp.startMonth} {exp.startYear} - {exp.endMonth}{" "}
                  {exp.endYear})
                </span>
                <span className="text-gray-600">{exp.workplace}</span>
              </div>
              <p className="text-gray-700">{exp.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
          Education
        </h2>
        <ul className="list-none">
          {userData.education.map((edu, index) => (
            <li key={index} className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-800">
                  {edu.degree} ({edu.startYear} - {edu.endYear})
                </span>
                <span className="text-gray-600">{edu.institution}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {userData.militaryService.role && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
            Military Service
          </h2>
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-gray-800">
              {userData.militaryService.role} (
              {userData.militaryService.startYear} -{" "}
              {userData.militaryService.endYear})
            </span>
            <span className="text-gray-600">
              {userData.militaryService.unit}
            </span>
          </div>
        </section>
      )}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
          Skills
        </h2>
        <ul className="list-none grid grid-cols-2 gap-4">
          {userData.skills.map((skill, i) => (
            <li key={i} className="mb-2 text-gray-700">
              {skill}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
          Languages
        </h2>
        <ul className="list-none grid grid-cols-2 gap-4">
          {userData.languages.map((lang, i) => (
            <li key={i} className="mb-2 text-gray-700">
              {lang.lang} -{" "}
              {
                levels.find((level) => level.value === parseInt(lang.level))
                  ?.label
              }
            </li>
          ))}
        </ul>
      </section>
    </div>
  );

  const handleSave = async () => {
    const userId = Cookies.get("userId");
    if (!userId) {
      alert("Please Login To Save a Resume");
    } else {
      const resolvedResumeNumber = resumeNumber || "0";
      const payload = {
        ...userData,
        user_id: userId,
        resume_number: resolvedResumeNumber,
      };
      console.log(payload);
      try {
        let response;
        if (resolvedResumeNumber !== "0") {
          response = await axios.put(
            `https://resumebackend-production.up.railway.app/${userId}/resumes/${resolvedResumeNumber}`,
            payload
          );
        } else {
          response = await axios.post(
            "https://resumebackend-production.up.railway.app/resumes/",
            payload
          );
        }

        if (response.status === 200) {
          alert("Resume saved successfully!");
        } else {
          alert("Failed to save resume. Please try again.");
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail.includes("409")
        ) {
          alert(
            "You have reached the maximum number of resume slots (4). Please delete an existing resume to save a new one."
          );
        } else {
          alert("An error occurred while saving the resume. Please try again.");
        }
      }
    }
  };

  const componentRef = useRef();

  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-center align-bottom">
        <Link to="/" className="-m-1.5 py-1.5">
          <span className="sr-only">Your Company</span>
          <img className="h-16 w-auto" src={HomeIcon} alt="" />
        </Link>
        <Link to="/ResumeViewer" className="-m-1.5 py-1.5">
          <span className="sr-only">Your Company</span>
          <img className="px-5 h-16 w-auto" src={ResumeViewer} alt="" />
        </Link>
      </div>
      <div className="mx-auto px-4 py-4 flex flex-row">
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-xl font-bold mb-4">Enter Your Info</h1>
          <form className="space-y-4">
            <InputField
              label="Name"
              name="name"
              value={userData.name}
              placeholder="Enter your name"
              onChange={(e) => handleChange(e)}
            />
            <InputField
              label="Email"
              name="email"
              value={userData.email}
              placeholder="Enter your email address"
              onChange={(e) => handleChange(e)}
            />
            <InputField
              label="LinkedIn Profile URL"
              name="linkedin"
              value={userData.linkedin}
              placeholder="Enter your LinkedIn URL (optional)"
              onChange={(e) => handleChange(e)}
            />
            <InputField
              label="GitHub Profile URL"
              name="github"
              value={userData.github}
              placeholder="Enter your GitHub URL (optional)"
              onChange={(e) => handleChange(e)}
            />
            <TextAreaField
              label="Summary"
              name="summary"
              value={userData.summary}
              placeholder="Write a brief overview of yourself and your skills"
              onChange={(e) => handleChange(e)}
            />

            <h1>Experiences</h1>
            {userData.experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-row">
                  <div className="flex-grow mb-4">
                    <InputField
                      label={`Title - experience ${i + 1}`}
                      name="title"
                      value={exp.title}
                      placeholder="Job Title"
                      onChange={(e) => handleChange(e, i, "experiences")}
                    />
                  </div>
                  <div className="flex-grow mb-4 ml-1">
                    <InputField
                      label={`Workplace Name - experience ${i + 1}`}
                      name="workplace"
                      value={exp.workplace}
                      placeholder="Name of your place of work"
                      onChange={(e) => handleChange(e, i, "experiences")}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <YearDropdown
                    label="From Year"
                    name="startYear"
                    value={exp.startYear}
                    onChange={(e) => handleChange(e, i, "experiences")}
                  />
                  <MonthDropdown
                    label="From Month"
                    name="startMonth"
                    value={exp.startMonth}
                    onChange={(e) => handleChange(e, i, "experiences")}
                  />
                  <YearDropdown
                    label="To Year"
                    name="endYear"
                    value={exp.endYear}
                    onChange={(e) => handleChange(e, i, "experiences")}
                  />
                  <MonthDropdown
                    label="To Month"
                    name="endMonth"
                    value={exp.endMonth}
                    onChange={(e) => handleChange(e, i, "experiences")}
                  />
                </div>
                <TextAreaField
                  label="Description"
                  name="description"
                  value={exp.description}
                  placeholder="Description of your work experience"
                  onChange={(e) => handleChange(e, i, "experiences")}
                />
              </div>
            ))}
            <div className="flex flex-row justify-evenly">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={addExp}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={removeExp}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
            </div>

            <h1>Education</h1>
            {userData.education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-row">
                  <div className="flex-grow mb-4">
                    <InputField
                      label={`Degree - education ${index + 1}`}
                      name="degree"
                      value={edu.degree}
                      placeholder="Degree"
                      onChange={(e) => handleChange(e, index, "education")}
                    />
                  </div>
                  <div className="flex-grow mb-4 ml-1">
                    <InputField
                      label={`Institution Name - education ${index + 1}`}
                      name="institution"
                      value={edu.institution}
                      placeholder="Institution"
                      onChange={(e) => handleChange(e, index, "education")}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <YearDropdown
                    label="From Year"
                    name="startYear"
                    value={edu.startYear}
                    onChange={(e) => handleChange(e, index, "education")}
                  />
                  <YearDropdown
                    label="To Year"
                    name="endYear"
                    value={edu.endYear}
                    onChange={(e) => handleChange(e, index, "education")}
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-row justify-evenly">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={addEducation}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={removeEducation}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
            </div>

            <h1>Skills</h1>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: skillCounter }, (_, i) => (
                <InputField
                  key={i + 1}
                  placeholder={`Skill ${i + 1}`}
                  name={`skill${i + 1}`}
                  onChange={(e) => handleChange(e, i, "skills")}
                  value={userData.skills[i] || ""}
                />
              ))}
            </div>
            <div className="flex flex-row justify-evenly">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={addSkill}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={removeSkill}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
            </div>

            <h1>Languages</h1>
            <div className="grid grid-cols-4 gap-4">
              {userData.languages.map((lang, i) => (
                <div key={i}>
                  <InputField
                    name={`lang`}
                    placeholder="Language"
                    onChange={(e) => handleChange(e, i, "languages")}
                    value={lang.lang}
                    label={`name - language ${i + 1}`}
                  />
                  <LevelsDropdown
                    name={`level`}
                    value={lang.level}
                    onChange={(e) => handleChange(e, i, "languages")}
                    label={`level - language ${i + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-evenly">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={addLanguage}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={removeLanguage}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
            </div>

            <h1>Military Service</h1>
            <div>
              <div className="flex flex-row">
                <div className="flex-grow mb-4">
                  <InputField
                    label="Role"
                    name="role"
                    value={userData.militaryService.role}
                    placeholder="Role"
                    onChange={(e) => handleChange(e, 0, "militaryService")}
                  />
                </div>
                <div className="flex-grow mb-4 ml-1">
                  <InputField
                    label="Unit"
                    name="unit"
                    value={userData.militaryService.unit}
                    placeholder="Unit"
                    onChange={(e) => handleChange(e, 0, "militaryService")}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <YearDropdown
                  label="From Year"
                  name="startYear"
                  value={userData.militaryService.startYear}
                  onChange={(e) => handleChange(e, 0, "militaryService")}
                />
                <YearDropdown
                  label="To Year"
                  name="endYear"
                  value={userData.militaryService.endYear}
                  onChange={(e) => handleChange(e, 0, "militaryService")}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-indigo-600 text-white p-3 rounded-md mt-4 hover:bg-indigo-700"
            >
              Save
            </button>
          </form>
        </div>
        <div className="flex-grow ml-4">
          <div ref={componentRef}>{generateResumePreview()}</div>
          <button
            type="button"
            onClick={handleDownload}
            className="w-full bg-green-600 text-white p-3 rounded-md mt-4 hover:bg-green-700"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeMaker;
