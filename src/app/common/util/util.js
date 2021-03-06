export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function LoadingSpinner() {
  return (
    <span className='flex absolute h-5 w-5 inset-1/3 ml-1.5 -mt-1 z-10'>
      <svg
        className='animate-spin text-white'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='gray'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='dimgray'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
    </span>
  );
}

export function createDataTree(dataset) {
  let hashtable = Object.create(null);
  dataset.forEach((a) => (hashtable[a.id] = { ...a, childNodes: [] }));
  let dataTree = [];
  dataset.forEach((a) => {
    if (a.parentId) hashtable[a.parentId].childNodes.push(hashtable[a.id]);
    else dataTree.push(hashtable[a.id]);
  });
  return dataTree;
}
