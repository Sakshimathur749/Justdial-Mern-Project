import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'; 
import '../../css/app.css';
import { useNavigate } from 'react-router-dom';

const PostedProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data)
        setProducts(data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 
  const handleEdit = (id: string) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setProducts(products.filter((product) => product._id !== id)); 
    } else {
      console.error('Failed to delete product');
    }
  };


  const columns = [
    {
      name: 'S.no',
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: 'Product Image',
      selector: (row: any) => (
        <img
          src={row.image ? `http://localhost:5173/src/images/uploads/${row.image}` : ''}
          alt={row.heading}
          style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
        />
      ),
      sortable: false,
    },
    {
      name: 'Category',
      selector: (row: any) => row.category,
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: 'Location',
      selector: (row: any) => row.location,
      sortable: true,
    },
    {
      name: 'Rating',
      selector: (row: any) => row.rating,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: 'Edit',
      cell: (row: any) => (
        <button
          className="inline-flex items-center justify-center rounded bg-meta-3 p-4 text-center font-medium text-white hover:bg-opacity-90"
          onClick={() => handleEdit(row._id)}
        >
          Edit
        </button>
      ),
      sortable: false,
    },
    {
      name: 'Delete',
      cell: (row: any) => (
        <button
          className="inline-flex items-center justify-center rounded bg-red p-4 text-center font-medium text-white hover:bg-opacity-90"
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
      <Breadcrumb pageName="Posted Products" />
      <DataTable
        columns={columns}
        data={products}
        progressPending={loading} 
        pagination
        highlightOnHover
        pointerOnHover
        responsive
      />
    </div>
  );
};

export default PostedProductsPage;
