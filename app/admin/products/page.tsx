"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { Plus, Pencil, Trash2, X, Check, Package } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types";
import ImageUpload from "@/components/ui/ImageUpload";

type FormState = {
  name: string; price: string; category: string;
  description: string; stock: string; featured: boolean; image: string;
};
const emptyForm: FormState = {
  name:"", price:"", category:"charts", description:"", stock:"10", featured:false, image:""
};

function ProductModal({ product, onClose, onSave, token }: {
  product: Product | null; onClose: ()=>void; onSave: ()=>void; token: string|null;
}) {
  const [form, setForm] = useState<FormState>(
    product
      ? { name:product.name, price:String(product.price), category:product.category,
          description:product.description, stock:String(product.stock),
          featured:product.featured, image:product.image }
      : { ...emptyForm }
  );
  const [loading, setLoading] = useState(false);
  const set = (key: keyof FormState, val: string|boolean) => setForm(f=>({...f,[key]:val}));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = product?._id ? `/api/products/${product._id}` : "/api/products";
      const method = product?._id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` },
        body: JSON.stringify({ ...form, price:Number(form.price), stock:Number(form.stock) }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success(product?._id ? "Product updated!" : "Product created!");
      onSave();
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.3)",backdropFilter:"blur(4px)",padding:24 }}>
      <div className="glass-card" style={{ width:"100%",maxWidth:560,borderRadius:24,padding:"36px",maxHeight:"92vh",overflowY:"auto" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#2C1A0E",margin:0 }}>
            {product?._id ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} style={{ padding:8,borderRadius:10,border:"none",background:"rgba(239,68,68,0.08)",cursor:"pointer" }}><X size={16} color="#ef4444"/></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display:"grid",gap:16 }}>
          {/* Image upload — drag & drop */}
          <ImageUpload
            label="Product Image"
            value={form.image}
            onChange={url => set("image", url)}
            hint="Drag & drop or click to upload. Shown on product cards."
          />

          <div>
            <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#5C3D2E",marginBottom:6 }}>Product Name *</label>
            <input className="craft-input" required value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Solar System Model"/>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
            <div>
              <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#5C3D2E",marginBottom:6 }}>Price (₹) *</label>
              <input className="craft-input" required type="number" min="0" value={form.price} onChange={e=>set("price",e.target.value)} placeholder="299"/>
            </div>
            <div>
              <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#5C3D2E",marginBottom:6 }}>Stock</label>
              <input className="craft-input" type="number" min="0" value={form.stock} onChange={e=>set("stock",e.target.value)} placeholder="10"/>
            </div>
          </div>

          <div>
            <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#5C3D2E",marginBottom:6 }}>Category *</label>
            <select className="craft-input" value={form.category} onChange={e=>set("category",e.target.value)}>
              <option value="charts">DIY Charts</option>
              <option value="models">DIY Models</option>
              <option value="3d-printing">3D Printing</option>
              <option value="clothes">Custom Clothes</option>
            </select>
          </div>

          <div>
            <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#5C3D2E",marginBottom:6 }}>Description *</label>
            <textarea className="craft-input" required rows={3} style={{ resize:"vertical" }}
              value={form.description} onChange={e=>set("description",e.target.value)}
              placeholder="Describe the product..."/>
          </div>

          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <input type="checkbox" id="featured" checked={form.featured}
              onChange={e=>set("featured",e.target.checked)}
              style={{ width:16,height:16,accentColor:"#C97B63" }}/>
            <label htmlFor="featured" style={{ fontSize:14,color:"#5C3D2E",cursor:"pointer" }}>Mark as Featured</label>
          </div>

          <div style={{ display:"flex",gap:12,paddingTop:8 }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex:1,justifyContent:"center" }}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading} style={{ flex:1,justifyContent:"center",opacity:loading?0.7:1 }}>
              <Check size={15}/> {loading?"Saving...":"Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{open:boolean;product:Product|null}>({open:false,product:null});

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/products",{headers:{Authorization:`Bearer ${token}`}})
      .then(r=>r.json()).then(d=>{setProducts(d.products||[]);setLoading(false);}).catch(()=>setLoading(false));
  };
  useEffect(()=>{fetchProducts();},[]);

  const handleDelete = async(id:string)=>{
    if(!confirm("Delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`,{method:"DELETE",headers:{Authorization:`Bearer ${token}`}});
      toast.success("Product deleted"); fetchProducts();
    } catch { toast.error("Delete failed"); }
  };

  const catLabel:Record<string,string>={charts:"DIY Charts",models:"DIY Models","3d-printing":"3D Printing",clothes:"Clothes"};
  const catColor:Record<string,string>={charts:"#C97B63",models:"#D4906E","3d-printing":"#C97B63",clothes:"#C97B63"};

  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32 }}>
        <div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:700,color:"#2C1A0E",marginBottom:4 }}>Products</h1>
          <p style={{ color:"#8B6F5E",fontSize:14 }}>{products.length} products in catalog</p>
        </div>
        <button onClick={()=>setModal({open:true,product:null})} className="btn-primary"><Plus size={16}/> Add Product</button>
      </div>

      {loading ? (
        <div style={{ display:"grid",gap:12 }}>{[...Array(5)].map((_,i)=><div key={i} className="skeleton" style={{ height:64,borderRadius:14 }}/>)}</div>
      ) : products.length===0 ? (
        <div className="glass-card" style={{ padding:"72px 24px",borderRadius:22,textAlign:"center" }}>
          <Package size={48} color="#e5e7eb" style={{ marginBottom:16 }}/>
          <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:20,color:"#2C1A0E",marginBottom:8 }}>No Products Yet</h3>
          <p style={{ color:"#B89080",marginBottom:20 }}>Add your first product to get started.</p>
          <button onClick={()=>setModal({open:true,product:null})} className="btn-primary"><Plus size={15}/> Add Product</button>
        </div>
      ) : (
        <div className="glass-card" style={{ borderRadius:22,overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%",borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"rgba(201,123,99,0.04)" }}>
                  {["Image","Product","Category","Price","Stock","Featured","Actions"].map(h=>(
                    <th key={h} style={{ padding:"14px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#8B6F5E",textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p,i)=>(
                  <tr key={p._id} style={{ borderTop:"1px solid rgba(201,123,99,0.06)",background:i%2===0?"transparent":"rgba(253,246,238,0.3)" }}>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ width:44,height:44,borderRadius:10,overflow:"hidden",background:"linear-gradient(135deg,#EDD9C5,#EDD9C5)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>
                        {p.image
                          ? <img src={p.image} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                          : (p.category==="charts"?"📊":p.category==="models"?"🏛️":p.category==="3d-printing"?"🖨️":"👕")
                        }
                      </div>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <p style={{ fontSize:14,fontWeight:600,color:"#2C1A0E",margin:0 }}>{p.name}</p>
                      <p style={{ fontSize:12,color:"#B89080",margin:"2px 0 0",maxWidth:200,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{p.description}</p>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:600,background:`${catColor[p.category]}15`,color:catColor[p.category] }}>{catLabel[p.category]}</span>
                    </td>
                    <td style={{ padding:"12px 16px",fontSize:15,fontWeight:700,color:"#A85E48" }}>₹{p.price.toLocaleString("en-IN")}</td>
                    <td style={{ padding:"12px 16px",fontSize:14,color:p.stock<5?"#ef4444":"#5C3D2E",fontWeight:p.stock<5?700:400 }}>{p.stock}</td>
                    <td style={{ padding:"12px 16px" }}>
                      {p.featured?<span style={{ padding:"3px 10px",borderRadius:6,background:"rgba(201,123,99,0.1)",color:"#A85E48",fontSize:12,fontWeight:600 }}>★ Yes</span>:<span style={{ color:"#DFC4A8" }}>—</span>}
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex",gap:8 }}>
                        <button onClick={()=>setModal({open:true,product:p})} style={{ padding:"6px 10px",borderRadius:8,border:"none",background:"rgba(201,123,99,0.08)",cursor:"pointer",color:"#A85E48" }}><Pencil size={14}/></button>
                        <button onClick={()=>handleDelete(p._id)} style={{ padding:"6px 10px",borderRadius:8,border:"none",background:"rgba(239,68,68,0.08)",cursor:"pointer",color:"#ef4444" }}><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {modal.open&&<ProductModal product={modal.product} token={token} onClose={()=>setModal({open:false,product:null})} onSave={()=>{setModal({open:false,product:null});fetchProducts();}}/>}
    </div>
  );
}
