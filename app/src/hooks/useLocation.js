import {useState, useEffect} from 'react';

export const useLocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const handleChange = () => {
            window.addEventListener('popstate', function(){
                console.log('hello');
                setLocation(window.location.href);
            });
        }
    
        return () => window.removeEventListener('popstate', handleChange);
    }, []);

    return location;
}