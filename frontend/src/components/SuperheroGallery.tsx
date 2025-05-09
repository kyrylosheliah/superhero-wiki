import { SuperheroCard } from "@/components/SuperheroCard";
import SuperheroInfo from "@/components/SuperheroInfo";
import { Superhero } from "@/entities/Superhero";
import { useState, useEffect } from "react";

export default function SuperheroGallery() {
  const [heroes, setHeroes] = useState<Array<Superhero>>([]);
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/superhero/all")
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    //  <div className="min-h-screen bg-gray-100 p-10 grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
    //    {heroes.map((hero) => <SuperheroCard key={hero.id} hero={hero} />)}
    //  </div>

    <div className="h-full flex w-full overflow-hidden">

        {selectedHeroIndex !== null ? (<>

          <div className="w-full">
            <SuperheroInfo />
          </div>
          <div
            key="sidebar"
            className="p-8 border-l"
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setSelectedHeroIndex(null)}
                className="text-sm text-gray-600 hover:underline"
              >
                ← Back to grid
              </button>
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
            <SuperheroCard hero={heroes[selectedHeroIndex]} />
          </div>

        </>) : (

          <div
            className={`w-full h-full flex items-start flex-row flex-wrap justify-around gap-8 p-8`}
          >
            {heroes.map((hero, index) => (
              <SuperheroCard
                key={hero.id}
                hero={hero}
                options={{
                  onClick: () => setSelectedHeroIndex(index),
                }} 
              />
            ))}
          </div>

        )}

    </div>
  );
}