import { SuperheroCard } from "@/components/SuperheroCard";
import SuperheroForm from "@/components/SuperheroForm";
import { Superhero } from "@/entities/Superhero";
import { useState } from "react";

export default function SuperheroInfo(params: {
  superhero: Superhero;
  close: Function;
  delete: Function;
  update: (data: Superhero) => Promise<void>;
}) {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:flex-row md:order-first">
      <div className="w-full">
        <SuperheroForm
          edit={edit}
          onFormSubmit={params.update}
          superhero={params.superhero}
        />
      </div>
      <div className="w-full md:w-auto p-8 p-t-4 order-first md:order-last border-b md:border-l flex flex-col justify-start items-center">
        <div className="mb-4 w-full flex items-center justify-between">
          <button
            onClick={() => params.close()}
            className="text-gray-600 hover:text-black hover:underline"
          >
            ← Back
          </button>
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
        <SuperheroCard superhero={params.superhero} />
        {edit && (
          <div className="m-t-4 self-end">
            <button
              onClick={() => params.delete()}
              className="self-end items-center p-1 rounded-lg text-gray-600 hover:underline hover:text-black"
            >
              Delete ...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
