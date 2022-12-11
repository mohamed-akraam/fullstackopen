const   PersonForm = ({ onSubmit, valueName, onChangeName, valueNumber, onChaneNumber }) => (
    <form onSubmit={onSubmit}>
        <div>
            name : <input value={valueName} onChange={onChangeName}/>
        </div>
        <div>
            number: <input value={valueNumber} onChange={onChaneNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm;