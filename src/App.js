import { useEffect, useState } from "react";
import UserCard from "./components/userCard";

export default function App() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");

  // Load once from users.json
  //first argument is a function that runs after rendering the component
  //second argument is an empty array means the effect only runs once(when component mount).
  useEffect(() => {
    fetch("/users.json")  //makes HTTP request to fetch the file.
    .then(response => response.json())  //read the body of the response and parse it to JS object/array
    //update the react state with the data (result from the promise resolved r.json()
    .then(data => setUsers(Array.isArray(data) ? data : []));
  }, []);

  // Filter by name (case-insensitive)
  //take the search query, remove extra spaces
  const query = q.trim().toLowerCase();
  //short version of if/else. if query is not empty
  const filtered = query
  //loop over each elemnt in the users array
  //if u.name doesn't exist, it falls back to an empty string "" which is safe to run .toLowerCase on.
    ? users.filter(u => (u.name|| "").toLowerCase().startsWith(query))
    : users;  //if query is empty then it will return the entire list

  return (
    //min-h-screen: minimum height to the full screen. 
    //bg: background.
    //max-w: maximum width
    //mx-auto: margin-left and margin-right.
    //px: horizontal padding (padding-left, padding-right).
    //py: vertical padding (padding-top, padding-bottom).
    //text-3xl: utilities both font-size, and line height.
    //font-extrabold: font-weight
    //tracking-tight: letter spacing
    //text-gray-900: text-color ...
    //mb: margin-bottom

    <div className="min-h-screen bg-gray-50"> 
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-6">
          User Card Application
        </h1>

        {/* Search input */}
        <div className="mb-6">
          {/*htmlFor links the label to the input with the id=search, makes the label as a block, 
          set fontsize and line height, set font weight, text color, and margin bottom*/}
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search by name
          </label>
          <input
            id="search"  /*Links this input to the label htmlFor="search"*/
            type="text"
            name="search-users"         // use a unique, non-generic name
            autoComplete="off"          // request no browser autofill
            autoCorrect="off"           // iOS: stop autocorrect
            autoCapitalize="none"       // iOS: stop auto-capitalization
            spellCheck={false}          // stop spellcheck suggestions
            value={q} /*whatever the q (declared in the useState) holds will show up inside the input field*/
            onChange={e => setQ(e.target.value)}  /*Updates the state q whenever the user types.*/
            placeholder="Type a name"
            className="h-10 w-full max-w-md rounded-xl border border-gray-300 bg-white px-3 text-sm outline-none
           focus:ring-2 focus:ring-black/10 focus:border-gray-400"  //outline-none will removes the default browser outline when focused
           //add a black ring/box shadow vorder)with2px and 10% opacity and make the border slightly darker
          />
        </div>

        {/* Responsive grid */}
        {/*grid-cols-1 → 1 column layout by default (mobile view)*/}
        {/*sm:grid-cols-2 → on small screens (≥640px), use 2 columns*/}
        {/*md:grid-cols-3 → on medium screens (≥768px), use 3 columns.*/}
        {/*lg:grid-cols-5 → on large screens (≥1024px), use 5 columns.*/}
        {/*gap-6 → space between rows and columns.*/}
        {/*auto-rows-fr → all rows have equal height, so cards align neatly.*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 auto-rows-fr">
          {/*loop through the filtered array after avoiding rendering too many using the slice function*/}
          {/* When rendering lists, React requires a unique "key" for each item.
              This allows React to efficiently track, update, and reorder items without mixing them up.
              If id is missing, we fall back to email, then name, and finally the array index (least reliable*/}
          {filtered.slice(0, 30).map((currentuser, i) => (
            <div key={currentuser.id ?? currentuser.email ?? currentuser.name ?? i} className="h-full">
              <UserCard user={currentuser} /> {/*renders the UserCard component, passing the user object as a prop.*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
