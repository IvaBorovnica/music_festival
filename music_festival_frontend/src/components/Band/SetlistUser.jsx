import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SetlistUser = () => {
    const {id} = useParams();
    const [concert, setConcert]= useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/concerts/' + id, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response)
                setConcert(response.data)
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        }
          fetchData();
    }, [])

    return ( 
        <div className="setlist-user">
            <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Length</th>
                </tr>
            </thead>
            <tbody>
                {concert?.setlist.map((song) => <tr><td>{song.title}</td><td>{song.length}</td></tr>)}
            </tbody>
        </table>
        </div>
     );
}
 
export default SetlistUser;