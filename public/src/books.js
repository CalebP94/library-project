function findAuthorById(authors, id) {
  const searchedAuthor = authors.find((author) => id === author.id);
  return searchedAuthor;
}

function findBookById(books, id) {
  const searchBooked = books.find((book) => id === book.id);
  return searchBooked;
}

function partitionBooksByBorrowedStatus(books) {
  const bookStatus = [];
  const borrowedArr = books.filter(book => {
    let borrow = book.borrows;
    for(row in borrow){
      let status = borrow[row]
      if(!status.returned){
        return book;
        break;
      }
    }
  });
  const returnedArr = books.filter(book => {
    let borrow = book.borrows;
    for(row in borrow){
      let borrowObj = borrow[row]
      //console.log(row, status)
      let status = borrowObj.returned;
      if(row == 0 && status === true){
        return books
      }

    }
  });
  bookStatus.push(borrowedArr);
  bookStatus.push(returnedArr);
  return bookStatus;
}

function getBorrowersForBook(book, accounts) {
  
  const values = Object.values(book);
  const bookData = values[4];
  
  const accountInfo = accounts.filter((account =>{
    //console.log(account.id);
    let id = account.id;
    for(row in bookData){
      let cursor = bookData[row];
      let returner = cursor.returned;
      if(cursor.id === id){
        //console.log(cursor.returned);
        account['returned'] = returner
        return accounts;
      }
    }
  }));
  //console.log("ACCOUNTS FILTERED", accountInfo);
  return accountInfo;

}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
