import React from 'react';

const FirebaseContext = React.createContext();
const FirebaseProvider = FirebaseContext.Provider;
const FirebaseConsumer = FirebaseContext.Consumer;

export { FirebaseContext, FirebaseProvider, FirebaseConsumer };