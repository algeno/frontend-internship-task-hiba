import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

//generate two letterfrom the name to use when the image is not available.
//take a name as a par, remove extra spaces , split the string into words using space to separate, keep only the first two words.
function initials(name = "") {
  const parts = name.trim().split(/\s+/).slice(0, 2);   //part is an array of two words
  return parts.map(p => p[0]?.toUpperCase() || "").join("");  //loop over each wordsand take the first char make it upperCase or return an empty string if no letter is found. combine letters into one string
}

export default function UserCard({ user }) {
  // Try common keys for image & food
  const img = user.image || user.avatar || user.photo || null; //different data sourves use different naming conventions
  const fav = user.favoriteFood || user.favorite_food || user.favFood || "—"; //camelCase, snake_case, and shortend version

  return (
    <Card
      className="h-full overflow-hidden rounded-2xl border border-gray-200 
                 shadow-sm bg-white 
                 hover:shadow-lg hover:-translate-y-1 
                 transition-all duration-200"
    >
      {/* IMAGE */}
      {img ? (
        <img
          src={img}
          alt={user.name || "User"}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 sm:h-48 md:h-56 lg:h-40 bg-gray-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-400">
            {initials(user.name)}
          </span>
        </div>
      )}

      {/* Thin accent bar */}
      <div className="h-1 bg-amber-600" />

      {/* TEXT */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {user.name || "Unnamed"}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-1">
        <div>
          <span className="font-medium text-gray-900">Age: </span>
          <span className="text-gray-600">{user.age ?? "—"}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">Job Title: </span>
          <span className="text-gray-600">{user.jobTitle}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">Favorite Food: </span>
          <span className="text-gray-600">{fav}</span>
        </div>
      </CardContent>
    </Card>
  );
}
