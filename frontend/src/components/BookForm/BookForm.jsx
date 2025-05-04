import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./BookForm.css";
import booksData from "../../data/books.json";
import createBook from "../../utils/createBook";
import { addBook } from "../../redux/slices/booksSlice";
import { resetFilters } from "../../redux/slices/filterSlice";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBook({ title, author });

      dispatch(addBook(book));

      setTitle("");
      setAuthor("");
    }
  };

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = createBook(booksData[randomIndex]);

    dispatch(addBook(randomBook));
    dispatch(resetFilters());
  };

  const handleAddRandomBookViaApi = async () => {
    try {
      const res = await axios.get("http://localhost:5000/random-book");
      if (res?.data?.title && res?.data?.author) {
        dispatch(addBook(createBook(res.data)));
      }
    } catch (error) {
      console.error(error);
    }
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
