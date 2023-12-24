import React, { useState, useEffect } from 'react';

function CategoryFilter({ onLevelChange }) {
    const [level, setLevel] = useState('A1');

    useEffect(() => {
        const loadWords = async () => {
            try {
                const response = await import(`./words_${level}.json`);
                onLevelChange(response.default);
            } catch (error) {
                console.error("Error loading words:", error);
            }
        };
    
        loadWords();
    }, [level]); // Remova onLevelChange da lista de dependências
    

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
