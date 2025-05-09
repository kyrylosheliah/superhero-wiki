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
