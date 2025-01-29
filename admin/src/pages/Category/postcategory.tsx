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
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); 
    }
  };
  const handleSubmit = () => {
    const isSuccessful = true;

    if (isSuccessful) {
      setSuccessModal(true);
    } else {
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

      <div className="grid grid-col gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full flex flex-col gap-5.5 p-6.5">
                <div className="w-full ">
                  <label className="mb-3  block text-black dark:text-white">
                    Upload Image
                  </label>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
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
                  <label className="mb-3 block text-black dark:text-white">
                    Subcategories
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={subcategoryInput}
                      onChange={handleSubcategoryChange}
                      placeholder="Add Subcategory"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black"
                    />
                    <button
                      onClick={handleAddSubcategory}
                      className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium">Added Subcategories:</h4>
                    {subcategories.map((subcategory, index) => (
                      <li
                        key={index}
                        className="border border-gray-400 rounded px-4 py-2 flex justify-between items-center"
                      >
                        {editSubcategoryIndex === index ? (
                          <>
                            <input
                              type="text"
                              value={editSubcategoryInput}
                              onChange={(e) =>
                                setEditSubcategoryInput(e.target.value)
                              }
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5"
                            />
                            <button
                              onClick={handleSaveEditSubcategory}
                              className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <h4 className="text-xl">{subcategory}</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditSubcategory(index)}
                                className="bg-meta-3 text-white px-4 py-2 rounded hover:bg-blue-600"
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
                          </>
                        )}
                      </li>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-7.5 pl-15 flex flex-wrap gap-5 xl:gap-20">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Toggle switch input -->
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Toggle switch input
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SwitcherOne />
              <SwitcherTwo />
              <SwitcherThree />
              <SwitcherFour />
            </div>
          </div> */}

          {/* <!-- Time and date --> */}
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Time and date
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <DatePickerOne />
              <DatePickerTwo />
            </div>
          </div> */}

          {/* <!-- File upload --> */}
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                File upload
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex flex-col gap-9"></div>
      </div>
    </>
  );
};

export default Postcategory;
{/* <!-- Textarea Fields --> */}
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Textarea Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Default textarea
                </label>
                <textarea
                  rows={6}
                  placeholder="Default textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Active textarea
                </label>
                <textarea
                  rows={6}
                  placeholder="Active textarea"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Disabled textarea
                </label>
                <textarea
                  rows={6}
                  disabled
                  placeholder="Disabled textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                ></textarea>
              </div>
            </div>
          </div> */}

          {/* <!-- Checkbox and radio --> */}
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Checkbox and radio
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <CheckboxOne />
              <CheckboxTwo />
              <CheckboxThree />
              <CheckboxFour />
              <CheckboxFive />
            </div>
          </div> */}

          {/* <!-- Select input --> */}
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Select input
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupTwo />
              <MultiSelect id="multiSelect" />
            </div>
          </div> */}