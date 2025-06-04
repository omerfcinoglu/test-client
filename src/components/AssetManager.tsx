import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { Button, Input, Card, CardBody, Tabs, Tab } from '@heroui/react'
import { motion, AnimatePresence } from 'framer-motion'
import useAssets from '@/hooks/useAssets'
import { Asset } from '@/utils/assetManager'
import { v4 as uuidv4 } from 'uuid'

interface Props {
    readonly onSelect: (asset: Asset) => void
    readonly onClose: () => void
}

export default function AssetManager({ onSelect, onClose }: Props) {
    const { assets, create, remove, rename } = useAssets()
    const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editName, setEditName] = useState('')

    const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        Array.from(files).forEach(file => {
            const fingerprint = `${file.name}-${file.size}-${file.lastModified}`
            if (assets.some(a => a.fingerprint === fingerprint)) return
            const reader = new FileReader()
            reader.onload = () => {
                create({
                    id: uuidv4(),
                    type: file.type.startsWith('image') ? 'image' : 'video',
                    url: reader.result as string,
                    name: file.name,
                    uploadedAt: Date.now(),
                    fingerprint
                })
            }
            reader.readAsDataURL(file)
        })
    }

    const list = filter === 'all' ? assets : assets.filter(a => a.type === filter)

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-x-0 top-0 z-50 items-center justify-center flex"

                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                style={{ transformOrigin: 'top center' }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            >
                <Card className="w-1/3 max-h-[80vh] rounded-t-none rounded-b-lg overflow-auto shadow-xl">
                    <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <Tabs selectedKey={filter} onSelectionChange={key => setFilter(key as any)} variant="underlined">
                                <Tab key="all" title="All" />
                                <Tab key="image" title="Images" />
                                <Tab key="video" title="Videos" />
                            </Tabs>
                            <Button variant="flat" color="danger" onPress={onClose}>Close</Button>
                        </div>
                        <Input type="file" accept="image/*,video/*" multiple onChange={handleFiles} className="mb-4" />
                        <div className="grid grid-cols-3 gap-4">
                            {list.map(asset => (
                                <Card key={asset.id} shadow="sm" className="p-2">
                                    <div className="w-full h-48 overflow-hidden mb-2">
                                        {asset.type === 'image'
                                            ? <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                                            : <video src={asset.url} className="w-full h-full object-cover" controls={false} />}
                                    </div>
                                    {editingId === asset.id
                                        ? (
                                            <Input
                                                value={editName}
                                                onChange={e => setEditName(e.target.value)}
                                                onBlur={() => { rename(asset.id, editName); setEditingId(null) }}
                                                onKeyDown={(e: KeyboardEvent) => {
                                                    if (e.key === 'Enter') { rename(asset.id, editName); setEditingId(null) }
                                                }}
                                            />
                                        )
                                        : <h4 className="truncate cursor-text" onClick={() => { setEditingId(asset.id); setEditName(asset.name) }}>{asset.name}</h4>
                                    }
                                    <div className="flex justify-between mt-2">
                                        <Button size="sm" color="primary" onPress={() => onSelect(asset)}>Use</Button>
                                        <div className="flex gap-1">
                                            <Button size="sm" variant="flat" color="success" onPress={() => { setEditingId(asset.id); setEditName(asset.name) }}>Rename</Button>
                                            <Button size="sm" variant="flat" color="danger" onPress={() => remove(asset.id)}>Delete</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </AnimatePresence>
    )
}
