import React, { useState, useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button, Spacer } from '@heroui/react'
import api from '@/api'
import Editor from '@/components/RichTextEditor/Editor'

interface Page { _id: string; title: string }
interface EditPostProps {
    post: { _id: string; title: string; content: string; category?: string; page?: string }
    onCancel: () => void
    onUpdated: () => void
}

const EditPost: React.FC<EditPostProps> = ({ post, onCancel, onUpdated }) => {
    const [title, setTitle] = useState(post.title)
    const [category, setCategory] = useState(post.category || '')
    const [content, setContent] = useState(post.content)
    const [pageId, setPageId] = useState(post.page || '')
    const [pages, setPages] = useState<Page[]>([])
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        api.get<Page[]>('/pages')
            .then(res => setPages(res.data))
            .catch(console.error)
    }, [])

    const handleUpdate = async () => {
        if (!title.trim() || !pageId) return alert('Başlık ve sayfa seçimi zorunludur.')
        setSaving(true)
        try {
            await api.put(`/posts/${post._id}`, { title, content, category, page: pageId })
            onUpdated()
        } catch (err: any) {
            console.error(err.response?.data)
            alert(err.response?.data?.message || 'Post güncellenirken hata oluştu.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="container mx-auto px-4 mt-6 max-w-screen-xl">
            <div className="flex flex-col gap-4">
                <Input
                    label="Post Başlığı"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <Input
                    label="Kategori"
                    name="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
                <select
                    className="border rounded p-2"
                    value={pageId}
                    onChange={e => setPageId(e.target.value)}
                >
                    <option value="">Sayfa Seç</option>
                    {pages.map(p => (
                        <option key={p._id} value={p._id}>{p.title}</option>
                    ))}
                </select>
                <Spacer />
                <Editor
                    content={content}
                    editable={true}
                    onDataChange={(newContent: string) => setContent(newContent)}
                />
                <Spacer />
                <div className="flex justify-end gap-4">
                    <Button variant="flat" color="danger" onPress={onCancel}>İptal</Button>
                    <Button variant="flat" color="primary" onPress={handleUpdate} disabled={saving}>
                        {saving ? 'Güncelleniyor…' : 'Güncelle'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditPost
