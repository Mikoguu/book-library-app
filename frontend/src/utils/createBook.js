import { v4 as uuidv4 } from "uuid";
const createBook = (book) => {
  return {
    ...book,
    isFavourite: false,
    id: uuidv4(),
  };
};

export default createBook;
