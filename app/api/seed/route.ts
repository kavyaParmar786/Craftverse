import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import News from "@/models/News";
import User from "@/models/User";
 
const sampleProducts = [
  { name: "Solar System Model", price: 349, category: "models", description: "Complete working solar system model with all 8 planets, rotating sun and orbital rings. Perfect for science projects.", stock: 20, featured: true, image: "" },
  { name: "India Political Map Chart", price: 199, category: "charts", description: "Detailed political map of India with all states, capitals, and major rivers. A3 size, laminated finish.", stock: 30, featured: true, image: "" },
  { name: "Human Heart Model", price: 429, category: "models", description: "Anatomically accurate human heart model with detachable parts. Ideal for biology projects.", stock: 15, featured: false, image: "" },
  { name: "Water Cycle Diagram", price: 149, category: "charts", description: "Full-colour illustrated water cycle chart showing evaporation, condensation, and precipitation stages.", stock: 50, featured: true, image: "" },
  { name: "Volcano Working Model", price: 499, category: "models", description: "Chemical reaction volcano model with eruption mechanism. Includes full assembly kit.", stock: 10, featured: true, image: "" },
  { name: "Periodic Table Chart", price: 179, category: "charts", description: "Complete periodic table with atomic numbers, weights, and element properties. Premium print quality.", stock: 40, featured: false, image: "" },
  { name: "Custom 3D Keychain", price: 249, category: "3d-printing", description: "Custom 3D printed keychain in your preferred shape. Upload your design or choose from our templates.", stock: 100, featured: false, image: "" },
  { name: "Graphic Tee – Unisex", price: 599, category: "clothes", description: "Premium cotton tee with custom design printing. Available in all sizes. 180 GSM fabric.", stock: 25, featured: false, image: "" },
];
 
const sampleNews = [
  { title: "Craft Verse Launches 3D Printing Service", slug: "craft-verse-launches-3d-printing", excerpt: "We are excited to announce our brand new 3D printing service.", content: "We partnered with professional 3D printing labs to offer high-quality PLA and resin printing.", author: "Craft Verse Team", tags: ["3D Printing", "Launch"], published: true, coverImage: "" },
  { title: "How to Choose the Right DIY Model", slug: "how-to-choose-diy-model", excerpt: "A guide to picking the perfect project model for your school science fair.", content: "Science fairs are a great opportunity to showcase creativity. Here are our top picks.", author: "Craft Verse Team", tags: ["DIY", "Education"], published: true, coverImage: "" },
  { title: "Custom Clothes Now Available", slug: "custom-clothes-launch", excerpt: "Express yourself with our brand new custom clothing service.", content: "We now offer custom apparel — tees, hoodies, and more, designed exactly as you imagine.", author: "Craft Verse Team", tags: ["Clothes", "Launch"], published: true, coverImage: "" },
];
 
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
 
  if (process.env.NODE_ENV === "production" && key !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
 
  try {
    await connectDB();
 
    // Clear existing data
    await Product.deleteMany({});
    await News.deleteMany({});
 
    // Insert products (no hooks needed, no passwords)
    await Product.insertMany(sampleProducts);
 
    // Insert news
    await News.insertMany(sampleNews);
 
    // ── Admin user ──────────────────────────────────────────────────────────
    // IMPORTANT: Use .save() not .create() or insertMany() so the
    // pre('save') password hashing hook runs correctly
    await User.deleteOne({ email: "admin@craftverse.in" });
 
    const admin = new User({
      name: "Admin",
      email: "admin@craftverse.in",
      password: "Admin@123",   // will be hashed by pre('save') hook
      role: "admin",
    });
    await admin.save();   // ← triggers the bcrypt hook
 
    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      counts: {
        products: sampleProducts.length,
        news: sampleNews.length,
      },
      admin: {
        email: "admin@craftverse.in",
        password: "Admin@123",
        note: "Password is hashed via pre-save hook — login should work now",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
 
