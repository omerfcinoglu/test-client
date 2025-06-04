import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '@/api'
import DefaultLayout from '@/layouts/default'
import CreatedPostCard from '@/components/CreatedPostCard'
import { Post } from '@/interfaces/IPost'

export default function CreatedPages() {
    const { pageId } = useParams<{ pageId: string }>()
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        api
            .get<Post[]>(`/pages/${pageId}/posts`)
            .then(res => setPosts(res.data))
            .catch(() => setPosts([]))
    }, [pageId])

    return (
        <DefaultLayout>
            {posts.length === 0 ? (
                <h2 className="text-2xl font-bold mt-20 text-center">
                    Bu sayfada henüz post yok.
                </h2>
            ) : (
                <div className="flex flex-col items-center space-y-8 mt-6">
                    {posts.map(post => (
                        <CreatedPostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </DefaultLayout>
    )
}
