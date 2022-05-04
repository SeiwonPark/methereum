import React from 'react';
import { AdminController } from '../components/AdminController';

export function AdminPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: '50%',
      }}
    >
      <AdminController />
    </div>
  );
}
