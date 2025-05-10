import { SuperheroCard } from "@/components/SuperheroCard";
import SuperheroForm from "@/components/SuperheroForm";
import SuperheroInfo from "@/components/SuperheroInfo";
import { emptySuperhero, Superhero } from "@/entities/Superhero";
import { emitHttp } from "@/utils/http";
import { useState, useEffect } from "react";

export default function SuperheroGallery() {
  const [superheroes, setSuperheroes] = useState<Array<Superhero>>([]);
  const [selectedSuperheroIndex, setSelectedSuperheroIndex] = useState<
    number | null
  >(null);

  const unselectSuperhero = () => setSelectedSuperheroIndex(null);

  const refetch = () => {
    emitHttp("GET", "/superhero/all")
      .then((res) => res.json())
      .then((data) => setSuperheroes(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    refetch();
  }, []);

  const updateSuperhero = async (data: Superhero) => {
    const selectedIndex = selectedSuperheroIndex!;
    const selectedIndexId = superheroes[selectedSuperheroIndex!].id;
    const response = await emitHttp("PUT", "/superhero", {
      id: selectedIndexId,
      entity: data,
    });
    if (!response.ok) {
      alert("Error updating the superhero");
      return;
    }
    // unnecessary refetch for testing purposes
    await emitHttp("GET", `/superhero/${selectedIndexId}`)
      .then((res) => res.json())
      .then((data) => {
        setSuperheroes((arr) => {
          const newArr = [...arr];
          newArr[selectedIndex] = data;
          return newArr;
        });
      })
      .catch((err) => console.error(err));
  };

  const deleteSelectedSuperhero = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this superhero?"
    );
    if (!confirmation) return;
    const selectedIndex = selectedSuperheroIndex!;
    const selectedIndexId = superheroes[selectedSuperheroIndex!].id;
    const response = await emitHttp("DELETE", "/superhero", {
      id: selectedIndexId,
    });
    if (!response.ok) {
      alert("Error deleting the superhero");
      return;
    }
    setSuperheroes((arr) => {
      const newArr = [...arr];
      newArr.splice(selectedIndex, 1);
      return newArr;
    });
    setSelectedSuperheroIndex(null);
    refetch();
  };

  const [creation, setCreation] = useState<boolean>(false);

  const createSuperhero = async (data: Superhero) => {
    data.id = 0;
    const response = await emitHttp("POST", "/superhero", { entity: data });
    if (!response.ok) {
      const { error } = await response.json();
      alert(`Error creating a superhero: ${error}`);
      return;
    }
    const newEntity = await response.json();
    alert(`New superhero created with id ${newEntity.id}`);
    refetch();
    setCreation(false);
  };

  return creation ? (
    <SuperheroForm
      edit={true}
      close={() => setCreation(false)}
      onFormSubmit={createSuperhero}
      superhero={emptySuperhero()}
    />
  ) : (selectedSuperheroIndex !== null
    ? (
      <SuperheroInfo
        close={unselectSuperhero}
        delete={deleteSelectedSuperhero}
        update={updateSuperhero}
        superhero={superheroes[selectedSuperheroIndex]}
      />
    ) : (
      <div className="w-full h-full flex flex-col items-center ">
        <div className="m-t-8 w-full h-full max-w-100 flex flex-row items-center justify-center">
          <form className="w-full h-full flex flex-row justify-start items-center">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              id="search"
              className="block w-full p-2 text-sm border border-gray-300 rounded-lg"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="w-10! h-8! m-l-1 rounded-lg flex items-center justify-center text-gray-500 hover:bg-black hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </form>
          <button
            onClick={() => setCreation(true)}
            className="m-l-8 whitespace-nowrap items-center p-1 rounded-lg text-gray-600 hover:underline hover:text-black"
          >
            Or add new ...
          </button>
        </div>
        <div
          className={`w-full flex items-start flex-row flex-wrap justify-around gap-8 p-8`}
        >
          {superheroes.map((superhero, index) => (
            <SuperheroCard
              key={superhero.id}
              superhero={superhero}
              options={{
                onClick: () => setSelectedSuperheroIndex(index),
              }}
            />
          ))}
        </div>
      </div>
    )
  );
}