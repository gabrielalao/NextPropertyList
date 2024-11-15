import { useState } from "react";

export default function usePropertyList() {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPropertyList = async (
    filter?: string,
    currentPage?: number,
    numberPerPage?: number,
    minPrice?: number,
    maxPrice?: number,
    type?: string
  ) => {
    setLoading(true);

    try {
      let query = "";
      if (filter !== undefined) {
        query += `&filter=${filter}`;
      }
      if (currentPage !== undefined) {
        query += `&page=${currentPage}`;
      }
      if (numberPerPage !== undefined) {
        query += `&perPage=${numberPerPage}`;
      }
      if (minPrice !== undefined) {
        query += `&min=${minPrice}`;
      }
      if (maxPrice !== undefined) {
        query += `&max=${maxPrice}`;
      }
      if (type !== undefined) {
        query += `&type=${type}`;
      }
      const response = await fetch(`/api/property?${query}`);
      const data = await response.json();

      return data;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchPropertyList,
  };
}
