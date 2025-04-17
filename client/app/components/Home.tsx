'use client'
import { usePathname } from 'next/navigation'

function Home() {
  const pathname = usePathname()

  return (
    <div>
      {pathname}
    </div>
  )
}

export default Home
