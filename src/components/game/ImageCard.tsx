'use client';

import { motion } from 'framer-motion';
import { GridImage } from '@/types/game';

interface ImageCardProps {
  image: GridImage;
  onClick: (imageId: string) => void;
  disabled: boolean;
}

export default function ImageCard({ image, onClick, disabled }: ImageCardProps) {
  const getBorderClass = () => {
    if (!image.selected && !image.revealed) return 'border-white/10 hover:border-white/30';
    if (image.selected && image.isAI) return 'border-danger ring-2 ring-danger/50';
    if (image.selected && !image.isAI) return 'border-success ring-2 ring-success/50';
    if (image.revealed && image.isAI) return 'border-warning ring-2 ring-warning/50';
    if (image.revealed && !image.isAI) return 'border-white/20';
    return 'border-white/10';
  };

  const getOverlay = () => {
    if (!image.revealed) return null;

    if (image.isAI) {
      return (
        <div className="absolute inset-0 bg-danger/20 flex items-center justify-center rounded-lg">
          <span className="bg-danger text-white text-xs font-bold px-2 py-1 rounded">AI</span>
        </div>
      );
    }
    return (
      <div className="absolute inset-0 bg-success/10 flex items-center justify-center rounded-lg">
        <span className="bg-success/80 text-white text-xs font-bold px-2 py-1 rounded">REAL</span>
      </div>
    );
  };

  return (
    <motion.button
      whileHover={!disabled && !image.revealed ? { scale: 1.03 } : undefined}
      whileTap={!disabled && !image.revealed ? { scale: 0.97 } : undefined}
      animate={
        image.selected && !image.isAI && image.revealed
          ? {}
          : image.selected && !image.revealed
            ? { x: [0, -4, 4, -4, 0] }
            : {}
      }
      transition={{ duration: 0.3 }}
      onClick={() => !disabled && !image.revealed && onClick(image.id)}
      disabled={disabled || image.revealed}
      className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all duration-200 ${getBorderClass()} ${
        disabled || image.revealed ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt="game image"
        className="w-full h-full object-cover"
        draggable={false}
      />
      {getOverlay()}
    </motion.button>
  );
}
