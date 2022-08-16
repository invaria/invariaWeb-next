import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { useEffect, useRef, useState } from "react";

// reference:
// https://medium.com/edonec/build-a-react-collapsible-component-from-scratch-using-react-hooks-typescript-73dfd02c9208

const QA = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(isExpanded ? undefined : 0);
  const ref = useRef(null);

  const toggleCollapse = (e) => {
    if (e.target.localName !== "a") {
      setIsExpanded((prev) => !prev)
    }
  }

  useEffect(() => {
    if (isExpanded) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isExpanded]);

  useEffect(() => {
    if (!height || !isExpanded || !ref.current) return undefined;

    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isExpanded]);

  return (
    <div
      className="bg-invar-dark mb-2 pt-4 py-1 px-6 rounded text-white cursor-pointer"
      onClick={toggleCollapse}
    >
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

      <div className="mt-3 z-50 font-normal collapsible" style={{ height }}>
        <div ref={ref}>
          <div className="pb-3">{answer}</div>
        </div>
      </div>
    </div>
  )
};

export default QA;
