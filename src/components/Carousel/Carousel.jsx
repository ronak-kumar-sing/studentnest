/*
  Installed from https://reactbits.dev/tailwind/
*/

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
// replace icons with your own if needed
import {
  FiCircle,
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
} from 'react-icons/fi';

const DEFAULT_ITEMS = [
  {
    title: 'Premium Accommodations',
    description: 'Luxury student housing near top universities.',
    id: 1,
    image: 'https://images.unsplash.com/photo-1473893604213-3df9c15611c0?q=80&w=800&h=600&fit=crop&crop=center&auto=format&dpr=2',
  },
  {
    title: 'Modern Amenities',
    description: 'Fully furnished rooms with high-speed WiFi.',
    id: 2,
    image: 'https://images.unsplash.com/photo-1438954936179-786078772609?q=80&w=800&h=600&fit=crop&crop=center&auto=format&dpr=2',
  },
  {
    title: 'Safe & Secure',
    description: '24/7 security and verified property owners.',
    id: 3,
    image: 'https://images.unsplash.com/photo-1498409505433-aff66f7ba9e6?q=80&w=800&h=600&fit=crop&crop=center&auto=format&dpr=2',
  },
  {
    title: 'University Proximity',
    description: 'Walking distance to campus and libraries.',
    id: 4,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&h=600&fit=crop&crop=center&auto=format&dpr=2',
  },
  {
    title: 'Community Living',
    description: 'Connect with fellow students and make friends.',
    id: 5,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&h=600&fit=crop&crop=center&auto=format&dpr=2',
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  cardHeight = 280,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * (carouselItems.length - 1),
        right: 0,
      },
    };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${round
        ? 'rounded-full border border-white'
        : 'rounded-[24px] border border-[#222]'
        }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 ${round
                ? 'flex items-center justify-center text-center bg-[#060010] border-0'
                : 'bg-[#222] border border-[#222] rounded-[12px]'
                } overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : cardHeight,
                rotateY: rotateY,
                ...(round && { borderRadius: '50%' }),
              }}
              transition={effectiveTransition}
            >
              {/* Full background image */}
              {item.image && !round && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onLoad={(e) => {
                      console.log('Image loaded successfully:', item.image);
                      e.target.style.opacity = '1';
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', item.image);
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      e.target.parentElement.innerHTML = `<div class="flex items-center justify-center h-full text-white font-semibold">${item.title}</div>`;
                    }}
                    style={{ opacity: '0', transition: 'opacity 0.3s ease' }}
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0  bg-opacity-100"></div>
                </div>
              )}

              {/* Content overlay */}
              <div className={`relative z-10 w-full h-full flex flex-col justify-end ${round ? 'p-0 m-0 items-center justify-center' : 'p-5'}`}>
                <div>
                  <div className="mb-1 font-black text-lg text-white drop-shadow-lg">
                    {item.title}
                  </div>
                  <p className="text-sm text-white drop-shadow-md opacity-90">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div
        className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''
          }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${currentIndex % items.length === index
                ? round
                  ? 'bg-white'
                  : 'bg-[#333333]'
                : round
                  ? 'bg-[#555]'
                  : 'bg-[rgba(51,51,51,0.4)]'
                }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
