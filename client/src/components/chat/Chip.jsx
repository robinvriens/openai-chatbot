import { useState } from 'react';

export default function Chip({ active, onChipClick, children }) {
    //const [isActive, setIsActive] = useState(active);

    function toggleActive() {
        setIsActive(!isActive);
    }

    return (
        <div onClick={onChipClick} className={`w-auto items-center justify-center px-4 rounded-2xl ${active ? 'bg-blue-500' : 'bg-gray-500'} text-white cursor-pointer`}>
            {children}
        </div>
    );
}