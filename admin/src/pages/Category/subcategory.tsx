import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Subcategory = () => {
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const { categorySlug } = useParams<{ categorySlug: string }>();
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/subcategories/${categorySlug}`);
        if (response.ok) {
          const data = await response.json();
          setSubcategories(data);
        } else {
          setErrorModal(true); 
        }
      } catch (error: any) {
        setErrorModal(true);      
      }
    };
    if (categorySlug) {
      fetchSubcategories();
    }
  }, [categorySlug]);
  
  const handleDelete = async (id: any) => {
      if (window.confirm("Are you sure you want to delete this subcategory?")) {
        try {
          const response = await fetch(`http://localhost:5000/api/subcategories/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            const updatedData = subcategories.filter(item => item._id !== id);
            setSubcategories(updatedData);
            setSuccessModal(true);
          } else {
            setErrorModal(true); 
          }
        } catch (error: any) {
          setErrorModal(true); 
        }
      }    
  };
  const columns = [
    {
      name: 'S.no',
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: 'Subcategory Name',
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: 'Subcategory Image',
      selector: (row: any) => (
        <img
          src={row.image ? `http://localhost:5173/src/images/subcategory_uploads/${row.image}` : ''}
          alt={row.name}
          height={100}
          width={100} style={{objectFit:'contain',margin:'10px'}}
          className="rounded-lg border border-stroke shadow-sm"
        />
      ),
      sortable: false,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <Link to={`/edit-subcategory/${row.slug}`}>
            <button
              className="inline-flex items-center justify-center rounded-full bg-meta-3 py-4 px-6 text-center font-medium text-white hover:bg-opacity-90"
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
     <Breadcrumb pageName="SubCategory" />
      
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
      <DataTable
        columns={columns}
        data={subcategories}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
      />
    </>
  );
};

export default Subcategory;