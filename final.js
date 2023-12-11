//

const bookCovers =(data)=> {
    console.log(data);

    bookData.forEach((book)=> {
        let cards = document.createElement("div");
          cards.classList.add("cards");

          let bookCover = document.createElement("img");
          bookCover.src = book.cover;

          cards.append(bookCover);

          $("#bookImages").append(cards);
    })

};

const crudInfo =()=> {

   let crudInfoList = document.createElement("ul")
    $("#crudInfo").append(crudInfoList)

    let crudListC = document.createElement("li")
    crudListC.innerHTML += `Select C to Create a New Book`;

    let crudListR = document.createElement("li")
    crudListR.innerHTML += `Select R to Read Book Info`;

    let crudListU = document.createElement("li")
    crudListU.innerHTML += `Select U to Update a Book Info`;

    let crudListD = document.createElement("li")
    crudListD.innerHTML += `Select D to Delete a Book`;

    crudInfoList.appendChild(crudListC);
    crudInfoList.appendChild(crudListR);
    crudInfoList.appendChild(crudListU);
    crudInfoList.appendChild(crudListD);

};

const bookList = (data)=> {
    bookData = data;
    console.log(bookData)
    bookData.forEach((book) => {
        const pieListPage = document.createElement("ul")
        $("#bookList").append(pieListPage)

        const bookListItems = document.createElement("li");
        bookListItems.innerHTML = book.name;
        
        pieListPage.appendChild(bookListItems);
        console.log("finished")
    });
    };


const getBooks = () => {
   
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://hapi-books.p.rapidapi.com/nominees/poetry/2022",
        type: "GET",
        headers: {
            'content-type': 'application/octet-stream',
		    'X-RapidAPI-Key': 'b1e20b59f4msh905f3dbc4bc093dp1390f2jsn536fd22395be',
		    'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        },
        dataType: "json",

      success: function (result) {
        console.log(result)
        bookList(result);
        bookCovers(result);
      }
    })
};



const setupPage =()=> {
    crudInfo();
    getBooks();
    console.log("done")
};
 

  $(document).ready(setupPage);

/*
  const buttonClick = () => {
    $("#submitButton").on("click", function () {
      let crudFunction = showPie();
      console.log("done")
    });
  };
*/

//CRUD Cases
const showPie = () => {
    /*
    $("#submitButton").on("click", function () {
        let choice =  $("#submitButton").val();
        console.log(choice);
    });
*/
let choice =  $("#crudButton").val();
console.log(choice)
        switch (choice) {
            case "C" :
                createBook();
                break;
            case "R" :
                readBook()
                break;
            case "U" :
                updateBook();
                break;
            case "D" :
                deleteBook();
                break;
        }



        console.log("case done")
      
    };
    
   

//CREATE
const createBook = (data)=>{
    console.log(data)

    let createTitle = prompt("Enter the Title of your Book");
    let createAuthor = prompt("Enter Author's Name");
    let createBook_ID = prompt("Enter the Books ID number (8 digits)");
    let createVotes = prompt("Enter the number of votes this book received");
    bookData.push( {
        name: createTitle,
        author: createAuthor,
        book_id : parseInt(createBook_ID),
        votes: parseInt(createVotes)
    });
    console.log(bookData);

    //need to figure out how to reset array

    $("#bookList").empty();

    bookData.forEach((book) => {
        const newBookList = document.createElement("ul")
        $("#bookList").append(newBookList)

        const newBookListItems = document.createElement("li");
        newBookListItems.innerHTML = book.name;
        
        newBookList.appendChild(newBookListItems);
        console.log("new book list!")
    });

    $("#bookList")
    .fadeTo(1000, 0.8)
    .fadeTo(1000, 0.5)
    .fadeTo(1000, 0.3)
    .fadeTo(1000, 0.5)
    .fadeTo(1000, 0.8)
    .fadeTo(1000, 1, finishedAnimation);
    //TRY THIS WHEN YOU HAVE ACCESS
};


//READ
const readBook = (data) => {
    console.log(data)
    let inputBook = prompt("Which Book would you like to see information on?");
    console.log(inputBook);

    let readBook = bookData.find((book) => {
            if (book.name == inputBook)
                return (book);
                
        });
        console.log(readBook);

    let bookInfo = document.createElement("p")
    bookInfo.classList.add("allBookInfo");

    bookInfo = `The poetry book titled <b> "${readBook.name}" </b> was written by ${readBook.author}. In 2022, this book recieved
    ${readBook.votes} votes. The ID of this book is ${readBook.book_id}.`

    $("#selectedBookInfo").append(bookInfo);
};

//UPDATE
const updateBook =(data) =>{
    console.log(data);
    let changeBook = prompt ("Which Book would you like to Change?");

    let findBook = bookData.find ((bookFound) => {
        if (bookFound.name === changeBook)
            return(bookFound);
    }
);
console.log(findBook);

let newTitle = prompt("Enter a New Title for the Book");
let newAuthor = prompt("Enter the New Author's Name");
let newBook_ID = prompt("Enter a New Book ID Number (8 digits)");
let newVotes = prompt("Enter a New Number of Votes Received");

findBook.name = newTitle;
findBook.author = newAuthor;
findBook.book_id = newBook_ID;
findBook.votes = newVotes;

console.log(findBook);
console.log(bookData);
//Need to update Page with new title

$("#bookList").empty();

    bookData.forEach((book) => {
        const newBookList = document.createElement("ul")
        $("#bookList").append(newBookList)

        const newBookListItems = document.createElement("li");
        newBookListItems.innerHTML = book.name;
        
        newBookList.appendChild(newBookListItems);
        console.log("Updated Book List!")
    });

};

//DELETE
const deleteBook = (data)=> {
    let bookChoice = prompt("Which Book would you like to Delete?")

    let findBook = bookData.find ((book) => {
        if (book.name === bookChoice)
            return(book);
    }
    );
    console.log(findBook);

    for (index = 0; index < bookData.length; index++) {
        if (bookData[index].name == findBook.name)
        bookData.splice(index,1)
    }
    console.log(bookData);
    //TEST WHEN YOU HAVE ACCESS

    $("#bookList").empty();

    bookData.forEach((book) => {
        const newBookList = document.createElement("ul")
        $("#bookList").append(newBookList)

        const newBookListItems = document.createElement("li");
        newBookListItems.innerHTML = book.name;
        
        newBookList.appendChild(newBookListItems);
        console.log("Book Deleted!")

    });
    $("#bookList")
      .fadeTo(1000, 0.8)
      .fadeTo(1000, 0.5)
      .fadeTo(1000, 0.3)
      .fadeTo(1000, 0.5)
      .fadeTo(1000, 0.8)
      .fadeTo(1000, 1, finishedAnimation);
};


//how to implement if there is no click element?
/*
const clickEvent = ()=>{

    $(".newBookList").fadeIn(3000, "linear", finishedAnimation);
  
};
*/
const finishedAnimation= ()=>{
    console.log("animation worked")
}