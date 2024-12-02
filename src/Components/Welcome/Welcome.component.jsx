import React from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";

const Welcome = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Benvenuti in EpiBooks</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant="info">
            Registrati per conoscere tutti i vantaggi del nostro servizio!
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;