import  { useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../css/app.css';
import { Link } from 'react-router-dom';

const Postingcategory = () => {
  const [tableData, setTableData] = useState([
    {
      id: '1',
      category: 'Restaurant',
      imageUrl: 'https://img.freepik.com/premium-vector/chef-restaurant-logo-stock-illustrations-template_83529-158.jpg',
      subcategories: ['Italian', 'Chinese'], 
    },
  ]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const handleEdit = (id: any) => {
    console.log(`Edit row with ID: ${id}`);
  };

  const handleDelete = (id:any) => {
    const updatedData = tableData.filter(item => item.id !== id);
    setTableData(updatedData);
    setMessage({ text: 'Category deleted successfully!', type: 'success' });
  };

  const columns = [
    {
      name: 'S.no',
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row: any) => row.category,
      sortable: true,
    },
    {
      name: 'Category Image',
      selector: (row: any) => (
        <img
          src={row.imageUrl}
          alt={row.category}
          style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
        />
      ),
      sortable: false,
    },
    {
      name: 'Subcategories',
      selector: (row:any) => row.subcategories.join(', '),
      sortable: false,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="mb-7.5 flex flex-wrap gap-2">
           <Link to={`/edit-category/${row.id}`}>
            <button
              className="inline-flex items-center justify-center rounded-full bg-meta-3 py-4 px-6 text-center font-medium text-white hover:bg-opacity-90" onClick={handleEdit}
            >
              Edit
              </button>
              </Link>
              <button 
              className="inline-flex items-center justify-center rounded-full bg-red py-4 px-6 text-center font-medium text-white hover:bg-opacity-90" onClick={handleDelete}
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
