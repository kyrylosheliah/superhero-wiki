import { SuperheroCard } from "@/components/SuperheroCard";
import SuperheroEntityForm from "@/components/SuperheroEntityForm";
import SuperheroGallery from "@/components/SuperheroGallery";
import { TSuperhero } from "@/entities/Superhero";
import { emitHttp } from "@/utils/http";
import { useRef, useState } from "react";

export default function SuperheroInfo(params: {
  superhero: TSuperhero;
  cover?: string;
  images: Array<string>;
  close: Function;
  delete: Function;
  update: (data: TSuperhero) => Promise<void>;
  deleteImage: (image: string) => Promise<void>;
  uploadImage: (file: File) => Promise<void>;
  deleteCover: (image: string) => Promise<void>;
  uploadCover: (file: File) => Promise<void>;
}) {
  const [edit, setEdit] = useState<boolean>(false);

  const coverFileInputRef = useRef<HTMLInputElement>(null);
  
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) {
      alert("No file selected");
      return;
    }
    params.uploadCover(selected);
  };
  
  const uploadCover = () => {
    coverFileInputRef.current?.click();
  }

  return (
    <div className="flex flex-col md:max-w-screen-lg mx-auto">
      <div className="flex flex-col md:flex-row md:order-first">
        <div className="w-full">
          <SuperheroEntityForm
            edit={edit}
            onFormSubmit={params.update}
            superhero={params.superhero}
          />
        </div>
        <div className="w-full md:w-auto p-8 p-t-4 order-first md:order-last border-gray-300 border-b md:border-b-0 md:border-l flex flex-col justify-start items-center">
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
          <SuperheroCard superhero={params.superhero} cover={params.cover} />
          {edit && (
            <div className="self-end m-t-4 flex flex-col justify-end  gap-4">
              {params.cover && (
                <button
                  onClick={() => params.deleteCover(params.cover!)}
                  className="self-end items-center p-1 rounded-lg text-gray-600 hover:underline hover:text-black"
                >
                  Delete cover
                </button>
              )}
              <input
                ref={coverFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverFileChange}
                className="sr-only hidden"
              />
              <button
                onClick={uploadCover}
                className="self-end items-center p-1 rounded-lg text-gray-600 hover:underline hover:text-black"
              >
                Upload cover
              </button>
              <button
                onClick={() => params.delete()}
                className="self-end items-center p-1 rounded-lg text-red-800 hover:underline hover:text-red-500"
              >
                Delete Entity?
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mb-16 border-t border-gray-300">
        <SuperheroGallery
          edit={edit}
          images={params.images}
          deleteImage={params.deleteImage}
          uploadImage={params.uploadImage}
        />
      </div>
    </div>
  );
}
