import Link from "next/link";
import { usePathname } from "next/navigation";

const paths = [
  {
    href: "/",
    content: <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
    </svg>,
  },
  {
    href: "/superheroes",
    content: "Superheroes",
  },
];

const Navigation = () => {
  const pathname = usePathname()
  
  return (
    <nav className="bg-white border-b dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          {paths.map((path) => (
            <Link
              key={"navigation_" + path.href}
              href={path.href}
              className={`px-3 ${
                path.href === pathname 
                  ? "text-black fw-700"
                  : "text-gray-600 hover:text-black"
              } self-center text-2xl whitespace-nowrap`}
            >
              {path.content}
            </Link>
          ))}
        </div>

        <div className="p-l-3 max-w-100 w-full">
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
                className="block w-full p-2 text-sm border border-gray-300 rounded-lg"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="rounded-lg text-sm px-3 py-1.5 text-gray-500 group-focus:text-black absolute end-1.25 bottom-1.25 hover:bg-black hover:text-white font-medium"
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
            </div>
          </form>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
