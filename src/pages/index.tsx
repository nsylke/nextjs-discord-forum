import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import { withSessionSsr } from '@lib/iron-session';
import CreateTopic from '@components/CreateTopic';

interface Props {
    user: any;
}

const IndexPage: NextPage<Props> = ({ user }) => {
    const { data, error } = useSWR(`/api/topics`, (...args) => fetch(...args).then((res) => res.json()));

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
                    </ul>
                </div>
            </div>
            <table className="border-collapse table-auto w-full text-md">
                <thead>
                    <tr>
                        <th className="p-4 pl-8 pt-0 pb-3 text-left">Topic</th>
                        <th className="p-4 pt-0 pb-3 text-left">Replies</th>
                        <th className="p-4 pr-8 pt-0 pb-3 text-left">Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((topic: any) => (
                        <tr key={topic._id}>
                            <td
                                className="p-4 pl-8 cursor-pointer"
                                onClick={() => (window.location.href = `/t/${topic._id}`)}
                            >
                                {topic.name}
                            </td>
                            <td className="p-4">{topic.repliesCount}</td>
                            <td className="p-4 pr-8">n/a</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="py-4">
                <div className="w-full border-t border-gray-300" />
            </div>
            <CreateTopic user={user} />
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

export default IndexPage;
