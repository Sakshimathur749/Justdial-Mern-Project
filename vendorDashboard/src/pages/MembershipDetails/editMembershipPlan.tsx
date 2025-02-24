import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';

const EditMembershipPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<any>('');
  const [price, setPrice] = useState<any>('');
  const [validity, setValidity] = useState<any>('');
  const [features, setFeatures] = useState<any[]>(['']);
  useEffect(() => {
    if (id) {
      const fetchedPlan = {
        title: 'Premium Membership',
        price: 199,
        validity: '12 months',
        features: ['Feature 1', 'Feature 2']
      };
      setTitle(fetchedPlan.title);
      setPrice(fetchedPlan.price);
      setValidity(fetchedPlan.validity);
      setFeatures(fetchedPlan.features);
    }
  }, [id]);
  const handleFeatureChange = (index:any, event:any) => {
    const values = [...features];
    values[index] = event.target.value;
    setFeatures(values);
  };
  const addFeature = () => {
    setFeatures([...features, '']);
  };
  const removeFeature = (index:any) => {
    const values = [...features];
    values.splice(index, 1);
    setFeatures(values);
  };
  const handleSubmit = (event:any) => {
    event.preventDefault();
    const membershipData = { title, price, validity,features};
    console.log('Submitted membership data:', membershipData);
    navigate('/membership-plan');
  };

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Edit Membership Plan" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Title</label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Price</label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
       <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Validity</label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter validity"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            required
          />
        </div>
         <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Features</label>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e)}
                placeholder={`Feature ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-600 hover:text-blue-700 mt-2"
          >
            Add Feature
          </button>
        </div>
      <button
          type="submit"
          className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMembershipPlan;