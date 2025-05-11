import { Dispatch, SetStateAction } from "react";

function createRange(count: number) {
  return Array.from({ length: count }, (_, i) => i + 1);
}

export default function Pagination(params: {
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  pageCount: number;
}) {

  const decrease = () => params.setPageNo(
    (prev) => (prev > 1)
      ? prev - 1
      : prev
  );

  const increase = () => params.setPageNo(
    (prev) => (prev < params.pageCount)
      ? prev + 1
      : prev
  );

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center h-10 text-base">
        <li>
          <button
            onClick={decrease}
            disabled={params.pageCount < 2 || params.pageNo === 1}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-r-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {createRange(params.pageCount).map((no, index) => (
          <li key={"pagination_" + index}>
            <button
              onClick={() => params.setPageNo(no)}
              disabled={params.pageNo === no}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:border-black disabled:text-black"
            >
              {no}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={increase}
            disabled={params.pageCount < 2 || params.pageNo === params.pageCount}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-l-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
