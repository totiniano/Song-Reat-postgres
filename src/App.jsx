
import './App.css'
import { Col, Container, Navbar, Row, Spinner, Toast } from 'react-bootstrap'
import SongsForm from './components/SongsForm'
import SongsList from './components/SongsList'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {url} from '../url'

function App() {
  
  const [songs, setSongs] = useState([]);
  const [notification, setNotification] = useState({ message: "", variant: "success", show: false })
  const [isLoading, setIsLoading] = useState(true);
  const [songSelected, setSongSelected] = useState(null);

  useEffect(() => {
    getSongs();
  }, []);

  const getSongs = () => {
    // endpoint GET -> /songs
    axios.get(url.URL_SONGS)
      .then(res => setSongs(res.data))
      .finally(() => setIsLoading(false));
  }


  const showSuccessNotf = (message) => {
    setNotification({ message, variant: "success", show: true })
  }

  const showFailNotf = (message) => {
    setNotification({
      message: message ? message : 'There was an error',
      variant: "danger",
      show: true
    })
  }

  const selectSong = toDo => setSongSelected(toDo);
  const deselectSong = () => setSongSelected(null);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container style={{ maxWidth: 900 }}>
          <Navbar.Brand href="#home">
            Songs crud
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-2" style={{ maxWidth: 900 }}>
        <Spinner className={`ms-auto d-block ${!isLoading && 'invisible'}`} />
        <SongsForm
          getSongs={getSongs}
          showSuccessNotf={showSuccessNotf}
          showFailNotf={showFailNotf}
          setIsLoading={setIsLoading}
          songSelected={songSelected}
          deselectSong={deselectSong}
        />
        <SongsList
          songs={songs}
          getSongs={getSongs}
          showSuccessNotf={showSuccessNotf}
          showFailNotf={showFailNotf}
          setIsLoading={setIsLoading}
          selectSong={selectSong}
        />
      </Container>
      <Container style={{ position: 'fixed', bottom: '40px', left: 0, right: 0 }}>
        <Toast
          onClose={() => setNotification({ ...notification, show: false })}
          position="bottom-start"
          show={notification.show}
          bg={notification.variant}
          delay={3000}
          className="text-light"
          autohide
        >
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      </Container>
    </>
  )
}

export default App
