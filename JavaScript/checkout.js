const selectedBook = JSON.parse(localStorage.getItem("selectedBook"));

if (selectedBook) {
  document.getElementById("checkoutDetails").innerHTML = `
    <h2>Checkout</h2>
    <h3>${selectedBook.title}</h3>
    <div class="checkout-container" style="display: flex; gap: 20px; align-items: flex-start;">
      <div class="checkout-image" style="background-image: url('${selectedBook.image}'); background-size: cover; background-position: center; width: 300px; height: 400px;"></div>
      <div class="checkout-details" style="flex: 1;">
        <p><strong>Author:</strong> ${selectedBook.author}</p>
        <p><strong>Genre:</strong> ${selectedBook.genre}</p>
        <p><strong>Description:</strong> ${selectedBook.description}</p>
        <p><strong>Price:</strong> $${selectedBook.price.toFixed(2)}</p>
        <form id="checkoutForm" style="margin-top: 20px;">
          <h4>Customer Details</h4>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required style="display: block; margin-bottom: 10px; width: 100%;">
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required style="display: block; margin-bottom: 10px; width: 100%;">
          <label for="payment">Payment Method:</label>
          <select id="payment" name="payment" required style="display: block; margin-bottom: 10px; width: 100%;">
          <option value="cash">Cash on Delivery</option>
            <option value="card">Card</option>
            
          </select>
          <div id="cardDetails" style="display: none; margin-top: 10px;">
            <h4>Card Details</h4>
            <label for="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" style="display: block; margin-bottom: 10px; width: 100%;">
            <label for="expiry">Expiry Date:</label>
            <input type="text" id="expiry" name="expiry" placeholder="MM/YY" style="display: block; margin-bottom: 10px; width: 100%;">
            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" placeholder="123" style="display: block; margin-bottom: 10px; width: 100%;">
          </div>
       
        </form>
      </div>
    </div>
  `;

  // Show or hide card details based on the selected payment method
  document.getElementById('payment').addEventListener('change', function() {
    document.getElementById('cardDetails').style.display = this.value === 'card' ? 'block' : 'none';
  });
}

function confirmPurchase() {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const payment = document.getElementById('payment').value;

  if (!name || !address || !payment) {
    alert("Please fill out all required fields.");
    return;
  }

  if (payment === 'card') {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill out all card details.");
      return;
    }
  }

  alert("Thank you for your purchase! " + `${name} <br>` + "You will recive a email shortly comfirming the purchase");
  localStorage.removeItem("selectedBook");
  window.location.href = 'index.html';
}
