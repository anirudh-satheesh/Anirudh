import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Menu, X } from 'lucide-react';
import './index.css';

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
      const response = await fetch('https://formspree.io/f/mldlboww', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          message: formData.message
        })
      });
      
      if (response.ok) {
        alert(`Thank you for your submission, ${formData.firstName}! Your message has been received.`);
        setFormData({
          firstName: '',
          email: '',
          message: ''
        });
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
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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
      liveUrl: "https://example-portfolio.com",
      githubUrl: "https://github.com/username/portfolio-website"
    }
  ];

return (
    <div className="min-h-screen bg-background-default text-text-light">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-background-charcoal shadow-lg transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center text-2xl font-bold text-text-lighter space-x-2">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
              <span>Anirudh</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-text-muted hover:text-accent-default transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-text-muted hover:text-accent-default transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-text-muted hover:text-accent-default transition-colors"
              >
                Contact
              </button>
              
              {/* External Links */}
              <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-background-slate">
                <a 
                  href="https://github.com/anirudh-satheesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent-default transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/anirudh-s-724abb258/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent-default transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-text-muted hover:text-accent-default transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
 
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-background-slate">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-left text-text-muted hover:text-accent-default transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="text-left text-text-muted hover:text-accent-default transition-colors"
                >
                  Projects
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-left text-text-muted hover:text-accent-default transition-colors"
                >
                  Contact
                </button>
                
                <div className="flex items-center space-x-4 pt-4 border-t border-background-slate">
                <a 
                    href="https://github.com/johndoe" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent-default transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/johndoe" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent-default transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Landing Section */}
      <section id="about" className="pt-20 pb-16 bg-background-charcoal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Avatar */}
            <div className="mb-8">
              <img
                src="/images/anirudh.jpg"
                alt="Anirudh"
                className="w-36 h-36 rounded-full mx-auto border-4 border-background-slate shadow-lg"
              />
            </div>
 
            {/* Name and Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-text-lighter mb-4">
              Anirudh
            </h1>
            <h2 className="text-xl md:text-2xl text-text-muted mb-8">
              Full Stack Developer & Data Scientist
            </h2>
 
            {/* Bio */}
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-text-light leading-relaxed mb-8">I’m a passionate full-stack developer in the making, with hands-on experience building web applications using React, Node.js, and Python through academic and self-driven projects. I thrive on turning ideas into functional, user-friendly digital experiences and am eager to contribute to real-world development work. Beyond coding, I enjoy exploring emerging technologies, collaborating with others, and continuously improving my craft.</p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Tamil Nadu, India
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  cjb.anirudhs@gmail.com
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  (+91) 87540 55591
                </div>
              </div>
            </div>
 
            {/* CTA Button */}
            <div className="mt-12">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-accent-default text-text-lighter px-8 py-3 rounded-lg hover:bg-accent-hover transition-colors font-medium"
              >
                View My Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-background-charcoal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-lighter mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills in 
              full-stack development, UI/UX design, and problem-solving.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-background-slate rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
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
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
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
                  
                  {/* Technologies */}
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
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-16 bg-background-charcoal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-lighter mb-4">
              Achievements
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              A list of hackathons I have participated in.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-text-light">
            <div className="bg-background-slate p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Participant @ PyExpo'22</h3>
              <p className="text-text-muted">Collaborated with a multidisciplinary team to design and implement a drowsiness detection system utilizing Python and OpenCV for real‑time computer vision processing.</p>
            </div>
            <div className="bg-background-slate p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Finalist @ Smart India Hackathon'23</h3>
              <p className="text-text-muted">Finalist at SIH’23, developed a solution to a problem statement issued by the Ministry of Coal during the national-level hackathon.</p>
            </div>
            <div className="bg-background-slate p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Mentor @ PyExpo'23</h3>
              <p className="text-text-muted">Mentored a team of first-year students at KGiSL's PyExpo, guiding the development of a Python project using OpenCV for the largest newcomer hackathon.</p>
            </div>
            <div className="bg-background-slate p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Finalist @ CodeTheCosmos'24</h3>
              <p className="text-text-muted">Reached finals among 100+ selected teams at VCET's CTC Hackathon at Mumbai, by building a working FinTech prototype that streamlined digital payments for users.</p>
            </div>
            <div className="bg-background-slate p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Open Source Contributions @ DevDay'24</h3>
              <p className="text-text-muted">Recognized at DevDay'24 for meaningful contributions to open-source projects, spanning data structures and front-end development.</p>
            </div>
            <div className="bg-background-slate p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Hacktoberfest'24</h3>
              <p className="text-text-muted">Contributed to open-source projects during Hacktoberfest by submitting 10+ pull requests, with several merged into active community repositories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-background-default">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-lighter mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-text-muted">
              I'm always interested in new opportunities and collaborations.<br></br>
              Let's discuss how we can work together!
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-background-slate rounded-xl shadow-lg p-8 space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-text-lighter mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg bg-background-charcoal text-text-light placeholder:text-text-muted focus:ring-2 focus:ring-accent-default focus:border-transparent ${
                  formErrors.firstName ? 'border-red-500' : 'border-background-slate'
                }`}
                placeholder="Enter your first name"
              />
              {formErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-lighter mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg bg-background-charcoal text-text-light placeholder:text-text-muted focus:ring-2 focus:ring-accent-default focus:border-transparent ${
                  formErrors.email ? 'border-red-500' : 'border-background-slate'
                }`}
                placeholder="Enter your email address"
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-lighter mb-2">
                Message * (minimum 25 characters)
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg bg-background-charcoal text-text-light placeholder:text-text-muted focus:ring-2 focus:ring-accent-default focus:border-transparent ${
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

            {/* Submit Button */}
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

          {/* Contact Info */}
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
      <footer className="bg-background-charcoal text-text-light py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                href="https://linkedin.com/in/anirudh-s-724abb258/" 
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

export default Portfolio;