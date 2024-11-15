import { Property } from "@/type/Property";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

const images = [
  "https://photos.zillowstatic.com/fp/22f077dee1bab7ba853aa9934fc70614-cc_ft_768.webp",
  "https://photos.zillowstatic.com/fp/1d40c732d2d58df43de6605e629e3878-cc_ft_768.webp",
  "https://photos.zillowstatic.com/fp/0e30cab312cf2e7aa0d69af123b5abe3-cc_ft_1536.webp",
  "https://photos.zillowstatic.com/fp/fce4a92c85cfbad8a36f534a76a9efd0-cc_ft_768.webp",
];

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/property/${property.id}`}
      className="block bg-white border border-gray-200 rounded-lg shadow hover:bg-[#0A84FF] flex-1 group transition ease-in-out duration-300 overflow-hidden max-w-[800px]"
    >
      <div className="overflow-hidden aspect-1/2">
        <img
          src={images[property.id % images.length]}
          className="object-cover transform transition duration-300 group-hover:scale-150 group-hover:rotate-6"
        />
      </div>
      <div className="p-4">
        <div className="flex gap-1 flex-col text-gray-700 group-hover:text-white transition ease-in-out duration-300">
          <p className="mb-2 text-xl font-bold tracking-tight text-[#0A84FF] group-hover:text-white transition ease-in-out duration-300">
            {property.address}
          </p>
          <p>
            Type: <strong>{property.type}</strong>
          </p>
          <p>
            Price: <strong>{property.price}</strong>
          </p>
          <p>
            Square Footage: <strong>{property.squareFootage}</strong>
          </p>
          <p>
            Bedrooms: <strong>{property.bedrooms}</strong>
          </p>
          <p>
            Bathrooms: <strong>{property.bathrooms}</strong>
          </p>
          <p>
            Date Listed: <strong>{property.dateListed}</strong>
          </p>
          <p></p>
        </div>
      </div>
    </Link>
  );
}
