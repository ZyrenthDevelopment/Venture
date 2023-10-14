import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function NextPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Disclient page 2</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <span>zyrenth.dev</span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/home">
          <a className="btn-blue">home</a>
        </Link>
      </div>
    </React.Fragment>
  )
}
