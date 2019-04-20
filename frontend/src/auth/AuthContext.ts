import React from 'react';
import Auth from './Auth';

export const auth = new Auth();

const AuthContext = React.createContext(auth);
export const AuthProvider = AuthContext.Provider;
export default AuthContext;
