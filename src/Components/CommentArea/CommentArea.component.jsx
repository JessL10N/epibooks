import React, { useState, useEffect, useContext } from "react";
import Card from 'react-bootstrap/Card';

//style import
import '../SingleBook/SingleBook.style.css'

// component imports
import CommentList from "../CommentList/CommentList.component";
import AddComment from "../AddComment/AddComment.component";

//context import
import { BookContext } from "../../Contexts/context";


const CommentArea = ({ asin }) => {  

  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [asin]);

  const refreshedPage = () => {
    return asin === 123456789;
  }


  const {bookList} = useContext(BookContext);


  const CommentContent = () => {
    return (
     <>
     {commentList.map((commentObj) => (
             <CommentList
               key={commentObj._id}
               commentObj={commentObj}
               onDelete={deleteComment}
               onUpdate={updateComment}
               setEditingCommentId={setEditingCommentId}
               isEditing={commentObj._id === editingCommentId}
             />
           ))}
           <AddComment asin={asin} addNewComment={addNewComment} />
     </>
    )
   }


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/books/${asin}/comments`, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YjZhODVkNzU4NzAwMTUzNzg2MzciLCJpYXQiOjE3MzIxMTQ0NjgsImV4cCI6MTczMzMyNDA2OH0.OhXlWPmSpnispbWjgn-hyy55xLFuvTKq91VbJnZ6UGY", // Assicurati di usare il tuo token valido
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei commenti");
      }
      const data = await response.json();
      setCommentList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addNewComment = (newComment) => {
    setCommentList((prevComments) => [newComment, ...prevComments]);
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YjZhODVkNzU4NzAwMTUzNzg2MzciLCJpYXQiOjE3MzIxMTQ0NjgsImV4cCI6MTczMzMyNDA2OH0.OhXlWPmSpnispbWjgn-hyy55xLFuvTKq91VbJnZ6UGY",
        },
      });

      if (response.ok) {
        setCommentList((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      } else {
        throw new Error("Errore nell'eliminazione del commento");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateComment = async (commentId, updatedComment) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YjZhODVkNzU4NzAwMTUzNzg2MzciLCJpYXQiOjE3MzIxMTQ0NjgsImV4cCI6MTczMzMyNDA2OH0.OhXlWPmSpnispbWjgn-hyy55xLFuvTKq91VbJnZ6UGY",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComment),
      });

      if (response.ok) {
        const updatedCommentData = await response.json();
        setCommentList((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, ...updatedCommentData } : comment
          )
        );
      } else {
        throw new Error("Errore nell'aggiornamento del commento");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Caricamento commenti...</div>;
  }

  if (error) {
    return <div>Errore nel caricamento dei commenti: {error}</div>;
  }

  const bookTitle = () => {
    if (asin === 123456789) return "";
    const book = bookList.find((el) => el.asin === asin);
    return book.title;
  };

  return (
    <div className="comment-area m-2 ps-0" data-testid="commentElement">
      <div className="inner-container">
      <h3 className="m-2">Recensioni<span className="bookTitle d-block text-primary h5 mt-2 mb-2"> {bookTitle()} </span></h3>
      {refreshedPage() ? (<DefaultComment />) : (<CommentContent />) }
      </div>      
    </div>
  );
};

const DefaultComment = () => {
  return (

    <Card className="m-2">
      <Card.Body>
        <Card.Text className="text-default-comment">
          Clicca su un libro per vedere le recensioni
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CommentArea;