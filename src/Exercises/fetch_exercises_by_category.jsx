import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access route parameters
import Navbar from '@/customs/navbar';
import './Exercises.css'; // Assuming you're using the same CSS

const FetchExercisesByCategory = () => {
  const { category } = useParams(); // Get category from URL
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${apiUrl}/exercises/category/${category}`); // Adjust endpoint as needed
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>; // Simple loading state
  }

  return (
    <div>
      <Navbar />
      <div className="exercises-page">
        <h2>Exercises in {category}</h2>
        <div className="exercises-container">
          {exercises.map((exercise) => (
            <div key={exercise._id} className="exercise-card">
              <img 
                src={exercise.image_link} 
                alt={exercise.name} 
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
              />
              <h3>{exercise.name}</h3>
              <p>{exercise.description}</p>
              <a href={`/exercises/${exercise._id}`} className="exercises-btn">View Details</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FetchExercisesByCategory;
