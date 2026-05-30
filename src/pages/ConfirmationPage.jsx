"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { CheckCircle, ArrowLeft, ShoppingBag, BookOpen } from "lucide-react"
import { useBasket } from "../context/BasketContext"

const ConfirmationPage = () => {
  const { basket, clearBasket } = useBasket()
  const orderNumber = Math.floor(100000 + Math.random() * 900000)

  // Store the basket items before clearing
  const confirmedItems = [...basket]

  // Clear basket when confirmation page is shown
  useEffect(() => {
    // Small delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      clearBasket()
    }, 500)

    return () => clearTimeout(timer)
  }, [clearBasket])

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
        <div className="card max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400/30 to-green-600/30 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Rental Confirmed!</h1>
          <p className="text-white/80 mb-8">Thank you for your order. Your books are on their way!</p>

          <div className="bg-white/10 rounded-lg p-4 mb-6">
            <p className="text-white/70 mb-2">Order Number:</p>
            <p className="text-xl font-bold mb-4">#{orderNumber}</p>
            <p className="text-white/70 mb-2">Estimated Delivery:</p>
            <p className="text-xl font-bold">
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {confirmedItems.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-left">Rented Items:</h3>
              <div className="space-y-3">
                {confirmedItems.map((book) => (
                  <div key={book.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <div className="text-left">
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-white/70">by {book.author}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/70">Qty: {book.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Link to="/" className="btn btn-primary flex items-center justify-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
            <Link to="/orders" className="btn btn-secondary flex items-center justify-center">
              <ArrowLeft className="mr-2 h-5 w-5" />
              View My Orders
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-white/70">
          <p>A confirmation email has been sent to your email address.</p>
          <p className="mt-2">
            Need help?{" "}
            <Link to="/contact" className="text-white hover:underline">
              Contact our support team
            </Link>
          </p>
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

export default ConfirmationPage
