//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import LandingPage from './pages/LandingPage';
import Homepage from './pages/HomePage';
import VideoPlayer from './components/VideoPlayer'
import MovieForm from './components/MovieUploadModal'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [file, setFile] = useState(null);
  const [datasetName, setDatasetName] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const hitBackend = () => {
    // axios.get('/image/', {responseType: 'blob',
    //   headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
    //     .then(response => {
    //       const blob = new Blob([response.data], { type: response.data.type });
    //       const url = URL.createObjectURL(blob);
    //       setImageUrl(url);
    //     })
    //     .catch(error => console.error(error));
    //localStorage.removeItem("token");

    axios.delete('/account/delete/melland5', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('datasetName', datasetName); // Add datasetName to formData
    axios.post('/upload/dataset', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       {/* <button onClick={hitBackend}>Send request</button> */}
  //       <VideoPlayer videoId="shawshank"/>
  //       <LoginForm/>
  //       <div>
  //         <form onSubmit={handleSubmit}>
  //           <input type="file" name="file" onChange={handleFileChange} />
  //           <input type="text" name="datasetName" onChange={(e) => setDatasetName(e.target.value)} />
  //           <button type="submit">Upload</button>
  //         </form>
  //       </div>
  //     </header>
  //   </div>
  // );

  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/watch/:movieName" element={<ProtectedRoute component={VideoPlayer} />} />
        <Route path="/home" element={<ProtectedRoute component={Homepage} />} />
        <Route path="/upload" element={<ProtectedRoute component={MovieForm} />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;