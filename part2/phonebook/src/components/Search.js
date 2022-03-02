const Search = ({ searchValue, handleSearch }) => {
  return (
    <>
      <label>filter shown with </label>
      <input value={searchValue} onChange={handleSearch} type="text" />
    </>
  );
};

export default Search;
