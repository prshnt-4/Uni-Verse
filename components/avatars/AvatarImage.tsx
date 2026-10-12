'use client';

import React, { useEffect, useState } from 'react';

interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
}

export function AvatarImage({ src, alt, className = '', fallback }: AvatarImageProps) {
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setHasFailed(false);
  }, [src]);

  if (hasFailed) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasFailed(true)}
    />
  );
}
