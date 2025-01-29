import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'; // Import your Breadcrumb component
import '../../css/app.css';

const PostedProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts([
        {
          id: '1',
          image: 'https://img.freepik.com/premium-vector/chef-restaurant-logo-stock-illustrations-template_83529-158.jpg',
          category: "Restaurants",
          title: "Dilip Fast Food",
          location: "10922 Kinross Ave Los Angeles, CA 90024",
          rating: 1,
          number: "9123456780",
          status: "active",
          relevantTags: "#opened",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Edit product with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete product with ID: ${id}`);
    setProducts(products.filter((product) => product.id !== id));
  };

  const columns = [
    {
      name: 'S.no',
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: 'Product Image',
      selector: (row: any) => (
        <img
          src={row.image}
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
          onClick={() => handleEdit(row.id)}
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
          onClick={() => handleDelete(row.id)}
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
