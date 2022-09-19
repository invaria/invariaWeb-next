import { ArrowUpIcon } from '@heroicons/react/outline'
import { useEffect, useState } from "react"

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const checkShowButton = () => {
    setShowButton(window.pageYOffset > 300);
  }

  useEffect(() => {
    checkShowButton();
    window.addEventListener("scroll", checkShowButton);
  }, []);

  return (
    <div
      className={`${showButton ? 'visible opacity-100': 'invisible opacity-0'} fixed bottom-7 right-7 inline-block p-2 bg-invar-dark rounded text-white cursor-pointer z-50 transition-all duration-200`}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="w-6" />
    </div>
  )
}

export default ScrollToTop
