import * as React from "react"

export function CardCarousel({ images = [], autoplayDelay = 2000, showPagination = true, showNavigation = true }) {
  const [current, setCurrent] = React.useState(0)
  const timeoutRef = React.useRef(null)

  React.useEffect(() => {
    if (autoplayDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length)
      }, autoplayDelay)
      return () => clearTimeout(timeoutRef.current)
    }
  }, [current, autoplayDelay, images.length])

  if (!images.length) return null

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-xl min-h-[220px] bg-gradient-to-br from-[#181f36] to-[#151a28] border border-[#232946] rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500">
          <span className="text-4xl text-[#7F5AF0] mb-2">“</span>
          <p className="text-white text-lg md:text-xl font-medium whitespace-pre-line mb-4">{images[current].text.split('\n')[0]}</p>
          <div className="w-full flex justify-center">
            <span className="text-[#00FFC2] font-semibold text-base md:text-lg">{images[current].text.split('\n')[1]}</span>
          </div>
        </div>
      </div>
      {showPagination && (
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? 'bg-[#7F5AF0]' : 'bg-[#232946]'} transition-all`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      )}
      {showNavigation && (
        <div className="flex justify-between w-full max-w-xl mt-4 px-4">
          <button
            className="text-[#7F5AF0] hover:text-[#00FFC2] text-2xl font-bold"
            onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
            aria-label="Previous testimonial"
          >
            &#8592;
          </button>
          <button
            className="text-[#7F5AF0] hover:text-[#00FFC2] text-2xl font-bold"
            onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
            aria-label="Next testimonial"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  )
} 