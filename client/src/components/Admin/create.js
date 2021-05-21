import React from 'react';
import { Create, UrlField, DisabledInput, SimpleForm, TextInput } from 'react-admin';

export const UserCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="username" />
        <TextInput source="email" />
        <TextInput source="address.street" label="Address" />
        <TextInput source="phone" />
        <UrlField source="website" />
        <TextInput source="company.name" label="Company" />
      </SimpleForm>
    </Create>
  );