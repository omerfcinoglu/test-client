// src/pages/components/CreatePage.tsx
import React, { useState } from 'react'
import { Input } from '@heroui/input'
import { Button, Spacer } from '@heroui/react'
import api from '@/api'

interface CreatePageProps {
    onCancel: () => void
    onCreated: () => void
}

const CreatePage: React.FC<CreatePageProps> = ({ onCancel, onCreated }) => {
    const [title, setTitle] = useState('')
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        if (!title.trim()) {
            return alert('Başlık boş bırakılamaz.')
        }
        setSaving(true)
        try {
            // Yeni Page yaratırken sadece title alanını gönderiyoruz
            await api.post('/pages', { title })
            onCreated()
        } catch (err: any) {
            console.error('Page create error response data:', err.response?.data)
            alert(err.response?.data?.message || 'Sayfa oluşturulurken bir hata oluştu.')
        } finally {
            setSaving(false)
        }
    }

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

                <div className="flex justify-end gap-4">
                    <Button variant="flat" color="danger" onPress={onCancel}>
                        İptal
                    </Button>
                    <Button
                        variant="flat"
                        color="primary"
                        onPress={handleSave}
                        disabled={saving}
                    >
                        {saving ? 'Kaydediliyor…' : 'Kaydet'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
