import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Postcategory = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [subcategoryInput, setSubcategoryInput] = useState<string>('');
  const [editSubcategoryIndex, setEditSubcategoryIndex] = useState<number | null>(null);
  const [editSubcategoryInput, setEditSubcategoryInput] = useState<string>('');
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryData, setCategoryData] = useState<any>(null); 

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubcategoryInput(e.target.value);
  };

  const handleAddSubcategory = () => {
    if (subcategoryInput && !subcategories.includes(subcategoryInput)) {
      setSubcategories([...subcategories, subcategoryInput]);
      setSubcategoryInput('');
    }
  };

  const handleRemoveSubcategory = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const handleEditSubcategory = (index: number) => {
    setEditSubcategoryIndex(index);
    setEditSubcategoryInput(subcategories[index]);
  };

  const handleSaveEditSubcategory = () => {
    if (editSubcategoryInput) {
      const updatedSubcategories = [...subcategories];
      updatedSubcategories[editSubcategoryIndex!] = editSubcategoryInput;
      setSubcategories(updatedSubcategories);
      setEditSubcategoryIndex(null);
      setEditSubcategoryInput('');
    }
  };

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

    if (imageFile) {
      formData.append('image', imageFile);  
    }
  
    formData.append('name', categoryName);
    formData.append('subcategories', subcategories.join(','));
  
    try {
      const response = await fetch('http://localhost:5000/api/categories/create', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit category');
      }
      
      const data = await response.json();
      setCategoryData(data);
      setSuccessModal(true); 
      setCategoryName('');
      setSubcategories([]);
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
      {/* Success Modal */}
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

      {/* Error Modal */}
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
              <h3 className="font-medium text-black dark:text-white">Post Category Form</h3>
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
                  <label className="mb-3 block text-black dark:text-white">Upload Image</label>
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
                      height={50}
                      width={50}
                      className="rounded-lg border border-stroke shadow-sm"
                    />
                  </div>
                )}
                <div className="w-full flex flex-col gap-2">
                  <label className="mb-3 block text-black dark:text-white">Subcategories</label>
                  <div className="flex gap-3 width-full">
                    <input
                      type="text"
                      value={subcategoryInput}
                      onChange={handleSubcategoryChange}
                      placeholder="Add Subcategory"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black"
                    />
                    <button
                      onClick={handleAddSubcategory}
                      className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium">Added Subcategories:</h4>
                    {subcategories.map((subcategory, index) => (
                      <li key={index} className="border border-gray-400 rounded px-4 py-2 flex justify-between items-center">
                        {editSubcategoryIndex === index ? (
                          <div className="flex gap-3">
                            <input
                              type="text"
                              value={editSubcategoryInput}
                              onChange={(e) => setEditSubcategoryInput(e.target.value)}
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black"
                            />
                            <button
                              onClick={handleSaveEditSubcategory}
                              className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-between w-full">
                            <h4 className="text-xl">{subcategory}</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditSubcategory(index)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleRemoveSubcategory(index)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </div>
                </div>
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