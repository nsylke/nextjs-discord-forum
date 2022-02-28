import type { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';
import { withSessionRoute } from '@lib/iron-session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.query.code as string;

    const accessTokenResponse = await fetch(`https://discord.com/api/oauth2/token`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: stringify({
            client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: `http://localhost:3000/api/callback`
        })
    }).then((res) => res.json());

    const userResponse = await fetch(`https://discord.com/api/v9/users/@me`, {
        method: 'get',
        headers: {
            Authorization: `${accessTokenResponse.token_type} ${accessTokenResponse.access_token}`
        }
    }).then((res) => res.json());

    // @ts-ignore
    req.session.user = {
        userId: userResponse.id,
        email: userResponse.email,
        username: userResponse.username,
        discriminator: userResponse.discriminator,
        avatar: userResponse.avatar
    };
    await req.session.save();

    res.redirect('/');
};

export default withSessionRoute(handler);
