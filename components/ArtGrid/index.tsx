import type { ArtObject } from "@/utils/type";
import Card from "@/components/Card";

type ArtGridProps = {
  artworks: ArtObject[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
};

const ArtGrid = ({
  artworks,
  totalRecords,
  currentPage,
  totalPages,
  loading,
  onPageChange,
}: ArtGridProps) => {
  if (!loading && artworks.length === 0) return null;

  if (loading) {
    return (
      <div className="text-center py-20 text-museum-warm text-sm tracking-widest uppercase animate-pulse">
        Loading…
      </div>
    );
  }

  let start = Math.max(1, currentPage - 4);
  let end = Math.min(totalPages, start + 9);

  if (end - start + 1 < 10) {
    start = Math.max(1, end - 9);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10 flex flex-col gap-8">
      <p className="text-center text-[11px] text-museum-warm tracking-wide">
        <span className="text-museum-gold font-medium">{totalRecords}</span>{" "}
        works found — page{" "}
        <span className="text-museum-gold font-medium">{currentPage}</span> of{" "}
        {totalPages}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {artworks.map((art) => (
          <Card key={art.id} art={art} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-xs border border-museum-line rounded text-museum-warm disabled:opacity-30 hover:border-museum-gold transition-colors"
          >
            ← Prev
          </button>

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 text-xs rounded transition-colors ${
                p === currentPage
                  ? "bg-museum-gold text-museum-dark font-medium"
                  : "border border-museum-line text-museum-warm hover:border-museum-gold"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-xs border border-museum-line rounded text-museum-warm disabled:opacity-30 hover:border-museum-gold transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtGrid;
