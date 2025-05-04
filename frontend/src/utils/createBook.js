import { v4 as uuidv4 } from "uuid";
const createBook = (book, source) => {
  return {
    ...book,
    source,
    isFavourite: false,
    id: uuidv4(),
  };
};

export default createBook;
