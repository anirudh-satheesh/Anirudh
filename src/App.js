import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Menu, X } from 'lucide-react';
import './index.css';
import Hero from "./Hero";

const Portfolio = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 25) {
      errors.message = 'Message must be at least 25 characters';
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    setFormErrors({});
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          message: formData.message
        })
      });
      if (response.ok) {
        alert(`Thank you for your submission, ${formData.firstName}! Your message has been received.`);
        setFormData({ firstName: '', email: '', message: '' });
      } else {
        alert('There was an error sending your message. Please try again later.');
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Resume download handler
  const handleResumeDownload = () => {
    setShowResumePrompt(false);
    const link = document.createElement('a');
    link.href = '/assets/Resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projects = [
    {
      id: 1,
      title: "Elyra - Chatbot",
      description: "An intelligent AI-powered chatbot that delivers fast, context-aware answers using API integration — making conversations more natural, dynamic, and meaningful.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      technologies: ["HTML", "TailwindCSS", "Flask", "OpenRouter"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "JobTune - AI powered ATS",
      description: "An AI-powered Applicant Tracking System that streamlines the hiring process, making it easier for companies to find the right talent efficiently.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      technologies: ["React", "Firebase", "Material-UI", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "RC-Wings - Taking Flight Beyond Limits",
      description: "A sleek promotional platform for RC planes, designed to boost business visibility, connect with hobbyists, and drive sales through an interactive and appealing interface.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
      technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills with smooth animations, contact forms, and optimized performance.",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=250&fit=crop",
      technologies: ["React", "Tailwind", "Vercel"],
      liveUrl: "https://anirudh-s.vercel.app",
      githubUrl: "https://github.com/username/portfolio-website"
    }
  ];

return (
    <div className="min-h-screen bg-background-default text-text-light">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-lg">
        <div className="w-full mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/images/logo-nobg.png"
              alt="Anirudh Logo"
              className="w-16 h-10 object-contain"
            />
            <span className="text-white font-semibold">Anirudh</span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white/80 hover:text-white transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('achievements')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Achievements
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => setShowResumePrompt(true)}
              className="text-white/80 hover:text-white transition-colors"
            >
              Resume
            </button>
            {/* External Links */}
            <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-white/30">
              <a 
                href="https://github.com/anirudh-satheesh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/cjb-anirudh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-6 border-t border-white/20 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-white/80 hover:text-white transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-left text-white/80 hover:text-white transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('achievements')}
                className="text-left text-white/80 hover:text-white transition-colors"
              >
                Achievements
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-white/80 hover:text-white transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => setShowResumePrompt(true)}
                className="text-left text-white/80 hover:text-white transition-colors"
              >
                Resume
              </button>
              <div className="flex items-center space-x-4 pt-4 border-t border-white/30">
                <a 
                  href="https://github.com/anirudh-satheesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/cjb-anirudh/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Resume Popup */}
      {showResumePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background-slate rounded-lg shadow-xl p-8 text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-text-lighter">Download Resume</h2>
            <p className="mb-6 text-text-muted">Do you want to download Anirudh's resume?</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleResumeDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Yes
              </button>
              <button
                onClick={() => setShowResumePrompt(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Landing Section */}
      <section id="about" className=" bg-[#0a1230]">
        <Hero scrollToSection={scrollToSection} />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-0 bg-[#0a1220]">
        <div className="w-full mx-auto px-0 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-lighter mt-4 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills in 
              full-stack development, UI/UX design, and problem-solving.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="bg-[#101a20] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Mobile & Tablet view: only image and title, expand on click */}
                <div className="block lg:hidden px-4">
                  <ProjectMobileCard project={project} />
                </div>
                {/* Desktop view: original card */}
                <div className="hidden lg:block">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-4">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                        {project.title !== "Portfolio Website" && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                          >
                            <Github size={16} className="mr-2" />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Project Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text-lighter mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-18 bg-[#0a1220] relative">
        {/* Top-left Orb (Achievements) - Only visible on desktop */}
        <div className="hidden lg:block absolute left-12 top-12 z-10">
          <div className="dark-orb">
            <div className="orb-highlight"></div>
            <div className="orb-core"></div>
          </div>
        </div>

        {/* Bottom-right Orb (Achievements) - Only visible on desktop */}
        <div className="hidden lg:block absolute right-12 bottom-12 z-10">
          <div className="dark-orb">
            <div className="orb-highlight"></div>
            <div className="orb-core"></div>
          </div>
        </div>
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-lighter mb-4">
              Achievements
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              A list of hackathons and contributions I have made.
            </p>
          </div>
          <div className="relative border-l border-accent-default max-w-4xl mx-auto">
            <div className="mb-10 ml-6 group">
              <div className="absolute w-3 h-3 bg-accent-default rounded-full -left-1.5 border border-background-charcoal group-hover:scale-125 group-hover:shadow-lg transition-all duration-300"></div>
              <h3 className="text-xl font-semibold text-text-lighter group-hover:text-accent-default transition-colors">
                Participant @ PyExpo'22
              </h3>
              <p className="text-sm text-text-muted mb-2">2022</p>
              <p className="text-text-light group-hover:translate-x-1 transition-transform">
                Collaborated with a multidisciplinary team to design and implement a 
                drowsiness detection system utilizing Python and OpenCV for real-time 
                computer vision processing.
              </p>
            </div>
            <div className="mb-10 ml-6 group">
              <div className="absolute w-3 h-3 bg-accent-default rounded-full -left-1.5 border border-background-charcoal group-hover:scale-125 group-hover:shadow-lg transition-all duration-300"></div>
              <h3 className="text-xl font-semibold text-text-lighter group-hover:text-accent-default transition-colors">
                Finalist @ Smart India Hackathon'23
              </h3>
              <p className="text-sm text-text-muted mb-2">2023</p>
              <p className="text-text-light group-hover:translate-x-1 transition-transform">
                Developed a solution to a problem statement issued by the Ministry of Coal 
                during the national-level hackathon.
              </p>
            </div>
            <div className="mb-10 ml-6 group">
              <div className="absolute w-3 h-3 bg-accent-default rounded-full -left-1.5 border border-background-charcoal group-hover:scale-125 group-hover:shadow-lg transition-all duration-300"></div>
              <h3 className="text-xl font-semibold text-text-lighter group-hover:text-accent-default transition-colors">
                Mentor @ PyExpo'23
              </h3>
              <p className="text-sm text-text-muted mb-2">2023</p>
              <p className="text-text-light group-hover:translate-x-1 transition-transform">
                Mentored a team of first-year students at KGiSL's PyExpo, guiding the 
                development of a Python project using OpenCV for the largest newcomer hackathon.
              </p>
            </div>
            <div className="mb-10 ml-6 group">
              <div className="absolute w-3 h-3 bg-accent-default rounded-full -left-1.5 border border-background-charcoal group-hover:scale-125 group-hover:shadow-lg transition-all duration-300"></div>
              <h3 className="text-xl font-semibold text-text-lighter group-hover:text-accent-default transition-colors">
                Finalist @ CodeTheCosmos'24
              </h3>
              <p className="text-sm text-text-muted mb-2">2024</p>
              <p className="text-text-light group-hover:translate-x-1 transition-transform">
                Reached finals among 100+ selected teams at VCET's CTC Hackathon at Mumbai, 
                by building a working FinTech prototype that streamlined digital payments for users.
              </p>
            </div>
            <div className="mb-10 ml-6 group">
              <div className="absolute w-3 h-3 bg-accent-default rounded-full -left-1.5 border border-background-charcoal group-hover:scale-125 group-hover:shadow-lg transition-all duration-300"></div>
              <h3 className="text-xl font-semibold text-text-lighter group-hover:text-accent-default transition-colors">
                Open Source Contributions @ DevDay'24
              </h3>
              <p className="text-sm text-text-muted mb-2">2024</p>
              <p className="text-text-light group-hover:translate-x-1 transition-transform">
                Recognized at DevDay'24 for meaningful contributions to open-source projects, 
                spanning data structures and front-end development.
              </p>
            </div>
            <div className="ml-6 group">
              <div className="absolute w-3 h-3 bg-accent-default rounded-full -left-1.5 border border-background-charcoal group-hover:scale-125 group-hover:shadow-lg transition-all duration-300"></div>
              <h3 className="text-xl font-semibold text-text-lighter group-hover:text-accent-default transition-colors">
                Hacktoberfest'24
              </h3>
              <p className="text-sm text-text-muted mb-2">2024</p>
              <p className="text-text-light group-hover:translate-x-1 transition-transform">
                Contributed to open-source projects during Hacktoberfest by submitting 10+ 
                pull requests, with several merged into active community repositories.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-[#0a1220] relative">
        {/* Dark Orb on the left side */}
        <div className="absolute left-12 bottom-12 -translate-y-1/2 z-10">
          <div className="dark-orb">
            <div className="orb-highlight"></div>
            <div className="orb-core"></div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-lighter mb-4 mt-4">
              Get In Touch
            </h2>
            <p className="text-lg text-text-muted">
              I'm always interested in new opportunities and collaborations.<br></br>
              Let's discuss how we can work together!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-[#101a26] rounded-xl shadow-lg p-8 space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-text-lighter mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg bg-[#101a20] text-text-light placeholder:text-text-muted focus:ring-2 focus:ring-accent-default focus:border-transparent ${
                  formErrors.firstName ? 'border-red-500' : 'border-background-slate'
                }`}
                placeholder="Enter your first name"
              />
              {formErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-lighter mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg bg-[#101a20] text-text-light placeholder:text-text-muted focus:ring-2 focus:ring-accent-default focus:border-transparent ${
                  formErrors.email ? 'border-red-500' : 'border-background-slate'
                }`}
                placeholder="Enter your email address"
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-lighter mb-2">
                Message <span className="text-red-500">*</span> (minimum 25 characters)
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg bg-[#101a20] text-text-light placeholder:text-text-muted focus:ring-2 focus:ring-accent-default focus:border-transparent ${
                  formErrors.message ? 'border-red-500' : 'border-background-slate'
                }`}
                placeholder="Tell me about your project or how I can help you..."
              />
              <div className="mt-1 flex justify-between items-center">
                {formErrors.message && (
                  <p className="text-sm text-red-600">{formErrors.message}</p>
                )}
                <p className="text-sm text-gray-500 ml-auto">
                  {formData.message.length}/25 characters 
                </p>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Prefer to reach out directly? You can also contact me at:
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href="mailto:john.doe@email.com"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                cjb.anirudhs@gmail.com
              </a>
              <a 
                href="tel:+15551234567"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Phone size={16} className="mr-2" />
                (+91) 87540 55591
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-text-light py-8">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-text-muted">
                © 2025 Anirudh. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://github.com/anirudh-satheesh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-lighter transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/cjb-anirudh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-lighter transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ProjectMobileCard for mobile/tablet project cards
function ProjectMobileCard({ project }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="cursor-pointer">
      <div onClick={() => setExpanded((e) => !e)}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <h3 className="text-lg font-semibold text-text-lighter text-center py-3">
          {project.title}
        </h3>
      </div>
      {expanded && (
        <div className="flex flex-col items-center gap-3 pb-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <ExternalLink size={16} className="mr-2" />
            Live Demo
          </a>
          {project.title !== "Portfolio Website" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              <Github size={16} className="mr-2" />
              Code
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default Portfolio;