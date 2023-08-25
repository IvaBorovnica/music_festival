import { useParams } from 'react-router-dom';
import './Concerts.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Setlist = ({ songs, setSetlist, setlist}) => {
    // const [songs, setSongs] = useState();
    // const [concert, setConcert] = useState();
    
    // const [setlist, setSetlist] = useState([]);
    function addToSetlist(song){
        // setSetlist(setlist.push(song))
        // alert(song.id)
        // setSetlist(songs)
        setSetlist([...setlist, {order: setlist.length + 1, song: song}])
    }

    function removeFromSetlist(order){
        setSetlist(setlist.filter((setlistSong) => order!=setlistSong.order))
    }

    

    return ( 
        <div className="setlist">
            <div className='PrijavaIspita'>
        <h1>Prijava ispita</h1>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Predmet</th>
                    <th scope="col">ESPB</th>
                    <th scope="col">Prijavi</th>
                </tr>
            </thead>
            <tbody>
                {songs?.map((song) => <tr><td>{song.id}</td><td>{song.title}</td><td>{song.length}</td><td><button type="button" class="btn btn-outline-danger" onClick={() => addToSetlist(song)}>Add</button></td></tr>)}
            </tbody>
        </table>
        <h1>Prijavljeni ispiti</h1>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Predmet</th>
                    <th scope="col">ESPB</th>
                    <th scope="col">Ponisti prijavu</th>
                </tr>
            </thead>
            <tbody>
                {setlist?.map((setlistSong) => <tr><td>{setlistSong.song.title}</td><td>{setlistSong.song.length}</td><td><button type="button" class="btn btn-outline-danger" onClick={() => removeFromSetlist(setlistSong.order)}>X</button></td></tr>)}
            </tbody>
        </table>
    </div>
        </div>
     );
}
 
export default Setlist;