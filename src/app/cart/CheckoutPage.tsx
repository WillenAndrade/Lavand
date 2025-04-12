export default function CheckoutPage() {
    return (
      <div className="checkout-page">
        {/* Title */}
        <h1>Checkout</h1>
  
        {/* Step 1: Shipping Information */}
        <section className="checkout-section shipping-info">
          <h2>Shipping Information</h2>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Postal Code" required />
            <input type="text" placeholder="Country" required />
            <input type="tel" placeholder="Phone Number" required />
          </form>
        </section>
  
        {/* Step 2: Billing Information */}
        <section className="checkout-section billing-info">
          <h2>Billing Information</h2>
          <form>
            <input type="text" placeholder="Billing Name" required />
            <input type="text" placeholder="Billing Address" required />
            <input type="text" placeholder="Billing City" required />
            <input type="text" placeholder="Billing Postal Code" required />
            <input type="text" placeholder="Billing Country" required />
          </form>
        </section>
  
        {/* Step 3: Payment Information */}
        <section className="checkout-section payment-info">
          <h2>Payment Method</h2>
          <form>
            <label>
              <input type="radio" name="payment" value="card" defaultChecked />
              Credit Card
            </label>
            <label>
              <input type="radio" name="payment" value="paypal" />
              PayPal
            </label>
            <input type="text" placeholder="Card Number" required />
            <input type="text" placeholder="Card Holder Name" required />
            <input type="text" placeholder="Expiration Date (MM/YY)" required />
            <input type="text" placeholder="CVV" required />
          </form>
        </section>
  
        {/* Review & Confirm */}
        <section className="checkout-section review-confirm">
          <h2>Review Your Order</h2>
          {/* Here you can map products */}
          <p>Product 1 - Quantity: 2 - Price: $40</p>
          <p>Total: $40</p>
  
          <button type="submit">Confirm Order</button>
        </section>
      </div>
    );
  }