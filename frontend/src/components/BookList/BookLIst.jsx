import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import "./BookList.css";
import { deleteBook, toggleFavourite } from "../../redux/books/actionCreators";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";

function BookList() {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books);
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
    const matchesFilters =
      book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
      onlyFavoriteFilter
        ? book.isFavourite
        : true;

    return matchesFilters;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, i) => {
      console.log({ substring, filter });
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
