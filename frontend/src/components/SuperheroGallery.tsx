import { SuperheroCard } from "@/components/SuperheroCard";
import SuperheroInfo from "@/components/SuperheroInfo";
import { Superhero } from "@/entities/Superhero";
import { emitHttp } from "@/utils/http";
import { useState, useEffect } from "react";

export default function SuperheroGallery() {
  const [superheroes, setSuperheroes] = useState<Array<Superhero>>([]);
  const [selectedSuperheroIndex, setSelectedSuperheroIndex] = useState<number | null>(null);

  const [edit, setEdit] = useState<boolean>(false);

  const refetch = () => {
    emitHttp("GET", "/superhero/all")
      .then((res) => res.json())
      .then((data) => setSuperheroes(data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    refetch();
  }, []);

  const updateSuperhero = async (data: Superhero) => {
    const selectedIndex = selectedSuperheroIndex!;
    const selectedIndexId = superheroes[selectedSuperheroIndex!].id;
    const response = await emitHttp(
      "PUT", "/superhero",
      { id: selectedIndexId, entity: data }
    );
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
    const confirmation = confirm("Are you sure you want to delete this superhero?");
    if (!confirmation) return;
    const selectedIndex = selectedSuperheroIndex!;
    const selectedIndexId = superheroes[selectedSuperheroIndex!].id;
    const response = await emitHttp(
      "DELETE", "/superhero", { id: selectedIndexId }
    );
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

  return (
    //  <div className="min-h-screen bg-gray-100 p-10 grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
    //    {heroes.map((hero) => <SuperheroCard key={hero.id} hero={hero} />)}
    //  </div>

    <div className="flex flex-col items-center md:flex-row md:items-start">
      {selectedSuperheroIndex !== null ? (
        <>
          <div className="w-full">
            <SuperheroInfo
              edit={edit}
              onFormSubmit={updateSuperhero}
              superhero={superheroes[selectedSuperheroIndex]}
            />
          </div>
          <div className="w-full md:w-auto p-8 p-t-4 order-first md:order-last border-b md:border-l flex flex-col justify-center items-center">
            <div className="mb-4 w-full flex items-center justify-between">
              <button
                onClick={() => setSelectedSuperheroIndex(null)}
                className="text-gray-600 hover:text-black hover:underline"
              >
                ← Back to grid
              </button>
              <div>
                {edit ? (
                  <button
                    onClick={() => setEdit(false)}
                    className="items-center p-1 rounded-lg text-gray-600 hover:underline hover:text-black"
                  >
                    Close edit
                  </button>
                ) : (
                  <button
                    onClick={() => setEdit(true)}
                    className="items-center p-1 rounded-lg text-gray-600 hover:underline hover:text-black"
                  >
                    Edit ...
                  </button>
                )}
              </div>
            </div>
            <SuperheroCard superhero={superheroes[selectedSuperheroIndex]} />
            {edit && (
              <div className="m-t-4 self-end">
                <button
                  onClick={() => deleteSelectedSuperhero()}
                  className="self-end items-center p-1 rounded-lg text-gray-600 hover:underline hover:text-black"
                >
                  Delete ...
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
}