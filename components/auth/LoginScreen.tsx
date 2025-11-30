import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const { isDarkMode } = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className={`min-h-screen w-full lg:flex lg:items-center lg:justify-center lg:px-4 lg:py-8 font-sans transition-colors ${
      isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
    }`}>
      
      {/* Desktop: Centered White Box | Mobile: Full Screen Layout */}
      <div className={`w-full lg:max-w-5xl lg:rounded-xl lg:shadow-lg lg:overflow-hidden min-h-screen lg:min-h-[600px] transition-colors ${
        isDarkMode ? 'lg:bg-[#1a1a2e]' : 'lg:bg-white'
      }`}>
        <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-[600px]">
          
          {/* Top (Mobile) / Left (Desktop): Welcome Section with Violet Background */}
          <div className="w-full lg:w-1/2 relative overflow-hidden violet-gradient flex flex-col items-center justify-center p-8 lg:p-12 min-h-[40vh] lg:min-h-full">
            {/* Violet Depth Background Effects */}
            <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-purple-400 rounded-full blur-[120px] opacity-20 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-pink-400 rounded-full blur-[100px] opacity-15" />
            <div className="absolute top-[40%] right-[20%] w-[200px] h-[200px] bg-violet-400 rounded-full blur-[80px] opacity-10" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Logo */}
              <div className="w-28 h-28 bg-white/15 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl shadow-black/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <GraduationCap className="w-14 h-14 text-white drop-shadow-lg" />
              </div>
              
              {/* Welcome Text */}
              <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-md">KonSens'e Hoşgeldin</h1>
            </div>
          </div>

          {/* Bottom (Mobile) / Right (Desktop): Login/Register Form */}
          <div className={`w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 flex-1 transition-colors ${
            isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
          }`}>
            <div className="w-full max-w-md">
              <div className="mb-6 lg:mb-8">
                <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                  {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                </h3>
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                  {isRegister ? 'Yeni hesap oluştur ve başla' : 'Hesabına giriş yaparak devam et'}
                </p>
              </div>

              {/* Form */}
              <div className="w-full space-y-3 lg:space-y-4 mb-6">
                {isRegister && (
                  <>
                    <div className="group relative">
                      <input 
                        type="text" 
                        placeholder="Ad Soyad"
                        className={`w-full h-14 px-5 rounded-xl border-2 border-transparent transition-all focus:outline-none focus:border-[#5852c4] ${
                          isDarkMode 
                            ? 'bg-slate-800 text-white placeholder:text-slate-400 focus:bg-slate-700' 
                            : 'bg-[#f2f3f7] text-[#19142e] placeholder:text-[#8279a5] focus:bg-white'
                        }`}
                      />
                    </div>
                    <div className="group relative">
                      <input 
                        type="text" 
                        placeholder="Üniversite"
                        className={`w-full h-14 px-5 rounded-xl border-2 border-transparent transition-all focus:outline-none focus:border-[#5852c4] ${
                          isDarkMode 
                            ? 'bg-slate-800 text-white placeholder:text-slate-400 focus:bg-slate-700' 
                            : 'bg-[#f2f3f7] text-[#19142e] placeholder:text-[#8279a5] focus:bg-white'
                        }`}
                      />
                    </div>
                  </>
                )}
                
                <div className="group relative">
                  <input 
                    type="email" 
                    placeholder="Öğrenci E-postası (.edu)"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={`w-full h-14 px-5 rounded-xl border-2 transition-all focus:outline-none focus:border-[#5852c4] ${
                      error ? 'border-red-500' : 'border-transparent'
                    } ${
                      isDarkMode 
                        ? 'bg-slate-800 text-white placeholder:text-slate-400 focus:bg-slate-700' 
                        : 'bg-[#f2f3f7] text-[#19142e] placeholder:text-[#8279a5] focus:bg-white'
                    }`}
                  />
                </div>
                <div className="group relative">
                  <input 
                    type="password" 
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className={`w-full h-14 px-5 rounded-xl border-2 border-transparent transition-all focus:outline-none focus:border-[#5852c4] ${
                      isDarkMode 
                        ? 'bg-slate-800 text-white placeholder:text-slate-400 focus:bg-slate-700' 
                        : 'bg-[#f2f3f7] text-[#19142e] placeholder:text-[#8279a5] focus:bg-white'
                    }`}
                  />
                </div>
                
                {isRegister && (
                  <div className="group relative">
                    <input 
                      type="password" 
                      placeholder="Şifre Tekrar"
                      className={`w-full h-14 px-5 rounded-xl border-2 border-transparent transition-all focus:outline-none focus:border-[#5852c4] ${
                        isDarkMode 
                          ? 'bg-slate-800 text-white placeholder:text-slate-400 focus:bg-slate-700' 
                          : 'bg-[#f2f3f7] text-[#19142e] placeholder:text-[#8279a5] focus:bg-white'
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl">
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Auto-fill Demo Credentials Button (Only in Login Mode) */}
              {!isRegister && (
                <button
                  onClick={() => {
                    setEmail('student@selcuk.edu.tr');
                    setPassword('KonSens2024');
                    setError('');
                  }}
                  className={`mb-3 w-full h-10 rounded-lg font-semibold border-2 border-dashed flex items-center justify-center gap-2 active:scale-[0.98] transition-all ${
                    isDarkMode 
                      ? 'bg-slate-800/50 text-slate-300 border-slate-600 hover:bg-slate-700' 
                      : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  <span className="text-xs">⚡ Demo Hesap Doldur</span>
                </button>
              )}

              {/* Actions */}
              <div className="w-full space-y-3">
                <button 
                  onClick={() => {
                    // Mock credentials: student@selcuk.edu.tr / KonSens2024
                    if (!email.includes('.edu')) {
                      setError('Lütfen .edu uzantılı bir e-posta adresi kullanın');
                      return;
                    }
                    
                    if (!isRegister) {
                      // Login validation
                      if (email === 'student@selcuk.edu.tr' && password === 'KonSens2024') {
                        onLogin();
                      } else {
                        setError('E-posta veya şifre hatalı');
                      }
                    } else {
                      // Register - just check .edu
                      // Create user object in localStorage
                      const userData = {
                        email,
                        name: email.split('@')[0], // Use email prefix as name
                        registeredAt: new Date().toISOString(),
                      };
                      localStorage.setItem('user', JSON.stringify(userData));
                      
                      // CRITICAL: Set flag to show welcome animation
                      localStorage.setItem('showWelcomeAnimation', 'true');
                      
                      // Redirect to dashboard
                      onLogin();
                    }
                  }}
                  className="w-full h-12 lg:h-14 rounded-xl bg-[#5852c4] text-white font-bold shadow-lg shadow-[#5852c4]/30 active:scale-[0.98] transition-all hover:bg-[#6c5ce7]"
                >
                  {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
                
                <button className={`w-full h-12 lg:h-14 rounded-xl font-semibold border-2 flex items-center justify-center gap-3 active:scale-[0.98] transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' 
                    : 'bg-white text-[#19142e] border-[#ededff] hover:bg-[#f2f3f7]'
                }`}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  Google ile Devam Et
                </button>
              </div>

              <div className="mt-6 lg:mt-8 text-center">
                <button 
                  onClick={() => setIsRegister(!isRegister)}
                  className={`text-sm font-semibold hover:text-[#5852c4] transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                  }`}
                >
                  {isRegister ? (
                    <>Zaten hesabın var mı? <span className="text-[#5852c4] font-bold hover:underline ml-1">Giriş Yap</span></>
                  ) : (
                    <>Hesabın yok mu? <span className="text-[#5852c4] font-bold hover:underline ml-1">Kayıt Ol</span></>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
