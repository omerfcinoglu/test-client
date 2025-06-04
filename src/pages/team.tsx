import DefaultLayout from '@/layouts/default'
import Members from './HomeContent/Members'

const Team = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center ">
        <Members />
      </div>
    </DefaultLayout>
  )
}

export default Team
