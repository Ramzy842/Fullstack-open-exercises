const SearchBox = ({value, handleChange}) => {

    return <div>
        <label>Find countries</label>
        <input type="text" value={value} onChange={handleChange} />
    </div>
}


export default SearchBox;