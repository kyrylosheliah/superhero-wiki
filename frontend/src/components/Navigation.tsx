import Link from "next/link";
import { usePathname } from "next/navigation";

const paths = [
  {
    href: "/",
    content: <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
    </svg>,
  },
  {
    href: "/superheroes",
    content: "Superheroes",
  },
];

const Navigation = () => {
  //const pathname = usePathname()
  //console.log(pathname);
  
  return (
    <nav className="bg-white border-b dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          {paths.map((path) => (
            <Link
              href={path.href}
              className="px-3 text-black self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >
              {path.content}
            </Link>
          ))}
        </div>

        <div>
          <form>
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="search"
                className="block w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="rounded-lg text-sm px-3 py-1.5 text-white absolute end-1.25 bottom-1.25 bg-black hover:bg-blue-800 focus:ring-4 font-medium"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
