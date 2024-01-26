import React from 'react';
import { Property } from '../../interfaces/propertyTypes';
import styles from './Card.module.css'; 
import { useNavigate } from 'react-router-dom';


interface CardProps {
  property: Property;
}

const Card: React.FC<CardProps> = ({ property }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${property._id}`);
  };

  return (
    <div className={styles.card}>
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.price}</p>
      <button onClick={handleEditClick}>Editar</button>
    </div>
  );
};

export default Card;
