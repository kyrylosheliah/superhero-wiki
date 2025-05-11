import { editableFromSuperhero, TEditableSuperhero, TSuperhero, superheroFromEditable } from "@/entities/Superhero";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SuperheroEntityForm(params: {
  edit?: boolean;
  close?: Function;
  onFormSubmit: Function;
  superhero: TSuperhero;
  images?: Array<string>;
}) {

  const form = useForm<TEditableSuperhero>({
    defaultValues: editableFromSuperhero(params.superhero),
  });

  const isDirty = (key: string) =>
    form.formState.dirtyFields[key as keyof TEditableSuperhero];

  const onSubmit: SubmitHandler<TEditableSuperhero> = (data) => {
    const superhero = superheroFromEditable(data);
    params.onFormSubmit(superhero);
  };

  useEffect(() => {
    form.reset(editableFromSuperhero(params.superhero));
  }, [params.superhero]);

  return (
    <div className="p-8 p-t-4">
          {params.close !== undefined && (<button
            onClick={() => params.close!()}
            className="text-gray-600 hover:text-black hover:underline"
          >
            ← Back
          </button>)}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        {Object.entries(params.superhero).map(([key, value]) => (
          <div key={"superhero_prop_" + key}>
            <label
              htmlFor={key}
              children={key}
              className="block mt-4 text-sm fw-700 text-gray-900"
            />
            {params.edit ? (
              <input
                {...form.register(key as keyof TEditableSuperhero)}
                className={`bg-gray-50 border focus:outline-none ${isDirty(key) ? "border-yellow-600" : "border-gray-300"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
            ) : (
              <p>
                {Array.isArray(value) ? value.join(", ") : value}
              </p>
            )}
          </div>
        ))}
        {params.edit && (
          <div className="flex flex-row justify-between items-center">
            <button
              onClick={() => form.reset()}
              className="self-end mt-4 px-3 py-2 text-gray-600 hover:text-black hover:underline"
            >
              Reset
            </button>
            <button
              type="submit"
              className="self-end mt-4 px-3 py-2 text-gray-600 hover:text-black hover:underline"
            >
              Apply
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
