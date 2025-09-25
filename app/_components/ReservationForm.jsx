'use client';

import { differenceInDays } from 'date-fns';
import { createBooking } from '../_lib/actions';
import { useReservation } from './ReservationContext';
import SubmitButton from './SubmitButton';

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { id, maxCapacity, regularPrice, discount } = cabin;
  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  return (
    <div className='flex flex-col'>
      <div className='bg-primary-800 text-primary-300 flex items-center justify-between px-16 py-2'>
        <p>Logged in as</p>
        <p className='mt-1'>{user.name}</p>
      </div>

      <form
        action={async formData => {
          await createBooking(bookingData, formData);
          resetRange();
        }}
        className='bg-primary-900 flex grow flex-col space-y-6 p-10 text-lg'
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(x => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='mt-auto flex items-center justify-end gap-6'>
          {range?.to ? null : (
            <p className='text-primary-300 text-base'>
              Start by selecting dates
            </p>
          )}

          <SubmitButton
            className='ml-0'
            disabled={!range?.to}
            pendingLabel='Reserving...'
          >
            Reserve now
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
