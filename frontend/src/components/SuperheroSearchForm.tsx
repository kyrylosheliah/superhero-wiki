import { TSuperheroSearch } from "@/entities/Superhero";
import { UseFormReturn } from "react-hook-form";

export default function SuperheroSearchForm(params: {
  onFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  form: UseFormReturn<TSuperheroSearch, any, TSuperheroSearch>;
}) {
  return (
    <form
      onSubmit={params.onFormSubmit}
      className="w-full h-full flex flex-row justify-start items-center"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="search"
        className="block w-full p-2 text-sm border border-gray-300 rounded-lg"
        placeholder="Search"
        {...params.form.register("text")}
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
  );

}
