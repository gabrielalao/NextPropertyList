"use client";

import usePropertyDetail from "@/hooks/usePropertyDetail";
import { Property } from "@/type/Property";
import { useEffect, useState } from "react";
import PropertyCard from "../common/PropertyCard";

interface PropertyDetailProps {
  id: number;
}

export default function PropertyDetail({ id }: PropertyDetailProps) {
  const { loading, fetchPropertyDetail } = usePropertyDetail();
  const [propertyDetail, setPropertyDetail] = useState<
    Property | null | undefined
  >(null);

  const loadPropertyDetail = async () => {
    const result = await fetchPropertyDetail(id);
    setPropertyDetail(result);
  };

  useEffect(() => {
    loadPropertyDetail();
  }, [id]);

  if (loading || propertyDetail === null) {
    return <p>Loading...</p>;
  }

  if (propertyDetail === undefined) {
    return <p>Invalid Data</p>;
  }

  return <PropertyCard property={propertyDetail} />;
}
