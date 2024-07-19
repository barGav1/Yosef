// Import necessary modules and dependencies
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import resumeMaker from "../Files/Resume_icon.png";
import HomeIcon from "../Files/Home.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Cookies from "js-cookie";
import axios from "axios";

// Define constant values and default resume object
const levels = [
  { value: 1, label: "Basic" },
  { value: 2, label: "Conversational" },
  { value: 3, label: "Proficient" },
  { value: 4, label: "Fluent" },
  { value: 5, label: "Native" },
];

const defaultResume = {
  title: "Default Resume",
  description: "This is a default resume.",
  userData: {
    name: "Create Your Resume Today!",
    email: "",
    linkedin: "",
    github: "",
    summary: "",
    education: [],
    militaryService: {},
    skills: [],
    experiences: [],
    languages: [],
    resume_number: 0,
  },
};

// Main component definition
const ResumeViewer = () => {
  const userId = Cookies.get("userId");
  const alertShown = useRef(false);
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!userId && !alertShown.current) {
      alert("Please Login To Save and View your resumes");
      alertShown.current = true;
      navigate("/login");
    }
  }, [userId, navigate]);

  // Fetch resumes from the server
  useEffect(() => {
    const fetchResumes = async () => {
      const resumesToFetch = [1, 2, 3, 4]; // Fetch 4 resumes
      const fetchedResumes = [];
      for (const resumeNumber of resumesToFetch) {
        try {
          const response = await axios.get(
            `https:/resumebackend-production.up.railway.app/${userId}/resumes/${resumeNumber}`
          );
          fetchedResumes.push({
            title: `Resume ${resumeNumber}`,
            description: `This is the description for resume ${resumeNumber}.`,
            userData: { ...response.data, resume_number: resumeNumber },
          });
        } catch (error) {
          console.error(`Error fetching resume ${resumeNumber}:`, error);
          if (error.response && error.response.status === 404) {
            // If resume not found, stop fetching more
            break;
          }
        }
      }
      setResumes(fetchedResumes.length > 0 ? fetchedResumes : [defaultResume]);
    };
    fetchResumes();
  }, [userId]);

  // Handle delete resume
  const handleDelete = (deletedResumeNumber) => {
    setResumes((prevResumes) =>
      prevResumes.filter(
        (resume) => resume.userData.resume_number !== deletedResumeNumber
      )
    );
  };

  return (
    <div className="bg-[#F9F7F7] min-h-screen p-4 flex flex-col">
      <div className="flex flex-row">
        <a href="/" className="mb-4">
          <span className="sr-only">Your Company</span>
          <img
            className="h-16 w-auto hover:bg-slate-100"
            src={HomeIcon}
            alt="Home"
          />
        </a>
        <a href="/ResumeMaker" className="mb-4">
          <span className="sr-only">Your Company</span>
          <img
            className="h-16 w-auto hover:bg-slate-100"
            src={resumeMaker}
            alt="Resume Maker"
          />
        </a>
      </div>
      <div className="flex-grow overflow-hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="h-full"
        >
          {resumes.map((resume, index) => (
            <SwiperSlide key={index}>
              <div className="h-full flex items-center justify-center p-4">
                <div className="w-full max-w-4xl">
                  <Card
                    {...resume}
                    levels={levels}
                    resumeNumber={resume.userData.resume_number}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ResumeViewer;
