import { useState, useEffect } from 'react';

/**
 * Custom hook that tracks the state of a media query.
 * @param query The media query string to track (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        // Set initial state
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        // Define listener
        const listener = () => setMatches(media.matches);

        // Add listener
        // Use addEventListener if supported, fallback to addListener for older browsers
        if (media.addEventListener) {
            media.addEventListener('change', listener);
        } else {
            media.addListener(listener);
        }

        // Clean up
        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', listener);
            } else {
                media.removeListener(listener);
            }
        };
    }, [query, matches]);

    return matches;
}
