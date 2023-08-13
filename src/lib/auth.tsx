import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import 'firebase/auth';
import { auth } from './firebase';
import {
    User as FirebaseUser,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { onSignin } from './db';

export interface UserData extends FirebaseUser {
    email: string;
}

// Create a context for the authentication state
interface AuthContextType {
    user: UserData | null;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create an authentication provider component
export const AuthProvider = ({
    children,
}: {
    children: ReactNode | ReactNode[];
}) => {
    const [user, setUser] = useState<UserData | null>(null);
    const router = useRouter();

    // Check if user is already signed in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                onSignin(authUser).then((user) => {
                    setUser(user);
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const pathname = router.pathname.split('?')[0];

        switch (pathname) {
            // should not have user
            case '/':
                break;
            case '/event/create':
                if (!user) {
                    router.push('/login');
                }
                break;
            case '/login':
                if (user) {
                    router.push('/');
                }
                break;
            // should have user
            default:
                if (!user) {
                    router.push('/login');
                }
                break;
        }
    }, [user, router]);

    // Sign in with Google
    const signInWithGoogle = useCallback(async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('email');
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    }, []);

    // Sign out
    const signOut = useCallback(async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }, []);

    const authContextValue: AuthContextType = useMemo(
        () => ({
            user,
            signInWithGoogle,
            signOut,
        }),
        [user, signInWithGoogle, signOut]
    );

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
