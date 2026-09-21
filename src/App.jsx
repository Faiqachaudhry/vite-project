import { useState } from "react";
import "./App.css";

const gifts = [
  {
    id: 1,
    name: "Personalized Mug",
    category: "Birthday",
    price: 1200,
    emoji: "☕",
    description: "A customized mug for someone special.",
  },
  {
    id: 2,
    name: "Luxury Gift Box",
    category: "Wedding",
    price: 3500,
    emoji: "🎁",
    description: "A beautiful luxury gift box for special occasions.",
  },
  {
    id: 3,
    name: "Chocolate Box",
    category: "Friendship",
    price: 1800,
    emoji: "🍫",
    description: "A delicious chocolate collection.",
  },
  {
    id: 4,
    name: "Personalized Frame",
    category: "Anniversary",
    price: 2200,
    emoji: "🖼️",
    description: "Keep a beautiful memory forever.",
  },
  {
    id: 5,
    name: "Perfume Gift Set",
    category: "Eid",
    price: 4500,
    emoji: "🌸",
    description: "An elegant perfume set for your loved one.",
  },
  {
    id: 6,
    name: "Cute Teddy Bear",
    category: "Friendship",
    price: 2500,
    emoji: "🧸",
    description: "A cute and memorable gift.",
  },
  {
    id: 7,
    name: "Personalized Bracelet",
    category: "Anniversary",
    price: 3000,
    emoji: "💎",
    description: "A stylish personalized bracelet.",
  },
  {
    id: 8,
    name: "Home Decor Set",
    category: "Wedding",
    price: 5000,
    emoji: "🏠",
    description: "Beautiful decor for a new home.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [preference, setPreference] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const [message, setMessage] = useState("");

  // Add gift to cart
  const addToCart = (gift) => {
    setCart([...cart, gift]);
    setMessage(`${gift.name} added to your cart!`);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // Smart Gift Finder
  const findGift = () => {
    let result = [...gifts];

    if (occasion) {
      result = result.filter(
        (gift) =>
          gift.category.toLowerCase() === occasion.toLowerCase() ||
          occasion === "Other"
      );
    }

    if (budget) {
      result = result.filter((gift) => {
        if (budget === "under1000") return gift.price < 1000;
        if (budget === "1000-3000")
          return gift.price >= 1000 && gift.price <= 3000;
        if (budget === "3000-5000")
          return gift.price > 3000 && gift.price <= 5000;
        if (budget === "above5000") return gift.price > 5000;

        return true;
      });
    }

    if (preference) {
      const preferenceWords = {
        Personalized: ["Personalized"],
        Fashion: ["Bracelet", "Perfume"],
        Beauty: ["Perfume"],
        Food: ["Chocolate"],
        "Home Decor": ["Home Decor", "Frame"],
        "Cute/Fun": ["Teddy", "Mug"],
      };

      const words = preferenceWords[preference];

      if (words) {
        const preferred = result.filter((gift) =>
          words.some((word) =>
            gift.name.toLowerCase().includes(word.toLowerCase())
          )
        );

        if (preferred.length > 0) {
          result = preferred;
        }
      }
    }

    // If no exact result, show some suitable gifts
    if (result.length === 0) {
      result = gifts.slice(0, 3);
    }

    setRecommendations(result.slice(0, 3));
  };

  // Filter products
  const filteredGifts = gifts.filter((gift) => {
    const matchesSearch = gift.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || gift.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          🎁 Giftify
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#gifts" onClick={() => setMenuOpen(false)}>Gifts</a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#finder" onClick={() => setMenuOpen(false)}>Gift Finder</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>

        <div className="nav-actions">
          <span className="cart">🛒 {cart.length}</span>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* NOTIFICATION */}
      {message && <div className="notification">{message}</div>}

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="small-title">WELCOME TO GIFTIFY</span>

          <h1>
            Find the Perfect Gift
            <span> for Every Special Moment</span>
          </h1>

          <p>
            Discover thoughtful gifts for birthdays, weddings, anniversaries,
            Eid, friendship and every occasion that matters.
          </p>

          <div className="hero-buttons">
            <a href="#gifts" className="primary-btn">
              Explore Gifts
            </a>

            <a href="#finder" className="secondary-btn">
              ✨ Find My Gift
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="big-gift">🎁</div>
          <h3>Make Someone Smile</h3>
          <p>Beautiful gifts. Special memories.</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section" id="categories">
        <div className="section-heading">
          <span>EXPLORE</span>
          <h2>Shop By Category</h2>
          <p>Find something special for every occasion.</p>
        </div>

        <div className="categories">
          {[
            ["🎂", "Birthday"],
            ["💍", "Wedding"],
            ["❤️", "Anniversary"],
            ["🌙", "Eid"],
            ["🎓", "Graduation"],
            ["👯", "Friendship"],
            ["💝", "Personalized"],
            ["🌹", "Valentine's Day"],
          ].map(([icon, name]) => (
            <div
              className="category-card"
              key={name}
              onClick={() => {
                setCategory(name === "Personalized" ? "All" : name);
                document.getElementById("gifts").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <div className="category-icon">{icon}</div>
              <h3>{name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* GIFTS */}
      <section className="section gifts-section" id="gifts">
        <div className="section-heading">
          <span>OUR COLLECTION</span>
          <h2>Featured Gifts</h2>
          <p>Thoughtful gifts chosen to make moments unforgettable.</p>
        </div>

        <div className="shop-tools">
          <input
            type="text"
            placeholder="🔍 Search gifts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Birthday">Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Eid">Eid</option>
            <option value="Friendship">Friendship</option>
          </select>
        </div>

        <div className="gift-grid">
          {filteredGifts.map((gift) => (
            <div className="gift-card" key={gift.id}>
              <div className="gift-image">
                <span>{gift.emoji}</span>
                <button className="heart">♡</button>
              </div>

              <div className="gift-info">
                <small>{gift.category}</small>
                <h3>{gift.name}</h3>
                <p>{gift.description}</p>

                <div className="gift-bottom">
                  <strong>Rs. {gift.price.toLocaleString()}</strong>
                  <span>⭐ 4.8</span>
                </div>

                <button
                  className="add-btn"
                  onClick={() => addToCart(gift)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SMART GIFT FINDER */}
      <section className="finder-section" id="finder">
        <div className="finder-container">
          <div className="finder-intro">
            <span>✨ GIFTIFY SMART ASSISTANT</span>
            <h2>Not Sure What to Gift?</h2>
            <p>
              Answer a few simple questions and Giftify will suggest gifts
              according to your choices.
            </p>
          </div>

          <div className="finder-box">
            <div className="form-group">
              <label>Who is the gift for?</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              >
                <option value="">Choose recipient</option>
                <option>Mother</option>
                <option>Father</option>
                <option>Sister</option>
                <option>Brother</option>
                <option>Friend</option>
                <option>Partner</option>
                <option>Teacher</option>
              </select>
            </div>

            <div className="form-group">
              <label>What is the occasion?</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              >
                <option value="">Choose occasion</option>
                <option>Birthday</option>
                <option>Wedding</option>
                <option>Anniversary</option>
                <option>Eid</option>
                <option>Friendship</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>What is your budget?</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Choose budget</option>
                <option value="under1000">Under Rs. 1,000</option>
                <option value="1000-3000">Rs. 1,000 – 3,000</option>
                <option value="3000-5000">Rs. 3,000 – 5,000</option>
                <option value="above5000">Above Rs. 5,000</option>
              </select>
            </div>

            <div className="form-group">
              <label>What type of gift?</label>
              <select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
              >
                <option value="">Choose preference</option>
                <option>Personalized</option>
                <option>Fashion</option>
                <option>Beauty</option>
                <option>Food</option>
                <option>Home Decor</option>
                <option>Cute/Fun</option>
              </select>
            </div>

            <button className="find-btn" onClick={findGift}>
              ✨ Find Perfect Gifts
            </button>
          </div>

          {recommendations.length > 0 && (
            <div className="recommendations">
              <h2>🎀 Giftify Recommends</h2>
              <p>Here are some gifts you might love:</p>

              <div className="recommendation-grid">
                {recommendations.map((gift) => (
                  <div className="recommendation-card" key={gift.id}>
                    <div className="recommendation-icon">
                      {gift.emoji}
                    </div>

                    <h3>{gift.name}</h3>
                    <p>{gift.description}</p>
                    <strong>
                      Rs. {gift.price.toLocaleString()}
                    </strong>

                    <button
                      className="add-btn"
                      onClick={() => addToCart(gift)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="section-heading">
          <span>ABOUT GIFTIFY</span>
          <h2>Why Choose Giftify?</h2>
          <p>
            We make finding thoughtful gifts simple, fun and stress-free.
          </p>
        </div>

        <div className="features">
          <div className="feature">
            <span>💝</span>
            <h3>Thoughtful Gifts</h3>
            <p>Discover gifts that feel personal and meaningful.</p>
          </div>

          <div className="feature">
            <span>✨</span>
            <h3>Smart Suggestions</h3>
            <p>Our Gift Finder helps you discover suitable ideas.</p>
          </div>

          <div className="feature">
            <span>🎉</span>
            <h3>Every Occasion</h3>
            <p>Find something special for every important moment.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-content">
          <span>GET IN TOUCH</span>
          <h2>Let's Make Someone Smile</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! Your message has been received.");
            }}
          >
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required />
            <button type="submit" className="primary-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <h2>🎁 Giftify</h2>
          <p>Making every occasion a little more special.</p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#gifts">Gifts</a>
          <a href="#finder">Gift Finder</a>
          <a href="#about">About</a>
        </div>

        <p className="copyright">
          © 2026 Giftify. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;
