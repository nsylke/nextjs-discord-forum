import type { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

const options = {
    cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME!,
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
};

function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, options);
}

function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
    handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
    return withIronSessionSsr(handler, options);
}

export { withSessionRoute, withSessionSsr };
