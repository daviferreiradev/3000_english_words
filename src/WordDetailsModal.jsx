import React from 'react';
import { Modal } from 'react-bootstrap';

{/* Modal do Bootstrap para exibir as informações */}
const WordDetailsModal = ({ showModal, toggleModal, currentWord, wordDetails, getExamples }) => {
    return (
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title><p id='english-word' className='text-capitalize'>{currentWord}</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {wordDetails ? (
                    <div>
                        <p><strong>Pronunciation:</strong> {wordDetails.phonetics[0]?.text || "Not available"}</p>
                        {wordDetails.meanings.map((meaning, index) => (
                            <div key={index}>
                                <p><strong>Class:</strong> {meaning.partOfSpeech || "Not available"}</p>
                                {meaning.definitions.map((def, defIndex) => (
                                    <p key={defIndex}><strong>Definition {defIndex + 1}:</strong> {def.definition}</p>
                                ))}
                            </div>
                        ))}

                        {/* Exibir exemplos */}
                        <div>
                            <strong>Examples:</strong>
                            {getExamples().map((example, index) => (
                                <p key={index}>{example}</p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No details available.</p>
                )}
                
            </Modal.Body>
        </Modal>
    );
};

export default WordDetailsModal;
