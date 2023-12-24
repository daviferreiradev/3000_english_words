import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import CategoryFilter from './CategoryFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RandomWord.css';


function RandomWord() {
    const [currentWord, setCurrentWord] = useState("");
    const [currentWordsSet, setCurrentWordsSet] = useState([]); // Novo estado para armazenar o conjunto atual de palavras
    const [translation, setTranslation] = useState('');
    const [wordDetails, setWordDetails] = useState(null);
    const [showTranslation, setShowTranslation] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const translateWord = async (word) => {
        setIsLoading(true);
        try {
            const response = await fetch("https://libretranslate.de/translate", {
                method: "POST",
                body: JSON.stringify({
                    q: word,
                    source: "en",
                    target: "pt",
                    format: "text"
                }),
                headers: { "Content-Type": "application/json" }
            });
    
            if (!response.ok) {
                throw new Error('Failed to translate');
            }
    
            const data = await response.json();
            setTranslation(data.translatedText);
        } catch (error) {
            console.error("Translation error:", error);
            setTranslation('Error in translation');
        } finally {
            setIsLoading(false);
        }
    };
    

    const getWordDetails = async (word) => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error('Failed to fetch word details');
            }
            const data = await response.json();
            setWordDetails(data[0]);
        } catch (error) {
            console.error("Error fetching word details:", error);
            setWordDetails(null);
        }
    };

    const showRandomWord = () => {
        if (currentWordsSet && currentWordsSet.length > 0) {
            const randomWord = currentWordsSet[Math.floor(Math.random() * currentWordsSet.length)];
            setCurrentWord(randomWord);
            setShowTranslation(false);
            setTranslation('');
            getWordDetails(randomWord);
        }
    };

    const handleShowTranslation = () => {
        if (currentWord) {
            translateWord(currentWord);
            setShowTranslation(true);
        }
    };

    const playAudio = (audioUrl) => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const getExamples = () => {
        let examples = [];
        wordDetails?.meanings.forEach(meaning => {
            meaning.definitions.forEach(def => {
                if (def.example) {
                    examples.push(def.example);
                }
            });
        });
        return examples;
    };

    const handleLevelChange = (newWords) => {
        setCurrentWordsSet(newWords); // Atualiza o conjunto atual de palavras
        if (newWords && newWords.length > 0) {
            const randomWord = newWords[Math.floor(Math.random() * newWords.length)];
            setCurrentWord(randomWord);
            setShowTranslation(false);
            setTranslation('');
            getWordDetails(randomWord);
        }
    };  

    return (
        <div className="random-word-container">
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <CategoryFilter onLevelChange={handleLevelChange} />
                <i className="bi bi-info-circle" onClick={toggleModal}></i>
            </div>

            <div>
                <div className="word-audio-container">
                    <p id='english-word' className='text-capitalize'>{currentWord}</p>
                    {wordDetails?.phonetics[0]?.audio && (
                        <i className="bi bi-volume-up" onClick={() => playAudio(wordDetails.phonetics[0].audio)}></i>
                    )}
                </div>

                {/* Spinner de carregamento */}
                {isLoading && (
                    <div className="text-center mt-2">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden custom-spinner">Loading...</span>
                        </div>
                    </div>
                )}

                {/* Exibir tradução */}
                {!isLoading && showTranslation && <p>{translation}</p>}
            </div>

            {!showTranslation && (
                <button onClick={handleShowTranslation}>Show answer</button>
            )}

            {showTranslation && (
                <div className='w-100'>
                    <button onClick={showRandomWord}>I knew</button>
                    <button id='btn-didnt-know' onClick={showRandomWord}>I didn't know</button>
                </div>
            )}


            {/* Modal do Bootstrap para exibir as informações */}
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
        </div>
    );
}

export default RandomWord;
