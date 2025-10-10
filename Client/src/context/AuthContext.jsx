import React, { createContext, useContext, useEffect, useState } from 'react'; // changed: removed unused Children import

const AuthContext = createContext(null); // unchanged

export const AuthProvider = ({ children }) => { // changed: use lowercase children prop
    const API_URL = import.meta.env.VITE_BACKEND_URL; // unchanged
    const [user, setUser] = useState(null); // unchanged
    const [loading, setLoading] = useState(true); // unchanged

    useEffect(() => { // unchanged: hydrate from /me on load
        (async () => {
            try {
                const res = await fetch(`${API_URL}/me`, { credentials: 'include' }); // unchanged
                if (res.ok) {
                    const data = await res.json(); // unchanged
                    setUser(data.user); // unchanged
                } else {
                    setUser(null); // unchanged
                }
            } catch {
                setUser(null); // unchanged
            } finally {
                setLoading(false); // unchanged
            }
        })();
    }, [API_URL]); // changed: add missing semicolon


    const login = async (email, password) => { // unchanged name/signature
        const res = await fetch(`${API_URL}/login`, { // unchanged url
            method: 'POST', // changed: method must be a string
            headers: { 'Content-Type': 'application/json' }, // added: content type header
            credentials: 'include', // unchanged: include cookie
            body: JSON.stringify({ email, password }) // unchanged
        });
        if (!res.ok) throw new Error('Login failed'); // unchanged
        // fetch fresh user after login
        const me = await fetch(`${API_URL}/me`, { credentials: 'include' }); // unchanged
        if (me.ok) {
            const data = await me.json(); // unchanged
            setUser(data.user); // unchanged
        }
        return true; // unchanged
    };

    
    const logout = async () => { // unchanged
        await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' }); // unchanged
        setUser(null); // unchanged
    };
    
    return ( // unchanged
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}> {/* changed: still the same value */}
          {children} {/* changed: render lowercase children */}
        </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext); // unchanged