"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Context and custom hook for accessing the basket
const BasketContext = createContext()
export const useBasket = () => useContext(BasketContext)

// Basket provider component
export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Load basket from localStorage on initial render
  useEffect(() => {
    try {
      const savedBasket = localStorage.getItem("bookify-basket")
      if (savedBasket) {
        setBasket(JSON.parse(savedBasket))
      }
    } catch (error) {
      console.error("Failed to load basket from localStorage:", error)
    }
  }, [])

  // Save basket to localStorage and update totals whenever basket changes
  useEffect(() => {
    try {
      localStorage.setItem("bookify-basket", JSON.stringify(basket))

      // Calculate totals
      const items = basket.reduce((total, item) => total + (item.quantity || 1), 0)
      const price = basket.reduce((total, item) => total + (item.price || 10) * (item.quantity || 1), 0)

      setTotalItems(items)
      setTotalPrice(price)
    } catch (error) {
      console.error("Failed to save basket to localStorage:", error)
    }
  }, [basket])

  // Add a book to the basket or update its quantity if it already exists
  const addToBasket = (book) => {
    setBasket((prevBasket) => {
      const existingBook = prevBasket.find((b) => b.id === book.id)
      if (existingBook) {
        // If the book exists, update its quantity
        return prevBasket.map((b) => (b.id === book.id ? { ...b, quantity: b.quantity + 1 } : b))
      } else {
        // If it's a new book, add it to the basket with quantity 1
        return [...prevBasket, { ...book, quantity: 1 }]
      }
    })
  }

  // Remove a book from the basket by its id
  const removeFromBasket = (id) => {
    setBasket((prevBasket) => prevBasket.filter((b) => b.id !== id))
  }

  // Update the quantity of a book in the basket
  const updateQuantity = (id, change) => {
    setBasket((prevBasket) => {
      return prevBasket
        .map((book) => {
          if (book.id === id) {
            const newQuantity = Math.max(1, book.quantity + change)
            return { ...book, quantity: newQuantity }
          }
          return book
        })
        .filter((book) => book.quantity > 0)
    })
  }

  // Clear all books in the basket
  const clearBasket = () => setBasket([])

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        clearBasket,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}

export default BasketProvider
