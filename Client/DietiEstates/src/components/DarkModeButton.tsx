import {useState, useEffect} from 'react'

export const DarkModeButton = () => 
{
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    //Synchronize theme with local storage and DOM
    useEffect(() =>
    {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark')
        {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
        else
        {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    //Function that allow to change Dark/Light Mode. When Dark mode is on, prev is true,
    //when Dark mode is off, prev is false.

    const toggleTheme = () => 
    {
        setIsDarkMode((prev) => 
        {
          const newTheme = !prev;

          if (newTheme) 
          {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
          } 
          else
          {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
          }
          return newTheme;
        });
      };
    
      return (
        <div>
        </div>
      );
}