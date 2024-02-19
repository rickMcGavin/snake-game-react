import { useEffect } from 'react';
import { Direction } from '../types';

interface UseSwipeProps {
    directionRef: React.MutableRefObject<Direction>;
    isActive: boolean;
}

const useSwipe = ({ directionRef, isActive }: UseSwipeProps) => {

    useEffect(() => {
        if (!isActive) return;

        let touchStartX: number = 0;
        let touchStartY: number = 0;
        let touchEndX: number = 0;
        let touchEndY: number = 0;

        const handleTouchStart = (event: TouchEvent) => {
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        };

        const handleTouchMove = (event: TouchEvent) => {
            touchEndX = event.touches[0].clientX;
            touchEndY = event.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            const xDiff = touchStartX - touchEndX;
            const yDiff = touchStartY - touchEndY;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                // Left or Right swipe
                directionRef.current = xDiff > 0 ? Direction.Left : Direction.Right;
            } else {
                // Up or Down swipe
                directionRef.current = yDiff > 0 ? Direction.Up : Direction.Down;
            }
        };

        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [directionRef, isActive]);

    return directionRef;
};

export default useSwipe;