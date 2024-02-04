import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import { Property, PropertyState } from '../interfaces/propertyTypes';

const back = import.meta.env.VITE_REACT_APP_BACK;

// Define el estado inicial del slice
const initialState: PropertyState = {
  properties: [],
};

// Crea un slice de Redux con el nombre 'properties' y el estado inicial
const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // Define una acción 'setProperties' que actualiza la propiedad 'properties' del estado
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
    },
    addProperty: (state, action: PayloadAction<Property>) => {
      state.properties.push(action.payload);
    },
    editProperty: (state, action: PayloadAction<{ _id: string; updatedProperty: Property }>) => {
      const index = state.properties.findIndex(property => property._id === action.payload._id);
      if (index !== -1) {
        state.properties[index] = action.payload.updatedProperty;
      }
    },
    deleteProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(property => property._id !== action.payload);
    },
  },
});

// Exporta las acciones generadas automáticamente por createSlice
export const { setProperties, addProperty, editProperty, deleteProperty } = propertySlice.actions;


// Define un thunk para obtener las propiedades desde el servidor
export const getProperties = () => async (dispatch: AppDispatch) => {
  try {
    // Realiza una solicitud HTTP GET al servidor
    const response = await fetch(`${back}properties`);
    // Lee el cuerpo de la respuesta como texto
    const text = await response.text();
    console.log('Received data:', text);
    // Parsea el texto JSON en un objeto
    const data = JSON.parse(text);
    // Despacha la acción 'setProperties' con los datos obtenidos
    dispatch(setProperties(data));
  } catch (error) {
    console.error('Error fetching properties:', error);
  }
};

// Define un thunk para crear una nueva propiedad en el servidor
export const createProperty = (newProperty: Property) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${back}properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProperty),
    });
    const data = await response.json();
    dispatch(addProperty(data)); // Agrega la nueva propiedad al estado después de crearla en el servidor
  } catch (error) {
    console.error('Error creating property:', error);
  }
};

// Define un thunk para editar una propiedad existente en el servidor
export const updateProperty = (_id: string, updatedProperty: Property) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${back}properties/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProperty),
    });
    const data = await response.json();
    dispatch(editProperty({ _id, updatedProperty: data })); // Actualiza la propiedad en el estado después de editarla en el servidor
  } catch (error) {
    console.error('Error updating property:', error);
  }
};

// Define un thunk para eliminar una propiedad existente en el servidor
export const deletePropertyAsync = (_id: string) => async (dispatch: AppDispatch) => {
  try {
    await fetch(`${back}properties/${_id}`, {
      method: 'DELETE',
    });
    dispatch(deleteProperty(_id)); // Elimina la propiedad del estado después de eliminarla en el servidor
  } catch (error) {
    console.error('Error deleting property:', error);
  }
};


// Selector para acceder al estado de las properties
export const selectProperties = (state: RootState) => state.properties.properties;

export default propertySlice.reducer;
