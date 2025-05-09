
export default function InfoField(params: {
  edit?: boolean;
  labelOptions?: any;
  inputOptions?: any;
}) {
  return (
    <div>
      <label
        {...params.labelOptions}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />
      <input
        {...params.inputOptions}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}