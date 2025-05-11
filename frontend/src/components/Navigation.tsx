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

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white border-b border-gray-300">
      <div className="md:max-w-screen-lg flex flex-row items-center justify-start mx-auto p-4">
        {paths.map((path) => (
          <Link
            key={"navigation_" + path.href}
            href={path.href}
            className={`px-3 ${
              path.href === pathname
                ? "text-black"
                : "text-gray-600 hover:text-black hover:underline"
            } self-center text-2xl whitespace-nowrap`}
          >
            {path.content}
          </Link>
        ))}
      </div>
    </nav>
  );
};
