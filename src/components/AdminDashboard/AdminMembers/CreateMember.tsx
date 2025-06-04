// src/components/CreateMember.tsx
import React, { useState } from 'react';
import { Input, Textarea, Spacer } from '@heroui/react';
import { Button } from '@heroui/button';
import api from '@/api';

interface CreateMemberProps {
    onCancel: () => void;
    onCreated: () => void;
}

const CreateMember: React.FC<CreateMemberProps> = ({ onCancel, onCreated }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        // Basit front‑end validasyon
        if (!name.trim() || !role.trim() || !image.trim() || !description.trim()) {
            return alert('Lütfen tüm alanları doldurun.');
        }

        setLoading(true);
        try {
            await api.post('/members', { name, role, image, description });
            onCreated();
        } catch (err: any) {
            console.error('Member create error:', err);
            console.error('🚨 createMember response data:', err.response?.data);
            alert('Üye kaydedilirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 mt-6 max-w-screen-md">
            <div className="flex flex-col gap-4">
                <Input
                    label="Name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    label="Role"
                    name="role"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                />
                <Input
                    label="Image Path"
                    name="image"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />
                <Textarea
                    label="Description"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={6}
                />
                <Spacer />
                <div className="flex justify-end gap-4">
                    <Button variant="flat" color="danger" onPress={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="flat"
                        color="success"
                        onPress={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Saving…' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateMember;
