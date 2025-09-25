'use client';

import { differenceInDays, isSameDay, isWithinInterval } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useReservation } from './ReservationContext';

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some(date =>
      isWithinInterval(date, { start: range?.from, end: range?.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const { range, setRange, resetRange } = useReservation();
  const { minBookingLength, maxBookingLength } = settings;
  const { regularPrice, discount } = cabin;

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const numNights = differenceInDays(displayRange?.to, displayRange?.from);
  const cabinPrice = numNights * (regularPrice - discount);

  function disabled(curDate) {
    const today = new Date();

    if (curDate < today) return true;
    if (bookedDates.some(date => isSameDay(date, curDate))) return true;
    if (displayRange?.from && !displayRange?.to) {
      const minCheckout = new Date(displayRange.from);
      minCheckout.setDate(minCheckout.getDate() + minBookingLength);
      if (curDate > displayRange.from && curDate < minCheckout) return true;
    }

    return false;
  }

  function onSelect(newRange) {
    if (!isAlreadyBooked(newRange, bookedDates)) setRange(newRange);
  }

  return (
    <div className='flex flex-col'>
      <DayPicker
        className='grow pt-12'
        animate
        mode='range'
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={new Date()}
        disabled={disabled}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        captionLayout='dropdown'
        numberOfMonths={2}
        pagedNavigation
        selected={displayRange}
        onSelect={onSelect}
      />

      <div className='bg-accent-500 text-primary-800 flex h-[4.5rem] items-center justify-between px-8'>
        <div className='flex items-baseline gap-6'>
          <p className='flex items-baseline gap-2'>
            {discount > 0 ? (
              <>
                <span className='text-2xl'>${regularPrice - discount}</span>
                <span className='text-primary-700 font-semibold line-through'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-2xl'>${regularPrice}</span>
            )}
            <span className=''>/night</span>
          </p>
          {numNights ? (
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>Total</span>{' '}
                <span className='text-2xl font-semibold'>${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {displayRange?.from || displayRange?.to ? (
          <button
            className='border-primary-800 border px-4 py-2 text-sm font-semibold'
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
