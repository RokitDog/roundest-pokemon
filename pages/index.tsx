import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { getOptionsForVote } from '../utils/getRandomPokemon';
import { trpc } from '../utils/trpc';
import { inferQueryResponse } from './api/trpc/[trpc]';

const btn =
  'inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

const Home: NextPage = () => {
  const [ids, updateIds] = useState(getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }]);

  const voteMutation = trpc.useMutation(['cast-vote']);

  const voteForRoundest = (selected: number) => {
    // todo: Fire mutation to persist changes
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }

    updateIds(getOptionsForVote());
  };

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
          {!firstPokemon.isLoading &&
            !secondPokemon.isLoading &&
            firstPokemon.data &&
            secondPokemon.data && (
              <>
                <PokemonListing
                  pokemon={firstPokemon.data}
                  vote={() => voteForRoundest(first)}
                />
                <div className='p-8'>Vs</div>
                <PokemonListing
                  pokemon={secondPokemon.data}
                  vote={() => voteForRoundest(second)}
                />
              </>
            )}

          <div className='p-2' />
        </div>
      </div>
    </div>
  );
};

export default Home;

type PokemonFromServer = inferQueryResponse<'get-pokemon-by-id'>;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className=' flex flex-col items-center'>
      <img
        src={props.pokemon?.sprites?.front_default}
        alt={props.pokemon?.name}
        className='w-64 h-64'
      />
      <div className='capitalize text-xl text-center mt-[-2rem]'>
        {props.pokemon?.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};
