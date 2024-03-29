import { useState } from "react";
import { useWorkoutContext } from "../../../backend/hooks/useWorkoutContext";

function WorkoutForm() {

    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setemptyFields] = useState([])

    async function HandleSubmit(e) {
        e.preventDefault()
        const workout = { title, load, reps }
        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setemptyFields(json.emptyFields)
        }

        if (response.ok) {
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json
            })
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log(json)
        }
    }

    ;
    return (
        <form
            action=""
            className="create"
            onSubmit={HandleSubmit}>


            <h3>Add New Workout</h3>
            <label>Name</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load</label>
            <input
                type="text"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps</label>
            <input
                type="text"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />


            <button className="add-new">Add Workout</button>
            {error && <div className="error">Error: {error}</div>}
        </form>
    )
}

export default WorkoutForm