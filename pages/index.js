import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  
  return (
    <div className='flex justify-center'>
        <button className='text-blue-500 text-lg font-bold mt-10'>
          <Link href={'/signup'}>Signup Please</Link>
        </button>
    </div>
  )
}
