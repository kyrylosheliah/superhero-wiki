import InfoField from "@/components/InfoField";

export default function SuperheroInfo(params: {
  edit?: boolean,
  formOptions: any,
}) {
  return (<div>

      <form {...params.formOptions}>

        <InfoField
          edit={params.edit}
        />

      </form>

  </div>);
}