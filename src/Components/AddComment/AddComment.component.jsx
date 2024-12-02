import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"

//style import
import "./AddComment.style.css";

const AddComment = ({ asin, addNewComment }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const postData = async () => {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YjZhODVkNzU4NzAwMTUzNzg2MzciLCJpYXQiOjE3MzIxMTQ0NjgsImV4cCI6MTczMzMyNDA2OH0.OhXlWPmSpnispbWjgn-hyy55xLFuvTKq91VbJnZ6UGY", // Assicurati di inserire un token valido
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        comment: comment,
        rate: rating,
        elementId: asin,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      addNewComment(data);
    } else {
      console.error("Errore nell'invio del commento:", response.status);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postData();
    setComment("");
    setRating("");
  };

  return (
    <Card className="m-2 add-comment">
      <Card.Header as="h6">Aggiungi un commento</Card.Header>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Row className="my-1 g-1">
            <Col sm={12}>
              <Form.Control
                type="text"
                placeholder="Cosa ne pensi di questo libro?"
                onChange={handleCommentChange}
                value={comment}
              />
            </Col>

            <Col sm={12}>
              <Form.Control
                type="text"
                placeholder="Rating (1-5)"
                onChange={handleRatingChange}
                value={rating}
              />
            </Col>
            <Col sm={12}>
              <Button type="submit">Aggiungi Commento</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Card>
  );
};

export default AddComment;
