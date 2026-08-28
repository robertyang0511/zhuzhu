/**
 * 疯狂水世界攻略 H5 应用
 */

(function () {
  'use strict';

  const data = typeof GAME_DATA !== 'undefined' ? GAME_DATA : {};

  let currentSection = 'home';
  let heroFilter = 'all';
  let teamFilter = 'f2p';
  let seasonTeamFilter = 's1';
  let baseFilter = 'planting';
  let searchQuery = '';

  const KINGKONG_ITEMS = [
    { id: 'planting', label: '种植', icon: '🌾', section: 'base', base: 'planting', color: '#51cf66' },
    { id: 'production', label: '生产', icon: '🏭', section: 'base', base: 'production', color: '#ffb347' },
    { id: 'tasks', label: '任务', icon: '📋', section: 'base', base: 'tasks', color: '#74b9ff' },
    { id: 'heroes', label: '角色', icon: '👤', section: 'heroes', color: '#00d4ff' },
    { id: 'seabeast', label: '海兽', icon: '🐋', section: 'base', base: 'seabeast', color: '#b197fc' },
    { id: 'teams', label: '阵容', icon: '⚔️', section: 'teams', color: '#ff6b6b' },
  ];

  const sections = {
    home: document.getElementById('section-home'),
    heroes: document.getElementById('section-heroes'),
    teams: document.getElementById('section-teams'),
    seasons: document.getElementById('section-seasons'),
    base: document.getElementById('section-base'),
    guide: document.getElementById('section-guide'),
  };

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const searchInput = document.getElementById('search-input');

  function init() {
    bindNav();
    bindFilters();
    bindSearch();
    bindModal();
    bindKingkong();
    renderHome();
    renderHeroes();
    renderSeasonTeams();
    renderTeams();
    renderSeasons();
    renderBase();
    renderGuide();
  }

  function bindKingkong() {
    document.getElementById('kingkong-grid')?.addEventListener('click', (e) => {
      const item = e.target.closest('.kingkong-item');
      if (!item) return;
      const id = item.dataset.id;
      const cfg = KINGKONG_ITEMS.find((k) => k.id === id);
      if (cfg) navigateKingkong(cfg);
    });
  }

  function navigateKingkong(cfg) {
    if (cfg.base) {
      baseFilter = cfg.base;
      document.querySelectorAll('#base-filters .chip').forEach((c) => {
        c.classList.toggle('active', c.dataset.base === cfg.base);
      });
    }
    switchSection(cfg.section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderHome() {
    const grid = document.getElementById('kingkong-grid');
    if (grid) {
      grid.innerHTML = KINGKONG_ITEMS.map(
        (k) => `
        <button class="kingkong-item" data-id="${k.id}" type="button" style="--kk-color:${k.color}">
          <span class="kingkong-icon">${k.icon}</span>
          <span class="kingkong-label">${k.label}</span>
        </button>`
      ).join('');
    }

    const tips = document.getElementById('home-tips');
    const taskTips = data.tasks?.tips || data.tips?.slice(0, 3) || [];
    if (tips) {
      tips.innerHTML = taskTips.map((t) => `<li>${t}</li>`).join('');
    }
  }

  function bindNav() {
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });
  }

  function switchSection(name) {
    currentSection = name;
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.section === name);
    });
    Object.entries(sections).forEach(([key, el]) => {
      if (el) el.classList.toggle('active', key === name);
    });
    const searchable = ['heroes', 'teams', 'base'];
    document.querySelector('.search-box').style.display =
      searchable.includes(name) ? 'block' : 'none';
    if (name === 'home') renderHome();
    if (name === 'heroes') renderHeroes();
    if (name === 'teams') {
      renderSeasonTeams();
      renderTeams();
    }
    if (name === 'base') renderBase();
  }

  function bindFilters() {
    document.getElementById('hero-filters')?.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      heroFilter = chip.dataset.filter;
      document.querySelectorAll('#hero-filters .chip').forEach((c) => {
        c.classList.toggle('active', c.dataset.filter === heroFilter);
      });
      renderHeroes();
    });

    document.getElementById('team-filters')?.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      teamFilter = chip.dataset.filter;
      document.querySelectorAll('#team-filters .chip').forEach((c) => {
        c.classList.toggle('active', c.dataset.filter === teamFilter);
      });
      renderTeams();
    });

    document.getElementById('season-team-filters')?.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      seasonTeamFilter = chip.dataset.season;
      document.querySelectorAll('#season-team-filters .chip').forEach((c) => {
        c.classList.toggle('active', c.dataset.season === seasonTeamFilter);
      });
      renderSeasonTeams();
    });

    document.getElementById('base-filters')?.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      baseFilter = chip.dataset.base;
      document.querySelectorAll('#base-filters .chip').forEach((c) => {
        c.classList.toggle('active', c.dataset.base === baseFilter);
      });
      renderBase();
    });
  }

  function bindSearch() {
    let timer;
    searchInput?.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        if (currentSection === 'heroes') renderHeroes();
        else if (currentSection === 'teams') {
          renderSeasonTeams();
          renderTeams();
        } else if (currentSection === 'base') renderBase();
      }, 200);
    });
  }

  function bindModal() {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function openModal(html) {
    modalBody.innerHTML = html;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-close-inner')?.addEventListener('click', closeModal);
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function tierClass(tier) {
    return { T0: 'tag-t0', T1: 'tag-t1', T2: 'tag-t2', T3: 'tag-t3' }[tier] || 'tag-t2';
  }

  function rarityClass(rarity) {
    if (rarity === '红') return 'tag-rarity-red';
    if (rarity === '橙') return 'tag-rarity-orange';
    return 'tag-rarity-purple';
  }

  function seasonLabel(seasons) {
    if (!seasons?.length) return '';
    const first = seasons[0].replace('s', 'S').toUpperCase();
    const last = seasons[seasons.length - 1].replace('s', 'S').toUpperCase();
    return first === last ? first : `${first}-${last}`;
  }

  function filterHeroes(list) {
    return list.filter((h) => {
      if (searchQuery) {
        const q = searchQuery;
        if (
          !h.name.toLowerCase().includes(q) &&
          !h.faction.toLowerCase().includes(q) &&
          !h.role.toLowerCase().includes(q) &&
          !h.positioning.toLowerCase().includes(q)
        ) return false;
      }
      if (heroFilter === 'f2p') return h.f2p;
      if (heroFilter === 'p2w') return h.p2w;
      if (heroFilter === 't0') return h.tier === 'T0';
      if (heroFilter.startsWith('s')) return h.seasons.includes(heroFilter);
      return true;
    });
  }

  function renderHeroes() {
    const container = document.getElementById('hero-list');
    if (!container) return;

    const heroes = filterHeroes(data.heroes || []);
    if (!heroes.length) {
      container.innerHTML = '<div class="empty-state"><div class="emoji">🔍</div><p>未找到匹配角色</p></div>';
      return;
    }

    container.innerHTML = heroes
      .map(
        (h) => `
      <div class="card hero-card" data-hero-id="${h.id}">
        <div class="hero-card-row">
          ${typeof getHeroAvatar === 'function' ? getHeroAvatar(h.id, h.rarity, 52) : ''}
          <div class="hero-card-body">
            <div class="card-header">
              <span class="card-name">${h.name}</span>
              <div class="card-tags">
                <span class="tag ${tierClass(h.tier)}">${h.tier}</span>
                <span class="tag ${rarityClass(h.rarity)}">${h.rarity}</span>
              </div>
            </div>
            <div class="card-tags" style="margin-bottom:4px">
              <span class="tag tag-faction">${h.faction}</span>
              <span class="tag tag-role">${h.role}</span>
              ${h.f2p ? '<span class="tag tag-f2p">0氪</span>' : ''}
              ${h.p2w && !h.f2p ? '<span class="tag tag-p2w">氪金</span>' : ''}
            </div>
            <p class="card-desc">${h.positioning}</p>
            <div class="card-meta">
              <span>📅 ${seasonLabel(h.seasons)}</span>
            </div>
          </div>
        </div>
      </div>`
      )
      .join('');

    container.querySelectorAll('.hero-card').forEach((card) => {
      card.addEventListener('click', () => {
        const hero = data.heroes.find((h) => h.id === card.dataset.heroId);
        if (hero) showHeroDetail(hero);
      });
    });
  }

  function showHeroDetail(h) {
    const skillList = (h.skills.priority || [])
      .map((s, i) => `<li><span class="priority-num">${i + 1}</span>${s}</li>`)
      .join('');
    const badgeList = (h.badges || [])
      .map((b, i) => `<li><span class="priority-num">${i + 1}</span>${b}</li>`)
      .join('');
    const traitList = (h.traits || []).map((t) => `<span class="trait-tag">${t}</span>`).join('');
    const eq = h.equipment || {};
    const avatar = typeof getHeroAvatar === 'function' ? getHeroAvatar(h.id, h.rarity, 72) : '';

    openModal(`
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div class="modal-header-left">
          ${avatar}
          <div>
            <div class="modal-title">${h.name}</div>
            <div class="card-tags" style="margin-top:8px">
              <span class="tag ${tierClass(h.tier)}">${h.tier}</span>
              <span class="tag ${rarityClass(h.rarity)}">${h.rarity}</span>
              <span class="tag tag-faction">${h.faction}</span>
              <span class="tag tag-role">${h.role}</span>
            </div>
          </div>
        </div>
        <button class="modal-close" id="modal-close-inner">×</button>
      </div>
      <div class="detail-section"><div class="detail-label">定位</div><div class="detail-content">${h.positioning}</div></div>
      <div class="detail-section"><div class="detail-label">获取方式</div><div class="detail-content">${h.obtain}</div></div>
      <div class="detail-section"><div class="detail-label">适配赛季</div><div class="detail-content">${h.seasons.map((s) => s.replace('s', 'S').toUpperCase()).join(' · ')}</div></div>
      <div class="detail-section"><div class="detail-label">技能优先级</div><div class="detail-content" style="margin-bottom:6px;color:var(--text-dim);font-size:0.8125rem">${h.skills.desc}</div><ul class="detail-list">${skillList}</ul></div>
      <div class="detail-section"><div class="detail-label">徽章属性推荐</div><ul class="detail-list">${badgeList}</ul></div>
      <div class="detail-section"><div class="detail-label">装备推荐</div><div class="equip-grid">
        <div class="equip-item"><span class="equip-type">武器</span><span>${eq.weapon || '-'}</span></div>
        <div class="equip-item"><span class="equip-type">防具</span><span>${eq.armor || '-'}</span></div>
        <div class="equip-item"><span class="equip-type">饰品</span><span>${eq.accessory || '-'}</span></div>
      </div></div>
      <div class="detail-section"><div class="detail-label">词条优先级</div><div class="trait-priority">${traitList}</div></div>
      <div class="detail-section"><div class="detail-label">海兽推荐</div><div class="detail-content">${h.seaBeast}</div></div>
      <div class="detail-section"><div class="detail-label">升星建议</div><div class="detail-content">${h.starPriority}</div></div>
      <div class="detail-section"><div class="detail-label">实战技巧</div><div class="detail-content">${h.tips}</div></div>
    `);
  }

  function renderTeamHeroes(heroes, roles) {
    return heroes
      .map(
        (name, i) => `
        <div class="team-hero-item">
          ${typeof getHeroAvatarByName === 'function' ? getHeroAvatarByName(name, 36) : ''}
          <div class="team-hero-info">
            <span class="team-hero-name">${name}</span>
            <span class="team-hero-role">${roles[i] || ''}</span>
          </div>
        </div>`
      )
      .join('');
  }

  function renderSeasonTeams() {
    const header = document.getElementById('season-team-header');
    const container = document.getElementById('season-team-list');
    if (!container) return;

    const season = data.seasonTeams?.[seasonTeamFilter];
    if (!season) {
      container.innerHTML = '';
      return;
    }

    if (header) {
      header.innerHTML = `
        <div class="season-banner">
          <div class="season-banner-title">${season.name}</div>
          <div class="season-banner-desc">${season.meta}</div>
          <div class="season-banner-beast">🐋 推荐海兽：${season.seaBeast}</div>
        </div>`;
    }

    const allTeams = [
      ...(season.f2p || []).map((t) => ({ ...t, type: 'f2p' })),
      ...(season.p2w || []).map((t) => ({ ...t, type: 'p2w' })),
    ].filter((t) => {
      if (!searchQuery) return true;
      const q = searchQuery;
      return (
        t.name.toLowerCase().includes(q) ||
        t.heroes.some((h) => h.toLowerCase().includes(q)) ||
        t.logic.toLowerCase().includes(q)
      );
    });

    if (!allTeams.length) {
      container.innerHTML = '<div class="empty-state"><div class="emoji">🔍</div><p>未找到匹配阵容</p></div>';
      return;
    }

    container.innerHTML = allTeams
      .map(
        (t) => `
      <div class="card team-card">
        <div class="card-header">
          <span class="card-name">${t.name}</span>
          <span class="tag ${t.type === 'f2p' ? 'tag-f2p' : 'tag-p2w'}">${t.tag}</span>
        </div>
        <div class="team-heroes-grid">${renderTeamHeroes(t.heroes, t.roles)}</div>
        <div class="team-logic">${t.logic}</div>
      </div>`
      )
      .join('');
  }

  function renderTeams() {
    const container = document.getElementById('team-list');
    if (!container) return;

    const teams = (data.teams?.[teamFilter] || []).filter((t) => {
      if (!searchQuery) return true;
      const q = searchQuery;
      return (
        t.name.toLowerCase().includes(q) ||
        t.heroes.some((h) => h.toLowerCase().includes(q)) ||
        t.scene.toLowerCase().includes(q)
      );
    });

    if (!teams.length) {
      container.innerHTML = '<div class="empty-state"><div class="emoji">🔍</div><p>未找到匹配阵容</p></div>';
      return;
    }

    container.innerHTML = teams
      .map(
        (t) => `
      <div class="card team-card">
        <div class="card-header">
          <span class="card-name">${t.name}</span>
          <span class="tag ${teamFilter === 'f2p' ? 'tag-f2p' : 'tag-p2w'}">${t.tag}</span>
        </div>
        <div class="card-meta" style="margin-bottom:8px">
          <span>📅 ${t.seasons.map((s) => s.replace('s', 'S').toUpperCase()).join('/')}</span>
          <span>🎯 ${t.scene.split('、')[0]}</span>
        </div>
        <div class="team-heroes-grid">${renderTeamHeroes(t.heroes, t.roles)}</div>
        <div class="team-logic">${t.logic}</div>
        <div class="team-priority">💎 ${t.priority}</div>
      </div>`
      )
      .join('');
  }

  function renderSeasons() {
    const seasonList = document.getElementById('season-list');
    const beastGuide = document.getElementById('beast-guide');
    const beastList = document.getElementById('beast-list');

    if (seasonList) {
      seasonList.innerHTML = (data.seasons || [])
        .map(
          (s) => `
        <div class="card">
          <div class="card-header"><span class="card-name">${s.name}</span></div>
          <p class="card-desc">${s.desc}</p>
        </div>`
        )
        .join('');
    }

    if (beastGuide) {
      beastGuide.innerHTML = `
        <table class="guide-table">
          <thead><tr><th>赛季</th><th>主力海兽</th><th>说明</th></tr></thead>
          <tbody>${(data.seasonSeaBeastGuide || [])
            .map((g) => `<tr><td>${g.season}</td><td>${g.main}</td><td>${g.note}</td></tr>`)
            .join('')}</tbody>
        </table>`;
    }

    if (beastList) {
      beastList.innerHTML = (data.seaBeasts || [])
        .map(
          (b) => `
        <div class="card">
          <div class="card-header">
            <span class="card-name">${b.name}</span>
            <span class="tag tag-rarity-${b.rarity === '红' ? 'red' : b.rarity === '黄' ? 'orange' : 'purple'}">${b.rarity}</span>
          </div>
          <p class="card-desc">${b.desc}</p>
          <div class="trait-priority" style="margin:8px 0">${b.traits.map((t) => `<span class="trait-tag">${t}</span>`).join('')}</div>
          <p class="card-desc" style="font-size:0.75rem">💡 ${b.tips}</p>
        </div>`
        )
        .join('');
    }
  }

  function renderBase() {
    const container = document.getElementById('base-content');
    if (!container) return;

    if (baseFilter === 'planting') {
      const p = data.planting;
      if (!p) return;
      const cropMatchesSearch = (c) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const req = c.requirements || {};
        const texts = [
          c.name,
          c.use,
          c.output,
          c.tier,
          ...(c.products || []),
          ...(c.heroBoost || []).flatMap((h) => [h.stage, h.bonus, ...(h.heroes || [])]),
          req.seedFactory,
          req.farm,
          req.kitchen,
          req.playerLevel,
          req.season,
          req.obtain,
          req.seedRule,
        ];
        return texts.some((t) => t && String(t).toLowerCase().includes(q));
      };
      const filteredCrops = p.crops.filter(cropMatchesSearch);
      const renderHeroBoost = (boosts) =>
        (boosts || [])
          .map(
            (b) => `
          <div class="crop-hero-row">
            <span class="crop-hero-stage">${b.stage}</span>
            <span class="crop-hero-names">${(b.heroes || []).join('、')}</span>
            <span class="tag tag-t0 crop-hero-bonus">${b.bonus}</span>
          </div>`
          )
          .join('');

      const renderRequirements = (req) => {
        if (!req) return '';
        const rows = [
          req.seedFactory && { k: '选种厂', v: req.seedFactory },
          req.farm && { k: '农田', v: req.farm },
          req.playerLevel && { k: '等级', v: req.playerLevel },
          req.season && { k: '赛季', v: req.season },
          req.kitchen && { k: '厨房', v: req.kitchen },
          req.seedRule && { k: '规则', v: req.seedRule },
          req.obtain && { k: '解锁', v: req.obtain },
        ].filter(Boolean);
        return rows
          .map(
            (r) => `
          <div class="crop-req-row">
            <span class="crop-req-key">${r.k}</span>
            <span class="crop-req-val">${r.v}</span>
          </div>`
          )
          .join('');
      };

      const gc = p.globalConditions;
      container.innerHTML = `
        <div class="base-intro">${p.intro}</div>
        <div class="tips-banner">💡 ${p.tips}</div>
        ${p.conditionsNote ? `<div class="conditions-note">${p.conditionsNote}</div>` : ''}
        ${
          gc
            ? `
        <div class="card base-card delegation-card">
          <div class="card-header"><span class="card-name">${gc.title}</span></div>
          ${(gc.buildings || [])
            .map(
              (b) => `
            <div class="crop-req-row">
              <span class="crop-req-key">${b.name}</span>
              <span class="crop-req-val">${b.desc}</span>
            </div>`
            )
            .join('')}
          <div class="detail-label" style="margin-top:10px">种植流程</div>
          <ol class="plant-steps">${(gc.steps || []).map((s) => `<li>${s}</li>`).join('')}</ol>
          ${(gc.extras || []).length ? `<div class="detail-label" style="margin-top:8px">补充说明</div>` : ''}
          ${(gc.extras || []).map((e) => `<p class="card-desc" style="margin-top:4px">· ${e}</p>`).join('')}
        </div>`
            : ''
        }
        ${
          p.delegation
            ? `
        <div class="card base-card delegation-card">
          <div class="card-header"><span class="card-name">${p.delegation.title}</span></div>
          <p class="card-desc">${p.delegation.note}</p>
          <p class="card-desc" style="margin-top:6px">🌾 ${p.delegation.farmTip}</p>
          <p class="card-desc" style="margin-top:4px">🏭 ${p.delegation.productionTip}</p>
          <div class="detail-label" style="margin-top:10px">委任优先英雄</div>
          ${(p.delegation.topHeroes || [])
            .map(
              (h) => `
            <div class="crop-hero-row">
              <span class="crop-hero-names">${h.hero}</span>
              <span class="card-desc" style="margin:0;font-size:0.75rem">${h.note}</span>
            </div>`
            )
            .join('')}
        </div>`
            : ''
        }
        ${
          !searchQuery && filteredCrops.length
            ? `
        <div class="section-title" style="margin-top:12px"><span class="icon">📊</span> 种植条件一览</div>
        <div class="crop-summary-wrap">
          <table class="crop-summary-table">
            <thead>
              <tr>
                <th>作物</th>
                <th>等级</th>
                <th>选种厂</th>
                <th>角色级</th>
                <th>成熟</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCrops
                .map(
                  (c) => `
                <tr>
                  <td class="crop-summary-name">${c.name}${c.requirements?.season ? `<span class="crop-summary-tag">${c.requirements.season.replace('赛季起开放', '').replace('赛季', '')}</span>` : ''}</td>
                  <td>${c.tier}</td>
                  <td>${c.requirements?.seedFactory?.replace('选种厂 ', '') || '-'}</td>
                  <td>${c.requirements?.playerLevel?.replace('约', '').replace('（种植农场解锁后）', '') || '-'}</td>
                  <td>${c.growTime.split('（')[0]}</td>
                </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>`
            : ''
        }
        <div class="section-title" style="margin-top:12px"><span class="icon">🌱</span> 作物详情（${filteredCrops.length}种）</div>
        ${filteredCrops
          .map(
            (c) => `
          <div class="card base-card">
            <div class="card-header">
              <span class="card-name">${c.name}</span>
              <span class="tag tag-faction">${c.tier}</span>
            </div>
            <div class="base-meta">
              <span>⏱ 成熟 ${c.growTime}</span>
              ${c.seedTime ? `<span>🌱 种子 ${c.seedTime}</span>` : ''}
              <span>📦 ${c.output}</span>
            </div>
            ${
              c.requirements
                ? `<div class="detail-label" style="margin:8px 0 4px">📋 种植条件</div>
            <div class="crop-req-list">${renderRequirements(c.requirements)}</div>`
                : ''
            }
            ${
              c.products?.length
                ? `<div class="detail-label" style="margin:8px 0 4px">厨房产品</div>
            <div class="trait-priority">${c.products.map((pr) => `<span class="trait-tag">${pr}</span>`).join('')}</div>`
                : ''
            }
            <p class="card-desc">${c.use}</p>
            ${
              c.heroBoost?.length
                ? `<div class="detail-label" style="margin:10px 0 6px">⚡ 提效英雄</div>
            <div class="crop-hero-list">${renderHeroBoost(c.heroBoost)}</div>`
                : ''
            }
          </div>`
          )
          .join('')}
        ${
          (p.heroBonus || []).length
            ? `
        <div class="section-title" style="margin-top:16px"><span class="icon">👤</span> 种植链专属生产英雄</div>
        ${p.heroBonus
          .map(
            (h) => `
          <div class="card base-card" style="padding:10px 14px">
            <div class="card-header">
              <span class="card-name" style="font-size:0.875rem">${h.hero}</span>
              <span class="tag tag-t0">${h.bonus}</span>
            </div>
            <p class="card-desc">${h.skill} · ${h.scope}</p>
          </div>`
          )
          .join('')}`
            : ''
        }
        <div class="section-title" style="margin-top:16px"><span class="icon">🏗️</span> 相关建筑</div>
        <div class="trait-priority">${p.buildings.map((b) => `<span class="trait-tag">${b}</span>`).join('')}</div>
        <div class="section-title" style="margin-top:16px"><span class="icon">📤</span> 种子消耗场景</div>
        <div class="trait-priority">${p.seedUses.map((u) => `<span class="trait-tag">${u}</span>`).join('')}</div>`;
      if (!filteredCrops.length && searchQuery) {
        container.innerHTML += '<div class="empty-state"><p>未找到匹配作物</p></div>';
      }
    } else if (baseFilter === 'production') {
      const p = data.production;
      if (!p) return;
      const facilities = p.facilities || [];
      const facilityMatch = (f) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const texts = [
          f.name,
          f.category,
          f.unlock,
          f.playerLevel,
          ...(f.products || []).flatMap((pr) => [pr.name, pr.use, pr.input, String(pr.factoryLevel)]),
          ...(f.heroBoost || []).flatMap((h) => [h.hero, h.skill, h.bonus]),
          f.upgrade?.need,
          f.upgrade?.note,
        ];
        return texts.some((t) => t && String(t).toLowerCase().includes(q));
      };
      const filtered = facilities.filter(facilityMatch);
      const gc = p.globalConditions;

      const renderProductRows = (products) =>
        (products || [])
          .map(
            (pr) => `
          <div class="crop-req-row">
            <span class="crop-req-key">Lv.${pr.factoryLevel}</span>
            <span class="crop-hero-names">${pr.name}</span>
            <span class="crop-req-val">${pr.input ? `原料：${pr.input} · ` : ''}${pr.use}</span>
          </div>`
          )
          .join('');

      container.innerHTML = `
        <div class="base-intro">${p.intro}</div>
        <div class="tips-banner">💡 ${p.tips}</div>
        ${p.conditionsNote ? `<div class="conditions-note">${p.conditionsNote}</div>` : ''}
        ${
          gc
            ? `
        <div class="card base-card delegation-card">
          <div class="card-header"><span class="card-name">${gc.title}</span></div>
          <div class="detail-label" style="margin-top:4px">升级消耗</div>
          ${(gc.upgradeCost || []).map((c) => `<p class="card-desc" style="margin-top:4px">· ${c}</p>`).join('')}
          <div class="detail-label" style="margin-top:10px">蓝图获取</div>
          ${(gc.blueprintSources || []).map((s) => `<p class="card-desc" style="margin-top:4px">· ${s}</p>`).join('')}
          <div class="detail-label" style="margin-top:10px">建筑规则</div>
          ${(gc.buildingRules || []).map((r) => `<p class="card-desc" style="margin-top:4px">· ${r}</p>`).join('')}
          ${gc.delegation ? `<p class="card-desc" style="margin-top:8px">⚡ ${gc.delegation}</p>` : ''}
        </div>`
            : ''
        }
        ${
          !searchQuery && filtered.length
            ? `
        <div class="section-title" style="margin-top:12px"><span class="icon">📊</span> 产物解锁一览</div>
        <div class="crop-summary-wrap">
          <table class="crop-summary-table">
            <thead><tr><th>工厂</th><th>类型</th><th>解锁</th><th>产物数</th><th>提速英雄</th></tr></thead>
            <tbody>
              ${filtered
                .map((f) => {
                  const heroes = (f.heroBoost || [])
                    .filter((h) => h.hero && h.hero !== '-')
                    .map((h) => h.hero)
                    .join('、') || '委任';
                  return `
                <tr>
                  <td class="crop-summary-name">${f.icon || ''} ${f.name}</td>
                  <td>${f.category}</td>
                  <td>${f.playerLevel || f.unlock || '-'}</td>
                  <td>${(f.products || []).length}种</td>
                  <td>${heroes}</td>
                </tr>`;
                })
                .join('')}
            </tbody>
          </table>
        </div>`
            : ''
        }
        <div class="section-title" style="margin-top:12px"><span class="icon">🏭</span> 工厂详情（${filtered.length}座）</div>
        ${filtered
          .map(
            (f) => `
          <div class="card base-card">
            <div class="card-header">
              <span class="card-name">${f.icon || '🏭'} ${f.name}</span>
              <span class="tag tag-faction">${f.category}</span>
            </div>
            <div class="base-meta">
              <span>🔓 ${f.unlock || '-'}</span>
              <span>📊 ${f.playerLevel || '-'}</span>
            </div>
            ${
              f.upgrade
                ? `<div class="detail-label" style="margin:8px 0 4px">⬆️ 升级条件</div>
            <div class="crop-req-list">
              <div class="crop-req-row"><span class="crop-req-key">消耗</span><span class="crop-req-val">${f.upgrade.need}</span></div>
              <div class="crop-req-row"><span class="crop-req-key">说明</span><span class="crop-req-val">${f.upgrade.note}</span></div>
            </div>`
                : ''
            }
            <div class="detail-label" style="margin:10px 0 6px">📦 产物（按工厂等级解锁）</div>
            <div class="crop-req-list">${renderProductRows(f.products)}</div>
            <div class="detail-label" style="margin:10px 0 6px">⚡ 提速英雄</div>
            <div class="crop-hero-list">
              ${(f.heroBoost || [])
                .map(
                  (h) => `
                <div class="crop-hero-row">
                  <span class="crop-hero-names">${h.hero}</span>
                  <span class="crop-req-val">${h.skill}</span>
                  <span class="tag tag-t0 crop-hero-bonus">${h.bonus}</span>
                </div>`
                )
                .join('')}
            </div>
          </div>`
          )
          .join('')}
        <div class="section-title" style="margin-top:16px"><span class="icon">👤</span> 生产加速英雄总表</div>
        ${(p.heroBonus || [])
          .map(
            (h) => `
          <div class="card base-card" style="padding:10px 14px">
            <div class="card-header">
              <span class="card-name" style="font-size:0.875rem">${h.hero}</span>
              <span class="tag tag-t0">${h.rarity || ''}</span>
            </div>
            <div class="trait-priority" style="margin:6px 0">${(h.buildings || []).map((b) => `<span class="trait-tag">${b}</span>`).join('')}</div>
            <p class="card-desc">${(h.skills || []).join(' · ')}</p>
            ${h.priority ? `<p class="card-desc" style="margin-top:4px;color:var(--accent)">${h.priority}</p>` : ''}
          </div>`
          )
          .join('')}`;
      if (!filtered.length && searchQuery) {
        container.innerHTML += '<div class="empty-state"><p>未找到匹配工厂/产物</p></div>';
      }
    } else if (baseFilter === 'tasks') {
      const t = data.tasks;
      if (!t) return;
      const match = (text) => !searchQuery || text.toLowerCase().includes(searchQuery);
      container.innerHTML = `
        <div class="base-intro">${t.intro}</div>
        <div class="section-title" style="margin-top:12px"><span class="icon">☀️</span> 每日必做</div>
        ${(t.daily || [])
          .filter((item) => match(item.name) || match(item.desc))
          .map(
            (item) => `
          <div class="card base-card">
            <div class="card-header">
              <span class="card-name">${item.name}</span>
              <span class="tag ${item.tag === '必做' ? 'tag-f2p' : 'tag-t1'}">${item.tag}</span>
            </div>
            <p class="card-desc">${item.desc}</p>
          </div>`
          )
          .join('')}
        <div class="section-title" style="margin-top:16px"><span class="icon">📆</span> 每周 / 周期</div>
        ${(t.weekly || [])
          .filter((item) => match(item.name) || match(item.desc))
          .map(
            (item) => `
          <div class="card base-card">
            <div class="card-header">
              <span class="card-name">${item.name}</span>
              <span class="tag tag-faction">${item.tag}</span>
            </div>
            <p class="card-desc">${item.desc}</p>
          </div>`
          )
          .join('')}
        <div class="section-title" style="margin-top:16px"><span class="icon">💡</span> 任务技巧</div>
        <ul class="tips-list">${(t.tips || []).map((tip) => `<li>${tip}</li>`).join('')}</ul>`;
    } else if (baseFilter === 'seabeast') {
      const sys = data.seaBeastSystem;
      if (!sys) return;
      container.innerHTML = `
        <div class="base-intro">${sys.unlock}</div>
        <div class="section-title" style="margin-top:12px"><span class="icon">⚔️</span> 战斗培育类型（4种）</div>
        ${(sys.battleTypes || [])
          .filter(
            (b) =>
              !searchQuery ||
              b.name.includes(searchQuery) ||
              b.type.includes(searchQuery) ||
              b.scene.includes(searchQuery)
          )
          .map(
            (b) => `
          <div class="card base-card">
            <div class="card-header">
              <span class="card-name">${b.icon} ${b.name}</span>
              <span class="tag ${tierClass(b.tier)}">${b.tier}</span>
            </div>
            <div class="base-meta"><span>${b.type}</span><span>⏱ ${b.cd}</span></div>
            <p class="card-desc"><strong>技能：</strong>${b.skill}</p>
            <p class="card-desc" style="margin-top:4px">💡 ${b.scene}</p>
          </div>`
          )
          .join('')}
        <div class="section-title" style="margin-top:16px"><span class="icon">⭐</span> 品质等级</div>
        <table class="guide-table">
          <thead><tr><th>品质</th><th>词条数</th><th>说明</th></tr></thead>
          <tbody>${(sys.qualities || [])
            .map((q) => `<tr><td>${q.name}</td><td>${q.traits}</td><td>${q.note}</td></tr>`)
            .join('')}</tbody>
        </table>
        <div class="section-title" style="margin-top:16px"><span class="icon">📅</span> 赛季限定海兽</div>
        ${(sys.seasonTypes || [])
          .map(
            (s) => `
          <div class="card base-card">
            <div class="card-header">
              <span class="card-name">${s.name}</span>
              <span class="tag tag-faction">${s.season}</span>
            </div>
            <div class="base-meta"><span>获取：${s.get}</span>${s.rarity !== '-' ? `<span>品质：${s.rarity}</span>` : ''}</div>
            <p class="card-desc">${s.role}</p>
          </div>`
          )
          .join('')}
        <div class="section-title" style="margin-top:16px"><span class="icon">💡</span> 培养技巧</div>
        <ul class="tips-list">${(sys.cultivateTips || []).map((t) => `<li>${t}</li>`).join('')}</ul>`;
    }
  }

  function renderGuide() {
    const traitGuide = document.getElementById('trait-guide');
    if (traitGuide && data.traitGuide) {
      traitGuide.innerHTML = ['output', 'tank', 'support', 'badge']
        .map((key) => {
          const g = data.traitGuide[key];
          if (!g) return '';
          return `
          <div class="trait-card">
            <h3>${g.title}</h3>
            <div class="trait-priority">${g.priority.map((p) => `<span class="trait-tag">${p}</span>`).join('')}</div>
            <p class="trait-note">${g.note}</p>
          </div>`;
        })
        .join('');
    }

    const tipsList = document.getElementById('tips-list');
    if (tipsList) {
      tipsList.innerHTML = (data.tips || []).map((t) => `<li>${t}</li>`).join('');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
