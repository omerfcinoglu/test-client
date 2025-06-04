// src/pages/AdminLogin.tsx
import React from 'react';
import { Card, CardBody } from '@heroui/react';
import AdminPanelLayout from '@/layouts/adminPanelLayout';
import LoginForm from './components/LoginForm';

const AdminLogin: React.FC = () => {
    return (
        <AdminPanelLayout hideNavbar={true}>
            <Card className="max-w-lg mx-auto my-20 w-2/4">
                <CardBody className="flex items-center justify-center">
                    <LoginForm />
                </CardBody>
            </Card>
        </AdminPanelLayout>
    );
}

export default AdminLogin;
