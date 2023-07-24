import { atom, onMount } from 'nanostores';

export const nowStore = atom(new Date(0));

onMount(nowStore, () => {
    if (typeof window === 'undefined') return;

    let unmounted = false;

    function scheduleUpdate() {
        setTimeout(() => {
            if (unmounted) return;
            scheduleUpdate();
            nowStore.set(new Date());
        }, 1000 - new Date().getMilliseconds());
    }

    scheduleUpdate();

    return () => {
        unmounted = true;
    };
});
