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
        const filteredVendors = data.filter(
          (vendor: any) => vendor.role === 'vendor',
        );
        setVendors(filteredVendors);
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
  return (
    <div>
      <Breadcrumb pageName="Vendors" />
      <div className="d-flex justify-self-end">
        <button className="inline-flex items-center justify-center rounded bg-blue-500 p-2 mb-4 text-center font-medium text-white hover:bg-opacity-90">
          <a href="/vendor/create">Add vendor</a>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {vendors?.map((vendor: any) => (
          <div
            key={vendor._id}
            className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <p className="text-title-md font-semibold text-black dark:text-white">
              {vendor.username}
            </p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <span className="text-sm font-medium">
                  {vendor.mobileNumber}
                  <br />
                </span>
                <span className="text-sm font-medium">
                  {' '}
                  {vendor.address} {vendor.city}
                </span>
              </div>
              <div className="flex gap-3">
                <button className="inline-flex items-center justify-center rounded bg-blue-500 p-4 text-center font-medium text-white hover:bg-opacity-90"
                  onClick={() => handleView(vendor.slug)}>
                  View
                </button>
                <button className="inline-flex items-center justify-center rounded bg-red-500 p-4 text-center font-medium text-white hover:bg-opacity-90"
                  onClick={() => handleDelete(vendor._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <DataTable
        columns={columns}
        data={vendors}
        progressPending={loading} 
        pagination
        highlightOnHover
        pointerOnHover
        responsive
      /> */}
    </div>
  );
};

export default VendorTable;