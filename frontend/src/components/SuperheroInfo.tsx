import InfoField from "@/components/InfoField";
import { editableFromSuperhero, EditableSuperhero, Superhero, superheroFromEditable } from "@/entities/Superhero";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SuperheroInfo(params: {
  edit?: boolean;
  onFormSubmit?: Function;
  superhero: Superhero;
  images?: Array<string>;
}) {

  const form = useForm<EditableSuperhero>({
    defaultValues: editableFromSuperhero(params.superhero),
  });

  const onSubmit: SubmitHandler<EditableSuperhero> = (data) => {
    const superhero = superheroFromEditable(data);
    if (params.onFormSubmit) params.onFormSubmit(superhero);
    console.log("SuperheroInfo, onSubmit", superhero);
  };

  return (<div className="p-8 p-t-4">

      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >

        {Object.entries(params.superhero).map(([key, value]) => (

          <InfoField
            key={"superhero_prop_" + key}
            edit={params.edit}
            value={value}
            labelOptions={{
              htmlFor: key,
              children: key,
            }}
            inputOptions={{
              type: "text",
            }}
          />

        ))}

      </form>

  </div>);
}

/*



<div class="grid gap-4">
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt="">
    </div>
    <div class="grid grid-cols-5 gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="">
        </div>
    </div>
</div>


*/