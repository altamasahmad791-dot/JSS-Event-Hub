import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CalendarDays, MapPin, Search, ArrowUpRight, Menu, X, Ticket, Sparkles, ShieldCheck, Plus, Trash2, LogIn } from "lucide-react";
import "./styles.css";

const initialEvents = [
  { id: 1, title: "CodeSprint 2026", category: "Coding", date: "2026-11-05", time: "10:00 AM", venue: "Innovation Lab", description: "A fast-paced coding challenge for builders, problem-solvers, and curious minds.", color: "violet", tag: "TECH", seats: 120 },
  { id: 2, title: "Hack the Campus", category: "Hackathons", date: "2026-11-12", time: "9:00 AM", venue: "Main Auditorium", description: "Team up, build a prototype, and turn your boldest campus idea into reality.", color: "blue", tag: "24-HOUR HACKATHON", seats: 80 },
  { id: 3, title: "Inter-College Sports Meet", category: "Sports", date: "2026-11-18", time: "8:30 AM", venue: "College Sports Ground", description: "Bring your energy, represent your team, and celebrate the spirit of sports.", color: "orange", tag: "SPORTS", seats: 200 },
  { id: 4, title: "DesignVerse", category: "Creative", date: "2026-11-22", time: "11:00 AM", venue: "Seminar Hall 2", description: "Explore UI/UX, visual storytelling, and creative ideas with fellow designers.", color: "pink", tag: "CREATIVE", seats: 100 },
  { id: 5, title: "AI & Future Forum", category: "Coding", date: "2026-11-27", time: "12:00 PM", venue: "Conference Room", description: "A student-focused discussion on AI, responsible innovation, and what comes next.", color: "green", tag: "AI / ML", seats: 150 },
  { id: 6, title: "Freshers Open Mic", category: "Creative", date: "2026-12-02", time: "3:00 PM", venue: "Open-Air Stage", description: "Music, poetry, comedy, and the people who make campus life memorable.", color: "yellow", tag: "CAMPUS LIFE", seats: 90 }
];

const categories = ["All Events", "Coding", "Hackathons", "Sports", "Creative"];
const dateLabel = (value) => new Date(value + "T12:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function App() {
  const [events, setEvents] = useState(() => {
    try { return JSON.parse(localStorage.getItem("jss-events")) || initialEvents; }
    catch { return initialEvents; }
  });
  const [category, setCategory] = useState("All Events");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [registered, setRegistered] = useState(() => {
    try { return JSON.parse(localStorage.getItem("jss-registered")) || []; }
    catch { return []; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [organizerOpen, setOrganizerOpen] = useState(false);
  const [organizerLoggedIn, setOrganizerLoggedIn] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Coding");
  const [newDate, setNewDate] = useState("");
  const [newVenue, setNewVenue] = useState("");

  const filtered = useMemo(() => events.filter(e =>
    (category === "All Events" || e.category === category) &&
    (e.title + " " + e.description + " " + e.category).toLowerCase().includes(search.toLowerCase())
  ), [events, category, search]);

  const saveEvents = (next) => {
    setEvents(next);
    localStorage.setItem("jss-events", JSON.stringify(next));
  };

  const register = (event) => {
    if (registered.includes(event.id)) return;
    const next = [...registered, event.id];
    setRegistered(next);
    localStorage.setItem("jss-registered", JSON.stringify(next));
  };

  const login = (e) => {
    e.preventDefault();
    // Demo-only login. Change this before using a real organizer account.
    if (loginName.trim() && loginPassword === "jssadmin") {
      setOrganizerLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Demo login: enter any username and password jssadmin.");
    }
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate || !newVenue.trim()) return;
    const item = {
      id: Date.now(), title: newTitle.trim(), category: newCategory, date: newDate,
      time: "10:00 AM", venue: newVenue.trim(), description: "A new campus event. Open the event details to learn more.",
      color: "violet", tag: newCategory.toUpperCase(), seats: 100
    };
    saveEvents([item, ...events]);
    setNewTitle(""); setNewDate(""); setNewVenue("");
  };

  const removeEvent = (id) => saveEvents(events.filter(e => e.id !== id));

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="JSS Event Hub home">
          <span className="brand-mark"><Sparkles size={19} /></span>
          <span>JSS <b>EVENT HUB</b></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#events" onClick={() => setMenuOpen(false)}>Explore events</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <button className="nav-login" onClick={() => { setOrganizerOpen(true); setMenuOpen(false); }}><LogIn size={16} /> Organizer portal</button>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-glow glow-one"></div><div className="hero-glow glow-two"></div>
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot"></span> YOUR CAMPUS. YOUR COMMUNITY.</div>
            <h1>Campus life,<br /><span>all in one place.</span></h1>
            <p className="hero-subtitle">Find your people. Discover what’s happening. Make your college days count.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#events">Explore events <ArrowUpRight size={18} /></a>
              <div className="hero-proof"><span className="proof-icon"><ShieldCheck size={17}/></span><span><b>Made for students</b><small>One hub for campus happenings</small></span></div>
            </div>
          </div>
          <div className="hero-art" aria-label="Abstract event illustration">
            <div className="art-orbit orbit-a"></div><div className="art-orbit orbit-b"></div>
            <div className="art-card card-back"><span className="mini-label">NEXT UP</span><div className="mini-date">05<br/><small>NOV</small></div><div className="mini-lines"><i></i><i></i><i></i></div></div>
            <div className="art-card card-front"><div className="art-spark"><Sparkles size={25}/></div><span className="mini-label">CAMPUS MOMENT</span><h3>Ideas become<br/>experiences.</h3><div className="art-pills"><span>Connect</span><span>Create</span><span>Compete</span></div></div>
            <div className="float-bubble bubble-one">✦</div><div className="float-bubble bubble-two">✳</div>
          </div>
          <div className="hero-bottom"><span><b>01</b> Discover</span><span className="line"></span><span><b>02</b> Register</span><span className="line"></span><span><b>03</b> Show up</span></div>
        </section>

        <section className="events-section" id="events">
          <div className="section-heading">
            <div><div className="eyebrow dark-eyebrow">WHAT’S HAPPENING</div><h2>Find your next <span>thing.</span></h2><p>From big ideas to game-day energy, there’s a place for you.</p></div>
            <div className="event-count"><b>{filtered.length.toString().padStart(2, "0")}</b><span>events to explore</span></div>
          </div>
          <div className="filters">
            <div className="category-tabs">{categories.map(c => <button key={c} className={category === c ? "category-tab active" : "category-tab"} onClick={() => setCategory(c)}>{c}</button>)}</div>
            <label className="search-box"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." aria-label="Search events"/></label>
          </div>
          <div className="event-grid">
            {filtered.map((event, index) => (
              <article className="event-card" key={event.id} style={{"--delay": `${index * 60}ms`}}>
                <div className={`event-visual ${event.color}`}>
                  <span className="event-tag">{event.tag}</span><span className="visual-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="visual-shape"><span></span><i></i><b>✦</b></div>
                  <span className="visual-category">{event.category}</span>
                </div>
                <div className="event-info">
                  <div className="event-date"><CalendarDays size={15}/>{dateLabel(event.date)} <span>·</span> {event.time}</div>
                  <h3>{event.title}</h3><p>{event.description}</p>
                  <div className="event-location"><MapPin size={15}/>{event.venue}</div>
                  <div className="event-card-footer"><span className="seats">{event.seats} spots planned</span><button className="details-btn" onClick={() => setSelected(event)}>View details <ArrowUpRight size={16}/></button></div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="empty-state"><Search size={28}/><h3>No events found</h3><p>Try another search or category.</p><button className="primary-btn" onClick={() => {setSearch(""); setCategory("All Events");}}>Clear filters</button></div>}
        </section>

        <section className="cta-section" id="about">
          <div className="cta-star">✳</div><div><div className="eyebrow">BE PART OF IT</div><h2>Your campus story<br/>starts <span>here.</span></h2><p>Pick an event, bring a friend, and make a memory.</p></div><a className="primary-btn light-btn" href="#events">Find an event <ArrowUpRight size={18}/></a>
        </section>
      </main>
      <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Sparkles size={17}/></span><span>JSS <b>EVENT HUB</b></span></a><span>Built for campus life · Student project</span><a href="#home">Back to top ↑</a></footer>

      {selected && <div className="modal-backdrop" onMouseDown={e => {if(e.target === e.currentTarget) setSelected(null);}}>
        <div className="modal event-modal">
          <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X size={20}/></button>
          <div className={`modal-banner ${selected.color}`}><span className="event-tag">{selected.tag}</span><div className="modal-banner-icon"><Ticket size={34}/></div></div>
          <div className="modal-content"><div className="eyebrow dark-eyebrow">EVENT DETAILS</div><h2>{selected.title}</h2><p>{selected.description}</p>
            <div className="detail-row"><CalendarDays size={18}/><span>{dateLabel(selected.date)} · {selected.time}</span></div><div className="detail-row"><MapPin size={18}/><span>{selected.venue}</span></div>
            <button className={registered.includes(selected.id) ? "primary-btn registered-btn" : "primary-btn full-btn"} onClick={() => register(selected)} disabled={registered.includes(selected.id)}>{registered.includes(selected.id) ? "✓ Registered on this device" : "Register interest"} {!registered.includes(selected.id) && <ArrowUpRight size={18}/>}</button>
            <small className="demo-note">Demo registration is saved only in this browser. It does not send data to the college.</small>
          </div>
        </div>
      </div>}

      {organizerOpen && <div className="modal-backdrop" onMouseDown={e => {if(e.target === e.currentTarget) setOrganizerOpen(false);}}>
        <div className="modal organizer-modal"><button className="modal-close" onClick={() => setOrganizerOpen(false)} aria-label="Close"><X size={20}/></button>
          {!organizerLoggedIn ? <div className="modal-content"><div className="organizer-icon"><ShieldCheck size={25}/></div><div className="eyebrow dark-eyebrow">ORGANIZER PORTAL</div><h2>Manage campus events.</h2><p>This demo portal lets you add and remove events in this browser.</p>
            <form className="organizer-form" onSubmit={login}><label>Username<input value={loginName} onChange={e => setLoginName(e.target.value)} placeholder="Enter any username" required/></label><label>Password<input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Demo password: jssadmin" required/></label>{loginError && <p className="form-error">{loginError}</p>}<button className="primary-btn full-btn" type="submit">Sign in <ArrowUpRight size={18}/></button><small className="demo-note">Demo only: username can be anything; password is jssadmin. Not secure for real accounts.</small></form>
          </div> : <div className="modal-content"><div className="eyebrow dark-eyebrow">ORGANIZER DASHBOARD</div><h2>Event management</h2><p>Add a campus event or remove one from the current list.</p>
            <form className="organizer-form" onSubmit={addEvent}><label>Event title<input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Tech Talk" required/></label><div className="form-two"><label>Category<select value={newCategory} onChange={e => setNewCategory(e.target.value)}>{categories.slice(1).map(c => <option key={c}>{c}</option>)}</select></label><label>Date<input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} required/></label></div><label>Venue<input value={newVenue} onChange={e => setNewVenue(e.target.value)} placeholder="e.g. Seminar Hall" required/></label><button className="primary-btn full-btn" type="submit"><Plus size={18}/> Add event</button></form>
            <div className="manage-list">{events.map(ev => <div className="manage-item" key={ev.id}><span><b>{ev.title}</b><small>{ev.category} · {dateLabel(ev.date)}</small></span><button onClick={() => removeEvent(ev.id)} aria-label={`Remove ${ev.title}`}><Trash2 size={17}/></button></div>)}</div><button className="text-btn" onClick={() => setOrganizerLoggedIn(false)}>Sign out</button>
          </div>}
        </div>
      </div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);