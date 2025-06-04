import React from 'react'
import { Card, CardBody, Button, Divider, Spacer } from '@heroui/react'
import CreatePage from './CreatePage'
import EditPage from './EditPage'
import useCrudResource from '@/hooks/useCrudResource';
interface Page { _id: string; title: string; content: string; createdAt: string }

const AdminPages: React.FC = () => {
  const { items: pages, loading, error, fetch, remove, } = useCrudResource<Page>('pages')
  const [isCreating, setIsCreating] = React.useState(false)
  const [editingPage, setEditingPage] = React.useState<Page | null>(null)

  if (isCreating) {
    return <CreatePage onCancel={() => setIsCreating(false)} onCreated={() => { setIsCreating(false); fetch() }} />
  }

  if (editingPage) {
    return <EditPage page={editingPage} onCancel={() => setEditingPage(null)} onUpdated={() => { setEditingPage(null); fetch() }} />
  }

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex justify-end mb-4">
        <Button color="primary" onPress={() => setIsCreating(true)}>Sayfa Ekle</Button>
      </div>
      <Divider />
      <Spacer />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map(page => (
          <Card key={page._id} className="p-4">
            <CardBody>
              <p className="text-lg font-bold">{page.title}</p>
              <p className="text-sm line-clamp-3">{page.content}</p>
              <div className="mt-2 flex gap-2">
                <Button variant="flat" color="success" onPress={() => setEditingPage(page)}>Düzenle</Button>
                <Button variant="flat" color="danger" onPress={() => remove(page._id)}>Sil</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminPages
