import React, { useEffect, useState } from "react";
import { Heart, Star, MessageSquare, Trash2 } from "lucide-react";

const Profile = () => {
  const [username, setUsername] = useState("Ramya");
  const [profilePic, setProfilePic] = useState("");
  const [savedProfilePic, setSavedProfilePic] = useState("");
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [ratedMovies, setRatedMovies] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  // Load user profile and watchlist data from local storage (Temporary until backend API is ready)
  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "Ramya";
    const savedPic = localStorage.getItem("profilePic") || "";
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const savedRatedMovies = JSON.parse(localStorage.getItem("ratedMovies") || "[]");
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

    setUsername(savedUsername);
    setSavedProfilePic(savedPic);
    setWatchlist(savedWatchlist);
    setRatedMovies(savedRatedMovies);
    setReviews(savedReviews);
  }, []);

  // Save profile data
  const handleSave = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("profilePic", profilePic);
    setSavedProfilePic(profilePic);
    alert("Profile updated successfully!");
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (id: number) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-6">
      {/* Profile Card */}
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Profile</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            src={savedProfilePic || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-500 shadow-lg"
          />
        </div>

        {/* Username Input */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-md bg-zinc-700 text-white placeholder-zinc-400 mb-3 focus:ring-2 focus:ring-yellow-500 outline-none"
          placeholder="Enter your name"
        />

        {/* Profile Pic URL Input */}
        <input
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          className="w-full p-3 rounded-md bg-zinc-700 text-white placeholder-zinc-400 mb-3 focus:ring-2 focus:ring-yellow-500 outline-none"
          placeholder="Profile Picture URL"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-red-600 px-6 py-2 text-white font-semibold rounded-md hover:bg-red-500 transition-all"
        >
          Save
        </button>
      </div>

      {/* Watchlist, Rated Movies & Reviews Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Watchlist Section */}
        <div className="bg-zinc-800 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Heart className="text-red-500" /> Watchlist
          </h3>
          {watchlist.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {watchlist.map((movie) => (
                <li key={movie.id} className="flex items-center justify-between p-3 bg-zinc-700 rounded-md">
                  <span>{movie.title}</span>
                  <button onClick={() => removeFromWatchlist(movie.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-400 text-sm mt-3">No movies in watchlist.</p>
          )}
        </div>

        {/* Rated Movies Section */}
        <div className="bg-zinc-800 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Star className="text-yellow-500" /> Rated Movies
          </h3>
          {ratedMovies.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {ratedMovies.map((movie) => (
                <li key={movie.id} className="p-3 bg-zinc-700 rounded-md">{movie.title} - ⭐ {movie.rating}</li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-400 text-sm mt-3">No rated movies.</p>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-zinc-800 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="text-blue-500" /> Reviews
          </h3>
          {reviews.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {reviews.map((review) => (
                <li key={review.id} className="p-3 bg-zinc-700 rounded-md">
                  <p className="text-white">{review.movieTitle}: "{review.text}"</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-400 text-sm mt-3">No reviews.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;