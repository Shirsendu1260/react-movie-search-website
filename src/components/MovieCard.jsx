import starSrc from '../../public/star.svg';
import noMovieSrc from '../../public/no-movie.png';

const MovieCard = ({ movie: { 
	title, 
	vote_average, 
	original_language, 
	poster_path, 
	release_date 
} }) => {
	return (
		<div className='movie-card'>
			<img 
				src={poster_path 
				? `https://image.tmdb.org/t/p/w500/${poster_path}` 
				: noMovieSrc} 
				alt={title}
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
		</div>
	);
};

export default MovieCard;