import { SuperheroCard } from "@/components/SuperheroCard";
import SuperheroForm from "@/components/SuperheroForm";
import SuperheroInfo from "@/components/SuperheroInfo";
import { emptySuperhero, Superhero, SuperheroAggregate } from "@/entities/Superhero";
import { emitHttp } from "@/utils/http";
import { useState, useEffect } from "react";

export default function SuperheroGallery() {
  const [items, setItems] = useState<Array<SuperheroAggregate>>([]);
  const [selection, select] = useState<
    number | null
  >(null);

  const refetch = async () => {
    const response = await emitHttp("GET", "/superhero/all");
    const data = await response.json();
    if (!response.ok) {
      console.error(data.error);
      return;
    }
    let state: Array<SuperheroAggregate> = (data as Array<Superhero>).map(
      (el) => ({
        superhero: el,
        cover: "",
        images: [],
      })
    );
    setItems(state);
    state = await Promise.all(state.map(async (el) => {
      const response = await emitHttp(
        "GET", `/superhero/image/all/${el.superhero.id}`
      );
      if (!(response.ok || response.status === 302)) return el;
      var images: Array<string> = (await response.json()).images;
      if (!images.length) return el;
      const coverIndex = images.findIndex((value) => value.includes("_cover"));
      let cover: string | undefined;
      if (coverIndex !== -1) {
        cover = images.splice(coverIndex, 1)[0];
      }
      return ({
        superhero: el.superhero,
        cover: cover,
        images: images,
      });
    }));
    setItems([...state]);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  useEffect(() => {
    refetch();
  }, []);

  const updateSuperhero = async (data: Superhero) => {
    const selectedBefore = selection!;
    const selectedId = items[selectedBefore].superhero.id;
    const response = await emitHttp("PUT", "/superhero", {
      id: selectedId,
      entity: data,
    });
    if (!response.ok) {
      alert("Error updating the superhero");
      return;
    }
    // unnecessary refetch for testing purposes
    await emitHttp("GET", `/superhero/${selectedId}`)
      .then((res) => res.json())
      .then((data) => {
        setItems((arr) => {
          const newArr = [...arr];
          newArr[selectedBefore] = data;
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
    const selected = selection!;
    const selectedId = items[selected!].superhero.id;
    const response = await emitHttp("DELETE", "/superhero", {
      id: selectedId,
    });
    if (!response.ok) {
      alert("Error deleting the superhero");
      return;
    }
    setItems((arr) => {
      const newArr = [...arr];
      newArr.splice(selected, 1);
      return newArr;
    });
    select(null);
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
  ) : (selection !== null
    ? (
      <SuperheroInfo
        close={() => select(null)}
        delete={deleteSelectedSuperhero}
        update={updateSuperhero}
        superhero={items[selection].superhero}
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
          {items.map((item, index) => (
            <SuperheroCard
              key={item.superhero.id}
              superhero={item.superhero}
              cover={item.cover}
              options={{
                onClick: () => select(index),
              }}
            />
          ))}
        </div>
      </div>
    )
  );
}