'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton({
  children,
  pendingLabel,
  disabled = false,
  className = '',
}) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending || disabled}
      className={`bg-accent-500 text-primary-800 hover:bg-accent-600 w-1/3 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 ${className ? className : 'ml-auto'}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
