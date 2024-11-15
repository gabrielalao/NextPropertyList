import { useState } from "react";

export default function usePropertyDetail() {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPropertyDetail = async (id: number) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/property/${id}`);
      const data = await response.json();

      return data.data;
    } catch (error) {
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchPropertyDetail,
  };
}
