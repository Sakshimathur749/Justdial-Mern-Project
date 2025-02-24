import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'; 
import '../../../../admin/src/css/app.css';

const MembershipPlan = () => {
  const columns = [
    {
      name: 'S.no',
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: 'Validity Data',
      selector: (row: any) => row.validity,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <button
        className="inline-flex items-center justify-center rounded bg-blue-500 p-4 text-center font-medium text-white hover:bg-opacity-90"
        >
          Edit
        </button>
      ),
      sortable: false,
    },
  ];

  return (
    <div>
      <Breadcrumb pageName="Membership Package Plan" />
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