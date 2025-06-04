import React, { useState } from 'react'
import { Card, CardBody, Button, Divider, Spacer } from '@heroui/react'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import useCrudResource from '@/hooks/useCrudResource'

interface Post {
  _id: string
  title: string
  content: string
  createdAt: string
}

const AdminPosts: React.FC = () => {
  const { items: posts, loading, error, fetch, remove } = useCrudResource<Post>('posts')
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  if (isCreating) {
    return <CreatePost onCancel={() => setIsCreating(false)} onCreated={() => { setIsCreating(false); fetch() }} />
  }

  if (editingPost) {
    return <EditPost post={editingPost} onCancel={() => setEditingPost(null)} onUpdated={() => { setEditingPost(null); fetch() }} />
  }

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex justify-end mb-4">
        <Button color="primary" onPress={() => setIsCreating(true)}>Post Ekle</Button>
      </div>
      <Divider />
      <Spacer />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <Card key={post._id} className="p-4">
            <CardBody>
              <p className="text-lg font-bold">{post.title}</p>
              <p className="text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content }} />
              <div className="mt-2 flex gap-2">
                <Button variant="flat" color="success" onPress={() => setEditingPost(post)}>Düzenle</Button>
                <Button variant="flat" color="danger" onPress={() => remove(post._id)}>Sil</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminPosts
