import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Roundest Pokemon</title>
        <meta
          name='description'
          content='App to determine whtch pokemon is the roundest'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='h-screen w-screen flex flex-col justify-center'>
        <div className='text-center text-2xl'>Which Pokemon is Rounder</div>
        <div className='p-2' />
        <div className='border rounded p-8 flex justify-between items-center max-w-2xl mx-auto'>
          <div className='w-16 h-16 bg-red-200'></div>
          <div className='p-8'>Vs</div>
          <div className='w-16 h-16 bg-red-200'></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
