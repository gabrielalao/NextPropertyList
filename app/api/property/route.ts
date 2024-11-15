import { Property } from "@/type/Property";
import { NextRequest, NextResponse } from "next/server";
import data from "@/mock/properties.json";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const perPage = Number(url.searchParams.get("perPage")) || 10;
  const filter = url.searchParams.get("filter") || "";
  const page = Number(url.searchParams.get("page")) || 1;
  const minPrice = Number(url.searchParams.get("min")) || -1;
  const maxPrice = Number(url.searchParams.get("max")) || -1;
  const type = url.searchParams.get("type") || "";

  let numPerPage = 10;

  if (perPage !== undefined) {
    numPerPage = perPage;
  }

  try {
    const properties = data as Property[];

    let filteredProperties: Property[];

    if (filter.length === 0) {
      filteredProperties = properties;
    } else {
      filteredProperties = properties.filter((property) => {
        return property.address.toLowerCase().includes(filter.toLowerCase());
      });
    }

    if (minPrice !== -1) {
      filteredProperties = filteredProperties.filter((property) => {
        return property.price >= minPrice;
      });
    }

    if (maxPrice !== -1) {
      filteredProperties = filteredProperties.filter((property) => {
        return property.price <= maxPrice;
      });
    }

    if (type.length !== 0) {
      filteredProperties = filteredProperties.filter((property) => {
        return property.type === type;
      });
    }

    const result = filteredProperties.slice(
      (page - 1) * numPerPage,
      page * numPerPage
    );

    const totalPages = Math.floor(filteredProperties.length / numPerPage);

    await delay(1000);

    return NextResponse.json(
      {
        data: result,
        page,
        total_page:
          filteredProperties.length % numPerPage === 0
            ? totalPages
            : totalPages + 1,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 501 });
  }
}
