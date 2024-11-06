const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const axios = require('axios');
const mongoose = require('mongoose');

// Test route DEVE essere PRIMA della route con :id
router.get('/test-service', async (req, res) => {
  try {
    console.log('Testing Python description service...');
    
    const response = await axios.post('http://localhost:5001/generate-description', {
      title: "Test Book",
      author: "Test Author",
      year: 2023
    });
    
    console.log('Response from Python service:', response.data);
    
    res.json({
      status: 'success',
      data: response.data
    });
  } catch (error) {
    console.error('Error testing description service:', error.response?.data || error.message);
    res.status(500).json({
      status: 'error',
      message: error.message,
      details: error.response?.data
    });
  }
});

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new book
router.post('/', async (req, res) => {
  try {
    console.log('Creating new book:', req.body);

    // Get description from Python service
    let description = '';
    try {
      console.log('Requesting description from Python service...');
      
      const descriptionResponse = await axios.post('http://localhost:5001/generate-description', {
        title: req.body.title,
        author: req.body.author,
        year: parseInt(req.body.yearPublished)
      });
      
      console.log('Description service response:', descriptionResponse.data);
      description = descriptionResponse.data.description;
    } catch (error) {
      console.error('Error getting description:', error.response?.data || error.message);
      description = 'Description not available.';
    }

    const book = new Book({
      ...req.body,
      description
    });

    const newBook = await book.save();
    console.log('Book saved successfully:', newBook);
    
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(400).json({ message: err.message });
  }
});

// GET single book by ID (DEVE essere DOPO /test-service)
router.get('/:id', async (req, res) => {
  try {
    // Verifica che l'ID sia valido
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE book
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting book with ID:', req.params.id);
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    console.log('Book deleted successfully:', deletedBook);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ message: err.message });
  }
});

// PUT (update) book
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating book with ID:', req.params.id);
    console.log('Update data:', req.body);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    // Se il libro viene aggiornato, mantieni la descrizione esistente
    const existingBook = await Book.findById(req.params.id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        description: existingBook.description // Mantieni la descrizione esistente
      },
      { new: true } // Restituisce il documento aggiornato
    );

    console.log('Book updated successfully:', updatedBook);
    res.json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 