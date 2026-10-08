import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { Sparkles, Upload, Zap, ShieldCheck, Code2, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png.asset.json";
import sneaker from "@/assets/sneaker.png";
import street from "@/assets/street.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2SEC BG Remover — Remove Backgrounds in 2 Seconds" },
      { name: "description", content: "AI background removal in two seconds. Upload JPG, PNG or WEBP and download a transparent cutout instantly." },
      { property: "og:title", content: "2SEC BG Remover — Remove Backgrounds in 2 Seconds" },
      { property: "og:description", content: "AI background removal in two seconds. Free 5 images a day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img src={logo.url} alt="2SEC BG Remover" className="h-full w-auto scale-[2.1] object-contain" />
    </div>
  );
}

function CompareSlider() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);
  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border shadow-glow"
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      onPointerDown={(e) => move(e.clientX)}
    >
      <div className="checker absolute inset-0">
        <img src={sneaker} alt="Sneaker with background removed" className="absolute inset-0 m-auto h-[80%] object-contain" />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={street} alt="Original photo" className="absolute inset-0 h-full w-full object-cover" />
        <img src={sneaker} alt="" className="absolute inset-0 m-auto h-[80%] object-contain" />
      </div>
      <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs">Before</span>
      <span className="glass absolute right-3 top-3 rounded-full px-3 py-1 text-xs">After</span>
      <div className="absolute inset-y-0 w-0.5 bg-foreground" style={{ left: `${pos}%` }}>
        <div className="bg-gradient-brand absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-glow">
          <Sparkles className="size-4" />
        </div>
      </div>
      <input
        type="range" min={0} max={100} value={pos} aria-label="Before/after comparison"
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 opacity-0"
      />
    </div>
  );
}

function UploadZone() {
  const [drag, setDrag] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handle = (f?: File) => {
    if (!f) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) return setMsg("Only JPG, PNG or WEBP files.");
    if (f.size > 10 * 1024 * 1024) return setMsg("File must be under 10 MB.");
    setMsg(`"${f.name}" ready — processing will be enabled once the backend is connected.`);
  };
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
      onClick={() => inputRef.current?.click()}
      className={`glass relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${drag ? "border-primary shadow-glow" : "hover:border-primary/60"}`}
    >
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => handle(e.target.files?.[0])} />
      <div className="bg-gradient-brand mx-auto grid size-14 place-items-center rounded-2xl shadow-glow">
        <Upload className="size-6" />
      </div>
      <p className="mt-4 font-semibold">Drop an image or click to browse</p>
      <p className="mt-1 text-sm text-muted-foreground">JPG, PNG, WEBP · up to 10 MB · 5000×5000</p>
      {msg && <p className="mt-3 text-sm text-primary">{msg}</p>}
    </div>
  );
}

const features = [
  { icon: Zap, title: "2-second results", text: "Cutouts land before you finish blinking." },
  { icon: Sparkles, title: "Pixel-sharp edges", text: "Hair, fur and fine details kept intact." },
  { icon: ShieldCheck, title: "Private by default", text: "Every file auto-deletes after 24 hours." },
  { icon: Code2, title: "Developer API", text: "Plug background removal into any product." },
];

const plans = [
  { name: "Free", price: "₹0", note: "forever", items: ["5 images / day", "Standard resolution", "7-day history"] },
  { name: "Pro", price: "₹499", note: "/ month", items: ["Unlimited images", "Full HD downloads", "Priority speed", "API access"], featured: true },
  { name: "Credit Pack", price: "₹199", note: "100 credits", items: ["Never expires", "HD downloads", "Pay as you go"] },
];

function Index() {
  return (
    <div className="bg-aurora min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo className="h-12 w-44" />
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#api" className="hover:text-foreground">API</a>
        </nav>
        <Button variant="hero" size="sm">Get started</Button>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-primary" /> Avg. processing 1.8s
            </span>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Remove backgrounds in just <span className="text-gradient">2 seconds</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Drop a photo, get a clean transparent cutout. No design skills needed.
            </p>
            <div className="mt-8"><UploadZone /></div>
          </div>
          <CompareSlider />
        </section>

        <section id="features" className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6">
                <f.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center text-4xl font-bold">Simple <span className="text-gradient">pricing</span></h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`glass rounded-2xl p-7 ${p.featured ? "border-primary shadow-glow" : ""}`}>
                <p className="text-sm text-muted-foreground">{p.name}</p>
                <p className="mt-2 font-display text-4xl font-bold">{p.price} <span className="text-base font-normal text-muted-foreground">{p.note}</span></p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.items.map((i) => <li key={i} className="flex gap-2"><Check className="size-4 text-primary" />{i}</li>)}
                </ul>
                <Button variant={p.featured ? "hero" : "outline"} className="mt-7 w-full">Choose {p.name}</Button>
              </div>
            ))}
          </div>
        </section>

        <section id="api" className="mx-auto max-w-6xl px-5 py-16">
          <div className="glass grid gap-8 rounded-3xl p-8 md:grid-cols-2 md:p-12">
            <div>
              <h2 className="text-3xl font-bold">Built for developers</h2>
              <p className="mt-3 text-muted-foreground">One request. Transparent PNG back. API keys, rate limits and usage tracking included.</p>
            </div>
            <pre className="checker overflow-x-auto rounded-xl p-5 text-xs leading-relaxed"><code className="block rounded-lg bg-background/90 p-4">{`curl -X POST https://api.2sec.app/v1/remove \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -F "image=@photo.jpg" \\
  -o cutout.png`}</code></pre>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t px-5 py-8 text-sm text-muted-foreground md:flex-row">
        <Logo className="h-10 w-36" />
        <p>© 2026 2SEC BG Remover · Privacy · Terms</p>
      </footer>
    </div>
  );
}
