import { useContext } from 'react';
import { ThemeContext, ThemeUpdate } from '../../context/ThemeContext';

export function ThemeButton() {
  const darkTheme = useContext(ThemeContext);
  const toggleTheme = useContext(ThemeUpdate);
  return (
    <>
      <span className="theme-button-name"> Dark Theme</span>
      <div
        data-testid="theme-button"
        className="theme-button-container"
        onClick={toggleTheme.updater}
      >
        <div
          data-testid="theme-button-dark"
          className={darkTheme.darkTheme ? 'theme-button-dark' : 'theme-button'}
        ></div>
      </div>
    </>
  );
}
