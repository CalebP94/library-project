
function findAccountById(accounts, id) {
  const account = accounts.find((accoundID) => accoundID.id === id);
  return account;
}

function sortAccountsByLastName(accounts) {
  const account = accounts.sort((lastNameA, lastNameB) => 
    lastNameA.name.last.toLowerCase() > lastNameB.name.last.toLowerCase() ? 1 : -1);
  return account;
}

function getTotalNumberOfBorrows(account, books) {
  let borrowCount = 0;
  for (row in books){
    let bookObj = books[row]
    let borrow = bookObj.borrows;
    for(row in borrow){
      let borrowObj = borrow[row];
      let id = borrowObj.id;
      if (id === account.id){
        borrowCount += 1;

      }
    }
  }
  return borrowCount;
}

function getBooksPossessedByAccount(account, books, authors) { 
  const arrBooks = [];
  const accountID = account.id;
  //console.log("ACCOUNT ID", accountID);
  for(let i = 0; i<books.length; i++){
    let bookPosition = books[i];
    let borrowed = bookPosition.borrows;
    for(let j = 0; j<borrowed.length; j++){
      if(!borrowed[j].returned && borrowed[j].id === account.id){
        //console.log("RETURNED?", borrowed[j].returned)
        arrBooks.push(books[i]);
      }
    }
  }

  //console.log("arrBooks", arrBooks);
  const arrBooksWithAuthor = arrBooks.filter((data => {
    //console.log("DATA", data);
    let authorID = data.authorId
    for(row in authors){
      let cursor = authors[row]
      //console.log("AUTHOR", cursor.id);
      if(authorID === cursor.id){
        data['author'] = cursor;
        return data;
      }
    }
  }));
  //console.log(arrBooksWithAuthor);
  //console.log(arrBooksWithAuthor.author.name)
  return arrBooksWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
