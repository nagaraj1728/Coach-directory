
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [coaches, setCoaches] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

 
  function loadCoaches() {
    setLoading(true);
    setError(false);

    //here it fetches the all data from the api ural given by the you
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setCoaches(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadCoaches();
  }, []);

  // in this below code it searches for the names of the coaches and give the searched coach detailas
  const filteredCoaches = coaches.filter((coach) =>
    coach.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <h2>CoachConnect</h2>
        <span>Find your perfect coach</span>
      </nav>

      {/* Heading */}
      <section className="hero">
        <h1>Discover Your Perfect Coach</h1>
        <p>Find experienced professionals and connect with them.</p>

        <input
          type="text"
          placeholder="Search coaches by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Coach List */}
      <main className="container">
        <h2>Our Coaches</h2>

        {loading && <p className="message">Loading coaches...</p>}

        {error && (
          <div className="message">
            <p>Unable to load coaches. Please try again.</p>
            <button onClick={loadCoaches}>Try Again</button>
          </div>
        )}

        {!loading && !error && filteredCoaches.length === 0 && (
          <p className="message">No coaches found.</p>
        )}

        {!loading && !error && (
          <div className="coach-grid">
            {filteredCoaches.map((coach) => (
              <div className="coach-card" key={coach.id}>
                <div className="avatar">
                  {coach.name.charAt(0)}
                </div>

                <h3>{coach.name}</h3>
                <p>{coach.address.city}</p>
                <p>{coach.company.name}</p>

                <button onClick={() => setSelected(coach)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Coach Details */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <h2>{selected.name}</h2>

            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Phone:</strong> {selected.phone}</p>
            <p><strong>Website:</strong> {selected.website}</p>

            <h3>Address</h3>
            <p><strong>Street:</strong> {selected.address.street}</p>
            <p><strong>Suite:</strong> {selected.address.suite}</p>
            <p><strong>City:</strong> {selected.address.city}</p>
            <p><strong>ZIP Code:</strong> {selected.address.zipcode}</p>
            <p><strong>Latitude:</strong> {selected.address.geo.lat}</p>
            <p><strong>Longitude:</strong> {selected.address.geo.lng}</p>

            <h3>Company</h3>
            <p><strong>Name:</strong> {selected.company.name}</p>
            <p><strong>Catch Phrase:</strong> {selected.company.catchPhrase}</p>
            <p><strong>Business:</strong> {selected.company.bs}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <p>© 2026 CoachConnect</p>
      </footer>

    </div>
  );
}

export default App;
