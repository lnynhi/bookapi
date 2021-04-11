const apiKeyNYT = 'X6hlxpBqhkmKel5pxcmbpq9xnpYNZBW5';
const apiKeyGGBooks = 'AIzaSyDdtUCXRvH0mCnq5ZHBLd0wVU0GHkmYn-g';
const urlNYT = 'https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=';
const urlGGBooks = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
let displayBooks = document.getElementById('display');

async function getData(){
    let response = await (await fetch(urlNYT+apiKeyNYT)).json();
    let list = [];
    for(let i = 0; i < response.results.length; i++){
        let {title, author, description, price, primary_isbn10} = response.results[i].book_details[0];
        list.push({title, author, description, price, primary_isbn10})
    }
    return list;
}

async function createBooks(){
    let arr = [];
    let a = await getData();
    a.length = 6
    let ibsn = a.map(item => item.primary_isbn10);
   ibsn.forEach(ibs => {
       arr.push(getCover(ibs))
   });
   let covers = await Promise.all(arr);
    let html ='';
    for (let i = 0; i < a.length; i++){
    console.log(covers[i]);
    html += createBook(a[i].title, a[i].author, covers[i],a[i].description, a[i].price);

}
    console.log(html)
    display.innerHTML = html;
}
createBooks();


async function getCover(isbn){
    let response = await (await fetch(urlGGBooks+ isbn + "&key=" + apiKeyGGBooks)).json();
    //console.log(response.items[0].volumeInfo.imageLinks, isbn);
    // console.log(isbn)
    
    return response.items[0].volumeInfo.imageLinks.thumbnail;
    // return img_src = response.items[0].volumeInfo.imageLinks.thumbnail;
}

function createBook(title, author, img_src, description, price){
    return `
    <div class="item">
    <img src="${img_src}">
    <div class="book__info">
      <h1>${title}</h1>
      <h3>${author}</h3>
      <p>${description}</p>
      <p>Price: ${price}</p>
    </div>
  </div>`
}
