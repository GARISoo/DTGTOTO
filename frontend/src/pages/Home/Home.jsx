import { useEffect } from 'react';
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import WorkoutDetails from '../../components/WorkoutDetails/WorkoutDetails';
import styles from './Home.module.scss';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  const handlePromote = async (email) => {
    await fetch(`/api/user/promote/${email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
  }

  const getUsers = async () => {
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.get('api/user/all', {
        signal: controller.signal,
      });
      if (response) console.log(response)
    } catch (err) {
      console.log(err)
    }

    // const response = await axiosPrivate.get('api/user/all', {
    //   signal: controller.signal,
    // });
    // if(response) console.log(response)

    return () => {
      controller.abort();
    };
  };

  const handleAllUsers = async () => {
    const response = await fetch('api/user/all');
    const users = await response.json()

    if (users) console.log(users);
  }

  return (
    <div className={styles.home}>
      <div className={styles.workouts}>
        <button onClick={getUsers}>GET ALL USERS</button>
        <button onClick={() => handlePromote(user.email)}>PROMOTE ME</button>
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
    </div>
  )
}

export default Home