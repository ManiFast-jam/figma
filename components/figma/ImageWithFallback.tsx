import React, { useState, ImgHTMLAttributes } from 'react';

interface ImageWithFallbackProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      }
    }
  };

  // If error and no fallback, show a simple placeholder div
  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        {...(props as any)}
      >
        <span className="text-gray-400 text-xs">Image</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};
