import { type Metadata } from 'next';
import LayoutClientComponent from './layout-client-component';

export const metadata: Metadata = {
    title: `Oknize`,
    description: 'สร้างอีเวนต์ให้ nice ด้วย Oknize',
    openGraph: {
        title: 'Oknize',
        type: 'website',
        url: 'https://oknize.grtn.org/',
        images: [
            {
                url: '/Thumbnail.png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Oknize',
        description: 'สร้างอีเวนต์ให้ nice ด้วย Oknize',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />

                {/* manifest */}
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body>
                <LayoutClientComponent> {children} </LayoutClientComponent>
            </body>
        </html>
    );
}
