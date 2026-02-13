'use client';

import { motion } from 'framer-motion';
import { GridImage, RoundConfig } from '@/types/game';
import ImageCard from './ImageCard';

interface ImageGridProps {
  images: GridImage[];
  config: RoundConfig;
  onImageClick: (imageId: string) => void;
  disabled: boolean;
}

export default function ImageGrid({ images, config, onImageClick, disabled }: ImageGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${config.gridCols}, 1fr)`,
        gap: config.gridCols <= 2 ? '12px' : config.gridCols === 3 ? '8px' : '6px',
      }}
    >
      {images.map((image, i) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.2 }}
        >
          <ImageCard
            image={image}
            onClick={onImageClick}
            disabled={disabled}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
