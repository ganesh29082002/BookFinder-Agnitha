import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterComponent from './FilterComponent';
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

const BookFinder = () => {
  const [formData, setFormData] = useState({
    query: '',
    author: '',
    year: '',
    language: ''
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const fetchBooks = async () => {
    setLoading(true); 
    setError(null);  
    try {
      const params = {};
      if (formData.query) params.title = formData.query;
      if (formData.author) params.author = formData.author;
      if (formData.year) params.first_publish_year = formData.year;
      if (formData.language) params.language = formData.language;
    
      const response = await axios.get(import.meta.env.VITE_APP_API_URL, {
        params: params 
      });

      console.log(response.data.docs, "response.data.docs")
      
      setBooks(response.data.docs);
      if (response.data.docs.length === 0) {
        toast.info("No books found for the given criteria.");  
      }
    } catch (error) {
      console.log(error.message , "error")
      setError('Error fetching books');
      toast.error('Error fetching books, please try again later.');  
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (formData.query) fetchBooks();
  }, [formData]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Book Finder</h1>
      <FilterComponent
        formData={formData}
        onChangeHandler={onChangeHandler}
        fetchBooks={fetchBooks}
      />
      
      {loading && <div className="text-center my-4">Loading...</div>}  
      
      {error && <div className="text-center text-red-500 my-4">{error}</div>} 
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <div key={index} className="bg-white p-4 rounded shadow flex items-start">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="w-24 h-36 object-cover mr-4"
              />
            ) : (
              <div className="w-24 h-36 bg-gray-300 mr-4">Not Available</div>
            )}
            
            <div>
              <h2 className={`font-bold ${book.cover_i ? '' : 'text-gray-700'}`}>
                {book.title}
              </h2>
              <p>Author: {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
              <p>First Published: {book.first_publish_year || 'N/A'}</p>
              <p>Language: {book.language ? book.language.join(', ') : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookFinder;
