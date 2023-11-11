import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthContext } from '../../../context/UserContext/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function TextModal({ show, handleClose, setGeneratedText }) {
    const { user } = useContext(AuthContext);

    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const key = localStorage.getItem(`ChatGPTKey_${user.email}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: inputText,
                    max_tokens: 256,
                    temperature: 0.7,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${key}`,
                    },
                }
            );

            const text = res.data.choices[0];
            console.log(text);
            setGeneratedText(res.data.choices[0]);
            toast.success('success');
        } catch (error) {
            console.error('Error generating text:', error);
            toast.error('Failed');
        } finally {
            setLoading(false);
            setInputText('');
            handleClose();
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            scrollable={true}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    className="modal-title ps-2"
                    id="contained-modal-title-vcenter"
                >
                    AI
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 form-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            className="form-control py-2"
                            placeholder="Write your text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary d-flex">
                        {loading ? 'Generating...' : 'Generate Text'}
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default TextModal;
