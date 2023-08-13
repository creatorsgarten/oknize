import { useAuth } from '@/lib/auth';

export default function SigninPage() {
    const { user, signInWithGoogle } = useAuth();

    return (
        <div className="max-w-screen-lg px-4 py-8 pb-0 md:mx-auto">
            <h1>Login</h1>

            <button
                onClick={signInWithGoogle}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
                Login
            </button>
        </div>
    );
}
