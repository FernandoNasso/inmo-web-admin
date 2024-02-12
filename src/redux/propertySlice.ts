import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import { Property, PropertyState } from '../interfaces/propertyTypes';

const back = import.meta.env.VITE_REACT_APP_BACK;

// Define el estado inicial del slice
const initialState: PropertyState = {
  properties: [],
};

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
export const updateProperty = createAsyncThunk(
  'properties/updateProperty',
  async ({ _id, updatedProperty }: { _id: string; updatedProperty: Property }) => {
    try {
      const response = await fetch(`${back}properties/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty),
      });
      console.log("respuesta del servidor:", response);
      const data = await response.json();
      console.log("Data recibida del server:", data)
      return data; // Devuelve los datos recibidos del servidor como resultado exitoso
    } catch (error) {
      console.error('Error updating property:', error);
      throw error; // Lanza el error para manejarlo en el bloque catch del thunk
    }
  }
);

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
    deleteProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(property => property._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProperty.fulfilled, (state, action) => {
      const { _id, updatedProperty } = action.payload;
      const index = state.properties.findIndex(property => property._id === _id);
      if (index !== -1) {
        state.properties[index] = updatedProperty;
      }
    });
  },
});

// Exporta las acciones generadas automáticamente por createSlice
export const { setProperties, addProperty, deleteProperty } = propertySlice.actions;


// Selector para acceder al estado de las properties
export const selectProperties = (state: RootState) => state.properties.properties;

export default propertySlice.reducer;
