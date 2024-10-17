export const fetchmovies = async (pageNo) => {  
    console.log(pageNo);
    
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNo}`, // Use pageNo dynamically here
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjNjNmIxOGUwYzgwODliMDIwYTI4NDQ4NmNjMjkzNSIsIm5iZiI6MTcyODQxNjQzMC45MTQwNTcsInN1YiI6IjY3MDE4ZmEzNzgzMGMxMzAxZTdkMTFlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qOwavNucDf54bGPMCzG4BEc5BTNiinCIYB9Cb-QHtTY`,
        },
      }
    );
  
    const data = await response.json();
    console.log(data);
    
    return data;
  };
  