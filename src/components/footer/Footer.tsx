import { useAuth } from '@/lib/auth';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { user, signOut, signInWithGoogle } = useAuth();

    return (
        <footer className="flex flex-col items-center justify-center gap-3 p-8">
            <div className="w-24">
                <Image src="/assets/logo.svg" width={300} alt="" height={100} />
            </div>
            <div className="text-gray-500">
                © {currentYear} Oknize. All rights reserved.
            </div>
            <p className="text-center text-sm text-gray-500">
                {user?.email ? (
                    <>
                        Signed in as {user.email}{' '}
                        <button
                            className="underline hover:no-underline"
                            onClick={signOut}
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <button
                        className="underline hover:no-underline"
                        onClick={signInWithGoogle}
                    >
                        Sign in
                    </button>
                )}
            </p>
        </footer>
    );
}
