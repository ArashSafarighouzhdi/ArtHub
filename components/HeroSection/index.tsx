type HeroSectionProps = {
  loading: boolean;

  error: string | null;

  onFetch: () => void;
};

const HeroSection = ({ loading, error, onFetch }: HeroSectionProps) => (
  <div className="text-center px-6 pb-8">
    <button
      onClick={onFetch}
      disabled={loading}
      className={`mt-6 px-8 py-3 rounded text-xs font-medium tracking-wider transition-all ${
        loading
          ? "bg-museum-gold-dim text-museum-dark cursor-not-allowed"
          : "bg-museum-gold hover:bg-opacity-90 text-museum-dark cursor-pointer"
      }`}
    >
      {loading ? "Loading…" : "Fetch Artworks"}
    </button>

    {error && <p className="mt-4 text-xs text-museum-error">{error}</p>}
  </div>
);

export default HeroSection;
