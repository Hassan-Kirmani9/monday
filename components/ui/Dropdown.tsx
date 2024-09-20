import { ArrowDown } from 'lucide-react';
import { ReactNode, useState } from 'react';


interface DropdownProps {
    children: ReactNode; 
  }

const Dropdown : React.FC<DropdownProps>= ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 bg-gray-200 rounded border border-gray-300"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
