import { NextRequest, NextResponse } from "next/server";
import data from "@/mock/properties.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const propertyId = Number(id);

    if (isNaN(propertyId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const property = data.find((property) => property.id == propertyId);
    if (property) {
      return NextResponse.json({ data: property }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 501 });
  }
}
