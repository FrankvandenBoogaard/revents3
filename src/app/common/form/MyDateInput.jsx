import { useField, Field, useFormikContext } from "formik";
import { XCircleIcon } from "@heroicons/react/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDateInput({ label, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <Field name={field.name}>
      {({ field, meta, helpers }) => (
        <div className='col-span-6'>
          <DatePicker
            className={
              meta.touched && !!meta.error
                ? "px-3 py-2 border mt-1 focus:ring-red-500 focus:border-red-500 border-red-300 bg-red-50 block w-full shadow-sm sm:text-sm  rounded-md"
                : "px-3 py-2 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 block w-full shadow-sm sm:text-sm  rounded-md"
            }
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(value) => setFieldValue(field.name, value)}
          />
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
  );
}
