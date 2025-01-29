import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../css/app.css';

const EditCategory = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(''); 
  const navigate = useNavigate();
  const [category, setCategory] = useState<any>({
    id: '',
    category: '',
    imageUrl: '',
    subcategories: [],
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); 
        setImageUrl('');
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    const fetchedCategory = {
      id: '1',
      category: 'Restaurant',
      imageUrl: 'https://img.freepik.com/premium-vector/chef-restaurant-logo-stock-illustrations-template_83529-158.jpg',
      subcategories: ['Italian', 'Chinese'],
    };

    if (fetchedCategory.id === id) {
      setCategory(fetchedCategory);
      setImagePreview(fetchedCategory.imageUrl);
      setImageUrl(fetchedCategory.imageUrl); 
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Category:', category);
    navigate('/posted-category');
  };

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Edit Category" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-white">
            Category Name
          </label>
          <input
            id="category"
            type="text"
            value={category.category}
            onChange={(e) => setCategory({ ...category, category: e.target.value })}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange} 
            className="mt-2 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent py-2 px-3 text-sm text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {imagePreview && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Image Preview</label>
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-2 w-full max-w-xs rounded-lg border border-gray-300 shadow-md"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="subcategories" className="block text-sm font-medium text-gray-700 dark:text-white">
            Subcategories (comma separated)
          </label>
          <input
            id="subcategories"
            type="text"
            value={category.subcategories.join(', ')}
            onChange={(e) => setCategory({ ...category, subcategories: e.target.value.split(',').map((sub) => sub.trim()) })}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCategory;