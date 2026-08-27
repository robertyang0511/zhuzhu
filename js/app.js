/**
 * 疯狂水世界攻略 H5 应用
 */

(function () {
  'use strict';

  const data = typeof GAME_DATA !== 'undefined' ? GAME_DATA : {};

  let currentSection = 'heroes';
  let heroFilter = 'all';
  let teamFilter = 'f2p';
  let searchQuery = '';

  // DOM
  const sections = {
    heroes: document.getElementById('section-heroes'),
    teams: document.getElementById('section-teams'),
    seasons: document.getElementById('section-seasons'),
    guide: document.getElementById('section-guide'),
  };

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const searchInput = document.getElementById('search-input');

  // Init
  function init() {
    bindNav();
    bindFilters();
    bindSearch();
    bindModal();
    renderHeroes();
    renderTeams();
    renderSeasons();
    renderGuide();
  }

  function bindNav() {
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        switchSection(section);
      });
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
    document.querySelector('.search-box').style.display =
      name === 'heroes' || name === 'teams' ? 'block' : 'none';
    if (name === 'heroes') renderHeroes();
    if (name === 'teams') renderTeams();
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
  }

  function bindSearch() {
    let timer;
    searchInput?.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        if (currentSection === 'heroes') renderHeroes();
        else if (currentSection === 'teams') renderTeams();
      }, 200);
    });
  }

  function bindModal() {
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function openModal(html) {
    modalBody.innerHTML = html;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function tierClass(tier) {
    const map = { T0: 'tag-t0', T1: 'tag-t1', T2: 'tag-t2', T3: 'tag-t3' };
    return map[tier] || 'tag-t2';
  }

  function rarityClass(rarity) {
    if (rarity === '红') return 'tag-rarity-red';
    if (rarity === '橙') return 'tag-rarity-orange';
    return 'tag-rarity-purple';
  }

  function seasonLabel(seasons) {
    if (!seasons || !seasons.length) return '';
    const first = seasons[0].replace('s', 'S').toUpperCase();
    const last = seasons[seasons.length - 1].replace('s', 'S').toUpperCase();
    return first === last ? first : `${first}-${last}`;
  }

  function filterHeroes(list) {
    return list.filter((h) => {
      if (searchQuery) {
        const q = searchQuery;
        const match =
          h.name.toLowerCase().includes(q) ||
          h.faction.toLowerCase().includes(q) ||
          h.role.toLowerCase().includes(q) ||
          h.positioning.toLowerCase().includes(q);
        if (!match) return false;
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
      container.innerHTML =
        '<div class="empty-state"><div class="emoji">🔍</div><p>未找到匹配角色</p></div>';
      return;
    }

    container.innerHTML = heroes
      .map(
        (h) => `
      <div class="card" data-hero-id="${h.id}">
        <div class="card-header">
          <span class="card-name">${h.name}</span>
          <div class="card-tags">
            <span class="tag ${tierClass(h.tier)}">${h.tier}</span>
            <span class="tag ${rarityClass(h.rarity)}">${h.rarity}</span>
          </div>
        </div>
        <div class="card-tags" style="margin-bottom:6px">
          <span class="tag tag-faction">${h.faction}</span>
          <span class="tag tag-role">${h.role}</span>
          ${h.f2p ? '<span class="tag tag-f2p">0氪</span>' : ''}
          ${h.p2w && !h.f2p ? '<span class="tag tag-p2w">氪金</span>' : ''}
        </div>
        <p class="card-desc">${h.positioning}</p>
        <div class="card-meta">
          <span>📅 ${seasonLabel(h.seasons)}</span>
          <span>⭐ ${h.starPriority.split('，')[0]}</span>
        </div>
      </div>`
      )
      .join('');

    container.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('click', () => {
        const hero = data.heroes.find((h) => h.id === card.dataset.heroId);
        if (hero) showHeroDetail(hero);
      });
    });
  }

  function showHeroDetail(h) {
    const skillList = (h.skills.priority || [])
      .map(
        (s, i) =>
          `<li><span class="priority-num">${i + 1}</span>${s}</li>`
      )
      .join('');

    const badgeList = (h.badges || [])
      .map(
        (b, i) =>
          `<li><span class="priority-num">${i + 1}</span>${b}</li>`
      )
      .join('');

    const traitList = (h.traits || [])
      .map((t) => `<span class="trait-tag">${t}</span>`)
      .join('');

    const eq = h.equipment || {};

    openModal(`
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div>
          <div class="modal-title">${h.name}</div>
          <div class="card-tags" style="margin-top:8px">
            <span class="tag ${tierClass(h.tier)}">${h.tier}</span>
            <span class="tag ${rarityClass(h.rarity)}">${h.rarity}</span>
            <span class="tag tag-faction">${h.faction}</span>
            <span class="tag tag-role">${h.role}</span>
          </div>
        </div>
        <button class="modal-close" id="modal-close-inner">×</button>
      </div>

      <div class="detail-section">
        <div class="detail-label">定位</div>
        <div class="detail-content">${h.positioning}</div>
      </div>

      <div class="detail-section">
        <div class="detail-label">获取方式</div>
        <div class="detail-content">${h.obtain}</div>
      </div>

      <div class="detail-section">
        <div class="detail-label">适配赛季</div>
        <div class="detail-content">${h.seasons.map((s) => s.replace('s', 'S').toUpperCase()).join(' · ')}</div>
      </div>

      <div class="detail-section">
        <div class="detail-label">技能优先级</div>
        <div class="detail-content" style="margin-bottom:6px;color:var(--text-dim);font-size:0.8125rem">${h.skills.desc}</div>
        <ul class="detail-list">${skillList}</ul>
      </div>

      <div class="detail-section">
        <div class="detail-label">徽章属性推荐</div>
        <ul class="detail-list">${badgeList}</ul>
      </div>

      <div class="detail-section">
        <div class="detail-label">装备推荐</div>
        <div class="equip-grid">
          <div class="equip-item"><span class="equip-type">武器</span><span>${eq.weapon || '-'}</span></div>
          <div class="equip-item"><span class="equip-type">防具</span><span>${eq.armor || '-'}</span></div>
          <div class="equip-item"><span class="equip-type">饰品</span><span>${eq.accessory || '-'}</span></div>
        </div>
      </div>

      <div class="detail-section">
        <div class="detail-label">词条优先级</div>
        <div class="trait-priority">${traitList}</div>
      </div>

      <div class="detail-section">
        <div class="detail-label">海兽推荐</div>
        <div class="detail-content">${h.seaBeast}</div>
      </div>

      <div class="detail-section">
        <div class="detail-label">升星建议</div>
        <div class="detail-content">${h.starPriority}</div>
      </div>

      <div class="detail-section">
        <div class="detail-label">实战技巧</div>
        <div class="detail-content">${h.tips}</div>
      </div>
    `);

    document.getElementById('modal-close-inner')?.addEventListener('click', closeModal);
  }

  function filterTeams(list) {
    return list.filter((t) => {
      if (searchQuery) {
        const q = searchQuery;
        const match =
          t.name.toLowerCase().includes(q) ||
          t.heroes.some((h) => h.toLowerCase().includes(q)) ||
          t.scene.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }

  function renderTeams() {
    const container = document.getElementById('team-list');
    if (!container) return;

    const teams = filterTeams(data.teams?.[teamFilter] || []);
    if (!teams.length) {
      container.innerHTML =
        '<div class="empty-state"><div class="emoji">🔍</div><p>未找到匹配阵容</p></div>';
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
        <div class="card-meta" style="margin-bottom:4px">
          <span>📅 ${t.seasons.map((s) => s.replace('s', 'S').toUpperCase()).join('/')}</span>
          <span>🎯 ${t.scene.split('、')[0]}</span>
        </div>
        <div class="team-heroes">
          ${t.heroes
            .map(
              (h, i) =>
                `<span class="hero-pill">${h}<span class="role">${t.roles[i] || ''}</span></span>`
            )
            .join('')}
        </div>
        <div class="team-logic">${t.logic}</div>
        <div class="team-priority">💎 ${t.priority}</div>
      </div>`
      )
      .join('');
  }

  function renderSeasons() {
    const seasonList = document.getElementById('season-list');
    const beastGuide = document.getElementById('beast-guide');

    if (seasonList) {
      seasonList.innerHTML = (data.seasons || [])
        .map(
          (s) => `
        <div class="card">
          <div class="card-header">
            <span class="card-name">${s.name}</span>
          </div>
          <p class="card-desc">${s.desc}</p>
        </div>`
        )
        .join('');
    }

    if (beastGuide) {
      beastGuide.innerHTML = `
        <table class="guide-table">
          <thead>
            <tr><th>赛季</th><th>主力海兽</th><th>说明</th></tr>
          </thead>
          <tbody>
            ${(data.seasonSeaBeastGuide || [])
              .map(
                (g) =>
                  `<tr><td>${g.season}</td><td>${g.main}</td><td>${g.note}</td></tr>`
              )
              .join('')}
          </tbody>
        </table>`;
    }

    const beastList = document.getElementById('beast-list');
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
          <div class="trait-priority" style="margin:8px 0">
            ${b.traits.map((t) => `<span class="trait-tag">${t}</span>`).join('')}
          </div>
          <p class="card-desc" style="font-size:0.75rem">💡 ${b.tips}</p>
        </div>`
        )
        .join('');
    }
  }

  function renderGuide() {
    const traitGuide = document.getElementById('trait-guide');
    if (traitGuide && data.traitGuide) {
      const tg = data.traitGuide;
      traitGuide.innerHTML = ['output', 'tank', 'support', 'badge']
        .map((key) => {
          const g = tg[key];
          if (!g) return '';
          return `
          <div class="trait-card">
            <h3>${g.title}</h3>
            <div class="trait-priority">
              ${g.priority.map((p) => `<span class="trait-tag">${p}</span>`).join('')}
            </div>
            <p class="trait-note">${g.note}</p>
          </div>`;
        })
        .join('');
    }

    const tipsList = document.getElementById('tips-list');
    if (tipsList) {
      tipsList.innerHTML = (data.tips || [])
        .map((t) => `<li>${t}</li>`)
        .join('');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
