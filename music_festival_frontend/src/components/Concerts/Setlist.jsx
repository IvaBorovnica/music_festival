import { useParams } from 'react-router-dom';
import './Setlist.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Setlist = ({ songs, setSetlist, setlist}) => {
    function addToSetlist(song){
        setSetlist([...setlist, {order: setlist.length + 1, song: song}])
    }

    function removeFromSetlist(order){
        setSetlist(setlist.filter((setlistSong) => order!=setlistSong.order))
    }

    

    return ( 
        <div className="setlist">
            <div className='PrijavaIspita'>
        <h1>All songs</h1>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th>#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Length</th>
                    <th scope="col">Add to setlist</th>
                </tr>
            </thead>
            <tbody>
                {songs?.map((song) => <tr><td>{song.id}</td><td>{song.title}</td><td>{song.length}</td><td><button type="button" class="btn btn-outline-danger" onClick={() => addToSetlist(song)}>Add</button></td></tr>)}
            </tbody>
        </table>
        <h1>Create setlist</h1>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Length</th>
                    <th scope="col">Remove from setlist</th>
                </tr>
            </thead>
            <tbody>
                {setlist?.map((setlistSong) => <tr><td>{setlistSong.song.title}</td><td>{setlistSong.song.length}</td><td><button className='remove-btn' type="button" class="btn btn-outline-danger" onClick={() => removeFromSetlist(setlistSong.order)}>Remove</button></td></tr>)}
            </tbody>
        </table>
    </div>
        </div>
     );
}
 
export default Setlist;