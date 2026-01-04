import { useState } from "react";

export default function CardNav({
  logo,
  logoAlt = "Logo",
  items = [],
  buttonBgColor = "#000000ff",
  buttonTextColor = "#fff",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full top-2">
      {/* NAVBAR */}
      <div className="bg-white rounded-lg ">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20 rounded-2xl">
            {/* Hamburger */}
            <button
              className="text-2xl text-black"
              onClick={() => setOpen((v) => !v)}
            >
              ☰
            </button>

            {/* Logo */}
            <img
              src={logo}
              alt={logoAlt}
              className="h-12 rounded-xl object-contain"
            />

            {/* CTA */}
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor,
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* DROPDOWN CARDS */}
      <div
        className={`
          absolute left-0 right-0 top-full
          z-50
          transition-all duration-700 ease-out
          ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-6 pointer-events-none"
          }
        `}
      >
        <div className="bg-white shadow-xl rounded-b-3xl">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl p-6 text-white transition-transform duration-500 hover:-translate-y-1"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {item.label}
                  </h3>

                  <ul className="space-y-3">
                    {item.links.map((link) => (
                      <li
                        key={link.label}
                        className="flex items-center gap-2 opacity-90 hover:opacity-100 cursor-pointer"
                      >
                        <span>↗</span>
                        <span>{link.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
