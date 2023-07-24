import { DocumentReference, onSnapshot } from 'firebase/firestore';
import { ReadableAtom, atom, onMount } from 'nanostores';

export type RemoteData<T> =
    | { status: 'loading'; value?: T }
    | { status: 'success'; value: T }
    | { status: 'error'; value?: T; error: Error };

export type DocumentStore<T = any> = ReadableAtom<RemoteData<T | null>>;

export function createDocumentStore<T = any>(
    doc: DocumentReference
): DocumentStore<T> {
    const store = atom<RemoteData<T | null>>({
        status: 'loading',
    });

    onMount(store, () => {
        // Do not run on server-side to prevent hydration mismatch
        if (typeof window === 'undefined') return;

        return onSnapshot(
            doc,
            (doc) => {
                store.set({ status: 'success', value: doc.data() as T });
            },
            (error) => {
                store.set({ ...store.get(), status: 'error', error });
            }
        );
    });

    return store;
}
