export const rateMovie = async (id, rating) => {
    console.log(import.meta.env.VITE_API_KEY);

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${localStorage.getItem("guest_session_id")}&api_key=${import.meta.env.VITE_API_KEY}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ value: rating }),
      }
    );
  
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error response:", data);
      throw new Error("Failed to rate the movie.");
    }
  
    return data;
  };
  