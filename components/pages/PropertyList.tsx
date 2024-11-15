"use client";

import usePropertyList from "@/hooks/usePropertyList";
import { Property } from "@/type/Property";
import { useEffect, useState } from "react";
import NumberPerPage from "../common/NumberPerPage";
import Pagination from "../common/Pagination";
import PropertyCard from "../common/PropertyCard";
import { TYPE } from "@/utils/constants";
import Loader from "../common/Loader";

export default function PropertyList() {
  const { loading, fetchPropertyList } = usePropertyList();

  const [numberPerPage, setNumberPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [data, setData] = useState<Property[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [type, setType] = useState<string>("");

  const loadPropertyList = async () => {
    const properties = await fetchPropertyList(
      query,
      currentPage,
      numberPerPage,
      minPrice,
      maxPrice,
      type
    );
    setData(properties.data);
    setTotalPage(properties.total_page);
  };

  const filterProperties = () => {
    if (currentPage === 1) {
      loadPropertyList();
    } else {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    filterProperties();
  }, [numberPerPage]);

  useEffect(() => {
    loadPropertyList();
  }, [currentPage]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-8 w-full">
      <div className="flex flex-col p-8 gap-4 border border-1 rounded-md lg:w-1/4 w-full">
        <input
          className="border border-1 rounded-md p-2 focus:ring-blue-500 focus:ring-1 focus:outline-none focus:border[#0A84FF] focus:ring-1 focus:ring-[#0A84FF] transition duration-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <div className="flex gap-2 items-center">
          <p className="text-gray-500">Min:</p>
          <input
            className="border border-1 rounded-md p-2 grow focus:ring-blue-500 focus:ring-1 focus:outline-none focus:border[#0A84FF] focus:ring-1 focus:ring-[#0A84FF] transition duration-300"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Search..."
          />
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-gray-500">Max:</p>
          <input
            className="border border-1 rounded-md p-2 grow focus:ring-blue-500 focus:ring-1 focus:outline-none focus:border[#0A84FF] focus:ring-1 focus:ring-[#0A84FF] transition duration-300"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="Search..."
          />
        </div>
        <select
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0A84FF] focus:border-[#0A84FF] block p-2.5 focus:ring-blue-500 focus:ring-1 focus:outline-none focus:border[#0A84FF] focus:ring-1 focus:ring-[#0A84FF] transition duration-300"
        >
          <option value="">All Types</option>
          {TYPE.map((type, index) => (
            <option value={type} key={index}>
              {type}
            </option>
          ))}
        </select>
        <button
          className="rounded-md bg-[#0A84FF] text-white px-2 py-2 hover:opacity-70 transition duration-300"
          onClick={() => filterProperties()}
        >
          Search
        </button>
      </div>
      <div className="flex flex-col gap-4 border border-1 rounded-md lg:w-3/4 w-full relative">
        <div className="flex flex-col gap-4 p-8">
          <div className="flex justify-between">
            <NumberPerPage
              perPage={numberPerPage}
              onChanged={setNumberPerPage}
            />
            <Pagination
              onPageChanged={setCurrentPage}
              totalPage={totalPage}
              currentPage={currentPage}
            />
          </div>
          <div className="overflow-y-auto h-[600px] custom-scrollbar">
            {data?.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600 text-lg">No properties</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 ">
                {data?.map((property, index) => (
                  <PropertyCard property={property} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className={`absolute w-full h-full bg-gray-400/40  transition duration-300 flex items-center justify-center rounded-md ${
            loading
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <Loader />
        </div>
      </div>
    </div>
  );
}
