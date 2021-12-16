//GET TOTAL BOOKS COUNT-------------------------------------------------------------------------------------
function getTotalBooksCount(books) {
  const bookNumber = books.length;
  return bookNumber;
}

//---------------------------------------------------------------------------------------------------------------------
//GET TOTAL ACCOUNTS-------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
function getTotalAccountsCount(accounts) {
  const accountNumber = accounts.length;
  return accountNumber;
}

//---------------------------------------------------------------------------------------------------------------------
//BOOKS BORROWED COUNT-------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
function getBooksBorrowedCount(books) {
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
  const numberBorrowed = borrowedArr.length;
  return numberBorrowed;
}

//---------------------------------------------------------------------------------------------------------------------
//GET MOST POP GENRE----------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

//---------------------------
//HELPER FUNCTION FOR BELOW 
//---------------------------
function objectHelper(data){
  const arr = [];
  for(row in data){
    let obj = {};
    let counter = data[row];
    obj['name'] = row;
    obj['count'] = counter;
    arr.push(obj)
  }
  return arr;
}

function getMostCommonGenres(books) {
  const genres = books.map((book) => book.genre);
  const counts = genres.reduce((counts, genres) => {
    counts[genres] = (counts[genres] || 0) + 1;
    return counts ;
  }, {});

  const arr = objectHelper(counts);
  
  /* Code replace by Helper Function
  
  const arr = []
  for(row in counts){
    let obj = {};
    let counter = counts[row]
    obj['name'] = row;
    obj['count'] = counter; 
    arr.push(obj)   
  }*/
  
  arr.sort((a,b) => (a.count < b.count) ? 1 : -1);
  arr.splice(5,1);
  return arr;
}
//---------------------------------------------------------------------------------------------------------------------
//GET MOST POP BOOK-----------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------



function getMostPopularBooks(books) {
  const sortedBooks = books.sort((a, b) => (a.borrows.length < b.borrows.length) ? 1 : ((b.borrows.length < a.borrows.length) ? -1 : 0));
  const counts = books.reduce((acc, titles) => {
    acc[titles.title] = titles.borrows.length;
    return acc;
  }, {});

  //console.log(counts);

  const arr = objectHelper(counts);

  /* -- Code replaced by Helper Function... 
  for(row in counts){
    let obj = {};
    let counter = counts[row];
    obj['name'] = row;
    obj['count'] = counter;
    arr.push(obj);
  }*/

  arr.sort((a,b) => (a.count < b.count) ? 1 : -1);
  arr.splice(5, 4);
  return arr;
}

//-------------------------------------------------------------------------------------------------------
//GET MOST POP AUTHOR-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
function getMostPopularAuthors(books, authors) {

  const arr = [];
  for(row in books){
    const obj ={};
    const cursor = books[row];
    const id = cursor.authorId;
    const length = cursor.borrows.length
    obj["id"] = id;
    obj["length"] = length;
    arr.push(obj);
  }

  const finalArr = arr.map((row) =>{
    let obj = {};
    let id = row.id;
    let length = row.length;
    for(row in authors){
      const cursor = authors[row];
      const authorId = cursor.id
      if(id === authorId){
        //console.log(`${cursor.name.first} ${cursor.name.last}`);
        obj['name'] = `${cursor.name.first} ${cursor.name.last}`;
        obj['count'] = length;
      }
    }
    return obj
  })

  finalArr.sort((a,b) => (a.count < b.count) ? 1 : -1);
  finalArr.splice(5, 4);

  return finalArr;
}
 
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
