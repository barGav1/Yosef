import React from "react";

const ResumePreview = ({ userData, levels }) => {
  return (
    <div
      id="resume-preview"
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-full"
    >
      {/* Header */}
      <header className="border-b border-gray-300 pb-6 mb-6 text-center">
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
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
          Summary
        </h2>
        <p className="text-gray-700">{userData.summary}</p>
      </section>

      {/* Experience */}
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

      {/* Education */}
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

      {/* Military Service */}
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

      {/* Skills */}
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

      {/* Languages */}
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
};

export default ResumePreview;
