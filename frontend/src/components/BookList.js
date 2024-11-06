import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookList.css';

function BookList({ books, onDelete, setSelectedBook }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this book?')) {
        console.log('Deleting book with ID:', id);
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        console.log('Book deleted successfully');
        onDelete(); // Ricarica la lista dei libri
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book');
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
  };

  const handleViewDetails = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="book-list">
      <h2>Books</h2>
      <div className="books-grid">
        {books.map(book => (
          <div key={book._id} className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Year:</strong> {book.yearPublished}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <div className="book-actions">
              <button 
                onClick={() => handleViewDetails(book._id)}
                className="view-button"
              >
                View Details
              </button>
              <button 
                onClick={() => handleEdit(book)}
                className="edit-button"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(book._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList; 