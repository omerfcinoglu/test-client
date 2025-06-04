import { Card, CardBody, Image, Button, ScrollShadow } from '@heroui/react'
import { useNavigate } from 'react-router-dom'
import { Post } from '@/interfaces/IPost'

export default function CreatedPostCard({ post }: { readonly post: Post }) {
    const navigate = useNavigate()
    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[850px]"
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt={post.title}
                            className="object-cover"
                            height={300}
                            shadow="md"
                            src="https://heroui.com/images/album-cover.png"
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-large font-medium mt-2">{post.title}</h1>
                                <div className="flex flex-row gap-4 text-small text-foreground/80">
                                    <div className="flex items-center gap-1">
                                        <span>{post.author.name}</span>
                                    </div>
                                    <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                                </div>
                            </div>
                        </div>

                        <ScrollShadow hideScrollBar className="w-full h-[140px] mt-3">
                            <div className="prose text-sm">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: post.content.length > 400
                                            ? post.content.slice(0, 400) + '...'
                                            : post.content
                                    }}
                                />
                            </div>
                        </ScrollShadow>

                        <div className="flex justify-center mt-4">
                            <Button variant="light" className="data-[hover]:bg-foreground/10" onPress={() => navigate(`/posts/${post._id}`)}>
                                Devamını Oku
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
