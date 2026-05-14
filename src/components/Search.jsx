import searchSrc from '../../public/search.svg';

const Search = ({ searchTerm, setSearchTerm }) => {
	return (
		<div className='search'>
			<div>
				<img src={searchSrc} alt='Search' />
				<input
					type='text'
					placeholder='Search movies'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default Search;