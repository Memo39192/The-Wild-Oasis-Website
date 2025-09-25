import { signInAction } from '../_lib/actions';

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className='hover:bg-primary-900 border-primary-300 flex cursor-pointer items-center gap-6 border px-10 py-4 text-lg font-medium'>
        <img
          className='h-6 w-6'
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
        />
        <span className='mt-1'>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
