import { useParams } from 'react-router-dom'
import DefaultLayout from '@/layouts/default'
import { Post } from '@/interfaces/IPost'
import useCrudResource from '@/hooks/useCrudResource'
import { Card, CardBody, Image, ScrollShadow, Button } from '@heroui/react'

export default function PostDetail() {
    const { postId } = useParams<{ postId: string }>()
    const { items: posts, loading, error } = useCrudResource<Post>('posts')
    const post = posts.find(p => p._id === postId) || null

    if (loading) {
        return (
            <DefaultLayout>
                <p className="text-center mt-20">Yükleniyor…</p>
            </DefaultLayout>
        )
    }

    if (error || !post) {
        return (
            <DefaultLayout>
                <p className="text-center mt-20">Post bulunamadı veya bir hata oluştu.</p>
            </DefaultLayout>
        )
    }

    return (
        <DefaultLayout>
            <Card className="max-w-3xl mx-auto">
                <CardBody>
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <div className="flex items-center gap-4 mb-6 text-foreground/80">
                        <Image src="https://heroui.com/images/avatar.png" className="rounded-full" />
                        <span>{post.author.name}</span>
                        <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <ScrollShadow hideScrollBar className="prose max-w-none mb-6">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </ScrollShadow>
                    <Button onPress={() => window.history.back()}>Geri Dön</Button>
                </CardBody>
            </Card>
        </DefaultLayout>
    )
}
