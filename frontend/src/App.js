import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetail from './components/BookDetail';
import FilterSort from './components/FilterSort';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApplyFilters = async (filters) => {
    try {
      setLoading(true);
      setError(null);

      // Build query string
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '') {
          params.append(key, value);
        }
      });

      console.log('Sending request with params:', params.toString());

      const response = await axios.get(`http://localhost:5000/api/books?${params.toString()}`);
      console.log('Received filtered books:', response.data);
      
      setBooks(response.data);
    } catch (err) {
      console.error('Error applying filters:', err);
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    handleApplyFilters({});
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Bookstore Management</h1>
        <Routes>
          <Route path="/" element={
            <>
              <BookForm 
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                onBookAdded={() => handleApplyFilters({})}
              />
              <FilterSort onApplyFilters={handleApplyFilters} />
              {loading ? (
                <div className="loading">Loading books...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : (
                <BookList 
                  books={books}
                  onDelete={() => handleApplyFilters({})}
                  setSelectedBook={setSelectedBook}
                />
              )}
            </>
          } />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
