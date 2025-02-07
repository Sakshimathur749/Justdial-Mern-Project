import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';

const Postingcategory = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const handleViewSubcategories = (categorySlug: string) => {
    console.log(`View subcategories for category with ID: ${categorySlug}`);
  };
  const handleCreateSubcategory = (categorySlug: string) => {
    console.log(`Create subcategory for category with ID: ${categorySlug}`);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (response.ok) {
          const data = await response.json();
          setTableData(data); 
        } else {
          setMessage({ text: 'Failed to fetch categories', type: 'error' });
        }
      } catch (error:any) {
        setMessage({ text: 'Error: ' + error.message, type: 'error' });
      }
    };
    fetchCategories();
  }, []);
  const handleEdit = (id: any) => {
    console.log(`Edit row with ID: ${id}`);
  };
  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedData = tableData.filter(item => item._id !== id); 
        setTableData(updatedData);
        setMessage({ text: 'Category and its subcategories deleted successfully!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to delete category', type: 'error' });
      }
    } catch (error: any) {
      setMessage({ text: 'Error: ' + error.message, type: 'error' });
    }
  };
  
  const columns = [
    {
      name: 'S.no',
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: 'Category Image',
      selector: (row: any) => (
        <img
          src={row.image ? `http://localhost:5173/src/images/category_uploads/${row.image}` : ''}
          alt={row.name}
          height={100}
          width={100} style={{objectFit:'contain',margin:'10px'}}
          className="rounded-lg border border-stroke shadow-sm"
        />
      ),
      sortable: false,
    },
    {
      name: 'Subcategories',
      selector: (row: any) => (
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <Link to={`/subcategory/${row.slug}`}>
          <button
            className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-6 text-center font-medium text-white hover:bg-opacity-90"
            onClick={() => handleViewSubcategories(row.slug)}
          >
            View 
          </button>
          </Link>
          <Link to='/post-subcategory'>
          <button
            className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-6 text-center font-medium text-white hover:bg-opacity-90"
            onClick={() => handleCreateSubcategory(row._id)}
          >
            Create
          </button>
          </Link>
        </div>
      ),
      sortable: false,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <Link to={`/edit-category/${row.slug}`}>
            <button
              className="inline-flex items-center justify-center rounded-full bg-meta-3 py-4 px-6 text-center font-medium text-white hover:bg-opacity-90"
              onClick={handleEdit}
            >
              Edit
            </button>
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-full bg-red py-4 px-6 text-center font-medium text-white hover:bg-opacity-90"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Posted Category" />
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}
      <DataTable
        columns={columns}
        data={tableData}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
      />
    </>
  );
};

export default Postingcategory;