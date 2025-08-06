// Enhanced Cart Functionality with Local Storage and Better UX
class ShoppingCart {
  constructor() {
    this.items = this.loadCartFromStorage();
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCartDisplay();
    this.showEmptyCartIfNeeded();
  }

  bindEvents() {
    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.BTN');
    addToCartBtns.forEach(button => {
      button.addEventListener('click', (event) => {
        const productBox = event.target.closest('.product-box');
        if (productBox) {
          this.addToCart(productBox);
        }
      });
    });

    // Cart icon click
    const cartIcon = document.querySelector('.cart');
    const cartPage = document.querySelector('#cart-page');
    const cartOverlay = this.createOverlay();
    
    if (cartIcon && cartPage) {
      cartIcon.addEventListener('click', () => {
        this.openCart();
      });
    }

    // Close cart events
    const backBtn = document.querySelector('.backbtn i');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.closeCart();
      });
    }

    // Overlay click to close
    cartOverlay.addEventListener('click', () => {
      this.closeCart();
    });

    // Buy button
    const buyBtn = document.querySelector('.Buybtn');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        this.handlePurchase();
      });
    }

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCart();
      }
    });
  }

  createOverlay() {
    let overlay = document.querySelector('.cart-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'cart-overlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  addToCart(productBox) {
    try {
      const productImage = productBox.querySelector('img').src;
      const productName = productBox.querySelector('h2').textContent.trim();
      const productPriceText = productBox.querySelector('h3').innerHTML;
      const productPrice = this.extractPrice(productPriceText);
      const productCategory = productBox.querySelector('span').textContent.trim();

      // Check if item already exists
      const existingItem = this.items.find(item => item.name === productName);
      
      if (existingItem) {
        this.showNotification('Item already in cart!', 'warning');
        return;
      }

      const newItem = {
        id: Date.now(),
        image: productImage,
        name: productName,
        price: productPrice,
        priceText: productPriceText,
        category: productCategory,
        quantity: 1
      };

      this.items.push(newItem);
      this.saveCartToStorage();
      this.updateCartDisplay();
      this.showNotification('Added to cart!', 'success');
      this.animateCartIcon();

    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showNotification('Error adding item to cart', 'error');
    }
  }

  removeFromCart(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveCartToStorage();
    this.updateCartDisplay();
    this.showNotification('Item removed from cart', 'info');
  }

  updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) return;
    
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      this.saveCartToStorage();
      this.updateCartDisplay();
    }
  }

  updateCartDisplay() {
    const cartContent = document.querySelector('.cart-content');
    const totalPriceElement = document.querySelector('#total-price');
    const buyBtn = document.querySelector('.Buybtn');

    if (!cartContent) return;

    // Clear existing content
    cartContent.innerHTML = '';

    if (this.items.length === 0) {
      this.showEmptyCartState();
      if (buyBtn) buyBtn.disabled = true;
      if (totalPriceElement) totalPriceElement.textContent = '₹0';
      this.updateCartBadge(0);
      return;
    }

    // Create cart items
    this.items.forEach(item => {
      const cartItemElement = this.createCartItemElement(item);
      cartContent.appendChild(cartItemElement);
    });

    // Update total
    const total = this.calculateTotal();
    if (totalPriceElement) {
      totalPriceElement.textContent = `₹${total}`;
    }

    // Enable buy button
    if (buyBtn) buyBtn.disabled = false;

    // Update cart badge
    this.updateCartBadge(this.items.length);

    // Hide empty state
    this.hideEmptyCartState();
  }

  createCartItemElement(item) {
    const cartBox = document.createElement('div');
    cartBox.className = 'product';
    cartBox.setAttribute('data-id', item.id);

    cartBox.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="product-details">
        <span id="category">${item.category}</span>
        <h1 id="name">${item.name}</h1>
        <h2 id="price">${item.priceText}</h2>
        <div class="quantity">
          <button class="Btn minus-btn" ${item.quantity <= 1 ? 'disabled' : ''}>
            <i class="fa fa-minus"></i>
          </button>
          <span id="number">${item.quantity}</span>
          <button class="Btn plus-btn">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
      <i class="fa fa-trash removebtn" title="Remove item"></i>
    `;

    // Add event listeners
    this.addCartItemEventListeners(cartBox, item.id);

    return cartBox;
  }

  addCartItemEventListeners(cartBox, itemId) {
    // Remove button
    const removeBtn = cartBox.querySelector('.removebtn');
    removeBtn.addEventListener('click', () => {
      this.removeFromCart(itemId);
    });

    // Quantity buttons
    const minusBtn = cartBox.querySelector('.minus-btn');
    const plusBtn = cartBox.querySelector('.plus-btn');
    const quantitySpan = cartBox.querySelector('#number');

    minusBtn.addEventListener('click', () => {
      const currentQuantity = parseInt(quantitySpan.textContent);
      if (currentQuantity > 1) {
        this.updateQuantity(itemId, currentQuantity - 1);
      }
    });

    plusBtn.addEventListener('click', () => {
      const currentQuantity = parseInt(quantitySpan.textContent);
      this.updateQuantity(itemId, currentQuantity + 1);
    });
  }

  showEmptyCartState() {
    const cartContent = document.querySelector('.cart-content');
    if (!cartContent) return;

    cartContent.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">
          <i class="fa fa-shopping-cart"></i>
        </div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <button class="shop-now-btn" onclick="cart.closeCart()">
          Continue Shopping
        </button>
      </div>
    `;
  }

  hideEmptyCartState() {
    const emptyCart = document.querySelector('.empty-cart');
    if (emptyCart) {
      emptyCart.remove();
    }
  }

  showEmptyCartIfNeeded() {
    if (this.items.length === 0) {
      this.showEmptyCartState();
    }
  }

  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  extractPrice(priceText) {
    const match = priceText.match(/₹(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  openCart() {
    const cartPage = document.querySelector('#cart-page');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cartPage && overlay) {
      cartPage.classList.add('cart-open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCart() {
    const cartPage = document.querySelector('#cart-page');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cartPage && overlay) {
      cartPage.classList.remove('cart-open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  updateCartBadge(count) {
    const cartIcon = document.querySelector('.cart');
    if (!cartIcon) return;

    let badge = cartIcon.querySelector('.cart-badge');
    
    if (count > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-badge';
        cartIcon.appendChild(badge);
      }
      badge.textContent = count;
    } else if (badge) {
      badge.remove();
    }
  }

  animateCartIcon() {
    const cartIcon = document.querySelector('.cart');
    if (cartIcon) {
      cartIcon.style.transform = 'scale(1.2)';
      setTimeout(() => {
        cartIcon.style.transform = '';
      }, 200);
    }
  }

  showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
      <i class="fa ${this.getNotificationIcon(type)}"></i>
      <span>${message}</span>
    `;

    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: this.getNotificationColor(type),
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      zIndex: '10000',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      animation: 'slideIn 0.3s ease'
    });

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  getNotificationIcon(type) {
    const icons = {
      success: 'fa-check-circle',
      warning: 'fa-exclamation-triangle',
      error: 'fa-times-circle',
      info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
  }

  getNotificationColor(type) {
    const colors = {
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545',
      info: '#17a2b8'
    };
    return colors[type] || colors.info;
  }

  handlePurchase() {
    if (this.items.length === 0) {
      this.showNotification('Your cart is empty!', 'warning');
      return;
    }

    // Show checkout modal instead of direct purchase
    this.showCheckoutModal();
  }

  showCheckoutModal() {
    // Create checkout modal if it doesn't exist
    let modal = document.querySelector('.checkout-modal');
    if (!modal) {
      modal = this.createCheckoutModal();
      document.body.appendChild(modal);
    }

    const total = this.calculateTotal();
    modal.querySelector('#checkout-total').textContent = `₹${total}`;
    modal.querySelector('#checkout-final-total').textContent = `₹${total}`;
    modal.querySelector('#checkout-items-count').textContent = this.items.length;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  createCheckoutModal() {
    const modal = document.createElement('div');
    modal.className = 'checkout-modal';
    modal.innerHTML = `
      <div class="checkout-overlay"></div>
      <div class="checkout-content">
        <div class="checkout-header">
          <h2>Checkout</h2>
          <button class="checkout-close">
            <i class="fa fa-times"></i>
          </button>
        </div>
        
        <div class="checkout-body">
          <div class="order-summary">
            <h3>Order Summary</h3>
            <div class="summary-item">
              <span>Items (<span id="checkout-items-count">0</span>)</span>
              <span id="checkout-total">₹0</span>
            </div>
            <div class="summary-item total">
              <span>Total</span>
              <span id="checkout-final-total">₹0</span>
            </div>
          </div>
          
          <form class="checkout-form" id="checkout-form">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" id="fullName" required placeholder="Enter your full name">
              <span class="error-message"></span>
            </div>
            
            <div class="form-group">
              <label>Email *</label>
              <input type="email" id="email" required placeholder="Enter your email">
              <span class="error-message"></span>
            </div>
            
            <div class="form-group">
              <label>Phone Number *</label>
              <input type="tel" id="phone" required placeholder="Enter your phone number">
              <span class="error-message"></span>
            </div>
            
            <div class="form-group">
              <label>Delivery Address *</label>
              <textarea id="address" required placeholder="Enter your complete address" rows="3"></textarea>
              <span class="error-message"></span>
            </div>
            
            <div class="form-group">
              <label>Payment Method *</label>
              <select id="paymentMethod" required>
                <option value="">Select payment method</option>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
              </select>
              <span class="error-message"></span>
            </div>
            
            <div class="checkout-actions">
              <button type="button" class="btn-secondary" id="checkout-cancel">Cancel</button>
              <button type="submit" class="btn-primary">
                <span class="btn-text">Place Order</span>
                <span class="btn-loading" style="display: none;">
                  <span class="loading-spinner"></span>
                  Processing...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Add event listeners
    this.addCheckoutEventListeners(modal);
    
    return modal;
  }

  addCheckoutEventListeners(modal) {
    // Close modal events
    const closeBtn = modal.querySelector('.checkout-close');
    const cancelBtn = modal.querySelector('#checkout-cancel');
    const overlay = modal.querySelector('.checkout-overlay');

    [closeBtn, cancelBtn, overlay].forEach(element => {
      element.addEventListener('click', () => {
        this.closeCheckoutModal();
      });
    });

    // Form submission
    const form = modal.querySelector('#checkout-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.processCheckout(form);
    });

    // Real-time validation
    const inputs = modal.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
    });
  }

  validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Clear previous error
    formGroup.classList.remove('error');
    errorMessage.textContent = '';

    // Required field validation
    if (field.required && !field.value.trim()) {
      isValid = false;
      message = 'This field is required';
    }

    // Specific validations
    if (field.value.trim()) {
      switch (field.type) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
          }
          break;
        case 'tel':
          const phoneRegex = /^[0-9]{10}$/;
          if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
            isValid = false;
            message = 'Please enter a valid 10-digit phone number';
          }
          break;
      }

      // Name validation
      if (field.id === 'fullName' && field.value.trim().length < 2) {
        isValid = false;
        message = 'Name must be at least 2 characters long';
      }

      // Address validation
      if (field.id === 'address' && field.value.trim().length < 10) {
        isValid = false;
        message = 'Please enter a complete address';
      }
    }

    if (!isValid) {
      formGroup.classList.add('error');
      errorMessage.textContent = message;
    }

    return isValid;
  }

  processCheckout(form) {
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showNotification('Please fix the errors in the form', 'error');
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;

    // Simulate order processing
    setTimeout(() => {
      // Get form data
      const formData = new FormData(form);
      const orderData = {
        customerInfo: {
          name: form.fullName.value,
          email: form.email.value,
          phone: form.phone.value,
          address: form.address.value,
          paymentMethod: form.paymentMethod.value
        },
        items: this.items,
        total: this.calculateTotal(),
        orderDate: new Date().toISOString()
      };

      // Save order (in real app, this would be sent to server)
      this.saveOrder(orderData);

      // Clear cart
      this.items = [];
      this.saveCartToStorage();
      this.updateCartDisplay();

      // Close checkout modal
      this.closeCheckoutModal();

      // Show success message
      this.showNotification('Order placed successfully! You will receive a confirmation email shortly.', 'success');

      // Close cart after a delay
      setTimeout(() => {
        this.closeCart();
      }, 2000);

      // Reset loading state
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;

    }, 2500);
  }

  saveOrder(orderData) {
    try {
      let orders = JSON.parse(localStorage.getItem('greenCartOrders') || '[]');
      orders.push(orderData);
      localStorage.setItem('greenCartOrders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

  closeCheckoutModal() {
    const modal = document.querySelector('.checkout-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  saveCartToStorage() {
    try {
      localStorage.setItem('greenCartItems', JSON.stringify(this.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  loadCartFromStorage() {
    try {
      const stored = localStorage.getItem('greenCartItems');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  }

  clearCart() {
    this.items = [];
    this.saveCartToStorage();
    this.updateCartDisplay();
    this.showNotification('Cart cleared', 'info');
  }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize cart when DOM is loaded
let cart;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
  });
} else {
  cart = new ShoppingCart();
}

// Make cart globally available for any custom interactions
window.cart = cart;








