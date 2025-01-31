import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';

const Postingcategory = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [message, setMessage] = useState({ text: '', type: '' });

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
        setMessage({ text: 'Category deleted successfully!', type: 'success' });
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
          src={row.image ? `http://localhost:5173/src/images/uploads/${row.image}` : ''}
          alt={row.name}
          style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
        />
      ),
      sortable: false,
    },
    {
      name: 'Subcategories',
      selector: (row: any) => row.subcategories.map((sub: any) => sub.name).join(', '),
      sortable: false,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="mb-7.5 flex flex-wrap gap-2">
          <Link to={`/edit-category/${row._id}`}>
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
