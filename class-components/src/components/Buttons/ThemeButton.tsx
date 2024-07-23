import { useContext } from 'react';
import { ThemeContext, ThemeUpdate } from '../../context/ThemeContext';

export function ThemeButton() {
  const darkTheme = useContext(ThemeContext);
  const toggleTheme = useContext(ThemeUpdate);
  return (
    <>
      <span className="theme-button-name"> Dark Theme</span>
      <div className="theme-button-container" onClick={toggleTheme.updater}>
        <div
          className={darkTheme.darkTheme ? 'theme-button-dark' : 'theme-button'}
        ></div>
      </div>
    </>
  );
}
