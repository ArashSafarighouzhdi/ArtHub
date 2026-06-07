"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArtObject } from "@/utils/type";
import { getHarvardArt, getCultures, ArtFilters } from "@/utils/api";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import ArtGrid from "@/components/ArtGrid";

const ArtMuseumContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCulture = searchParams.get("culture") || "";
  const urlPage = Number(searchParams.get("page")) || 1;

  const [artworks, setArtworks] = useState<ArtObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<ArtFilters>({
    culture: urlCulture || undefined,
  });
  const [cultures, setCultures] = useState<string[]>([]);
  const [loadingCultures, setLoadingCultures] = useState(true);

  const [currentPage, setCurrentPage] = useState(urlPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    getCultures()
      .then(setCultures)
      .finally(() => setLoadingCultures(false));
  }, []);

  const handleFetch = async (
    page: number = 1,
    activeFilters: ArtFilters = filters,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getHarvardArt(activeFilters, page, 10);
      setArtworks(result.records);
      setTotalPages(result.totalPages);
      setTotalRecords(result.totalRecords);
      setCurrentPage(page);

      const params = new URLSearchParams();
      if (activeFilters.culture) params.set("culture", activeFilters.culture);
      params.set("page", String(page));
      router.push(`?${params.toString()}`, { scroll: false });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlCulture || urlPage > 1) {
      handleFetch(urlPage, { culture: urlCulture || undefined });
    }
  }, [urlCulture, urlPage]);

  return (
    <div className="flex-1 bg-museum-dark font-sans pb-4">
      <div className="text-center px-6 pt-16">
        <p className="text-[10px] tracking-[0.2em] uppercase text-museum-warm mb-3">
          Collection Explorer
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl text-museum-light font-normal leading-tight mb-3">
          Art Hub <br /> Harvard Museum
        </h1>
        <p className="text-sm text-museum-soft font-light">
          Discover works across centuries and cultures
        </p>
      </div>

      <FilterBar
        filters={filters}
        cultures={cultures}
        loadingCultures={loadingCultures}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          handleFetch(1, newFilters);
        }}
      />

      <HeroSection
        loading={loading}
        error={error}
        onFetch={() => handleFetch(1, filters)}
      />

      <ArtGrid
        artworks={artworks}
        totalRecords={totalRecords}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={(page) => handleFetch(page, filters)}
      />
    </div>
  );
};

export default function HarvardArtPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-museum-dark" />}>
      <ArtMuseumContent />
    </Suspense>
  );
}
