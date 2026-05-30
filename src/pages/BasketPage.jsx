"use client"

import { useState } from "react"
import { useBasket } from "../context/BasketContext"
import { useNavigate, Link } from "react-router-dom"
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard, BookOpen, AlertCircle } from 'lucide-react'

const BasketPage = () => {
  const { basket, updateQuantity, removeFromBasket, clearBasket } = useBasket()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Calculate totals
  const subtotal = basket.reduce((sum, book) => sum + book.quantity * (book.price || 10), 0)
  const shipping = basket.length > 0 ? 4.99 : 0
  const total = subtotal + shipping

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const handleQuantityChange = (bookId, change) => {
    updateQuantity(bookId, change)
  }

  const handleRemove = (bookId) => {
    removeFromBasket(bookId)
  }

  const handleCheckout = () => {
    // Reset any previous errors
    setError("")

    // Validate basket isn't empty
    if (basket.length === 0) {
      setError("Your basket is empty. Please add books before checking out.")
      return
    }

    setIsLoading(true)

    // Simulate API call to process order
    setTimeout(() => {
      setIsLoading(false)
      navigate("/basket/confirmation")
    }, 1500)
  }

  if (basket.length === 0 && !error) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="nav-container">
          <Link to="/" className="brand-logo">
            <BookOpen className="h-6 w-6" />
            <h1 className="m-0">Bookify</h1>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
            <Link to="/bestsellers" className="nav-link">
              Bestsellers
            </Link>
          </div>
        </nav>
  
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="empty-basket-card">
            <div className="empty-basket-icon">
              <ShoppingCart className="h-12 w-12 text-white/80" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your basket is empty</h1>
            <p className="text-white/80 mb-8">Looks like you haven't added any books to your basket yet.</p>
            <Link to="/" className="btn btn-primary w-full mt-4">  {/* Added mt-4 for margin top */}
              Browse Books
            </Link>
          </div>
        </div>
      
        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p className="footer-copyright">&copy; {new Date().getFullYear()} Bookify. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="nav-container">
      <Link to="/" className="brand-logo">
  <BookOpen className="h-6 w-6" />
  <h1 className="m-0">Bookify</h1>
</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/categories" className="nav-link">
            Categories
          </Link>
          <Link to="/bestsellers" className="nav-link">
            Bestsellers
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-container my-8">
        <div className="mb-6">
          <Link to="/" className="back-link">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center">Your Basket</h1>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
            <p className="text-white">{error}</p>
          </div>
        )}

        {/* Basket Items */}
        <div className="space-y-4 mb-8">
          {basket.map((book) => (
            <div key={book.id} className="basket-item">
              <div className="flex items-center gap-4">
                {/* Book Cover - No Image Version */}
                <div className="book-cover-placeholder">
                  <div className="book-icon">📖</div>
                </div>

                {/* Book Info */}
                <div className="basket-item-info">
                  <h3 className="basket-item-title">{book.title}</h3>
                  <p className="basket-item-author">by {book.author}</p>
                  <p className="basket-item-price">{formatCurrency(book.price || 10)}</p>
                </div>
              </div>

              <div className="basket-item-actions">
                <div className="quantity-control">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(book.id, -1)}
                    disabled={book.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="quantity-display">{book.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(book.id, 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(book.id)} aria-label="Remove book">
                  <Trash2 className="h-4 w-4 mr-1 inline-block" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="basket-summary">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{formatCurrency(shipping)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button className="btn btn-secondary" onClick={clearBasket} disabled={basket.length === 0}>
              Clear Basket
            </button>
            <button className="btn btn-primary" onClick={handleCheckout} disabled={isLoading || basket.length === 0}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Confirm Rental
                </span>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Bookify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default BasketPage