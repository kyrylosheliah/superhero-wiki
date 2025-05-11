import { SERVER } from "@/utils/http";
import Image from "next/image";
import { useRef } from "react";

export default function SuperheroGallery(params: {
  edit: boolean;
  images: Array<string>;
  deleteImage: (image: string) => Promise<void>;
  uploadImage: (file: File) => Promise<void>;
}) {
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) {
      alert("No file selected");
      return;
    }
    params.uploadImage(selected);
  };

  const uploadImage = () => {
    imageFileInputRef.current?.click();
  }
  
  return (
    <div className="mb-16 p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {params.images.map((image, index) => (
        <div
          key={`superhero_gallery_${index}`}
          className="w-full h-80 relative rounded-lg aspect-square overflow-hidden shadow-md"
        >
          <Image
            className="object-cover"
            src={SERVER + image}
            alt={`superhero image ${index}`}
            fill
            sizes="(max-width: 768) 50vw, 25vw"
          />
          {params.edit && (
            <div className="absolute top-2 right-2">
              <button
                onClick={() => params.deleteImage(image)}
                className="group w-10 h-10 rounded-full bg-white hover:bg-red-100 flex justify-center items-center shadow-md"
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-red-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}
      {params.edit && (
        <>
          <input
            ref={imageFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            className="sr-only hidden"
          />
          <button
            onClick={uploadImage}
            className="h-80 group block flex justify-center items-center rounded-lg hover:bg-gray-100 shadow-md"
          >
            <svg
              className="w-20 h-20 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857ZM18 14a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
