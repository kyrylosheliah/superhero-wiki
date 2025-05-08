import { SuperheroCard } from "@/components/SuperheroCard";
import { Superhero } from "@/entities/Superhero";
import { useState, useEffect } from "react";

export default function SuperheroGallery() {
  const [heroes, setHeroes] = useState<Array<Superhero>>([]);

  useEffect(() => {
    fetch("http://localhost:3001/superhero/all")
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10 grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {heroes.map((hero) => <SuperheroCard key={hero.id} hero={hero} />)}
    </div>
  );
}