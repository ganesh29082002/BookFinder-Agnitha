import React from 'react'
import BookFinder from './components/BookFinder';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
       <BookFinder/>
       <ToastContainer/>

    </div>
  );
}

export default App;
