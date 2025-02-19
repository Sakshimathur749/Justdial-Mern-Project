import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'; 
import '../../css/app.css';
import { useNavigate } from 'react-router-dom';

const BusinessListingTable = () => {
  const [businessListings, setBusinessListings] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBusinessListings = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/business/listing'); 
        if (!response.ok) {
          throw new Error('Failed to fetch business listings');
        }
        const data = await response.json();
        setBusinessListings(data); 
      } catch (error) {
        console.error('Error fetching business listings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessListings();
  }, []);

  const handleEdit = (slug: string) => {
    navigate(`/bussinesslisting/${slug}`);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:5000/api/business/listing/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setBusinessListings(businessListings.filter((listing: any) => listing._id !== id));
    } else {
      console.error('Failed to delete business listing');
    }
  };

  const columns = [
    {
      name: 'S.no',
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: 'Business Name',
      selector: (row: any) => row.businessName,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row: any) => row.categoryId,
      sortable: true,
    },
    {
      name: 'Subcategory',
      selector: (row: any) => row.subcategoryId,
      sortable: true,
    },
    {
      name: 'Person Name',
      selector: (row: any) => row.personName,
      sortable: true,
    },
    {
      name: 'Edit',
      cell: (row: any) => (
        <button
        className="inline-flex items-center justify-center rounded bg-blue-500 p-4 text-center font-medium text-white hover:bg-opacity-90" onClick={() => handleEdit(row.slug)} 
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
      <Breadcrumb pageName="Business Listings" />
      <div className='d-flex justify-self-end'>
        <button className="inline-flex items-center justify-center rounded bg-blue-500 p-2 mb-4 text-center font-medium text-white hover:bg-opacity-90">
          <a href="/bussinesslisting/create">Add Business Listing</a>
        </button>
      </div>
      <DataTable
        columns={columns}
        data={businessListings}
        progressPending={loading}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
      />
    </div>
  );
};

export default BusinessListingTable;