import { Superhero } from "@/entities/Superhero";

export const SuperheroCard = (params: {
  hero: Superhero,
  selected?: boolean,
  options?: any,
}) => (
  <div
    {...params.options}
    className={
      params.selected
      ? "w-75 h-100 bg-black border border-gray-200 rounded-lg shadow-sm"
      : "w-75 h-100 bg-white border border-gray-200 rounded-lg shadow-sm"
    }
  >
    <div className="p-5">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {params.hero.nickname}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {params.hero.catch_prase}
      </p>
      <button
        className="items-center p-1 text-black rounded-lg hover:bg-black hover:text-white"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
          />
        </svg>
      </button>
    </div>
  </div>
);

/*
            <div
              key={hero.id}
              onClick={() => setSelectedHero(index)}
              className="bg-white shadow-lg rounded-2xl p-4 cursor-pointer hover:shadow-xl transition"
            >
              <img
                src={hero.image}
                alt={hero.nickname}
                className="w-full h-40 object-cover rounded-xl"
              />
              <h3 className="mt-2 text-xl font-bold">{hero.nickname}</h3>
            </div>




            <img
              src={heroes[selectedHero].image}
              alt={heroes[selectedHero].nickname}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h2 className="mt-4 text-2xl font-bold">{heroes[selectedHero].nickname}</h2>
            <p className="mt-2 text-gray-700">{heroes[selectedHero].description}</p>
*/
