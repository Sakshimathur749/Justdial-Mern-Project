import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'; 
import '../../css/app.css';
import { useNavigate } from 'react-router-dom';

const VendorTable = () => {
  const [vendors, setVendors] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/vendors'); 
        if (!response.ok) {
          throw new Error('Failed to fetch vendors');
        }
        const data = await response.json();
        setVendors(data); 
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const handleView = (slug: string) => {
    navigate(`/vendor/${slug}`);
  };  

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:5000/api/vendor/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setVendors(vendors.filter((vendor: any) => vendor._id !== id)); 
    } else {
      console.error('Failed to delete vendor');
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  const columns = [
    {
      name: 'S.no',
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: (row: any) => row.fullName,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row: any) => row.mobileNumber,
      sortable: true,
    },
    {
      name: 'State',
      selector: (row: any) => row.state,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row: any) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: 'View',
      cell: (row: any) => (
        <button
          className="inline-flex items-center justify-center rounded bg-blue-500 p-4 text-center font-medium text-white hover:bg-opacity-90"
          onClick={() => handleView(row.slug)} 
        >
          View
        </button>
      ),
      sortable: false,
    },
    {
      name: 'Delete',
      cell: (row: any) => (
        <button
          className="inline-flex items-center justify-center rounded bg-red-500 p-4 text-center font-medium text-white hover:bg-opacity-90"
          onClick={() => handleDelete(row._id)}
        >
          Delete
        </button>
      ),
      sortable: false,
    },
  ];

  return (
    <div>
     <Breadcrumb pageName="Vendors" />
     <div className='d-flex justify-self-end'>
     <button className="inline-flex items-center justify-center rounded bg-blue-500 p-2 mb-4 text-center font-medium text-white hover:bg-opacity-90"><a href="/vendor/create">Add vendor</a></button>
     </div>
      <DataTable
        columns={columns}
        data={vendors}
        progressPending={loading} 
        pagination
        highlightOnHover
        pointerOnHover
        responsive
      />
    </div>
  );
};

export default VendorTable;