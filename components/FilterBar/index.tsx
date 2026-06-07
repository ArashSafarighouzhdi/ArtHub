import { ArtFilters } from "@/utils/api";

type FilterBarProps = {
  filters: ArtFilters;
  cultures: string[];
  loadingCultures: boolean;
  onFilterChange: (filters: ArtFilters) => void;
};

const FilterBar = ({
  filters,
  cultures,
  loadingCultures,
  onFilterChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-8">
      <label className="text-[10px] tracking-[0.15em] uppercase text-museum-warm">
        Culture
      </label>

      <select
        className="appearance-none bg-museum-surface text-museum-cream border border-museum-line rounded-lg px-4 py-2 text-xs min-w-[200px] outline-none focus:border-museum-gold cursor-pointer disabled:opacity-50 transition-colors"
        disabled={loadingCultures}
        value={filters.culture || "All"}
        onChange={(e) =>
          onFilterChange({
            culture: e.target.value === "All" ? undefined : e.target.value,
          })
        }
      >
        <option value="All">All Cultures</option>

        {cultures.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
