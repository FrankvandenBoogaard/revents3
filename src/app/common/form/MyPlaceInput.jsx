import { useField, Field } from "formik";
import { XCircleIcon } from "@heroicons/react/solid";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import cuid from "cuid";

export default function MyPlaceInput({ label, options, ...props }) {
  const [field, meta, helpers] = useField(props);

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helpers.setValue({ address, latLng }))
      .catch((error) => helpers.setError(error));
  }

  function handleBlur(e) {
    field.onBlur(e);
    if (!field.value.latLng) {
      helpers.setValue({address: '', latLng: null})
    }
  }

  return (
    <PlacesAutocomplete
      value={field.value["address"]}
      onChange={(value) => helpers.setValue({ address: value })}
      onSelect={(value) => handleSelect(value)}
      searchOptions={options}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className='col-span-6'>
          <div>
            <Field name={field.name}>
              {({ field, meta }) => (
                <div>
                  <input
                    className={
                      meta.touched && !!meta.error
                        ? "px-3 py-2 border mt-1 focus:ring-red-500 focus:border-red-500 border-red-300 bg-red-50 block w-full shadow-sm sm:text-sm  rounded-md"
                        : "px-3 py-2 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 block w-full shadow-sm sm:text-sm  rounded-md"
                    }
                    type='text'
                    {...getInputProps({
                      name: field.name,
                      onBlur: (e) => handleBlur(e),
                      ...props,
                      // placeholder: "Search Places ...",
                    })}
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
                          {meta.error['address']}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Field>
          </div>
          <div className='absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active text-white bg-indigo-600 cursor-pointer py-2 pl-3 pr-9"
                : "suggestion-item text-gray-900 bg-white cursor-pointer py-2 pl-3 pr-9";

              return (
                <div
                  key={cuid()}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                  })}
                >
                  <>
                    <div className='font-semibold'>
                      {suggestion.formattedSuggestion.mainText}
                    </div>
                    <div>{suggestion.formattedSuggestion.secondaryText}</div>
                  </>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
