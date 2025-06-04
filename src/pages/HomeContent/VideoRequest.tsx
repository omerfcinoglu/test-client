import { useState, ChangeEvent, FormEvent } from 'react'
import {
    Input,
    Button,
    CheckboxGroup,
    Checkbox,
    Divider,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
} from '@heroui/react'
import DefaultLayout from '@/layouts/default'
import { VideoDropZone } from '@/components/VideoDropZone'
import emailjs from 'emailjs-com'

const options = [
    {
        key: 'path',
        label: 'Path Hesaplama',
        desc: 'Video kırpma işlemi yapılır.',
    },
    {
        key: 'od',
        label: 'O/D Matrisi',
        desc: 'Parlaklık kontrolü eklenir.',
    },
    {
        key: 'hizSicaklik',
        label: 'Hız Sıcaklık Haritası',
        desc: 'Renk dengesi düzenlenir.',
    },
    {
        key: 'yogunluk',
        label: 'Yoğunluk Sıcaklık Haritası',
        desc: 'Filtre uygulanır.',
    },
    {
        key: 'nesne',
        label: 'Nesne Sayma',
        desc: 'Nesne algılama ve sayma yapılır.',
    },
]

export default function VideoCardForm() {
    const [video, setVideo] = useState<File | null>(null)
    const [email, setEmail] = useState('')
    const [choices, setChoices] = useState<string[]>([])
    const [openDetails, setOpenDetails] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!video || !email || choices.length === 0) return

        // Video dosyasının sadece adı (filename) gönderiliyor.
        const videoName = video.name

        // choices dizisini virgülle ayırarak tek bir string haline getirelim
        const selectedOptions = choices.join(', ')

        // EmailJS'e dinamik parametreler gönderiyoruz
        const templateParams = {
            user_email: email,             // EmailJS template içinde kullanmak üzere
            video_filename: videoName,     // Video adını template'e ileteceğiz
            selected_choices: selectedOptions, // Seçilen seçenekler
        }

        try {
            await emailjs.send(
                'service_bk5r1h8',       // EmailJS Service ID’niz
                'template_daeafj6',      // EmailJS Template ID’niz
                templateParams,
                'zJ-jyxeg0xQ2eO5zD'      // EmailJS User (Public) Key
            )
            // Gönderim başarılıysa formu temizleyelim
            setVideo(null)
            setEmail('')
            setChoices([])
            alert('E-posta başarıyla gönderildi.')
        } catch (error) {
            console.error('EmailJS hatası:', error)
            alert('E-posta gönderilirken bir hata oluştu.')
        }
    }

    return (
        <DefaultLayout>
            <div className="h-full flex items-center justify-center py-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-4xl grid grid-cols-1 gap-8 justify-items-center"
                >
                    {/* Video Bölümü */}
                    <div
                        className={`
              flex flex-col rounded-md p-4
              items-center justify-center w-full
              ${video ? 'max-w-xl border-none' : 'max-w-md border-2 border-dashed'}
            `}
                    >
                        <VideoDropZone
                            file={video}
                            onFileSelected={setVideo}
                            onFileRemoved={() => setVideo(null)}
                        />
                    </div>

                    <Divider />

                    {/* Form Bölümü */}
                    <div className="flex flex-col justify-between max-w-md w-full">
                        <Input
                            label="Email"
                            name="user_email"
                            placeholder="Email adresinizi girin"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                            className="mb-4"
                        />
                        <CheckboxGroup
                            value={choices}
                            onChange={setChoices}
                            className="mb-4"
                        >
                            {options.map((o) => (
                                <Checkbox key={o.key} value={o.key} name="choices">
                                    {o.label}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <Button
                                type="submit"
                                variant="solid"
                                color="primary"
                                disabled={!video || !email || choices.length === 0}
                            >
                                Gönder
                            </Button>
                            <Button
                                color="success"
                                variant="ghost"
                                onPress={() => setOpenDetails(true)}
                            >
                                Seçeneklerin Detayları
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            <Drawer
                isOpen={openDetails}
                placement="right"
                onOpenChange={setOpenDetails}
                size="md"
                backdrop="opaque"
            >
                <DrawerContent>
                    <DrawerHeader>
                        <h2 className="text-xl font-bold">Seçenek Detayları</h2>
                    </DrawerHeader>
                    <DrawerBody className="space-y-4">
                        {options.map((opt) => (
                            <div key={opt.key} className="border rounded-lg overflow-hidden">
                                <img
                                    src="./temp_modal.png"
                                    alt={opt.label}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold mb-1">{opt.label}</h3>
                                    <p className="text-sm text-gray-600">{opt.desc}</p>
                                </div>
                            </div>
                        ))}
                    </DrawerBody>
                    <DrawerFooter className="flex justify-end">
                        <Button
                            variant="flat"
                            color="primary"
                            onPress={() => setOpenDetails(false)}
                        >
                            Kapat
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </DefaultLayout>
    )
}
