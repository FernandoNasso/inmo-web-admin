export interface Property {
    _id: string;
    title: string;
    description: string;
    price: string;
}

export interface PropertyState {
    properties: Property[];
  }