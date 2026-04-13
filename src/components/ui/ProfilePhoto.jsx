import React from 'react';
import profileImg from '../../assets/profile.webp';

const sizeMap = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-56 h-56',
};

const ProfilePhoto = ({ mode = 'placeholder', size = 'md', className = '' }) => {
  const sizeClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-block ${className}`}>
      {mode === 'photo' && profileImg ? (
        <img
          src={profileImg}
          alt="Arman Khan"
          className={`${sizeClass} rounded-2xl object-cover ring-2 ring-white/10`}
        />
      ) : (
        <div
          className={`${sizeClass} rounded-2xl ring-2 ring-white/10 bg-gradient-to-br from-accent to-accent2 flex items-center justify-center`}
        >
          <span className="font-display text-4xl font-extrabold text-white select-none">
            AK
          </span>
        </div>
      )}

      {/* Availability badge */}
      <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-tertiary border border-[var(--border)] text-xs text-text-secondary shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-accent3 pulse-dot flex-shrink-0" />
        <span className="font-medium text-accent3">Available</span>
      </div>
    </div>
  );
};

export default ProfilePhoto;
