// src/components/EditMemberDialog.tsx
import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from '@heroui/react';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import api from '@/api';

interface Member {
    _id: string;
    name: string;
    role: string;
    image: string;
    description: string;
}

interface EditMemberDialogProps {
    open: boolean;
    member: Member | null;
    onClose: () => void;
    onMemberUpdated: () => void;
}

const EditMemberDialog: React.FC<EditMemberDialogProps> = ({ open, member, onClose, onMemberUpdated }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (member) {
            setName(member.name);
            setRole(member.role);
            setImage(member.image);
            setDescription(member.description);
        }
    }, [member]);

    const handleSubmit = async () => {
        if (!member) return;
        setLoading(true);
        try {
            await api.put(`/members/${member._id}`, { name, role, image, description });
            onMemberUpdated();
            onClose();
        } catch (err) {
            console.error('Update error:', err);
        }
        setLoading(false);
    };

    return (
        <Drawer isOpen={open} onOpenChange={onClose}>
            <DrawerContent>
                {(close) => (
                    <>
                        <DrawerHeader>Edit Member</DrawerHeader>
                        <DrawerBody className="flex flex-col gap-4">
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
                        </DrawerBody>
                        <DrawerFooter className="flex justify-end gap-2">
                            <Button variant="flat" onPress={close}>Cancel</Button>
                            <Button onPress={handleSubmit} disabled={loading}>
                                {loading ? 'Saving…' : 'Save'}
                            </Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
};

export default EditMemberDialog;
