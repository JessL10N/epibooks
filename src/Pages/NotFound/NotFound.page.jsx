import React from 'react'
import { Container, Alert } from 'react-bootstrap';


const NotFound = () => {
  return (
    <Container className='vh-100 d-flex align-items-center justify-content-center'>
    <Alert variant="warning" className='w-75'>
    <Alert.Heading>404 Pagina Non Trovata</Alert.Heading>
    <p>
      Attenzione, sembra che la pagina che stai cercando non esiste.
    </p>
    <hr />
    <p>Torna alla <Alert.Link href="/">Homepage</Alert.Link></p>
  </Alert>
  </Container>
      )}

export default NotFound