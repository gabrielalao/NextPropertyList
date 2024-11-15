import { Property } from "@/type/Property";
import { NextRequest, NextResponse } from "next/server";
import data from "@/mock/properties.json";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  // Get query parameters for filtering
  const perPage = Number(url.searchParams.get("perPage")) || 10; // Property count per page
  const filter = url.searchParams.get("filter") || ""; // Search string
  const page = Number(url.searchParams.get("page")) || 1; // Current page
  const minPrice = Number(url.searchParams.get("min")) || -1; // Filter min price
  const maxPrice = Number(url.searchParams.get("max")) || -1; // Filter max price
  const type = url.searchParams.get("type") || ""; // Filter by type

  let numPerPage = 10;

  if (perPage !== undefined) {
    numPerPage = perPage;
  }

  try {
    const properties = data as Property[];

    let filteredProperties: Property[];

    // If search string is not empty, filter by address
    if (filter.length === 0) {
      filteredProperties = properties;
    } else {
      filteredProperties = properties.filter((property) => {
        return property.address.toLowerCase().includes(filter.toLowerCase());
      });
    }

    // If minPrice or maxPrice is set, filter properties by price
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

    // If type is set, filter by types
    if (type.length !== 0) {
      filteredProperties = filteredProperties.filter((property) => {
        return property.type === type;
      });
    }

    // Get properties for the page
    const result = filteredProperties.slice(
      (page - 1) * numPerPage,
      page * numPerPage
    );

    // Calculate total page count
    const totalPages = Math.floor(filteredProperties.length / numPerPage);

    // Delay for UI effect.
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
