import { useRef, DragEvent, ChangeEvent } from 'react'
import { Button } from '@heroui/react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

interface VideoDropZoneProps {
    readonly file?: File | null
    readonly onFileSelected: (file: File) => void
    readonly onFileRemoved: () => void
}

export function VideoDropZone({
    file,
    onFileSelected,
    onFileRemoved,
}: VideoDropZoneProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        const dropped = e.dataTransfer.files[0]
        if (dropped?.type.startsWith('video')) onFileSelected(dropped)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0]
        if (picked?.type.startsWith('video')) onFileSelected(picked)
    }

    if (file) {
        return (
            <div className="flex flex-col items-center space-y-4">
                <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="w-full aspect-video rounded-lg object-cover"
                />
                <Button variant="flat" color="danger" onPress={onFileRemoved}>
                    Videoyu Kaldır
                </Button>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col items-center p-6 rounded-lg cursor-pointer hover:border-gray-400"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <AiOutlineCloudUpload size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-600 mb-6">Videonuzu buraya sürükleyip bırakın</p>
            <Button variant="flat" onPress={() => fileInputRef.current?.click()}>
                Video Yükle
            </Button>
            <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    )
}
