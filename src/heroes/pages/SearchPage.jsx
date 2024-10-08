import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';
import queryString from 'query-string';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const heroes = getHeroesByName(q);

  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const { searchText, handleInputChange } = useForm({
    searchText: q,
  });

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className='row'>
        <div className='col-5'>
          <h4>Searching</h4>
          <hr />
          <form onSubmit={handleSearchSubmit} aria-label='form-search'>
            <input
              type='text'
              placeholder='Search a hero'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={searchText}
              onChange={handleInputChange}
            />
            <button className='btn btn-outline-primary mt-1'>Search</button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Results</h4>
          <hr />

          <div
            aria-label='alert-danger'
            className='alert alert-primary animate__animated animate__fadeIn'
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero
          </div>

          <div
            aria-label='alert-no-hero'
            className='alert alert-danger animate__animated animate__fadeIn'
            style={{ display: showError ? '' : 'none' }}
          >
            No hero with <b>{q}</b>
          </div>
          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
