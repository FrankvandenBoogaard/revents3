import { useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import cuid from "cuid";
import { delay, getFileExtension, LoadingSpinner } from "../util/util";
import { uploadToFirebaseStorage } from "../../firestore/firebaseService";
import { toast } from "react-toastify";
import { updateUserProfilePhoto } from "../../firestore/firestoreService";

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
export default function PhotoUploadWidget({ setEditMode }) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(null);

  function handleUploadImage() {
    setLoading(true);
    const filename = cuid() + "." + getFileExtension(files[0].name);
    const uploadTask = uploadToFirebaseStorage(image, filename);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "% done");
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  }

  async function handleCancelCrop() {
    setLoading(true);
    await delay(1000);
    setLoading(false);
    setFiles([]);
    setImage(null);
  }

  return (
    <>
      <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
        <div className='sm:col-span-2'>
          <label
            htmlFor='cover_photo'
            className='block text-sm font-medium text-gray-700'
          >
            Step 1 - Add Photo
          </label>
          <PhotoWidgetDropzone setFiles={setFiles} />
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='cover_photo'
            className='block text-sm font-medium text-gray-700'
          >
            Step 2 - Resize
          </label>
          {files.length > 0 && (
            <div
              className='flex justify-center'
              style={{ minHeight: 300, width: "100%" }}
            >
              <div className='space-y-1 text-center'>
                <PhotoWidgetCropper
                  setImage={setImage}
                  imagePreview={files[0].preview}
                />
              </div>
            </div>
          )}
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='cover_photo'
            className='block text-sm font-medium text-gray-700'
          >
            Step 3 - Review & Upload
          </label>
          {files.length > 0 && (
            <div className='flex justify-center'>
              <div className='space-y-1 text-center'>
                <li
                  // key={person.email}
                  className='col-span-1 flex flex-col text-center bg-white divide-y divide-gray-200'
                >
                  <div className='flex-1 flex flex-col '>
                    <div
                      className='img-preview flex-shrink-0 mx-auto bg-black rounded-md'
                      style={{
                        minHeight: 280,
                        minWidth: 280,
                        overflow: "hidden",
                      }}
                    />
                  </div>{" "}
                  <div className='pt-5'>
                    <div className='flex justify-center'>
                      <span className='relative inline-flex w-full'>
                        <button
                          name='delete'
                          type='submit'
                          className='bg-indigo-400 w-full py-2 px-4 border border-transparant rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          disabled = {loading}
                          onClick={(e) => {
                            setTarget(e.target.name);
                            handleCancelCrop();
                          }}
                        >
                          Delete
                        </button>
                        {loading && target === "delete" && <LoadingSpinner />}
                      </span>
                      <span className='relative inline-flex w-full'>
                        <button
                          name='save'
                          type='submit'
                          className='ml-3 w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          onClick={(e) => {
                            setTarget(e.target.name);
                            handleUploadImage();
                          }}
                        >
                          Save
                        </button>
                        {loading && target === "save" && <LoadingSpinner />}
                      </span>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
