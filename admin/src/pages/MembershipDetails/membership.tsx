import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'; 
import '../../css/app.css';
import { Link, useNavigate } from 'react-router-dom';

const MembershipPlan = () => {
  const columns = [
    {
      name: 'S.no',
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: 'User Name',
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: any) => row.validity,
      sortable: true,
    },
    {
      name: 'Membership',
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: 'Bussiness name',
      selector: (row: any) => row.validity,
      sortable: true,
    },
    {
      name: 'Category name',
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row: any) => row.validity,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: 'Expiery Date',
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <Link to={"/edit-membership-plan"}>
            <button className="inline-flex items-center justify-center rounded-full bg-meta-3 py-4 px-6 text-center font-medium text-white hover:bg-opacity-90">
              Edit
            </button>
          </Link>
          <button className="inline-flex items-center justify-center rounded-full bg-red py-4 px-6 text-center font-medium text-white hover:bg-opacity-90">
            Delete
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div>
      <Breadcrumb pageName="Membership Package" />
      <DataTable
        columns={columns}
        data={columns}
        progressPending
        pagination
        highlightOnHover
        pointerOnHover
        responsive
      />
    </div>
  );
};

export default MembershipPlan;