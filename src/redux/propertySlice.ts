// propertySlice.ts
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
  },
});

// Exporta las acciones generadas automáticamente por createSlice
export const { setProperties } = propertySlice.actions;

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

// Selector para acceder al estado de las properties
export const selectProperties = (state: RootState) => state.properties.properties;

export default propertySlice.reducer;
