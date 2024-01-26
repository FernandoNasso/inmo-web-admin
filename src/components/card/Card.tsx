import React from 'react';
import { Property } from '../../interfaces/propertyTypes';
import styles from './Card.module.css'; // Importa el archivo de estilos

interface CardProps {
  property: Property;
}

const Card: React.FC<CardProps> = ({ property }) => {
  return (
    <div className={styles.card}> {/* Aplica la clase de estilo */}
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.price}</p>
    </div>
  );
};

export default Card;
