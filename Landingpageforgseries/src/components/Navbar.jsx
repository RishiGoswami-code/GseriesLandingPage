import CardNav from "./CardNav";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company" },
        { label: "Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured" },
        { label: "Case Studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email" },
        { label: "Twitter" },
        { label: "LinkedIn" },
      ],
    },
  ];

  return (
    <nav className="relative w-full px-20 rounded-lg">
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={items}
        buttonBgColor="#000000ff"
        buttonTextColor="#fff"
      />
    </nav>
  );
}
