import React, { useState } from 'react';
import words from './words.json';

function RandomWord() {
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [showTranslation, setShowTranslation] = useState(false);

    const showRandomWord = () => {
        setCurrentWord(words[Math.floor(Math.random() * words.length)]);
        setShowTranslation(false); // Esconde a tradução para a próxima palavra
    };

    return (
        <div>
            <p>Word: {currentWord.word}</p>
            {showTranslation && <p>Translation: {currentWord.translation}</p>}
            
            {!showTranslation && (
                <button onClick={() => setShowTranslation(true)}>Show answer</button>
            )}

            {showTranslation && (
                <>
                    <button onClick={showRandomWord}>I knew</button>
                    <button onClick={showRandomWord}>I didn't know</button>
                </>
            )}

            {/* <button onClick={showRandomWord}>Show Random Word</button> */}
        </div>
    );
}

export default RandomWord;


