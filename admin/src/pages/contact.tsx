import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const ContactDetails = () => {
  const API_URL='http://localhost:5000'
  const [tableData, setTableData] = useState<any[]>([]);
  const [message, setMessage] = useState<any>({ text: '', type: '' });
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(API_URL+'/api/contact');
        if (response.ok) {
          const data = await response.json();
          setTableData(data);
        } else {
          setMessage({ text: 'Failed to fetch contact details', type: 'error' });
        }
      } catch (error:any) {
        setMessage({ text: 'Error: ' + error.message, type: 'error' });
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (contactId:any) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${contactId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTableData(prevData => prevData.filter(contact => contact._id !== contactId));
        setMessage({ text: 'Contact deleted successfully', type: 'success' });
      } else {
        setMessage({ text: 'Failed to delete contact', type: 'error' });
      }
    } catch (error:any) {
      setMessage({ text: 'Error: ' + error.message, type: 'error' });
    }
  };

  // Columns configuration for DataTable
  const columns = [
    {
      name: 'S.no',
      selector: (row:any, index:any) => index + 1,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row:any) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row:any) => row.email,
      sortable: true,
    },
    {
      name: 'Message',
      selector: (row:any) => row.message,
      sortable: true,
    },
    {
      name: 'Mobile Number',
      selector: (row:any) => row.mobilenumber,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row:any) => (
        <button
          className="inline-flex items-center justify-center rounded bg-red p-4 text-center font-medium text-white hover:bg-opacity-90"
          onClick={() => handleDelete(row._id)}
        >
          Delete
        </button>
      ),
      button: true,
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Contact Details" />
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

export default ContactDetails;
