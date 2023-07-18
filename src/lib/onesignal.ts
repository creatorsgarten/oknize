import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
    await OneSignal.init({
        appId: 'f6432bfd-08f2-4880-88e5-b057cf6e926d',
        allowLocalhostAsSecureOrigin: true,
    });
    OneSignal.showSlidedownPrompt();
}
