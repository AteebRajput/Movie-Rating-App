export const getRatedMovies = async (guestSessionId) => {
  console.log("Guest session",guestSessionId);
  
  const url = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjNjNmIxOGUwYzgwODliMDIwYTI4NDQ4NmNjMjkzNSIsIm5iZiI6MTcyOTAwODA1OC42ODg1MDMsInN1YiI6IjY3MDE4ZmEzNzgzMGMxMzAxZTdkMTFlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xdzp1k054RHWORYQ0HrD604Mk_iyUpAa-K73atRKuds',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Rated Movies:', data);
    return data;
  } catch (error) {
    console.error('Error fetching rated movies:', error);
  }
};


