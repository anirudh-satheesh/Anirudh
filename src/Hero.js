import React, { useEffect, useRef } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

export default function Hero({ scrollToSection }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    // Stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
    }));

    // Comets
    function resetComet() {
      const dx = 2 + Math.random() * 2; // move right
      return {
        x: Math.random() * canvas.width,
        y: -20,
        dx: dx,
        dy: dx, // 45-degree angle
        length: 80 + Math.random() * 40,
      };
    }
    const comets = Array.from({ length: 8 }, () => resetComet());

    function draw() {
      ctx.fillStyle = "#0a1230";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = "white";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Comets
      comets.forEach((c, i) => {
        const grad = ctx.createLinearGradient(
          c.x,
          c.y,
          c.x - c.length,
          c.y - c.length
        );
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.length, c.y - c.length);
        ctx.stroke();

        c.x += c.dx;
        c.y += c.dy;
        if (c.y > canvas.height + 50 || c.x < -50) {
          comets[i] = resetComet();
        }
      });

      animationFrame = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen items-center justify-center pt-20 pb-16 relative overflow-hidden bg-[#0a1230]"
    >
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* 2-column grid layout */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center justify-center min-h-screen w-full">
          {/* Right: Avatar, name, title */}
          <div className="flex flex-col items-center text-center md:ml-32">
            <div className="mb-8">
              <img
                src="/images/anirudh.png"
                alt="Anirudh"
                className="w-108 h-full border-4 border-background-slate shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-lighter mb-4 md:ml-32">
              Anirudh
            </h1>
            <h2 className="text-xl md:text-2xl text-text-muted mb-8 md:ml-32">
              Full Stack Developer & Data Scientist
            </h2>
          </div>

          {/* Left: Bio, contact, CTA */}
          <div className="flex flex-col items-center text-center md:mr-32">
            <h1 className="text-3xl md:text-4xl font-bold text-text-lighter mb-6">
              I am a{" "}
              <span className="text-accent-default">
                <Typewriter
                  words={[
                    "Full Stack Developer",
                    "Data Scientist",
                    "Open Source Contributor",
                    "Hackathon Finalist",
                    "Tech Enthusiast",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>
            <p className="text-2xl text-text-light leading-relaxed mb-8 max-w-4xl">
              Passionate about building scalable and user-friendly digital
              experiences with React, Node.js, and Python. I thrive on solving
              problems, experimenting with emerging tech, and turning ideas into
              impactful products. Beyond code, I love collaborating, mentoring,
              and contributing to open-source.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-lg text-text-muted mb-8">
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

            <button
              onClick={() => scrollToSection("projects")}
              className="bg-accent-default text-text-lighter px-8 py-3 rounded-lg hover:bg-accent-hover transition-colors font-medium"
            >
              View My Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
