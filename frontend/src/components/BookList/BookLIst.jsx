import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import "./BookList.css";
import {
  deleteBook,
  toggleFavourite,
  selectBooks,
} from "../../redux/slices/booksSlice";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";

function BookList() {
  const dispatch = useDispatch();

  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const handleBookDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const handleToggleFavourite = (bookId) => {
    dispatch(toggleFavourite(bookId));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesOnlyFavorite = onlyFavoriteFilter ? book.isFavourite : true;
    return matchesTitle && matchesAuthor && matchesOnlyFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length > 0 ? (
        <ul>
          {filteredBooks.map((book) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {highlightMatch(book.title, titleFilter)} by{" "}
                  {highlightMatch(book.author, authorFilter)}
                </div>
                <div className="book-actions">
                  <span
                    onClick={() => {
                      handleToggleFavourite(book.id);
                    }}
                  >
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
