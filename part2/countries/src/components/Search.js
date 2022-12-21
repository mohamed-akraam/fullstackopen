const Search = ({ onSubmit, value, onChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>find countries: </label>
        <input value={value} onChange={onChange} />
      </form>
    </div>
  );
};

export default Search;
