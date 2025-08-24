import React, { useState, Suspense, lazy, useEffect } from 'react';
import AnimatedRoomBackground from '../Backgrounds/animations/AnimatedRoomBackground';

const Login = lazy(() => import('../components/auth/Login'));
const Registration = lazy(() => import('../components/auth/Registration'));

const images = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80', // second image
];

const Auth = () => {
  const [mode, setMode] = useState('login');
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % images.length);
    }, 5000); // change every 5s
    return () => clearInterval(id);
  }, []);

  // For bar animation
  const barWidths = [active === 0 ? 'w-16' : 'w-8', active === 1 ? 'w-16' : 'w-8'];
  const barOpacities = [active === 0 ? 'opacity-90' : 'opacity-50', active === 1 ? 'opacity-90' : 'opacity-50'];

  return (
    <div className="relative min-h-screen w-full ">
      {/* Animated room cards background */}
      <AnimatedRoomBackground />
      {/* Auth content overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-30">
        <div className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
          {/* Side image panel: two images crossfade + subtle zoom + left-to-right movement */}
          <div className="hidden md:flex md:w-1/2 relative h-140 overflow-hidden">
            {/* Background images with smooth animations */}
            <div className="absolute inset-0">
              {images.map((src, i) => (
                <div
                  key={i}
                  aria-hidden={active !== i}
                  className="absolute inset-0 bg-cover bg-center will-change-transform"
                  style={{
                    backgroundImage: `url('${src}')`,
                    opacity: active === i ? 1 : 0,
                    transform: active === i
                      ? 'scale(1.05)'
                      : 'scale(1.02)',
                    transition: 'all 2.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: active === i
                      ? 'brightness(1.05) contrast(1.02)'
                      : 'brightness(0.95) contrast(0.98)',
                    zIndex: active === i ? 2 : 1,
                  }}
                />
              ))}
            </div>

            {/* Static gradient overlays for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/70 via-gray-800/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/60 z-10" />

            {/* Content overlay - completely separate from animations */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white z-20">
              <div>
                <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md text-sm backdrop-blur-sm shadow-sm transition-colors duration-200">
                  Back to website →
                </button>
              </div>

              <div className="mb-6">
                <div className="font-bold text-2xl mb-6 drop-shadow-lg">AMU</div>
                <h3 className="text-white text-2xl font-semibold drop-shadow-md leading-relaxed">
                  Capturing Moments, Creating Memories
                </h3>

                {/* Progress bars */}
                <div className="mt-6 flex items-center space-x-3">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ease-out ${active === i
                        ? 'w-12 bg-white/90'
                        : 'w-6 bg-white/40'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Auth form panel with glossy glassmorphism */}
          <div className="bg-white/10 backdrop-blur-xl p-8 flex flex-col justify-center md:w-1/2 w-full border border-white/30 shadow-lg ">
            <div className="mb-4 text-center ">
              <div className="mb-6 text-center">
                <div className="relative inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20 shadow-lg">
                  {/* Animated background slider with glow effect */}
                  <div
                    className={`absolute top-1 bottom-1 bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-lg shadow-xl backdrop-blur-sm transition-all duration-500 ease-out ${mode === 'login'
                      ? 'left-1 w-[calc(50%-4px)]'
                      : 'left-[calc(50%+2px)] w-[calc(50%-4px)]'
                      }`}
                    style={{
                      boxShadow: mode === 'login'
                        ? '0 0 20px rgba(147, 51, 234, 0.3)'
                        : '0 0 20px rgba(59, 130, 246, 0.3)',
                    }}
                  />

                  {/* Subtle shine effect */}
                  <div
                    className={`absolute top-1 bottom-1 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg transition-all duration-500 ease-out ${mode === 'login'
                      ? 'left-1 w-[calc(50%-4px)]'
                      : 'left-[calc(50%+2px)] w-[calc(50%-4px)]'
                      }`}
                  />

                  {/* Login Button */}
                  <button
                    onClick={() => setMode('login')}
                    className={`relative z-10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ease-out transform ${mode === 'login'
                      ? 'text-white scale-105 drop-shadow-sm'
                      : 'text-gray-300 hover:text-white scale-100 hover:scale-[1.02]'
                      }`}
                    style={{
                      textShadow: mode === 'login' ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
                    }}
                  >
                    <span className={`transition-all duration-300 ${mode === 'login' ? 'font-bold' : 'font-semibold'}`}>
                      Login
                    </span>
                  </button>

                  {/* Registration Button */}
                  <button
                    onClick={() => setMode('register')}
                    className={`relative z-10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ease-out transform ${mode === 'register'
                      ? 'text-white scale-105 drop-shadow-sm'
                      : 'text-gray-300 hover:text-white scale-100 hover:scale-[1.02]'
                      }`}
                    style={{
                      textShadow: mode === 'register' ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
                    }}
                  >
                    <span className={`transition-all duration-300 ${mode === 'register' ? 'font-bold' : 'font-semibold'}`}>
                      Register
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <Suspense fallback={<div className="text-center text-gray-300">Loading...</div>}>
              {mode === 'login' ? <Login /> : <Registration />}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
