import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = ({ videoId }) => {
  const { movieName } = useParams();
  const isLocalhost = window.location.hostname === 'localhost';
  const srcUrl = isLocalhost ? `http://localhost:8080/movie/video/`+movieName : `http://${window.location.hostname}:8080/movie/video/`+movieName;

  return (
    <video controls muted autoPlay width="80%" height="80%">
        <source src={srcUrl} type="video/mp4"></source>
        <source src={srcUrl} type="video/x-matroska"/>
    </video>
  );
};

export default VideoPlayer;