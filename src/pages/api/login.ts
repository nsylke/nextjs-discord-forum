import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    const scope = ['identify', 'email'].join(' ');
    // @ts-ignore
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
        redirect_uri: `http://localhost:3000/api/callback`,
        scope: scope
    });

    res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
};

export default handler;
