import React, { useState } from 'react';

interface CreateTopicProps {
    user: any;
}

const CreateTopic: React.VFC<CreateTopicProps> = ({ user }) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const onSubmit = async () => {
        const res = await fetch(`http://localhost:3000/api/topic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                userId: `${user.userId}`,
                content: content
            })
        });
        const json = await res.json();

        window.location.href = `http://localhost:3000/t/${json.id}`;
    };

    if (user) {
        return (
            <div>
                <h2>Create a new topic</h2>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="block"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button onClick={onSubmit}>Create</button>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Create a new topic</h2>
                <p>
                    You must be logged in to create a new topic. Click <a href="/api/login">here</a> to login.
                </p>
            </div>
        );
    }
};

export default CreateTopic;
