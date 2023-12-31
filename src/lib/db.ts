import { v4 as uuidv4 } from 'uuid';

import {
    DocumentData,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    deleteDoc,
    query,
    where,
} from 'firebase/firestore';
import {
    ScheduleDoc,
    ScheduleSlot,
    adjustTime,
    sortSchedule,
} from './schedule';
import { EventItem } from '@/hooks/useEvent';
import { db } from './firebase';
import { getOrCreate } from './mapUtils';
import { DocumentStore, createDocumentStore } from './nanofire';
import { UserData } from './auth';
import { User as FirebaseUser } from 'firebase/auth';
import { QueryFunction } from '@tanstack/react-query';

/*
Schedule
*/

function getScheduleRef(uid: string) {
    return doc(db, 'schedule', uid);
}

const scheduleStores = new Map<string, DocumentStore<ScheduleDoc>>();

export function getScheduleStore(uid: string) {
    return getOrCreate(scheduleStores, uid, () =>
        createDocumentStore<ScheduleDoc>(getScheduleRef(uid))
    );
}

// add
export async function addTask(
    uid: string,
    schedule: ScheduleSlot[],
    task: ScheduleSlot
) {
    // sort task first then update
    const scheduleWithNewTask = sortSchedule([
        ...schedule,
        { ...task, id: uuidv4() },
    ]);

    const scheduleRef = getScheduleRef(uid);
    await setDoc(scheduleRef, { agenda: scheduleWithNewTask }, { merge: true });
}

// edit
export async function editTask(
    uid: string,
    schedule: ScheduleSlot[],
    task: ScheduleSlot
) {
    //  sort task then update
    const scheduleWithEditedTask = schedule.map((slot) => {
        if (slot.id === task.id) {
            return task;
        } else {
            return slot;
        }
    });

    const scheduleRef = getScheduleRef(uid);

    await setDoc(
        scheduleRef,
        { agenda: scheduleWithEditedTask },
        { merge: true }
    );
}

export async function deleteTask(
    uid: string,
    schedule: ScheduleSlot[],
    task: ScheduleSlot
) {
    //  filter task then update
    const filteredchedule = schedule.filter((slot) => slot.id !== task.id);

    const scheduleRef = getScheduleRef(uid);
    await setDoc(scheduleRef, { agenda: filteredchedule }, { merge: true });
}

// update
export async function setSchedule(uid: string, schedule: DocumentData) {
    const scheduleRef = getScheduleRef(uid);
    await setDoc(scheduleRef, schedule, { merge: true });
}

export async function adjustTimeToTask(
    uid: string,
    min: number,
    currentSlot: ScheduleSlot,
    schedule: ScheduleSlot[]
) {
    const newSchedule = adjustTime(min, currentSlot, schedule);

    const scheduleRef = getScheduleRef(uid);
    await setDoc(scheduleRef, { agenda: newSchedule }, { merge: true });
}

/*
Event
*/

export async function getEventList(uid: string) {
    const eventListRef = query(
        collection(db, 'schedule'),
        where('admin', 'array-contains', uid)
    );
    const eventListSnapshot = await getDocs(eventListRef);
    const eventList = eventListSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    }) as EventItem[];
    return eventList;
}

export async function getEventById(eventId: string) {
    const eventRef = doc(db, 'schedule', eventId);
    const eventSnapshot = await getDoc(eventRef);
    const event = eventSnapshot.data() as EventItem;
    return { ...event, id: eventSnapshot.id };
}

export async function addEvent(event: any) {
    const eventListRef = collection(db, 'schedule');
    return (await addDoc(eventListRef, event)).id;
}

export async function deleteEvent(eventId: string) {
    const eventRef = doc(db, 'schedule', eventId);
    // delete event
    await deleteDoc(eventRef);
}

/*
Auth
*/
export async function getUser(uid: string): Promise<UserData> {
    const userRef = doc(db, 'user', uid);
    const userSnapshot = await getDoc(userRef);
    return {
        ...userSnapshot.data(),
    } as UserData;
}

export async function setUser(uid: string, user: any) {
    const userRef = doc(db, 'user', uid);
    await setDoc(userRef, user, { merge: true });
}

export async function onSignin(firebaseUser: FirebaseUser): Promise<UserData> {
    const user = await getUser(firebaseUser.uid);

    if (!user) {
        const newUserData: UserData = {
            ...firebaseUser,
            email: firebaseUser?.email ?? '',
        };

        await setUser(firebaseUser.uid, newUserData);

        const newUser = await getUser(firebaseUser.uid);
        return newUser;
    } else {
        return {
            ...firebaseUser,
            ...user,
        };
    }
}
