export type AvatarCategory = 'regular' | 'anime' | 'japanese-anime';

export interface Avatar {
  id: string;
  src: string;
  category: AvatarCategory;
  alt: string;
}

export const AVATAR_CATEGORIES: {
  id: AvatarCategory;
  label: string;
}[] = [
  { id: 'regular', label: 'Regular' },
  { id: 'anime', label: 'Anime Style' },
  { id: 'japanese-anime', label: 'Japanese Anime' },
];

function createAvatarPack(
  category: AvatarCategory,
  filePrefix: string,
  altPrefix: string,
): Avatar[] {
  return Array.from({ length: 48 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    const filename = `${filePrefix}${number}.jpg`;

    return {
      id: `${category}-${number}`,
      src: `/avatars/${category}/${filename}`,
      category,
      alt: `${altPrefix} avatar ${index + 1}`,
    };
  });
}

export const AVATARS: Avatar[] = [
  ...createAvatarPack('regular', 'avatar-', 'Regular profile'),
  ...createAvatarPack('anime', 'anime-avatar-', 'Anime-style profile'),
  ...createAvatarPack('japanese-anime', 'anime-character-', 'Japanese anime character'),
];

export function getAvatarsByCategory(category: AvatarCategory): Avatar[] {
  return AVATARS.filter((avatar) => avatar.category === category);
}

export function getAvatarById(id: string): Avatar {
  const avatar = AVATARS.find((item) => item.id === id);
  if (!avatar) {
    throw new Error(`Unknown avatar id: ${id}`);
  }
  return avatar;
}
