import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

import { MdEmail } from "react-icons/md";

const LINKS = [
  {
    label: "EMAIL",
    value: "rahulsinghraj2000@gmail.com",
    href: "mailto:rahulsinghraj2000@gmail.com",
    icon: <MdEmail />,
  },
  {
    label: "GITHUB",
    value: "github.com/Rahul-Singh2507",
    href: "https://github.com/Rahul-Singh2507",
    icon: <FaGithub />,
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/rahul",
    href: "#",
    icon: <FaLinkedin />,
  },
  {
    label: "TWITTER",
    value: "@rahul",
    href: "#",
    icon: <FaXTwitter />,
  },
];

export default function ContactLinks() {
  return (
    <div>
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="contact-row"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span
              style={{
                color: "#39FF14",
                fontSize: 24,
              }}
            >
              {link.icon}
            </span>

            <span className="contact-label">
              {link.label}
            </span>
          </div>

          <div className="contact-right">
            <span className="contact-value">
              {link.value}
            </span>

            <span className="contact-arrow">
              ↗
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}