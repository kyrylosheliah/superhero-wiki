export default function InfoField(params: {
  edit?: boolean;
  value: any;
  labelOptions?: any;
  inputOptions?: any;
}) {
  return (
    <div>
      <label
        {...params.labelOptions}
        className="block mt-4 text-sm fw-700 text-gray-900"
      />
      {params.edit ? (
        <input
          {...params.inputOptions}
          value={params.value}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      )
      : (
        <p>
          {Array.isArray(params.value) ? (params.value.join(", ")) : (params.value)}
        </p>
      )}
    </div>
  );
}