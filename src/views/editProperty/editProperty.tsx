import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProperties, updateProperty } from "../../redux/propertySlice";
import { Property } from "../../interfaces/propertyTypes";

const EditProperty: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const properties = useSelector(selectProperties);
  const [editedProperty, setEditedProperty] = useState<Property | null>(null);

  useEffect(() => {
    const property = properties.find(property => property._id === id);
    console.log("propiedad encontrada:", property);
    setEditedProperty(property || null);
  }, [id, properties]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProperty) {
      setEditedProperty({ ...editedProperty, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateProperty = () => {
    if (editedProperty && editedProperty._id && typeof editedProperty._id === 'string') {
      const { _id, ...updatedFields } = editedProperty; // Se extrae _id para no incluirlo en los campos actualizados
      const updatedProperty = { _id, ...updatedFields }; // Se incluye _id nuevamente en el objeto actualizado
      dispatch(updateProperty({ _id: editedProperty._id, updatedProperty: updatedProperty }));
    } else {
      console.error("editedProperty no tiene el tipo o las propiedades correctas:", editedProperty);
    }
  };

  return (
    <div>
      {editedProperty && (
        <div>
          <input type="text" name="title" value={editedProperty.title} onChange={handleInputChange} />
          <input type="text" name="description" value={editedProperty.description} onChange={handleInputChange} />
          {/* Otros campos del formulario de edición */}
          <button onClick={handleUpdateProperty}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default EditProperty;