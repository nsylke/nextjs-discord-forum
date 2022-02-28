import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { withSessionSsr } from '@lib/iron-session';
import CreateReply from '@components/CreateReply';

interface Props {
    user: any;
}

const TopicPage: NextPage<Props> = ({ user }) => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR(`/api/topic/${id}`, (...args) => fetch(...args).then((res) => res.json()));

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="my-4 mb-8 font-semibold text-2xl">My Site</h1>
            <div className="mb-4 flex">
                <div className="p-3 text-md flex-1 breadcrumbs">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>{data.name}</li>
                    </ul>
                </div>
            </div>
            <div className="w-full text-md">
                <h2 className="mb-4 font-semibold text-2xl">{data.name}</h2>
                {data.replies.map((reply: any) => (
                    <div className="w-1/2 pb-4 mb-4 block border-b border-gray-300 last:border-b-0" key={reply._id}>
                        <div className="flex mb-2">
                            <div className="flex-1">
                                <span className="font-semibold">{reply.userId}</span>
                            </div>
                            <div>
                                <span className="text-gray-700">{reply.createdAt}</span>
                            </div>
                        </div>
                        <div>
                            <p>{reply.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="py-4">
                <div className="w-full border-t border-gray-300" />
            </div>
            <CreateReply user={user} />
        </div>
    );
};

export const getServerSideProps = withSessionSsr(async ({ req }) => {
    // @ts-ignore
    const user = req.session.user;

    return {
        props: {
            user: user ?? null
        }
    };
});

export default TopicPage;
