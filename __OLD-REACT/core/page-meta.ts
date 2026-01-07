export function getFormattedTitle(title: string) {
  return `${title} | OCTAHEDRON.WORLD`;
}

const colors: Record<string, string> = {
  red: '#931f1f',
  orange: '#93501f',
  tan: '#936c1f',
  yellow: '#93931e',
  lime: '#6d9320',
  olive: '#4f9420',
  green: '#1f9320',
  wood: '#1f934f',
  cyan: '#1f937f',
  sky: '#205993',
  blue: '#1f1f93',
  violet: '#591f94',
  purple: '#931f76',
  carmine: '#931f50',
  original: '#1f8a93',
};

export function getThemeColor(colorName?: string) {
  return colors[colorName || 'original'] || colors.original;
}
