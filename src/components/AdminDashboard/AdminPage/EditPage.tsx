// src/pages/components/EditPage.tsx
import React, { useState } from 'react';
import { Input } from '@heroui/input';
import { Button, Spacer } from '@heroui/react';
import api from '@/api';
import Editor from '@/components/RichTextEditor/Editor';

interface EditPageProps {
    page: {
        _id: string;
        title: string;
        content: string;
    };
    onCancel: () => void;
    onUpdated: () => void;
}

const EditPage: React.FC<EditPageProps> = ({ page, onCancel, onUpdated }) => {
    const [title, setTitle] = useState(page.title);
    const [content, setContent] = useState(page.content);
    const [saving, setSaving] = useState(false);

    const handleUpdate = async () => {
        if (!title.trim()) {
            return alert('Başlık boş bırakılamaz.');
        }
        setSaving(true);
        try {
            await api.put(`/pages/${page._id}`, { title, content });
            onUpdated();
        } catch (err: any) {
            console.error('Page update error:', err.response?.data || err);
            alert(err.response?.data?.message || 'Güncelleme hatası');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container mx-auto px-4 mt-6 max-w-screen-xl">
            <div className="flex flex-col gap-4">
                <Input
                    label="Sayfa Başlığı"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <Spacer />

                <Editor
                    content={content}
                    editable={true}
                    onDataChange={(newContent: string) => setContent(newContent)}
                />

                <Spacer />

                <div className="flex justify-end gap-4">
                    <Button variant="flat" color="danger" onPress={onCancel}>
                        İptal
                    </Button>
                    <Button
                        variant="flat"
                        color="primary"
                        onPress={handleUpdate}
                        disabled={saving}
                    >
                        {saving ? 'Güncelleniyor…' : 'Güncelle'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditPage;
