import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { getOptionsForVote } from '../utils/getRandomPokemon';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const [ids, updateIds] = useState(getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

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
          <div className='w-64 h-64 flex flex-col items-center'>
            <img
              src={firstPokemon.data?.sprites.front_default}
              alt={firstPokemon.data?.name}
              className='w-full h-full'
            />
            <div className='capitalize text-xl text-center mt-[-2rem]'>
              {firstPokemon.data?.name}
            </div>
          </div>
          <div className='p-8'>Vs</div>
          <div className='w-64 h-64 flex flex-col items-center'>
            {' '}
            <img
              src={secondPokemon.data?.sprites.front_default}
              alt={secondPokemon.data?.name}
              className='w-full h-full'
            />
            <div className='capitalize text-xl text-center mt-[-2rem]'>
              {secondPokemon.data?.name}
            </div>
          </div>
          <div className='p-2' />
        </div>
      </div>
    </div>
  );
};

export default Home;
