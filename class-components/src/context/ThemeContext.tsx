import React, { useState } from 'react';

const initialTheme: ThemeState = {
  darkTheme: false,
};

export interface ThemeState {
  darkTheme: boolean;
}

interface ContextProps {
  children: React.ReactNode;
}

interface ThemeUpdater {
  updater: () => void;
}

const initialUpdater = {
  updater: () => {},
};
export const ThemeContext = React.createContext<ThemeState>(initialTheme);
export const ThemeUpdate = React.createContext<ThemeUpdater>(initialUpdater);

export const ThemeProvider = (props: ContextProps) => {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleDarkTheme() {
    if (darkTheme) {
      setDarkTheme(false);
    } else {
      setDarkTheme(true);
    }
  }

  return (
    <ThemeContext.Provider value={{ darkTheme }}>
      <ThemeUpdate.Provider value={{ updater: toggleDarkTheme }}>
        {props.children}
      </ThemeUpdate.Provider>
    </ThemeContext.Provider>
  );
};
