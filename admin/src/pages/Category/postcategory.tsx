import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Postcategory = () => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('imageType', 'category');
    if (imageFile) {
      formData.append('image', imageFile); 
    }
    formData.append('name', categoryName);
    try {
      const response = await fetch('http://localhost:5000/api/categories/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit category');
      }
      const data = await response.json();
      setSuccessModal(true);
      setCategoryName('');
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error:', error);
      setErrorModal(true); 
    }
  };
  return (
    <>
      <Breadcrumb pageName="Post Category" />

      {successModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">Success!</h4>
            <p>Your category has been successfully submitted.</p>
            <button
              onClick={() => setSuccessModal(false)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {errorModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">Error!</h4>
            <p>There was an issue with your submission. Please try again.</p>
            <button
              onClick={() => setErrorModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-col gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Post Category Form
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="px-6.5 w-full">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-5.5 p-6.5">
                <div className="w-full">
                  <label className="mb-3 block text-black dark:text-white">
                    Upload Image
                  </label>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none"
                  />
                </div>
                {imagePreview && (
                  <div className="px-6.5">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      height={80}
                      width={150} style={{objectFit:'contain'}}
                      className="rounded-lg border border-stroke shadow-sm"
                    />
                  </div>
                )}
              </div>

              <div className="mb-7.5 pl-15 flex flex-wrap gap-5 xl:gap-20">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postcategory;