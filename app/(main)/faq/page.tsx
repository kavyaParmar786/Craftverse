"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What types of projects do you make?", a: "We make DIY charts (political maps, science diagrams), working models (solar system, volcanoes, human anatomy), 3D printed objects, and custom apparel. If you have a unique idea, we can likely make it!" },
  { q: "How long does delivery take?", a: "Standard products are delivered within 3-5 business days. Custom projects and 3D prints take 5-10 business days depending on complexity. We also offer express delivery for urgent orders — contact us for details." },
  { q: "Do you deliver across India?", a: "Yes! We deliver across all of India via courier. Delivery is free on all orders. For bulk school orders, we also arrange special logistics." },
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
    <div style={{ borderRadius: 16, background: "rgba(255,255,255,0.8)", border: "1px solid rgba(139,92,246,0.1)", marginBottom: 12, overflow: "hidden", transition: "all 0.3s ease", boxShadow: open ? "0 8px 24px rgba(139,92,246,0.1)" : "none" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}
      >
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#1a1a2e", lineHeight: 1.4 }}>{q}</span>
        <ChevronDown size={18} color="#8b5cf6" style={{ flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ padding: "0 24px 20px", fontSize: 15, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fdfcfb" }}>
      <div style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", borderBottom: "1px solid #bbf7d030", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>❓</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 500, margin: "0 auto" }}>Everything you need to know about Craft Verse. Can't find your answer? Contact us!</p>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 80px" }}>
        {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}

        <div style={{ textAlign: "center", marginTop: 56, padding: "40px", borderRadius: 24, background: "linear-gradient(135deg, #ede9fe, #e0f2fe)", border: "1px solid rgba(139,92,246,0.1)" }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#1a1a2e", marginBottom: 8 }}>Still have questions?</h3>
          <p style={{ color: "#6b7280", marginBottom: 20 }}>We're happy to help. Reach out via email or WhatsApp.</p>
          <a href="mailto:hello@craftverse.in" className="btn-primary" style={{ fontSize: 14 }}>📧 hello@craftverse.in</a>
        </div>
      </div>
    </div>
  );
}
