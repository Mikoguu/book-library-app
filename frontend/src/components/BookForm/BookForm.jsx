import { useState } from "react";
import { useDispatch } from "react-redux";
import "./BookForm.css";
import booksData from "../../data/books.json";
import createBook from "../../utils/createBook";
import { addBook, fetchBook } from "../../redux/slices/booksSlice";
import { resetFilters } from "../../redux/slices/filterSlice";
import { setError } from "../../redux/slices/errorSlice";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBook({ title, author }, "manual");

      dispatch(addBook(book));

      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("Author and Title fields are required"));
    }
  };

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = createBook(booksData[randomIndex], "random");

    dispatch(addBook(randomBook));
    dispatch(resetFilters());
  };

  const handleAddRandomBookViaApi = async () => {
    dispatch(fetchBook());
  };
  return (
    <div className="app-block book-form">
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add random book
        </button>
        <button type="button" onClick={handleAddRandomBookViaApi}>
          Add random book via API
        </button>
      </form>
    </div>
  );
}

export default BookForm;
