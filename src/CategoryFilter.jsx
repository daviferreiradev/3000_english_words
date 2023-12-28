import React, { useState, useEffect } from 'react';
// Imports json
import wordsA1 from './data/words_A1.json';
import wordsA2 from './data/words_A2.json';
import wordsB1 from './data/words_B1.json';
import wordsB2 from './data/words_B2.json';
import wordsC1 from './data/words_C1.json';


function CategoryFilter({ onLevelChange }) {
    const [level, setLevel] = useState('A1');

    useEffect(() => {
        const loadWords = async () => {
            try {
                const response = await import(`./data/words_${level}.json`);
                onLevelChange(response.default);
            } catch (error) {
                console.error("Error loading words:", error);
            }
        };
    
        loadWords();
    }, [level]);

    // Salvando JSON no localStorage
    const loadAndStoreWords = () => {
        const categories = ['A1', 'A2', 'B1', 'B2', 'C1'];
        const data = { A1: wordsA1, A2: wordsA2, B1: wordsB1, B2: wordsB2, C1: wordsC1 };
    
        categories.forEach(category => {
            if (!localStorage.getItem(`words_${category}`)) {
                localStorage.setItem(`words_${category}`, JSON.stringify(data[category]));
            }
        });
    };

    loadAndStoreWords()

    return (
        <div className="category-filter">
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
            </select>
        </div>
    );
}

export default CategoryFilter;
