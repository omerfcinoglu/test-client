import React, { useState } from 'react'
import AdminPanelLayout from '@/layouts/adminPanelLayout'
import AdminPages from './AdminPage/AdminPages'
import AdminMembers from './AdminMembers/AdminMembers'
import AdminPosts from './AdminPosts/AdminPosts'
import { Card, CardBody, Tab, Tabs } from '@heroui/react'

const tabs = [
  { key: 'pages', title: 'Pages', component: <AdminPages /> },
  { key: 'members', title: 'Members', component: <AdminMembers /> },
  { key: 'posts', title: 'Posts', component: <AdminPosts /> }
]

const AdminDashboard: React.FC = () => {
  const [selected, setSelected] = useState(tabs[0].key)

  return (
    <AdminPanelLayout hideNavbar>
      <div className="min-h-screen container mx-auto px-6 py-8 flex flex-col">
        <Tabs
          key="underlined"
          aria-label="Admin Dashboard Tabs"
          variant="underlined"
          selectedKey={selected}
          onSelectionChange={key => setSelected(String(key))}
        >
          {tabs.map(tab => (
            <Tab key={tab.key} title={tab.title} />
          ))}
        </Tabs>
        <div className="flex-grow">
          {tabs.map(tab =>
            selected === tab.key && (
              <Card key={tab.key} className="w-full h-full">
                <CardBody className="h-full">{tab.component}</CardBody>
              </Card>
            )
          )}
        </div>
      </div>
    </AdminPanelLayout>
  )
}

export default AdminDashboard
