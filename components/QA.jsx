import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { useState } from "react";
import useCollapse from 'react-collapsed'; // TODO: This package cause safari display bug

const QA = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const toggleCollapse = (e) => {
    if (e.target.localName !== "a") {
      setIsExpanded((prev) => !prev)
    }
  }

  return (
    <div className="bg-invar-dark mb-2 py-4 px-6 rounded text-white cursor-pointer" {...getToggleProps({onClick: toggleCollapse})}>
      <div className="flex justify-between z-30">
        <p className="font-semibold">
          {question}
        </p>

        <div>
          {isExpanded ? (
            <MinusIcon className="w-6 ml-6" />
          ) : (
            <PlusIcon className="w-6 ml-6" />
          )}
        </div>
      </div>

      <div {...getCollapseProps()} className="mt-3 z-50 font-normal">
        {answer}
      </div>
    </div>
  )
};

export default QA;
