import { ArtObject } from "./type";

export type ArtFilters = { culture?: string };

export type PaginatedResult = {
  records: ArtObject[];
  totalRecords: number;
  totalPages: number;
};

const API_KEY = process.env.NEXT_PUBLIC_HARVARD_API_KEY;
const BASE_URL = "https://api.harvardartmuseums.org";

export async function getCultures(): Promise<string[]> {
  try {
    if (!API_KEY) return [];

    const res = await fetch(
      `${BASE_URL}/culture?apikey=${API_KEY}&size=100&sort=objectcount&sortorder=desc`,
    );
    if (!res.ok) return [];

    const data = await res.json();

    return (data.records || [])
      .map((r: any) => r.name)
      .filter((name: string) => name && name.trim() !== "")
      .sort();
  } catch (error) {
    console.error("Error fetching cultures:", error);
    return [];
  }
}

export async function getHarvardArt(
  filters: ArtFilters = {},
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResult> {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY || "",
      size: String(pageSize),
      page: String(page),
      hasimage: "1",
      ...(filters.culture && { culture: filters.culture }),
    });

    const res = await fetch(`${BASE_URL}/object?${params}`);
    const data = await res.json();

    return {
      records: data.records || [],
      totalRecords: data.info?.totalrecords || 0,
      totalPages: data.info?.pages || 0,
    };
  } catch (error) {
    console.error(error);
    return { records: [], totalRecords: 0, totalPages: 0 };
  }
}
