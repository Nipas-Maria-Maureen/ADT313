import './Name.css';

function Name({firstName,lastName}){
    return (
        <div>
            <h1 className='name'> <span>{firstName}</span> {lastName}</h1>

        </div>
    )
}

export default Name;