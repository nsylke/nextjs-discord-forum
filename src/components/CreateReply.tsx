import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface CreateReplyProps {
    user: any;
}

const CreateReply: React.VFC<CreateReplyProps> = ({ user }) => {
    const [content, setContent] = useState('');
    const router = useRouter();
    const { id } = router.query;

    const onSubmit = async () => {
        await fetch(`http://localhost:3000/api/topic/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topicId: id,
                userId: `${user.userId}`,
                content: content
            })
        });
    };

    if (user) {
        return (
            <div>
                <h2>Reply</h2>
                <textarea
                    name="content"
                    id="content"
                    cols={30}
                    rows={10}
                    placeholder="Content"
                    className="block"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={onSubmit}>Reply</button>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Reply</h2>
                <p>
                    You must be logged in to reply. Click <a href="/api/login">here</a> to login.
                </p>
            </div>
        );
    }
};

export default CreateReply;
