import { useField, Field } from "formik";
import { XCircleIcon } from "@heroicons/react/solid";
import { categoryData } from "../../api/categoryOptions";

export default function MySelectInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className='col-span-6'>
      <Field name={field.name}>
        {({ field, meta }) => (
          <div>
            <select
              id='location'
              className={
                meta.touched && !!meta.error
                  ? "px-3 py-2 border mt-1 focus:ring-red-500 focus:border-red-500 border-red-300 bg-red-50 block w-full shadow-sm sm:text-sm  rounded-md"
                  : "px-3 py-2 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 block w-full shadow-sm sm:text-sm  rounded-md"
              }
              type='text'
              {...field}
              {...props}
            >
              {categoryData.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            {meta.touched && meta.error && (
              <div className='flex pl-1'>
                <div className='flex-shrink-0'>
                  <XCircleIcon
                    className='h-5 w-5 text-red-400'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-red-800'>
                    {meta.error}
                  </h3>
                </div>
              </div>
            )}
          </div>
        )}
      </Field>
    </div>
  );
}
