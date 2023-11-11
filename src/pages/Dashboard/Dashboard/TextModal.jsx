import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { sendMsgToOpenAI } from './openai';
import { AuthContext } from '../../../context/UserContext/UserContext';

function TextModal({ show, handleClose, setGeneratedText }) {
    const { user } = useContext(AuthContext);

    const [inputText, setInputText] = useState('');
    const key = localStorage.getItem(`ChatGPTKey_${user.email}`);

    const handleSend = async () => {
        const res = await sendMsgToOpenAI(inputText, key);
        console.log(res);
        setGeneratedText(res);
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
                {/* <form onSubmit="handleSubmit"> */}
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

                <button
                    type="button"
                    onClick={handleSend}
                    className="btn btn-primary d-flex"
                >
                    Generate Text
                </button>
                {/* </form> */}
            </Modal.Body>
        </Modal>
    );
}

export default TextModal;
