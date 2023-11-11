import React, { useContext, useEffect, useState } from 'react';
import CredentialsModal from './CredentialsModal';
import { GiArtificialHive } from 'react-icons/gi';
import TextModal from './TextModal';
import { AuthContext } from '../../../context/UserContext/UserContext';

function Dashboard() {
    const { user } = useContext(AuthContext);
    const [generatedText, setGeneratedText] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);
    const [showTextField, setShowField] = useState(false);

    const handleCredentialsClose = () => setShowCredentials(false);
    const handleCredentialsShow = () => setShowCredentials(true);
    const handleTextFieldClose = () => setShowField(false);
    const handleTextFieldShow = () => setShowField(true);

    // Check if the key exists in local storage

    const hasCredentialsKey = localStorage.getItem(`ChatGPTKey_${user.email}`);

    const handleGenerateButtonClick = () => {
        // Perform any additional logic here before showing the modal

        // Check if the key exists and show the appropriate modal
        if (hasCredentialsKey) {
            handleTextFieldShow();
        } else {
            handleCredentialsShow();
        }
    };

    console.log(generatedText);

    return (
        <>
            <div className="home-content">
                <div className="d-flex justify-content-between  align-items-center gap-2 mb-3">
                    <label
                        for="exampleFormControlInput1"
                        class="form-label fw-bold"
                    >
                        Descriptions
                    </label>
                    <button
                        onClick={handleGenerateButtonClick}
                        className="btn btn-primary"
                    >
                        <GiArtificialHive /> Generate with AI
                    </button>
                </div>

                <div>
                    <textarea rows="12" class="form-control"></textarea>
                </div>
            </div>

            <CredentialsModal
                show={showCredentials}
                handleClose={handleCredentialsClose}
            />
            <TextModal
                show={showTextField}
                handleClose={handleTextFieldClose}
                setGeneratedText={setGeneratedText}
                generatedText={generatedText}
            />
        </>
    );
}

export default Dashboard;
