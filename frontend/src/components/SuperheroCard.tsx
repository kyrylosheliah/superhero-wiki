import { TSuperhero } from "@/entities/Superhero";
import { SERVER } from "@/utils/http";
import Image from "next/image";

import styles from './SuperheroCard.module.css';

export const SuperheroCard = (params: {
  superhero: TSuperhero;
  cover?: string;
  options?: any;
}) => (
  <div
    {...params.options}
    className={`${styles.inherit_radius} ${!params.cover && "border border-gray-200"} relative p-4 w-60 h-80 hover:cursor-pointer flex flex-col justify-between items-center text-center shadow-md rounded-xl overflow-hidden`}
  >
    {params.cover && (
      <Image
        alt={params.superhero.nickname}
        src={SERVER + params.cover}
        fill
        sizes="(max-width: 240px) 100vw, (max-width: 320px) 75vw, 33vw"
        className="object-cover"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
    <div className="absolute bottom-1.25">
      <p className="fw-700 mb-2 text-xl font-bold tracking-tight text-gray-100">
        {params.superhero.nickname}
      </p>
      {params.superhero.catch_prase && (
        <p className="mb-3 font-normal text-gray-300">
          {params.superhero.catch_prase}
        </p>
      )}
    </div>
  </div>
);
