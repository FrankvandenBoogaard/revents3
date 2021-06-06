export default function EventListItemPlaceholder() {
  return (
    <div className='bg-white shadow rounded-lg overflow-hidden mb-4'>
      <div className='animate-pulse flex space-x-4 p-4'>
        <div className='rounded-full bg-gray-200 h-12 w-12'></div>
        <div className='flex-1 space-y-4 py-1'>
          <div className='h-4 bg-gray-200 rounded w-3/6'></div>
          <div className='h-4 bg-gray-200 rounded w-2/6'></div>
        </div>
      </div>
      <div className='bg-gray-100'>
        <div className='animate-pulse flex-1 py-6 px-4 border-t border-gray-200'>
          <div className='h-3 bg-gray-200 rounded w-5/6'></div>
        </div>
      </div>
      <div className='animate-pulse flex-1 py-6 px-4 border-t border-gray-200'>
        <div className='h-3 bg-gray-200 rounded w-3/6'></div>
      </div>
      <div className='flex-1 bg-gray-100 py-10'></div>
      <div className='animate-pulse flex-1 space-y-4 py-6 px-4 border-t border-gray-200'>
        <div className='h-3 bg-gray-200 rounded w-5/6'></div>
        <div className='h-3 bg-gray-200 rounded w-3/6'></div>
      </div>
      <div className='bg-gray-100'>
        <div className='animate-pulse flex justify-end flex-1 space-y-4 py-6 px-4 border-t border-gray-200'>
          <div className='h-8 bg-gray-200 rounded w-1/6'></div>
        </div>
      </div>
    </div>
  );
}
