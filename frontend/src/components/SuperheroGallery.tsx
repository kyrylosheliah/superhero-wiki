import { SuperheroCard } from "@/components/SuperheroCard";
import { Superhero } from "@/entities/Superhero";
import { useState, useEffect } from "react";

export default function SuperheroGallery() {
  const [heroes, setHeroes] = useState<Array<Superhero>>([]);
  const [selectedHero, setSelectedHero] = useState<number | null>(null);

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
    
    <div className="flex h-screen overflow-hidden">

        {selectedHero ? (<>

          <div className="w-full bg-gray-100">
              yap yap
          </div>
          <div
            key="sidebar"
            className="bg-gray-100 p-6 shadow-xl"
          >
            <button
              onClick={() => setSelectedHero(null)}
              className="mb-4 text-sm text-gray-600 hover:underline"
            >
              ← Back to grid
            </button>
            <SuperheroCard hero={heroes[selectedHero]} />
          </div>

        </>) : (

          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-4`}
          >
            {heroes.map((hero, index) => (
              <SuperheroCard
                key={hero.id}
                selected={index === selectedHero}
                hero={hero}
                options={{
                  onClick: () => setSelectedHero(index),
                }} 
              />
            ))}
          </div>

        )}

    </div>
  );
}