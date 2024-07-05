import OneSignal from 'react-onesignal';

export async function initOneSignal() {
    await OneSignal.init({
        appId: 'f6432bfd-08f2-4880-88e5-b057cf6e926d',
        allowLocalhostAsSecureOrigin: true,
    });
}

export async function runOneSignal() {
    // sendGTMEvent({
    //   category: 'Notification',
    //   action: 'subscribe',
    //   label: 'subscribe',
    // })

    OneSignal.Slidedown.promptPush();

    OneSignal.Notifications.addEventListener('click', (event) => {
        // sendGTMEvent({
        //   category: 'Notification',
        //   action: 'click',
        //   label: event.notification.title,
        // })
    });
}

export function isUserSubscribed() {
    const subscriptionId = OneSignal.User.PushSubscription.id;

    return !!subscriptionId;
}

export function subscribeToNotification() {
    runOneSignal();
}
