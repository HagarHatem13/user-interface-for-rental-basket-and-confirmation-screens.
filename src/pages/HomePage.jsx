"use client"

import { useState, useEffect } from "react"
import { useBasket } from "../context/BasketContext"
import { Link } from "react-router-dom"
import { Search, ChevronRight, Star, BookOpen, TrendingUp, ShoppingCart } from "lucide-react"

const HomePage = () => {
  const { addToBasket, basket } = useBasket()
  const [addedBooks, setAddedBooks] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Enhanced book data with prices, ratings, and categories
  const books = [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      price: 12.99,
      rating: 4.7,
      category: "fiction",
      description:
        "A dystopian social science fiction novel that examines the consequences of totalitarianism, mass surveillance, and repressive regimentation.",
    },
    {
      id: 2,
      title: "Brave New World",
      author: "Aldous Huxley",
      price: 11.99,
      rating: 4.5,
      category: "fiction",
      description:
        "A dystopian novel written in 1931 that anticipates developments in reproductive technology, sleep-learning, and psychological manipulation.",
    },
    {
      id: 3,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      price: 10.99,
      rating: 4.6,
      category: "fiction",
      description:
        "A dystopian novel published in 1953. It presents a future American society where books are outlawed and 'firemen' burn any that are found.",
    },
    {
      id: 4,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 14.99,
      rating: 4.8,
      category: "classic",
      description:
        "A novel published in 1960 that examines racism and injustice in the American South through the eyes of a young girl.",
    },
    {
      id: 5,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 13.99,
      rating: 4.4,
      category: "classic",
      description:
        "A novel published in 1925 that follows a cast of characters living in the fictional towns of West Egg and East Egg on Long Island.",
    },
    {
      id: 6,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 9.99,
      rating: 4.7,
      category: "classic",
      description:
        "A romantic novel of manners published in 1813. The novel follows the character development of Elizabeth Bennet.",
    },
    {
      id: 7,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 15.99,
      rating: 4.9,
      category: "fantasy",
      description:
        "A children's fantasy novel published in 1937. It follows the quest of home-loving Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon.",
    },
    {
      id: 8,
      title: "Dune",
      author: "Frank Herbert",
      price: 16.99,
      rating: 4.8,
      category: "scifi",
      description:
        "A science fiction novel published in 1965, telling the story of young Paul Atreides, whose family accepts the stewardship of the desert planet Arrakis.",
    },
    {
      id: 9,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 11.99,
      rating: 4.6,
      category: "fiction",
      description:
        "A novel published in 1988 that follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.",
    },
    {
      id: 10,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: 18.99,
      rating: 4.7,
      category: "nonfiction",
      description:
        "A non-fiction book that explores the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century.",
    },
  ]

  // Update basket count when basket changes
  useEffect(() => {
    // Reset added books animation when component mounts
    setAddedBooks({})
  }, [])

  const handleAddToBasket = (book) => {
    addToBasket(book)
    setAddedBooks((prev) => ({
      ...prev,
      [book.id]: prev[book.id] ? prev[book.id] + 1 : 1,
    }))

    // Reset the added indicator after 2 seconds
    setTimeout(() => {
      setAddedBooks((prev) => ({
        ...prev,
        [book.id]: 0,
      }))
    }, 2000)
  }

  // Filter books based on search query and active category
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || book.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Get trending books (for this demo, just the highest rated ones)
  const trendingBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Basket Button */}
      <div className="basket-btn-container">
        <Link to="/basket" className="basket-btn">
          <ShoppingCart className="h-5 w-5" />
          <span>View Basket</span>
          {basket.length > 0 && (
            <span className="basket-count">{basket.reduce((total, item) => total + item.quantity, 0)}</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="nav-container">
      <Link to="/" className="brand-logo">
  <BookOpen className="h-6 w-6" />
  <h1 className="m-0">Bookify</h1>
</Link>


        <div className="nav-links">
          <Link to="/" className="nav-link active">
            Home
          </Link>
          <Link to="/categories" className="nav-link">
            Categories
          </Link>
          <Link to="/bestsellers" className="nav-link">
            Bestsellers
          </Link>
          <Link to="/new" className="nav-link">
            New Releases
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Next Favorite Book</h1>
            <p className="hero-subtitle">Explore our vast collection of bestsellers, classics, and new releases</p>
            <div className="relative max-w-xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                className="input pr-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70" />
            </div>
            <Link to="/bestsellers" className="hero-cta">
              Explore Bestsellers
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            className={`btn ${activeCategory === "all" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          <button
            className={`btn ${activeCategory === "fiction" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveCategory("fiction")}
          >
            Fiction
          </button>
          <button
            className={`btn ${activeCategory === "classic" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveCategory("classic")}
          >
            Classics
          </button>
          <button
            className={`btn ${activeCategory === "fantasy" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveCategory("fantasy")}
          >
            Fantasy
          </button>
          <button
            className={`btn ${activeCategory === "scifi" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveCategory("scifi")}
          >
            Sci-Fi
          </button>
          <button
            className={`btn ${activeCategory === "nonfiction" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveCategory("nonfiction")}
          >
            Non-Fiction
          </button>
        </div>

        {/* Trending Section */}
        <section className="mb-12">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp className="inline-block mr-2" /> Trending Now
            </h2>
          </div>
          <div className="book-grid">
            {trendingBooks.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-cover"></div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-white/80">{book.rating}</span>
                  </div>
                  <p className="book-price">${book.price.toFixed(2)}</p>
                  <div className="book-actions">
                    <button
                      onClick={() => handleAddToBasket(book)}
                      className={`btn ${addedBooks[book.id] ? "btn-primary" : "btn-secondary"}`}
                    >
                      {addedBooks[book.id] ? "Added ✓" : "Add to Basket"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Books Section */}
        <section>
          <div className="section-header">
            <h2 className="section-title">All Books</h2>
          </div>
          {filteredBooks.length === 0 ? (
            <div className="card text-center py-12">
              <h3>No books found</h3>
              <p className="text-white/70 mb-4">Try adjusting your search or category filter</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="book-grid">
              {filteredBooks.map((book) => (
                <div key={book.id} className="book-card">
                  <div className="book-cover"></div>
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <div className="flex items-center mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-white/80">{book.rating}</span>
                    </div>
                    <p className="book-price">${book.price.toFixed(2)}</p>
                    <div className="book-actions">
                      <button
                        onClick={() => handleAddToBasket(book)}
                        className={`btn ${addedBooks[book.id] ? "btn-primary" : "btn-secondary"}`}
                      >
                        {addedBooks[book.id] ? "Added ✓" : "Add to Basket"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="card mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter to get updates on new releases and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Your email address" className="input mb-0" />
            <button className="btn btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </section>
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

export default HomePage

