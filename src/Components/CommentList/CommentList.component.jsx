import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const CommentList = ({ commentObj, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false); // Stato per abilitare/disabilitare la modifica
  const [updatedComment, setUpdatedComment] = useState(commentObj.comment);
  const [updatedRating, setUpdatedRating] = useState(commentObj.rate);

  const handleEditChange = (event) => {
    setUpdatedComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setUpdatedRating(event.target.value);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const updatedCommentData = {
      comment: updatedComment,
      rate: updatedRating,
    };
    onUpdate(commentObj._id, updatedCommentData); // Passa l'ID del commento e i nuovi dati
    setIsEditing(false); // Disabilita la modalità di modifica
  };

  return (
    <Card className="m-2">
      <Card.Body>
        {isEditing ? (
          <Form onSubmit={handleSubmitEdit}>
            <Form.Group>
              <Form.Label>Modifica Commento</Form.Label>
              <Form.Control
                as="textarea"
                value={updatedComment}
                onChange={handleEditChange}
                rows={3}
                style={{ marginBottom: '10px' }} // Aggiungi un margine tra il campo e i bottoni
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Modifica Rating</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={updatedRating}
                onChange={handleRatingChange}
                style={{ marginBottom: '10px' }} // Aggiungi un margine tra il campo e i bottoni
              />
            </Form.Group>
            <Button variant="success" type="submit" style={{ marginRight: '10px' }}>Salva</Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Annulla
            </Button>
          </Form>
        ) : (
          <>
            <Card.Text>{commentObj.comment}</Card.Text>
            <Card.Subtitle className="mb-2 text-muted">Rating: {commentObj.rate}</Card.Subtitle>
            <Button variant="danger" onClick={() => onDelete(commentObj._id)}>
              Elimina Commento
            </Button>
            <Button variant="primary" onClick={() => setIsEditing(true)} style={{ marginLeft: '10px' }}>
              Modifica Commento
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentList;



// {
//   "_id": "66c7590343a56800158ec487",
//   "comment": "ciao prof , aggiorno il commentokkk",
//   "rate": 1,
//   "elementId": "1940026091",
//   "author": "tghtr",
//   "createdAt": "2024-08-22T15:28:03.491Z",
//   "updatedAt": "2024-09-27T16:52:59.230Z",
//   "__v": 0
// }