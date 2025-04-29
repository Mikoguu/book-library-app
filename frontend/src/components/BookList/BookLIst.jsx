import { useSelector } from "react-redux";
import "./BookList.css";

function BookList() {
  const books = useSelector((state) => state.books);
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {!!books ? (
        <ul>
          {books.map((book) => {
            return <li key={book.id}>{`${book.title} by ${book.author}`}</li>;
          })}
        </ul>
      ) : (
        <p>No books yet</p>
      )}
    </div>
  );
}

export default BookList;
