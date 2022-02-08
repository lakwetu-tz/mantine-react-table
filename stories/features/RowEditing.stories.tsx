import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Row Editing Examples',
  parameters: {
    status: {
      type: 'beta',
    },
  },
};

export default meta;

const data = [...Array(10)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const RowEditingEnabled: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
    setTableData([...tableData]);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
          editable: true,
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          editable: true,
        },
        {
          Header: 'Address',
          accessor: 'address' as const,
          editable: true,
        },
        {
          Header: 'State',
          accessor: 'state' as const,
          editable: true,
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber' as const,
          editable: true,
        },
      ]}
      data={tableData}
      enableRowActions
      enableRowEditing
      onRowEditSubmit={handleSaveRow}
    />
  );
};

export const RowEditingWithValidation: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [firstNameError, setFirstNameError] = useState<string | boolean>(false);
  const [lastNameError, setLastNameError] = useState<string | boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<string | boolean>(false);

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
    setTableData([...tableData]);
  };

  const validateFirstName = (value: string) => {
    if (value.length === 0) return 'First name is required';
    return false;
  };

  const validateLastName = (value: string) => {
    if (value.length === 0) return 'Last name is required';
    return false;
  };

  const validatePhoneNumber = (value: string) => {
    if (value.length === 0) return 'Phone number is required';
    if (!value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)) return 'Invalid phone number';
    return false;
  };

  return (
    <MaterialReactTable
      columns={[
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
          editable: true,
          muiTableBodyCellEditTextFieldProps: {
            error: !!firstNameError,
            helperText: firstNameError,
          },
          onCellEditChange: (event) => {
            setFirstNameError(validateFirstName(event.target.value));
          },
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          editable: true,
          muiTableBodyCellEditTextFieldProps: {
            error: !!lastNameError,
            helperText: lastNameError,
          },
          onCellEditChange: (event) => {
            setLastNameError(validateLastName(event.target.value));
          },
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber' as const,
          editable: true,
          muiTableBodyCellEditTextFieldProps: {
            error: !!phoneNumberError,
            helperText: phoneNumberError,
          },
          onCellEditChange: (event) => {
            setPhoneNumberError(validatePhoneNumber(event.target.value));
          },
        },
      ]}
      data={tableData}
      onSaveRow={handleSaveRow}
      enableRowActions
      enableRowEditing
      onRowEditSubmit={handleSaveRow}
    />
  );
};

export const RowEditingEnabledAsync: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRow = async (row) => {
    setIsSaving(true);
    await setTimeout(() => {
      tableData[+row.index] = row.values;
      setTableData([...tableData]);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
          editable: true,
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          editable: true,
        },
        {
          Header: 'Address',
          accessor: 'address' as const,
          editable: true,
        },
        {
          Header: 'State',
          accessor: 'state' as const,
          editable: true,
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber' as const,
          editable: true,
        },
      ]}
      data={tableData}
      enableRowActions
      enableRowEditing
      isFetching={isSaving}
      onRowEditSubmit={handleSaveRow}
    />
  );
};
