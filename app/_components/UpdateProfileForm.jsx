'use client';

import { useState } from 'react';
import { updateGuest } from '../_lib/actions';
import SubmitButton from './SubmitButton';

function UpdateProfileForm({ children, guest }) {
  const { fullName, email, nationalID, countryFlag } = guest;
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await updateGuest(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setError(null);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg'
    >
      <div className='space-y-2'>
        <label>Full name</label>
        <input
          name='fullName'
          disabled
          defaultValue={fullName}
          className='bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <label>Email address</label>
        <input
          name='email'
          disabled
          defaultValue={email}
          className='bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label htmlFor='nationality'>Where are you from?</label>
          <img
            src={
              countryFlag
                ? countryFlag
                : 'https://upload.wikimedia.org/wikipedia/commons/6/6a/A_blank_flag.png'
            }
            alt='Country flag'
            className='h-5 rounded-sm'
          />
        </div>
        {children}
      </div>

      <div className='space-y-2'>
        <label htmlFor='nationalID'>National ID number</label>
        <input
          name='nationalID'
          defaultValue={nationalID}
          className='bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm'
        />
      </div>
      <div className='flex items-center'>
        {error && <p className='font-semibold text-red-400'>{error}</p>}
        <SubmitButton pendingLabel='Updating...'>Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
