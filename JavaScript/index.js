const books = [
  {
    id: 1,
    title: "Mystery of the Lost Island",
    genre: "mystery",
    price: 12.99,
    image: "./Assets/1.jpeg",
    author: "A. Christie",
    description: "An intriguing mystery set on a remote island.",
  },
  {
    id: 2,
    title: "Journey Through Fantasy",
    genre: "fantasy",
    price: 15.49,
    image: "./Assets/2.jpeg",
    author: "J.R. Tolkien",
    description: "An epic fantasy adventure through magical lands.",
  },
  {
    id: 3,
    title: "Modern Fiction",
    genre: "fiction",
    price: 10.99,
    image: "./Assets/3.jpeg",
    author: "J.D. Salinger",
    description: "A contemporary tale of life and discovery.",
  },
  {
    id: 4,
    title: "Deep Dive Non-Fiction",
    genre: "nonfiction",
    price: 13.99,
    image: "./Assets/4.jpeg",
    author: "M. Gladwell",
    description: "A deep dive into the world of facts and figures.",
  },
  {
    id: 5,
    title: "The Great Adventure",
    genre: "mystery",
    price: 9.99,
    image: "./Assets/6.jpeg",
    author: "S. Holmes",
    description: "Follow the clues in this thrilling mystery.",
  },
];

let cart = [];

function displayBooks(bookList = books) {
  document.getElementById("bookList").innerHTML = bookList
    .map(
      (book) => `
        <div class="book-item">
            <img src="${book.image}" alt="${
        book.title
      } cover" class="book-image">
            <h3>${book.title}</h3>
            <p>Genre: ${book.genre}</p>
            <p>Author: ${book.author}</p>
            <p>${book.description}</p>
            <p>Price: $${book.price.toFixed(2)}</p>
            <button onclick="addToCart(${book.id})">Add to Cart</button>
            <button class="checkout-btn" onclick="checkOut(${book.id})">Checkout</button>
        </div>
    `
    )
    .join("");
}

function addToCart(bookId) {
  const book = books.find((b) => b.id === bookId);
  cart.push(book);
  updateCart();
}

function checkOut(bookId) {
  const bookToCheckout = books.find((book) => book.id === bookId);
  localStorage.setItem("selectedBook", JSON.stringify(bookToCheckout));
  window.location.href = 'checkout.html';
}


function updateCart() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cartList").innerHTML = cart
    .map((item) => `<li>${item.title} - $${item.price.toFixed(2)}</li>`)
    .join("");
  document.getElementById("cartTotal").textContent = `Total: $${total.toFixed(
    2
  )}`;
}

function filterBooks() {
  const genre = document.getElementById("genre").value;
  const sortOrder = document.getElementById("sort").value;
  let filteredBooks =
    genre === "all" ? books : books.filter((book) => book.genre === genre);
  filteredBooks =
    sortOrder === "asc"
      ? filteredBooks.sort((a, b) => a.price - b.price)
      : filteredBooks.sort((a, b) => b.price - a.price);
  displayBooks(filteredBooks);
}

document.getElementById("genre").addEventListener("change", filterBooks);
document.getElementById("sort").addEventListener("change", filterBooks);
displayBooks();
