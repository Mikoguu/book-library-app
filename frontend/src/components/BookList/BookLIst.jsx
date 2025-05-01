import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import "./BookList.css";
import { deleteBook, toggleFavourite } from "../../redux/books/actionCreators";
import { selectTitleFilter } from "../../redux/slices/filterSlice";

function BookList() {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);

  const handleBookDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const handleToggleFavourite = (bookId) => {
    dispatch(toggleFavourite(bookId));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter?.toLowerCase());

    return matchesTitle;
  });

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length > 0 ? (
        <ul>
          {filteredBooks.map((book) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {`${book.title} by ${book.author}`}
                </div>
                <div className="book-actions">
                  <span onClick={() => handleToggleFavourite(book.id)}>
                    {book.isFavourite ? (
                      <BsBookmarkStarFill className="star-icon" />
                    ) : (
                      <BsBookmarkStar className="star-icon" />
                    )}
                  </span>
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
