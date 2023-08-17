import React, { useEffect, useState } from 'react';
import './Band.css';
import { useParams } from 'react-router-dom'
import axios from 'axios';

const BandInfo = () => {
  const { id } = useParams();
  const [info, setInfo] = useState();
  const [songs, setSongs] = useState();
  const [title, setTitle] = useState();
  const [length, setLength] = useState();
  const [currentBand, setBand] = useState();

  useEffect(() => {

    const fetchInfo = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/v1/bands/' + id, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });
          console.log(response)
          setInfo(response.data)
      } catch (error) {
          console.error('Login failed:', error);
          throw error;
      }
  }
  const fetchSongs = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/bands/' + id + '/songs', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response)
        setSongs(response.data)
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}
const fetchBand = async () => {
  try {
      const response = await axios.get('http://localhost:8080/api/v1/bands/' + id, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });
      console.log(response)
      setBand(response.data)
  } catch (error) {
      console.error('Login failed:', error);
      throw error;
  }
}
    fetchInfo();
    // fetchSongs();
    fetchBand();
    console.log(songs)
}, []);



  function addSong(){
    const newSongData = {
      title,
      length,
      band: {
        id
      }
    };
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Set the token as a header in the Axios request
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request using Axios with the token in the headers
    axios.post('http://localhost:8080/api/v1/songs', newSongData, config)
      .then((response) => {
        // Handle the successful addition here, such as displaying a success message or redirecting to another page
        console.log('Band added successfully!', response.data);

        // Redirect to '/bands' upon successful addition
        // window.location.href = '/bands';
      })
      .catch((error) => {
        // Handle addition errors here, such as displaying an error message
        console.error('Failed to add band:', error);
      });
  }

  const [location, setLocation] = useState();
  const [setlist, setSetlist] = useState(null);

  function addConcert(){
  //   const newConcertData = {
  //     location,
  //     setlist,
  //     band
  //   };
  //   // Get the token from local storage
  //   const token = localStorage.getItem('token');

  //   // Set the token as a header in the Axios request
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   // Make the POST request using Axios with the token in the headers
  //   axios.post('http://localhost:8080/api/v1/concert/' + band, newConcertData, config)
  //     .then((response) => {
  //       // Handle the successful addition here, such as displaying a success message or redirecting to another page
  //       console.log('Band added successfully!', response.data);

  //       // Redirect to '/bands' upon successful addition
  //       // window.location.href = '/bands';
  //     })
  //     .catch((error) => {
  //       // Handle addition errors here, such as displaying an error message
  //       console.error('Failed to add band:', error);
  //     });
  }

  return (
    <div className="band-info">
      <h1>{info?.name} {id}</h1>
      <h3>{info?.website}</h3>
      <h3>{info?.formationYear}</h3>
      <h3>Songs</h3>
      <div className="input-box">
        <label >Title</label>
        <input type="text" onChange={(event) => setTitle(event.target.value)}/>
      </div>
      <div className="input-box">
        <label >Length</label>
        <input type="text" onChange={(event) => setLength(event.target.value)}/>
      </div>
      <button onClick={() => addSong()}>Add</button>
      <h3>Concerts</h3>
      <div className="input-box">
        <label >Setlist</label>
        {/* <input type="text" onChange={(event) => setTitle(event.target.value)}/> */}
      </div>
      <div className="input-box">
        <label >Location</label>
        <input type="text" onChange={(event) => setLength(event.target.value)}/>
      </div>
      <button onClick={() => addConcert()}>Add</button>
    </div>
  );
}

export default BandInfo;
