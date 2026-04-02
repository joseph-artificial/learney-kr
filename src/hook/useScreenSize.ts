import { useCallback, useEffect, useState } from 'react';

export type deviceType = 'pc' | 'mobile' | 'tab';
interface ScreenSize {
    width: number;
    height: number;
    device: deviceType;
}

const useScreenSize = () => {
    const isClient = typeof window === 'object';

    const getSize = useCallback((): ScreenSize => {
        return {
            width: isClient ? window.innerWidth : 0,
            height: isClient ? window.innerHeight : 0,
            device: 'pc',
        };
    }, [isClient]);

    const [screenSize, setScreenSize] = useState<ScreenSize>(getSize);
    useEffect(() => {
        if (!isClient) return;

        const handleResize = () => setScreenSize(getSize());

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [getSize, isClient]);

    const device: deviceType =
        screenSize.width < 768
            ? 'mobile'
            : screenSize.width < 1200
                ? 'tab'
                : 'pc';

    return { ...screenSize, device };
};
export const display = {
    mobile: {
        display: ['inherit', 'none'],
    },
    pc: {
        display: ['none', 'inherit'],
    },
};
export default useScreenSize;
