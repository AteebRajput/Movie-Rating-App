export const mutateLogin = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${import.meta.env.VITE_API_KEY}`, // Include API key in the URL
  );

  const data = await response.json();
  console.log(data);
  if (data && data.guest_session_id) {
    console.log("Guest session created:", data.guest_session_id);
    
    // Store the guest session ID in local storage
    localStorage.setItem("guest_session_id", data.guest_session_id);
  }
  
  return data;
};
