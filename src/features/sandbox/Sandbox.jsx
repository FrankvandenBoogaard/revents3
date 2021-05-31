import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../app/common/modals/modalReducer";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  const [location, setLocation] = useState(defaultProps);

  function handleSetLocation(latLng) {
    setLocation({...location, center: {lat: latLng.lat, lng:latLng.lng}})
  }

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <button
        type='submit'
        className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        onClick={() => dispatch(increment(20))}
      >
        Increment
      </button>
      <button
        type='submit'
        className='inline-flex items-center justify-center ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-yellow-400 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
        onClick={() => dispatch(decrement(1))}
      >
        Decrement
      </button>
      <button
        type='submit'
        className='inline-flex items-center justify-center ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-green-400 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
      >
        Open Modal
      </button>
      <div className='mt-4'>
        <TestPlaceInput setLocation={handleSetLocation} />
        <TestMap location={location} />
      </div>
    </>
  );
}
