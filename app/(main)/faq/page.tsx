"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What types of projects do you make?", a: "We make DIY charts (political maps, science diagrams), working models (solar system, volcanoes, human anatomy), 3D printed objects, and custom apparel. If you have a unique idea, we can likely make it!" },
  { q: "How long does delivery take?", a: "Standard products are delivered within 3-5 business days. Custom projects and 3D prints take 5-10 business days depending on complexity. We also offer express delivery for urgent orders." },
  { q: "Do you deliver across India?", a: "Yes! We deliver across all of India via courier. Delivery is free on all orders. For bulk school orders, we arrange special logistics." },
  { q: "How do I place a custom project request?", a: "Visit our Custom Models or 3D Printing pages and fill out the request form. Include as much detail as possible — size, materials, colours, purpose. We'll respond within 24 hours with a quote and timeline." },
  { q: "What is your return and refund policy?", a: "For ready-made products, we accept returns within 7 days if the item is damaged or incorrect. Custom projects are non-refundable since they're made specifically for you, but we'll fix any quality issues at no cost." },
  { q: "Can I upload my own design for 3D printing?", a: "Absolutely! We accept STL, OBJ, and 3MF files. After submitting your request, share your file via WhatsApp or email and we'll proceed with printing. We can also help design from scratch." },
  { q: "Do you offer bulk/school discounts?", a: "Yes! For orders of 10+ items or school/institution projects, we offer special pricing. Contact us directly at hello@craftverse.in or via WhatsApp for bulk quotations." },
  { q: "How can I track my order?", a: "Once your order is shipped, you'll receive a tracking number via email and WhatsApp. You can also check order status in your account dashboard." },
  { q: "What payment methods do you accept?", a: "We accept all UPI apps (GPay, PhonePe, Paytm), debit/credit cards, net banking, and bank transfers. For COD, contact us directly." },
  { q: "Is my personal information safe?", a: "Absolutely. We use secure, encrypted connections and never share your personal information with third parties. Your data is only used to process orders and communicate with you." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius: 14, background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.08)", marginBottom: 10, overflow: "hidden", boxShadow: open ? "0 4px 20px rgba(62,47,47,0.08)" : "none", transition: "box-shadow 0.3s" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 600, color: "#3E2F2F", lineHeight: 1.4 }}>{q}</span>
        <ChevronDown size={17} color="#C97B63" style={{ flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ fontFamily: "'Poppins',sans-serif", padding: "0 22px 18px", fontSize: 13.5, color: "#7A6060", lineHeight: 1.7, margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      <div style={{ background: "#EAD8C0", borderBottom: "1px solid rgba(62,47,47,0.10)", padding: "72px 24px 64px", textAlign: "center" }}>
        <div className="badge" style={{ marginBottom: 16 }}>Got Questions?</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,50px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 12 }}>Frequently Asked Questions</h1>
        <div className="divider" />
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "#7A6060", maxWidth: 480, margin: "20px auto 0" }}>Everything you need to know about Craft Verse. Can't find your answer? Reach out!</p>
      </div>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "64px 24px 80px" }}>
        {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
        <div style={{ textAlign: "center", marginTop: 52, padding: "40px", borderRadius: 22, background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.08)" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, color: "#C97B63", opacity: 0.4, marginBottom: 12 }}>✦</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 21, color: "#3E2F2F", marginBottom: 8 }}>Still have questions?</h3>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", marginBottom: 20, fontSize: 13 }}>We're happy to help. Reach out via email or WhatsApp.</p>
          <a href="mailto:hello@craftverse.in" className="btn-primary" style={{ fontSize: 13 }}>hello@craftverse.in</a>
        </div>
      </div>
    </div>
  );
}
