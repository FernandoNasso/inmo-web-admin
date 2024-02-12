export interface Property {
    _id: string;
    title: string;
    description: string;
}

export interface PropertyState {
    properties: Property[];
  }