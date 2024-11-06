import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';

function BookDetail() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="book-detail loading">Loading...</div>;
  if (error) return <div className="book-detail error">Error: {error}</div>;
  if (!book) return <div className="book-detail not-found">Book not found</div>;

  return (
    <div className="book-detail">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to List
      </button>
      <div className="book-content">
        <h2>{book.title}</h2>
        <div className="book-info">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Year Published:</strong> {book.yearPublished}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <div className="book-description">
            <h3>Description</h3>
            <p>{book.description || 'No description available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail; 