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
  { title: "Craft Verse Launches 3D Printing Service", slug: "craft-verse-launches-3d-printing", excerpt: "We are excited to announce our brand new 3D printing service, making it easier than ever to bring your designs to life.", content: "We've partnered with professional 3D printing labs to offer high-quality PLA and resin printing. Upload your STL file, choose your material, and get it delivered within 5-7 business days.", author: "Craft Verse Team", tags: ["3D Printing", "Launch", "New Service"], published: true, coverImage: "" },
  { title: "How to Choose the Right DIY Model for Your Science Fair", slug: "how-to-choose-diy-model-science-fair", excerpt: "A comprehensive guide to picking the perfect project model for your school science fair.", content: "Science fairs are a great opportunity to showcase creativity. In this guide, we cover the top 10 most-appreciated project models and how to present them effectively.", author: "Craft Verse Team", tags: ["DIY", "Education", "Tips"], published: true, coverImage: "" },
  { title: "New Collection: Custom Clothes Now Available", slug: "custom-clothes-collection-launch", excerpt: "Express your creativity with our brand new custom clothing service, from tees to hoodies.", content: "We've expanded our catalog to include custom apparel. Whether you want a unique graphic tee or a personalised hoodie, our design team is ready to help you create something special.", author: "Craft Verse Team", tags: ["Clothes", "Launch", "Custom"], published: true, coverImage: "" },
];

export async function GET(req: NextRequest) {
  // Only allow in development or with secret key
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (key !== process.env.SEED_SECRET && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();

    // Clear existing
    await Product.deleteMany({});
    await News.deleteMany({});

    // Insert products
    await Product.insertMany(sampleProducts);

    // Insert news
    await News.insertMany(sampleNews);

    // Create admin if not exists
    const adminExists = await User.findOne({ email: "admin@craftverse.in" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@craftverse.in",
        password: "Admin@123",
        role: "admin",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      counts: { products: sampleProducts.length, news: sampleNews.length },
      adminCredentials: { email: "admin@craftverse.in", password: "Admin@123" },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
