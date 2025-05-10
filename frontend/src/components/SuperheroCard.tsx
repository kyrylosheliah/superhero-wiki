import { Superhero } from "@/entities/Superhero";

export const SuperheroCard = (params: {
  superhero: Superhero;
  options?: any;
}) => (
  <div
    {...params.options}
    className="p-4 w-75 h-100 border flex flex-col justify-between items-center border-gray-200 rounded-lg shadow-sm"
  >
    <div></div>
    <div>
      <p className="fw-700 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {params.superhero.nickname}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {params.superhero.catch_prase}
      </p>
    </div>
  </div>
);
