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
} from 'firebase/firestore';
import firebaseApp from './firebase';
import { ScheduleSlot, sortSchedule } from './schedule';
import { EventItem } from '@/hooks/useEvent';

const db = getFirestore(firebaseApp);

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
    const scheduleWithNewTask = sortSchedule([...schedule, task]);

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

// udpate
export async function setSchedule(uid: string, schedule: DocumentData) {
    const scheduleRef = getScheduleRef(uid);
    await setDoc(scheduleRef, schedule, { merge: true });
}

export async function getEventList() {
    const eventListRef = collection(db, 'schedule');
    const eventListSnapshot = await getDocs(eventListRef);
    const eventList = eventListSnapshot.docs.map((doc) =>
        doc.data()
    ) as EventItem[];
    return eventList;
}

export async function getEventById(eventId: string) {
    const eventRef = doc(db, 'schedule', eventId);
    const eventSnapshot = await getDoc(eventRef);
    const event = eventSnapshot.data() as EventItem;
    return event;
}
