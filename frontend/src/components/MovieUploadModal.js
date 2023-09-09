import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from "react-bootstrap";

const MovieUploadModal = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const [thumbnail1, setThumbnail1] = useState(null);
  const [thumbnail2, setThumbnail2] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { show, onHide} = props;

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleThumbnail1Change = (event) => {
    setThumbnail1(event.target.files[0]);
  };

  const handleThumbnail2Change = (event) => {
    setThumbnail2(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Add the movie data to the FormData object
      formData.append('title', title);
      formData.append('description', description);
      formData.append('year', year);

      // Add the movie file and thumbnails to the FormData object
      formData.append('file', file);
      formData.append('thumbnail1', thumbnail1);
      formData.append('thumbnail2', thumbnail2);

      // Make the API request to upload the movie
      const response = await axios.post('/upload/movies', formData);

      // If the request was successful, clear the form and display a success message
      setTitle('');
      setDescription('');
      setYear('');
      setFile(null);
      setThumbnail1(null);
      setThumbnail2(null);
      setSuccess(true);
    } catch (error) {
      // If the request failed, display an error message
      console.error(error);
      setError('An error occurred while uploading the movie');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div className="card p-4 bg-dark text-light">
    <form onSubmit={handleSubmit} className="container my-5">
      {success && <div className="alert alert-success">Movie uploaded successfully!</div>}
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" value={title} onChange={handleTitleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} className="form-control"></textarea>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="year">Year:</label>
          <input id="year" type="text" value={year} onChange={handleYearChange} className="form-control" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="file">Movie file:</label>
        <input id="file" type="file" accept=".mp4" onChange={handleFileChange} className="form-control-file" />
      </div>
      <div className="form-group">
        <label htmlFor="thumbnail1">Thumbnail 1:</label>
        <input id="thumbnail1" type="file" accept="image/*" onChange={handleThumbnail1Change} className="form-control-file" />
      </div>
      <div className="form-group">
        <label htmlFor="thumbnail2">Thumbnail 2:</label>
        <input id="thumbnail2" type="file" accept="image/*" onChange={handleThumbnail2Change} className="form-control-file" />
      </div>
      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        {isSubmitting ? 'Uploading...' : 'Upload'}
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
    </form>
    </div>
    </Modal>
  );
};

export default MovieUploadModal;