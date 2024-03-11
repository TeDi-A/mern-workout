import { useEffect, useState } from "react"

import WorkoutDetails from "../components/WorkoutDetails.jsx"
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutContext } from "../../../backend/hooks/useWorkoutContext.jsx";

function Home() {

    const { workouts, dispatch } = useWorkoutContext()

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch("http://localhost:4000/api/workouts");
            const json = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'SET_WORKOUTS',
                    payload: json
                 })
            }
        };

        fetchWorkout();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails
                        key={workout._id}
                        workout={workout}
                    />
                ))}
            </div>

            <div className="form">
                <WorkoutForm />
            </div>
        </div>
    )
}

export default Home