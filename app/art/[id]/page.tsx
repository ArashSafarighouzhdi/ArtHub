"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArtObject } from "@/utils/type";

const ArtDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [art, setArt] = useState<ArtObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const apiKey = process.env.NEXT_PUBLIC_HARVARD_API_KEY;
    fetch(`https://api.harvardartmuseums.org/object/${id}?apikey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setArt(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-museum-warm text-sm uppercase tracking-widest animate-pulse">
        Loading Masterpiece…
      </div>
    );
  }

  if (!art) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-museum-error text-sm">
        Artwork not found.
      </div>
    );
  }

  const artistName = art.people?.[0]?.name ?? "Unknown Artist";

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-6 pb-12 flex flex-col gap-8 text-museum-cream font-sans">
      <header className="w-full flex justify-between items-center pt-2">
        <button
          onClick={() => router.back()}
          className="text-xs tracking-wider text-museum-warm hover:text-museum-gold transition-colors py-2"
        >
          ← Back to Collection
        </button>
        <span className="text-[10px] tracking-widest text-museum-muted uppercase">
          ArtHub Gallery
        </span>
      </header>

      <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="w-full bg-zinc-950 rounded-card border border-museum-muted overflow-hidden flex items-center justify-center p-4 aspect-square md:aspect-auto md:h-[60vh]">
          {art.primaryimageurl ? (
            <img
              src={art.primaryimageurl}
              alt={art.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-museum-muted bg-zinc-900 rounded ">
              <span className="text-4xl mb-2">🏛️</span>
              <span className="text-xs uppercase tracking-widest">
                No Image Available
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-museum-gold block mb-2 font-medium">
              {art.period || "Unknown Period"}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-museum-light leading-tight">
              {art.title}
            </h1>
          </div>

          <div className="border-t border-museum-line pt-5 flex flex-col gap-3.5 text-sm">
            <p className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-museum-warm">Artist</span>
              <span className="text-right font-medium">{artistName}</span>
            </p>
            <p className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-museum-warm">Dated</span>
              <span className="text-right font-medium text-museum-gold">
                {art.dated || "N/A"}
              </span>
            </p>
            <p className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-museum-warm">Culture</span>
              <span className="text-right font-medium">
                {art.culture || "Unknown"}
              </span>
            </p>
            <p className="flex justify-between pb-2">
              <span className="text-museum-warm">Medium</span>
              <span className="text-right font-medium text-museum-soft max-w-[70%] truncate">
                {art.medium || "Not specified"}
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtDetailPage;
