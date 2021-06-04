import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../app/common/modals/modalReducer";
import { LoadingSpinner } from "../../app/common/util/util";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  const [location, setLocation] = useState(defaultProps);

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
  }

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <span class='relative inline-flex ml-2 rounded-md shadow-sm'>
        <button
          name='increment'
          type='submit'
          className='inline-flex items-center justify-center w-24 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          onClick={(e) => {
            dispatch(increment(20));
            setTarget(e.target.name);
          }}
        >
          Increment
        </button>
        {loading && target === 'increment' && <LoadingSpinner />}
      </span>
      <span class='relative inline-flex ml-2 rounded-md shadow-sm'>
        <button
          name='decrement'
          type='submit'
          className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-yellow-400 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
          onClick={(e) => {
            dispatch(decrement(1));
            setTarget(e.target.name);
          }}
        >
          Decrement
        </button>
        {loading && target === 'decrement' && <LoadingSpinner />}
      </span>
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
