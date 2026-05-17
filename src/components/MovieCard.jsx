import starSrc from '../../public/star.svg';
import noMovieSrc from '../../public/no-movie.png';
import { useState } from 'react';

const MovieCard = ({ movie: { 
	id,
	title, 
	vote_average, 
	original_language, 
	poster_path, 
	release_date 
} }) => {
	// track whether the image has finished loading
  	const [imgLoaded, setImgLoaded] = useState(false);

	return (
		<a
			href={`https://www.themoviedb.org/movie/${id}`}
		    target="_blank"
		    rel="noopener noreferrer"
		    className='movie-card'
		>
			<img 
				src={poster_path 
				? `https://image.tmdb.org/t/p/w342/${poster_path}` 
				: noMovieSrc} 
				alt={title}
  				decoding="async" // Lets browser decode image without blocking rendering.
				onLoad={() => setImgLoaded(true)} // fires when image fully loads
				className={`transition-all duration-500 ${
		          imgLoaded 
		            ? 'opacity-100 blur-0' // fully visible once loaded
		            : 'opacity-0 blur-sm' // hidden/blurred while loading
		        }`}
			/>
			<div className='mt-4'>
				<h3>{title}</h3>

				<div className='content'>
					<div className='rating'>
						<img src={starSrc} alt='Star Icon' />
						<p>{vote_average ? vote_average.toFixed(1).toString() : 'N/A'}</p>
					</div>

					<span>&bull;</span>
					<p className='lang'>{original_language.toUpperCase()}</p>
					<span>&bull;</span>
					<p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
				</div>
			</div>
		</a>
	);
};

export default MovieCard;