
import ContactHeader from "./contact/ContactHeader";
import ContactLinks from "./contact/ContactLinks";
import ContactStatus from "./contact/ContactStatus";


import "./contact/contactStyles.css";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: "#07090b",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "120px 60px",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(57,255,20,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57,255,20,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: -150,
          left: -150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(57,255,20,.12), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <ContactHeader />

      {/* Contact Links */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <ContactLinks />

        {/* Status Card Below Links */}
        <div
          style={{
            marginTop: 60,
            maxWidth: 550,
          }}
        >
        <ContactStatus />
        </div>
      </div>
    </section>
  );

}