import {
    DocumentData,
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    deleteDoc,
} from 'firebase/firestore';
import firebaseApp from './firebase';
import { ScheduleSlot, adjustTime, sortSchedule } from './schedule';
import { EventItem } from '@/hooks/useEvent';

const db = getFirestore(firebaseApp);

/*
Schedule
*/

export function getScheduleRef(uid: string) {
    return doc(db, 'schedule', uid);
}

export async function getSchedule(uid: string) {
    const scheduleRef = getScheduleRef(uid);
    const scheduleDoc = await getDoc(scheduleRef);
    if (scheduleDoc.exists()) {
        return scheduleDoc.data();
    } else {
        return null;
    }
}

export function subscribeSchedule(uid: string, callback: Function) {
    const scheduleRef = getScheduleRef(uid);
    return onSnapshot(scheduleRef, (doc) => {
        callback(doc.data());
    });
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
        { ...task, id: new Date().getUTCDate().toString() },
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

export async function getEventList() {
    const eventListRef = collection(db, 'schedule');
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
