import axios from 'axios';
import React from 'react';
import { Badge, Button, ListGroup, Table } from 'react-bootstrap';
import {url} from '../../url'

const SongsList = ({ songs, getSongs, showSuccessNotf, showFailNotf, setIsLoading, selectSong }) => {

    const deleteSong = id => {
        setIsLoading(true);
        // endpoint DELETE -> /songs/:id
        axios.delete(`${url.URL_SONGS}/${id}`)
            .then(() => {
                getSongs();
                showSuccessNotf("Song removed successfully");
            })
            .catch(() => showFailNotf())
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Artist</th>
                        <th>Genre</th>
                        <th>Release date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>   
                {
                    songs.map(song => {

                        return (
                            <tr key={song.id}>
                                <td>{song.name}</td>
                                <td>{song.artist}</td>
                                <td>{song.genre}</td>
                                <td>{song.releaseDate}</td>
                                <td>
                                    <Button 
                                        variant='danger'
                                        size='sm'
                                        className="me-1"
                                        onClick={() => deleteSong(song.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                        variant='warning'
                                        size='sm'
                                        onClick={() => selectSong(song)}
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    );
};

export default SongsList;