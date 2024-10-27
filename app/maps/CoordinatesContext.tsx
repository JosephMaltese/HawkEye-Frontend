// // CoordinatesContext.tsx
// import React, { createContext, useState, ReactNode } from 'react';

// export type Coordinate = {
//   latitude: number;
//   longitude: number;
//   address?: string;
// };

// type CoordinatesContextType = {
//   coordinates: Coordinate[];
//   addCoordinate: (coord: Coordinate) => void;
//   removeCoordinate: (index: number) => void;
// };

// export const CoordinatesContext = createContext<CoordinatesContextType | undefined>(undefined);

// export const CoordinatesProvider = ({ children }: { children: ReactNode }) => {
//   const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

//   const addCoordinate = (coord: Coordinate) => {
//     setCoordinates(prevCoords => [...prevCoords, coord]);
//   };

//   const removeCoordinate = (index: number) => {
//     setCoordinates(prevCoords => prevCoords.filter((_, i) => i !== index));
//   };

//   return (
//     <CoordinatesContext.Provider value={{ coordinates, addCoordinate, removeCoordinate }}>
//       {children}
//     </CoordinatesContext.Provider>
//   );
// };








// import React, { createContext, useState, ReactNode } from 'react';

// export type Coordinate = {
//   latitude: number;
//   longitude: number;
//   address?: string;
// };

// type CoordinatesContextType = {
//   coordinates: Coordinate[];
//   addCoordinate: (coordinate: Coordinate) => void;
//   deleteCoordinate: (index: number) => void;
//   setCoordinates: (coordinates: Coordinate[]) => void;
// };

// export const CoordinatesContext = createContext<CoordinatesContextType | undefined>(undefined);

// export const CoordinatesProvider = ({ children }: { children: ReactNode }) => {
//   const [coordinates, setCoordinatesState] = useState<Coordinate[]>([]);

//   const addCoordinate = (coordinate: Coordinate) => {
//     setCoordinatesState(prevCoordinates => [...prevCoordinates, coordinate]);
//   };

//   const deleteCoordinate = (index: number) => {
//     setCoordinatesState(prevCoordinates => prevCoordinates.filter((_, i) => i !== index));
//   };

//   const setCoordinates = (coordinates: Coordinate[]) => {
//     setCoordinatesState(coordinates);
//   };

//   return (
//     <CoordinatesContext.Provider value={{ coordinates, addCoordinate, deleteCoordinate, setCoordinates }}>
//       {children}
//     </CoordinatesContext.Provider>
//   );
// };











// import React, { createContext, useState, ReactNode } from 'react';

// export type Coordinate = {
//   latitude: number;
//   longitude: number;
//   address?: string;
// };

// type CoordinatesContextType = {
//   coordinates: Coordinate[];
//   addCoordinate: (coordinate: Coordinate) => void;
//   deleteCoordinate: (index: number) => void;
//   setCoordinates: (coordinates: Coordinate[]) => void;
// };

// export const CoordinatesContext = createContext<CoordinatesContextType | undefined>(undefined);

// export const CoordinatesProvider = ({ children }: { children: ReactNode }) => {
//   const [coordinates, setCoordinatesState] = useState<Coordinate[]>([]);

//   const addCoordinate = (coordinate: Coordinate) => {
//     setCoordinatesState(prevCoordinates => [...prevCoordinates, coordinate]);
//   };

//   const deleteCoordinate = (index: number) => {
//     setCoordinatesState(prevCoordinates => prevCoordinates.filter((_, i) => i !== index));
//   };

//   const setCoordinates = (coordinates: Coordinate[]) => {
//     setCoordinatesState(coordinates);
//   };

//   return (
//     <CoordinatesContext.Provider value={{ coordinates, addCoordinate, deleteCoordinate, setCoordinates }}>
//       {children}
//     </CoordinatesContext.Provider>
//   );
// };






import React, { createContext, useState, ReactNode } from 'react';

export type Coordinate = {
  latitude: number;
  longitude: number;
  address?: string;
};

type CoordinatesContextType = {
  coordinates: Coordinate[];
  addCoordinate: (coordinate: Coordinate) => void;
  deleteCoordinate: (index: number) => void;
  setCoordinates: (coordinates: Coordinate[]) => void;
};

export const CoordinatesContext = createContext<CoordinatesContextType | undefined>(undefined);

export const CoordinatesProvider = ({ children }: { children: ReactNode }) => {
  const [coordinates, setCoordinatesState] = useState<Coordinate[]>([]);

  const addCoordinate = (coordinate: Coordinate) => {
    setCoordinatesState(prevCoordinates => [...prevCoordinates, coordinate]);
  };

  const deleteCoordinate = (index: number) => {
    setCoordinatesState(prevCoordinates => prevCoordinates.filter((_, i) => i !== index));
  };

  const setCoordinates = (coordinates: Coordinate[]) => {
    setCoordinatesState(coordinates);
  };

  return (
    <CoordinatesContext.Provider value={{ coordinates, addCoordinate, deleteCoordinate, setCoordinates }}>
      {children}
    </CoordinatesContext.Provider>
  );
}