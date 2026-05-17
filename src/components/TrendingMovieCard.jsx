const TrendingMovieCard = ({ movie: { 
	id, 
	title, 
	poster_path
}, index }) => {
	return (
		<a
			href={`https://www.themoviedb.org/movie/${id}`}
			target="_blank"
			rel="noopener noreferrer"
			className='trending-link'
		>
			<p>{index + 1}</p>
			<img
				src={
				  poster_path
				    ? `https://image.tmdb.org/t/p/w342/${poster_path}`
				    : '/no-movie.png'
				}
				alt={title}
				decoding="async"
			/>
		</a>
	);
};

export default TrendingMovieCard;