import { Superhero } from "@/entities/Superhero";
import { SERVER } from "@/utils/http";
import Image from "next/image";

export const SuperheroCard = (params: {
  superhero: Superhero;
  cover?: string;
  options?: any;
}) => (
  <div
    {...params.options}
    className="relative p-4 w-75 h-100 hover:cursor-pointer border flex flex-col justify-between items-center text-center border-gray-200 rounded-lg shadow-sm"
  >
    {params.cover && (
      <Image
        alt={params.superhero.nickname}
        src={SERVER + params.cover}
        fill
        className="object-cover"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
    <div className="absolute bottom-1.25">
      <p className="fw-700 mb-2 text-2xl font-bold tracking-tight text-gray-100">
        {params.superhero.nickname}
      </p>
      <p className="mb-3 font-normal text-gray-300">
        {params.superhero.catch_prase}
      </p>
    </div>
  </div>
);
