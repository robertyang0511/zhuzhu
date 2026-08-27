/**
 * 角色头像配置（SVG + Emoji，无版权素材）
 */
const HERO_AVATARS = {
  sam: { emoji: '👄', color: '#e67e22', label: '山姆' },
  rambo: { emoji: '🔫', color: '#00bcd4', label: '兰博' },
  kan: { emoji: '🧙', color: '#9b59b6', label: '老侃' },
  butcher: { emoji: '🤖', color: '#607d8b', label: '屠夫' },
  michelle: { emoji: '❄️', color: '#74b9ff', label: '蜜雪儿' },
  chiyo: { emoji: '🥷', color: '#e84393', label: '千代' },
  emperor: { emoji: '👑', color: '#fdcb6e', label: '大帝' },
  fighter: { emoji: '🛡️', color: '#0984e3', label: '斗士' },
  'immortal-joe': { emoji: '☠️', color: '#636e72', label: '老乔' },
  'loyal-li': { emoji: '⚔️', color: '#d35400', label: '李忠诚' },
  'professor-lei': { emoji: '⚡', color: '#f39c12', label: '雷教授' },
  dragon: { emoji: '🐉', color: '#27ae60', label: '一龙' },
  mia: { emoji: '💚', color: '#2ecc71', label: '米娅' },
  jason: { emoji: '🔥', color: '#e74c3c', label: '杰森' },
  'red-leg': { emoji: '🦵', color: '#c0392b', label: '腿魔' },
  'father-oma': { emoji: '✝️', color: '#f1c40f', label: '欧玛' },
  terminator: { emoji: '💀', color: '#34495e', label: '终结者' },
  hook: { emoji: '🪝', color: '#7f8c8d', label: '钩子' },
  twins: { emoji: '🔍', color: '#00cec9', label: '双子星' },
  loli: { emoji: '👧', color: '#fd79a8', label: '萝莉' },
  'blind-monk': { emoji: '👊', color: '#6c5ce7', label: '盲僧' },
  'xiao-bu': { emoji: '⚡', color: '#00b894', label: '小布' },
};

const RARITY_RING = {
  红: '#ff6b6b',
  橙: '#ffb347',
  紫: '#b197fc',
};

function getHeroAvatar(id, rarity, size) {
  const cfg = HERO_AVATARS[id] || { emoji: '👤', color: '#00d4ff', label: '?' };
  const ring = RARITY_RING[rarity] || '#00d4ff';
  const s = size || 48;
  const fontSize = Math.round(s * 0.45);
  return `<div class="hero-avatar" style="width:${s}px;height:${s}px;background:linear-gradient(135deg,${cfg.color},${ring}88)" aria-label="${cfg.label}">
    <span class="hero-avatar-emoji" style="font-size:${fontSize}px">${cfg.emoji}</span>
    <span class="hero-avatar-ring" style="border-color:${ring}"></span>
  </div>`;
}

function getHeroAvatarByName(name, size) {
  const heroes = typeof GAME_DATA !== 'undefined' ? GAME_DATA.heroes : [];
  let hero = heroes.find((h) => h.name === name);
  if (!hero) hero = heroes.find((h) => name.includes(h.name) || h.name.includes(name.split('/')[0]));
  if (!hero) {
    const aliases = {
      懂王: 'emperor', 大帝: 'emperor', 北境大帝: 'emperor',
      雾隐千代: 'chiyo', 千代: 'chiyo',
      老乔: 'immortal-joe', 永生老乔: 'immortal-joe',
      铁僧: 'blind-monk', 盲僧: 'blind-monk',
      小丑: 'butcher', 摩托: 'jason',
      绿魔: 'red-leg', 腿魔: 'red-leg',
      海王: 'emperor', 牢大: 'fighter', Y哥: 'emperor',
    };
    for (const [key, id] of Object.entries(aliases)) {
      if (name.includes(key)) return getHeroAvatar(id, '橙', size);
    }
  }
  if (hero) return getHeroAvatar(hero.id, hero.rarity, size);
  return getHeroAvatar('sam', '橙', size);
}
