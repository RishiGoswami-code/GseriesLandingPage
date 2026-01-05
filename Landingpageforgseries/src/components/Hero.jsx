import React from "react";

const Hero = () => {
  return (
    <section
      className="
        fixed inset-0 
        flex flex-col items-center justify-center 
        bg-transparent 
        z-10
        pointer-events-none
      "
    >
      {/* HERO CONTENT */}
      <div className="text-center px-6 max-w-6xl">

        {/* Main Text – Bigger & Stronger */}
        <h1 className="
          font-arona 
          text-5xl 
          sm:text-5xl 
          md:text-5xl 
          lg:text-5xl 
          font-extrabold 
          text-white 
          mb-12 
          leading-[1.1]
        ">
          We build high-performance websites
          <br />
          & mobile applications
        </h1>

        {/* CTA Buttons – Shorter & Premium */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center pointer-events-auto">
          <button className="
            bg-white 
            text-black 
            px-8 
            py-2.5 
            rounded-md 
            font-arona 
            font-semibold 
            text-base 
            hover:bg-gray-200 
            transition-all 
            duration-300
          ">
            View Our Work
          </button>

          <button className="
            border 
            border-white 
            text-white 
            px-8 
            py-2.5 
            rounded-md 
            font-arona 
            font-semibold 
            text-base 
            hover:bg-white 
            hover:text-black 
            transition-all 
            duration-300
          ">
            Get in Touch
          </button>
        </div>
      </div>

      {/* FOOTER TEXT */}
      <div className="absolute bottom-12 w-full text-center text-white/60 font-arona text-sm tracking-widest">
        Trusted by startups & enterprises worldwide
        <div className="mt-2">↓ Scroll to explore</div>
      </div>
    </section>
  );
};

export default Hero;
