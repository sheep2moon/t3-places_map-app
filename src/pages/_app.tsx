import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import superjson from "superjson";
import type { AppType } from "next/app";
import type { AppRouter } from "../server/router";
import type { Session } from "next-auth";
import "../styles/globals.css";
import Layout from "../modules/layout";
import { ThemeProvider } from "next-themes";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class">
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </SessionProvider>
    );
};

const getBaseUrl = () => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default withTRPC<AppRouter>({
    config() {
        const url = `${getBaseUrl()}/api/trpc`;

        return {
            links: [
                loggerLink({
                    enabled: opts => process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error)
                }),
                httpBatchLink({ url })
            ],
            url,
            transformer: superjson
        };
    },

    ssr: true
})(MyApp);
