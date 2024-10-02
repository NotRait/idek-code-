import { useState, useEffect } from 'react';
import axios from 'axios';

const NoteApp = () => {
    const jsonBlobUrl = "https://jsonblob.com/api/jsonBlob/1290714941508935680";
    const [task, setTask] = useState('');
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState('');
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        const putNotes = async () => {
            try{
                const repsonse = await axios.put("https://cors-anywhere.herokuapp.com/".concat(jsonBlobUrl.trim('https://')), {[user] : notes})
            }catch(e){
                console.error(e)
            }
        }
        putNotes()
    }, [notes, user])
    useEffect(() => {
        const fetchNotes = async () => {
            if (user !== '') {
                try {
                    const response = await axios.get(jsonBlobUrl);
                    setNotes(response.data[user] || []); // Use response.data directly
                } catch (error) {
                    console.error('Error fetching notes:', error);
                    setNotes(['Could not fetch notes.']); // Error handling
                }
            }
        };

        if (submitted) {
            fetchNotes();
        }
    }, [submitted, user]); // Run when 'submitted' or 'user' changes

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setSubmitted(true); 
    };

    const handleInput = (event) => {
        const { className, value } = event.target;
        switch (className) {
            case 'user':
                setUser(value);
                break;
            case 'task':
                setTask(value);
                break;
            default:
                break;
        }
    };

    const deleteTask = (index) => {
        const newNotes = [...notes];
        newNotes.splice(index, 1);
        setNotes(newNotes);
    };

    const addTask = () => {
        if (task.trim()) {
            const updatedNotes = [...notes, task];
            setNotes(updatedNotes);
            setTask(''); // Clear the task input after adding
        }
    };

    if (!submitted) {
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Enter User:
                    <input type="text" className='user' onChange={handleInput} />
                </label>
                <button type="submit">Submit</button>
            </form>
        );
    }

    return (
        <>
            <h2>Welcome, {user}!</h2>
            <input
                type="text"
                value={task}
                className="task"
                onChange={handleInput}
                placeholder='Enter a task'
            />
            <button onClick={addTask}>Add task</button>
            <p>Current task: {task}</p>
            <ul>
                {console.log(notes)}
                {notes.map((note, index) => (
                    <li key={index}>
                        {note}
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default NoteApp;
