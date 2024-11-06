import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookForm.css';

function BookForm({ selectedBook, setSelectedBook, onBookAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    yearPublished: '',
    price: ''
  });

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        title: selectedBook.title,
        author: selectedBook.author,
        yearPublished: selectedBook.yearPublished,
        price: selectedBook.price
      });
    }
  }, [selectedBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBook) {
        console.log('Updating book:', selectedBook._id);
        await axios.put(`http://localhost:5000/api/books/${selectedBook._id}`, formData);
        console.log('Book updated successfully');
      } else {
        console.log('Creating new book');
        await axios.post('http://localhost:5000/api/books', formData);
        console.log('Book created successfully');
      }

      setFormData({
        title: '',
        author: '',
        yearPublished: '',
        price: ''
      });
      setSelectedBook(null);
      onBookAdded();
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Error saving book');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      author: '',
      yearPublished: '',
      price: ''
    });
    setSelectedBook(null);
  };

  return (
    <div className="book-form">
      <h2>{selectedBook ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Year Published:</label>
          <input
            type="number"
            name="yearPublished"
            value={formData.yearPublished}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {selectedBook ? 'Update Book' : 'Add Book'}
          </button>
          {selectedBook && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm; 