import { Modal } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/UserContext/UserContext';
import toast from 'react-hot-toast';

function CredentialsModal({ show, handleClose }) {
    const intial = {
        key: '',
    };

    const { user } = useContext(AuthContext);

    const [chatGPTKey, setSchatGPTKey] = useState(intial);

    const handleChange = (e) => {
        setSchatGPTKey({ ...chatGPTKey, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();

        // Save the JSON string to local storage
        localStorage.setItem(`ChatGPTKey_${user.email}`, chatGPTKey.key);
        toast.success('Successfully Added');
        setSchatGPTKey(intial);
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
                    Add Credentials
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 form-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label label-text">
                            Your ChatGPT Secret Key
                        </label>
                        <input
                            type="text"
                            name="key"
                            value={chatGPTKey.key}
                            className="form-control py-2"
                            placeholder="Enter your secret key"
                            required
                            onChange={handleChange}
                        />
                        <p style={{ fontSize: '12px' }}>
                            Don't have a ChatGPT Developer Account?{' '}
                            <a
                                href="https://platform.openai.com/api-keys"
                                target="_blank"
                            >
                                Click Here
                            </a>{' '}
                        </p>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default CredentialsModal;
