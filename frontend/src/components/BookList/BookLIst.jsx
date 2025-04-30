import { useSelector, useDispatch } from "react-redux";
import "./BookList.css";
import { deleteBook } from "../../redux/books/actionCreators";

function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const handleBookDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {!!books ? (
        <ul>
          {books.map((book) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {`${book.title} by ${book.author}`}
                </div>
                <div className="book-actions">
                  <button
                    onClick={() => {
                      handleBookDelete(book.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No books yet</p>
      )}
    </div>
  );
}

export default BookList;
