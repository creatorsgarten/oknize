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

const queryClient = new QueryClient();

const notosansthai = Noto_Sans_Thai({ subsets: ['thai'] });

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <div className={notosansthai.className}>
                <Head>
                    <title>OKNIZE</title>
                </Head>

                <div className="hidden md:block">
                    <div className="grid grid-cols-12">
                        {router.pathname !== '/' &&
                        router.pathname !== '/about' &&
                        router.pathname !== '/event/create' ? (
                            <div className="col-span-2">
                                <Sidebar />
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <div
                            className={
                                router.pathname !== '/' &&
                                router.pathname !== '/about'
                                    ? `col-span-10`
                                    : 'col-span-12'
                            }
                        >
                            <Component {...pageProps} />
                        </div>
                    </div>
                </div>

                <div className="block md:hidden">
                    {!['/create', '/', '/about'.includes(router.pathname)] && (
                        <Navbar />
                    )}
                    <Component {...pageProps} />
                    {!['/create', '/', '/about'.includes(router.pathname)] && (
                        <Footer />
                    )}
                </div>
            </div>
        </QueryClientProvider>
    );
}
