import React, { useState, useEffect } from 'react'
import { Input } from '@heroui/input'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Spacer
} from '@heroui/react'
import { Avatar } from '@heroui/avatar'
import api from '@/api'
import Editor from '@/components/RichTextEditor/Editor'
import AssetManager from '@/components/AssetManager'
import { Asset } from '@/utils/assetManager'

interface Page { _id: string; title: string }
interface Member { _id: string; name: string; avatarUrl: string }
interface CreatePostProps { onCancel: () => void; onCreated: () => void }

const CreatePost: React.FC<CreatePostProps> = ({ onCancel, onCreated }) => {
    const [title, setTitle] = useState('')
    const [pages, setPages] = useState<Page[]>([])
    const [members, setMembers] = useState<Member[]>([])
    const [pageId, setPageId] = useState('')
    const [authorId, setAuthorId] = useState('')
    const [editor, setEditor] = useState<any>(null)
    const [saving, setSaving] = useState(false)
    const [showAssets, setShowAssets] = useState(false)

    useEffect(() => {
        api.get<Page[]>('/pages').then(res => setPages(res.data)).catch(console.error)
        api.get<Member[]>('/members').then(res => setMembers(res.data)).catch(console.error)
    }, [])

    const handleSave = async () => {
        if (!title.trim() || !pageId || !authorId) {
            return alert('Başlık, sayfa ve yazar seçimi zorunludur.')
        }
        const html = editor.getHTML()
        setSaving(true)
        try {
            await api.post(`/pages/${pageId}/posts`, {
                title,
                pageId,
                content: html,
                authorId
            })
            onCreated()
        } catch (err: any) {
            alert(err.response?.data?.message ?? 'Post oluşturulurken bir hata oluştu.')
        } finally {
            setSaving(false)
        }
    }

    const handleSelectAsset = (asset: Asset) => {
        if (!editor) return
        editor
            .chain()
            .focus()
            .setImage({ src: asset.url, alt: asset.name })
            .run()
        setShowAssets(false)
    }

    return (
        <div className="container mx-auto px-4 mt-6 max-w-screen-xl">
            <div className="flex flex-col gap-4">
                <Input label="Post Başlığı" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                <div className="flex flex-row gap-4">

                    <Dropdown>
                        <DropdownTrigger className="w-full border rounded p-2 text-left">
                            {pageId
                                ? <Button variant="bordered">{pages.find(p => p._id === pageId)?.title}</Button>
                                : <Button variant="bordered">Sayfa Seçiniz</Button>
                            }
                        </DropdownTrigger>
                        <DropdownMenu>
                            {pages.map(p => (
                                <DropdownItem key={p._id} title={p.title} onPress={() => setPageId(p._id)}>
                                    {p.title}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown>
                        <DropdownTrigger className="w-full border rounded p-2 text-left">
                            {authorId
                                ? <Button variant="bordered">{members.find(p => p._id === authorId)?.name}</Button>
                                : <Button variant="bordered">Yazar Seçiniz</Button>
                            }

                        </DropdownTrigger>
                        <DropdownMenu>
                            {members.map(m => (
                                <DropdownItem
                                    key={m._id}
                                    title={m.name}
                                    startContent={<Avatar src={m.avatarUrl} size="sm" />}
                                    onPress={() => setAuthorId(m._id)}
                                >
                                    <span className="ml-2">{m.name}</span>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <Spacer />
                <div className="flex gap-2">
                    <Button color="secondary" onPress={() => setShowAssets(true)}>Medya</Button>
                </div>
                <Editor
                    content="<p color='red'>Buraya yazın…</p>"
                    editable
                    onDataChange={() => { }}
                    onEditorReady={setEditor}
                />

                <Spacer />

                <div className="flex justify-end gap-4">
                    <Button variant="flat" color="danger" onPress={onCancel}>
                        İptal
                    </Button>
                    <Button variant="flat" color="primary" onPress={handleSave} disabled={saving}>
                        {saving ? 'Kaydediliyor…' : 'Kaydet'}
                    </Button>
                </div>

                {showAssets && (
                    <AssetManager
                        onSelect={handleSelectAsset}
                        onClose={() => setShowAssets(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default CreatePost
