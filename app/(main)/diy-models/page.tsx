import ProductListingPage from "@/components/sections/ProductListingPage";
export const dynamic = 'force-dynamic';
export default function DIYModelsPage() {
  return <ProductListingPage category="models" title="DIY Models" subtitle="Working 3D models for science, geography, and engineering projects. Solar systems, volcanoes, human anatomy, and more." emoji="🏛️" accentColor="#C97B63" />;
}
