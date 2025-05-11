import Pagination from "@/components/Pagination";
import { SuperheroCard } from "@/components/SuperheroCard";
import SuperheroEntityForm from "@/components/SuperheroEntityForm";
import SuperheroInfo from "@/components/SuperheroInfo";
import SuperheroSearchForm from "@/components/SuperheroSearchForm";
import { emptySuperhero, emptySuperheroSearch, TSuperhero, TSuperheroAggregate, TSuperheroSearch } from "@/entities/Superhero";
import { emitHttp, emitHttpForm } from "@/utils/http";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SuperheroSearch() {
  const [items, setItems] = useState<Array<TSuperheroAggregate>>([]);
  const [selection, select] = useState<number | null>(null);

  const searchForm = useForm<TSuperheroSearch>({
    defaultValues: emptySuperheroSearch(),
  });
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);

  const submitSuperheroesSearch = searchForm.handleSubmit(async (data: TSuperheroSearch) => {
    const response = await emitHttp("POST", "/superhero/search", data);
    if (!response.ok) {
      setItems([]);
      return;
    }
    const searchResult: {
      found: Array<TSuperhero>;
      pageCount: number;
    } = await response.json();
    setPageCount(searchResult.pageCount);
    assembleSuperheroes(searchResult.found);
  });

  useEffect(() => {
    setPageNo(1);
  }, [pageCount]);

  useEffect(() => {
    submitSuperheroesSearch();
  }, []);

  useEffect(() => {
    searchForm.setValue("pageNo", pageNo);
    submitSuperheroesSearch();
  }, [pageNo]);

  const assembleSuperheroes = async (found: Array<TSuperhero>) => {
    let state: Array<TSuperheroAggregate> = (found).map(
      (el) => ({
        superhero: el,
        cover: "",
        images: [],
      })
    );
    setItems(state);
    state = await Promise.all(state.map(async (el) => {
      const result = await getSuperheroImages(el.superhero.id);
      if (result.fail) return el;
      const data = await result.data;
      const images: Array<string> = data.images || [];
      const cover: string | undefined = data.cover || undefined;
      return ({
        superhero: el.superhero,
        cover,
        images,
      });
    }));
    setItems(state);
  };

  const getSuperheroImages = async (id: number) => {
    const response = await emitHttp(
      "GET", `/superhero/image/all/${id}`
    );
    const data = await response.json();
    return { data, fail: !(response.ok || response.status === 302) };
  }

  const updateSuperheroImages = async (selected: number) => {
    const id = items[selected].superhero.id;
    const result = await getSuperheroImages(id);
    if (result.fail) {
      console.error("Error updating superhero images");
      return;
    }
    const data = result.data
    const images: Array<string> = data.images || [];
    const cover: string | undefined = data.cover || undefined;
    setItems((prev) => {
      let newItems = [...prev];
      newItems[selected] = {
        superhero: newItems[selected].superhero,
        cover,
        images,
      };
      return newItems;
    });
  };

  //useEffect(() => {
  //  console.log(items);
  //}, [items]);

  const updateSuperhero = async (data: TSuperhero) => {
    const selected = selection!;
    const selectedId = items[selected].superhero.id;
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
      .then((updateData) => {
        setItems((arr) => {
          const newArr = [...arr];
          newArr[selected].superhero = updateData;
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
    submitSuperheroesSearch();
  };

  const [creation, setCreation] = useState<boolean>(false);

  const createSuperhero = async (data: TSuperhero) => {
    data.id = 0;
    const response = await emitHttp("POST", "/superhero", { entity: data });
    if (!response.ok) {
      const { error } = await response.json();
      alert(`Error creating a superhero: ${error}`);
      return;
    }
    const newEntity = await response.json();
    alert(`New superhero created with id ${newEntity.id}`);
    submitSuperheroesSearch();
    setCreation(false);
  };

  const deleteSuperheroImage = async (image: string) => {
    const confirmation = confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmation) return;
    const selected = selection!;
    const response = await emitHttp("DELETE", "/superhero/image", {
      filename: image
    });
    if (!(response.ok || response.status === 204)) {
      alert("Error deleting an image");
      return;
    }
    updateSuperheroImages(selected);
  };

  const uploadSuperheroImage = async (file: File) => {
    const selected = selection!;
    const response = await emitHttpForm("POST", "/superhero/image", {
      id: items[selected].superhero.id.toString(),
      file
    });
    const data = await response.json();
    if (!(response.ok || response.status === 201)) {
      console.error('Error uploading image:', data);
    }
    updateSuperheroImages(selected);
  };

  const deleteSuperheroCover = async (image: string) => {
    const confirmation = confirm(
      "Are you sure you want to delete the cover?"
    );
    if (!confirmation) return;
    const selected = selection!;
    const response = await emitHttp("DELETE", "/superhero/cover", {
      filename: image,
    });
    if (!(response.ok || response.status === 204)) {
      alert("Error deleting an image");
      return;
    }
    updateSuperheroImages(selected);
  };

  const uploadSuperheroCover = async (file: File) => {
    const selected = selection!;
    const response = await emitHttpForm("POST", "/superhero/cover", {
      id: items[selected].superhero.id.toString(),
      file,
    });
    const data = await response.json();
    if (!(response.ok || response.status === 201)) {
      console.error('Error uploading image:', data);
    }
    updateSuperheroImages(selected);
  };

  return creation ? (
    <SuperheroEntityForm
      edit={true}
      close={() => setCreation(false)}
      onFormSubmit={createSuperhero}
      superhero={emptySuperhero()}
    />
  ) : ((selection !== null) ? (
    <SuperheroInfo
      cover={items[selection].cover}
      images={items[selection].images}
      close={() => select(null)}
      delete={deleteSelectedSuperhero}
      update={updateSuperhero}
      superhero={items[selection].superhero}
      deleteImage={deleteSuperheroImage}
      uploadImage={uploadSuperheroImage}
      deleteCover={deleteSuperheroCover}
      uploadCover={uploadSuperheroCover}
    />
  ) : (
    <div className="w-full h-full lg:max-w-screen-lg mx-auto flex flex-col items-center ">
      <div className="m-t-8 w-full h-full max-w-100 flex flex-row items-center justify-center">
        <SuperheroSearchForm
          onFormSubmit={submitSuperheroesSearch}
          form={searchForm}
        />
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
      <div className="mt-8 mb-32">
        <Pagination
          {...{ pageNo, setPageNo, pageCount }}
        />
      </div>
    </div>
  ));
}