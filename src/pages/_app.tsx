import Navbar from '@/components/navbar/Navbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Nunito, Noto_Sans_Thai } from 'next/font/google';
import { cn } from '@/lib/utils';
import Footer from '@/components/footer/Footer';
import Head from 'next/head';
import Sidebar from '@/components/sidebar/Sidebar';

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth';

const queryClient = new QueryClient();

const notosansthai = Noto_Sans_Thai({ subsets: ['thai'] });

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <div className={notosansthai.className}>
                    <Head>
                        <title>Oknize</title>
                        <meta
                            name="description"
                            content="สร้างอีเวนต์ให้ nice ด้วย Oknize"
                        />

                        {/* og tags */}
                        <meta property="og:title" content="Oknize" />
                        <meta property="og:type" content="website" />
                        <meta
                            property="og:url"
                            content="https://oknize.grtn.org/"
                        />
                        <meta property="og:image" content="/Thumbnail.png" />

                        {/* twitter tags */}
                        <meta
                            property="twitter:card"
                            content="summary_large_image"
                        />
                        <meta
                            property="twitter:url"
                            content="https://oknize.grtn.org/"
                        />
                        <meta property="twitter:title" content="Oknize" />
                        <meta
                            property="twitter:description"
                            content="สร้างอีเวนต์ให้ nice ด้วย Oknize"
                        />
                        <meta
                            property="twitter:image"
                            content="/Thumbnail.png"
                        />
                    </Head>

                    <div className="hidden md:block">
                        <div className="grid grid-cols-12">
                            {/* if not this route, add sidebar */}
                            {!['/', '/about', '/event/create'].includes(
                                router.pathname
                            ) ? (
                                <div className="col-span-2">
                                    <Sidebar />
                                </div>
                            ) : (
                                <div></div>
                            )}
                            <div
                                className={
                                    !['/', '/about', '/event/create'].includes(
                                        router.pathname
                                    )
                                        ? `col-span-10`
                                        : 'col-span-12'
                                }
                            >
                                <Component {...pageProps} />
                            </div>
                        </div>
                    </div>

                    <div className="block md:hidden">
                        {/* not this route */}
                        {![
                            '/create',
                            '/',
                            '/about'.includes(router.pathname),
                        ] && <Navbar />}
                        <Component {...pageProps} />
                        {![
                            '/create',
                            '/',
                            '/about'.includes(router.pathname),
                        ] && <Footer />}
                    </div>
                </div>
            </AuthProvider>
        </QueryClientProvider>
    );
}
