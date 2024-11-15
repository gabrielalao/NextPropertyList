import PropertyDetail from "@/components/pages/PropertyDetail";
import React from "react";

export default async function DetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  return (
    <div className="p-16 flex items-center justify-center">
      <PropertyDetail id={id} />
    </div>
  );
}
