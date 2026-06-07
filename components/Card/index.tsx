import Link from "next/link";
import type { ArtObject } from "@/utils/type";

type CardProps = { art: ArtObject };

const Card = ({ art }: CardProps) => {
  const artistName = art.people?.[0]?.name ?? "Unknown Artist";

  return (
    <Link href={`/art/${art.id}`} className="block h-full group">
      <div className="bg-museum-surface overflow-hidden rounded-card border border-museum-border hover:border-museum-gold transition-colors flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center">
          {art.primaryimageurl ? (
            <img
              src={art.primaryimageurl}
              alt={art.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-center p-4">
              <span className="block text-[24px] mb-1">🏛️</span>
              <span className="block text-museum-muted text-[10px] tracking-widest uppercase font-sans">
                No Image Provided
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="font-serif text-sm text-museum-cream leading-snug mb-1.5 line-clamp-2 group-hover:text-museum-gold transition-colors">
              {art.title}
            </h3>
            <p className="text-[11px] text-museum-warm tracking-wide truncate mb-3">
              By {artistName}
            </p>
          </div>

          <div className="flex justify-between items-center pt-2.5 border-t border-museum-border mt-auto">
            <span className="text-[10px] text-museum-muted uppercase tracking-wider truncate max-w-[60%]">
              {art.period || "Unknown"}
            </span>
            <span className="text-[11px] text-museum-gold font-medium">
              {art.dated || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
