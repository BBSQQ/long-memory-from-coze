/**
 * Digital Life - Cyber Immortality
 * Personal Memory Visualization Website
 */

(function() {
  'use strict';

  // ==================== 全局状态 ====================
  const state = {
    data: null,
    currentFilter: 'all',
    startTime: Date.now()
  };

  // ==================== DOM 元素 ====================
  const elements = {
    nav: document.getElementById('nav'),
    navToggle: document.getElementById('navToggle'),
    navLinks: document.getElementById('navLinks'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    heroSubtitle: document.getElementById('heroSubtitle'),
    nodeId: document.getElementById('nodeId'),
    uptime: document.getElementById('uptime'),
    profileName: document.getElementById('profileName'),
    profileTagline: document.getElementById('profileTagline'),
    currentStatus: document.getElementById('currentStatus'),
    psychologyList: document.getElementById('psychologyList'),
    interestsList: document.getElementById('interestsList'),
    valuesList: document.getElementById('valuesList'),
    moodValue: document.getElementById('moodValue'),
    energyValue: document.getElementById('energyValue'),
    energyFill: document.getElementById('energyFill'),
    thinkingGrid: document.getElementById('thinkingGrid'),
    careerTimeline: document.getElementById('careerTimeline'),
    learningItems: document.getElementById('learningItems'),
    growthPath: document.getElementById('growthPath'),
    skillsContainer: document.getElementById('skillsContainer'),
    footerYear: document.getElementById('footerYear')
  };

  // ==================== 工具函数 ====================
  const utils = {
    // 格式化运行时间
    formatUptime(ms) {
      const seconds = Math.floor(ms / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },

    // 生成随机节点ID
    generateNodeId() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = 'NEO_';
      for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },

    // 状态映射
    getStatusText(status) {
      const map = {
        'in_progress': '进行中',
        'paused': '已暂停',
        'completed': '已完成',
        'active': '进行中',
        'learning': '学习中'
      };
      return map[status] || status;
    },

    // 节流函数
    throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = limit, limit);
        }
      };
    }
  };

  // ==================== 数据加载 ====================
  async function loadData() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error('Failed to load data');
      state.data = await response.json();
      return state.data;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }

  // ==================== 渲染函数 ====================
  const render = {
    // 渲染心理特征
    psychology(data) {
      elements.psychologyList.innerHTML = data.map(item => `
        <li>
          <div class="trait">${item.trait}</div>
          <div class="trait-desc">${item.description}</div>
        </li>
      `).join('');
    },

    // 渲染兴趣标签
    interests(data) {
      elements.interestsList.innerHTML = data.map(item => `
        <span class="interest-tag">${item}</span>
      `).join('');
    },

    // 渲染价值观
    values(data) {
      elements.valuesList.innerHTML = data.map(item => `
        <div class="value-item">
          <div class="core">${item.core}</div>
          <div class="desc">${item.description}</div>
        </div>
      `).join('');
    },

    // 渲染长期想法卡片
    thinkingCards(data) {
      elements.thinkingGrid.innerHTML = data.map((item, index) => `
        <article class="thinking-card" data-status="${item.status}" style="animation-delay: ${index * 0.1}s">
          <div class="thinking-header">
            <h3 class="thinking-title">${item.title}</h3>
            <span class="status-badge ${item.status}">${utils.getStatusText(item.status)}</span>
          </div>
          <p class="thinking-desc">${item.description}</p>
          <div class="thinking-tags">
            ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          ${item.status !== 'completed' ? `
          <div class="thinking-progress">
            <div class="progress-header">
              <span class="progress-label">进度</span>
              <span class="progress-value">${item.progress}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%" data-progress="${item.progress}"></div>
            </div>
          </div>
          ` : ''}
          <div class="thinking-milestones">
            <h5>里程碑</h5>
            <div class="milestone-list">
              ${item.milestones.map(m => `
                <div class="milestone-item ${m.completed ? 'done' : 'pending'}">
                  <span class="milestone-check ${m.completed ? 'done' : ''}"></span>
                  <span>${m.done}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </article>
      `).join('');

      // 动画进度条
      setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
          bar.style.width = bar.dataset.progress + '%';
        });
      }, 300);
    },

    // 渲染职业时间线
    career(data) {
      elements.careerTimeline.innerHTML = data.map((item, index) => `
        <div class="timeline-item" style="animation-delay: ${index * 0.15}s">
          <span class="timeline-period">${item.period}</span>
          <div class="timeline-content">
            <div class="timeline-header">
              <h3 class="timeline-title">${item.title}</h3>
              <span class="timeline-company">@${item.company}</span>
            </div>
            <div class="timeline-location">${item.location}</div>
            <p class="timeline-desc">${item.description}</p>
            <div class="timeline-achievements">
              <h5>成就</h5>
              <ul>
                ${item.achievements.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
            <div class="tech-tags">
              ${item.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    },

    // 渲染正在学习
    learningItems(data) {
      elements.learningItems.innerHTML = data.map(item => `
        <div class="learning-item">
          <div class="learning-header">
            <span class="learning-name">${item.name}</span>
            <span class="learning-status ${item.status}">${utils.getStatusText(item.status)}</span>
          </div>
          <p class="learning-item-desc">${item.description}</p>
          <div class="learning-progress-bar">
            <div class="learning-progress-fill" style="width: 0%" data-progress="${item.progress}"></div>
          </div>
          <div class="learning-meta">
            <span class="learning-progress-text">${item.progress}%</span>
            <span class="learning-resources">${item.resources.length} resources</span>
          </div>
        </div>
      `).join('');

      // 动画进度条
      setTimeout(() => {
        document.querySelectorAll('.learning-progress-fill').forEach(bar => {
          bar.style.width = bar.dataset.progress + '%';
        });
      }, 300);
    },

    // 渲染成长路径
    growthPath(data) {
      elements.growthPath.innerHTML = data.map(item => `
        <div class="path-item">
          <span class="path-year">${item.year}</span>
          <span class="path-milestone">${item.milestone}</span>
        </div>
      `).join('');
    },

    // 渲染技能图谱
    skills(data) {
      elements.skillsContainer.innerHTML = data.map(category => `
        <div class="skill-category">
          <h5 class="skill-category-title">${category.category}</h5>
          <div class="skill-items">
            ${category.items.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }
  };

  // ==================== 事件处理 ====================
  const handlers = {
    // 导航切换
    toggleNav() {
      elements.navLinks.classList.toggle('open');
    },

    // 滚动处理
    handleScroll() {
      // 导航样式
      if (window.scrollY > 50) {
        elements.nav.classList.add('scrolled');
      } else {
        elements.nav.classList.remove('scrolled');
      }

      // 活跃链接
      const sections = document.querySelectorAll('.section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          const id = section.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },

    // 过滤器
    filterThinking(filter) {
      state.currentFilter = filter;
      
      // 更新按钮状态
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
      });

      // 过滤卡片
      const cards = document.querySelectorAll('.thinking-card');
      cards.forEach((card, index) => {
        const status = card.dataset.status;
        const shouldShow = filter === 'all' || status === filter;
        
        if (shouldShow) {
          card.style.display = 'block';
          card.style.animation = `fadeIn 0.3s ease-out ${index * 0.05}s forwards`;
        } else {
          card.style.display = 'none';
        }
      });
    }
  };

  // ==================== 初始化 ====================
  async function init() {
    // 加载数据
    const data = await loadData();
    if (!data) {
      console.error('Failed to initialize: No data available');
      return;
    }

    // 渲染内容
    const about = data.about;
    elements.heroSubtitle.textContent = about.tagline;
    elements.profileName.textContent = about.name;
    elements.profileTagline.textContent = about.tagline;
    elements.currentStatus.textContent = about.status.current;
    elements.moodValue.textContent = about.status.mood;
    elements.energyValue.textContent = about.status.energy;
    elements.energyFill.style.width = about.status.energy + '%';

    render.psychology(about.psychology);
    render.interests(about.interests);
    render.values(about.values);
    render.thinkingCards(data.longTermThinking);
    render.career(data.career);
    render.learningItems(data.learning.currentlyLearning);
    render.growthPath(data.learning.growthPath);
    render.skills(data.learning.skills);

    // 随机节点ID
    elements.nodeId.textContent = utils.generateNodeId();

    // 页脚年份
    elements.footerYear.textContent = new Date().getFullYear();

    // 事件监听
    elements.navToggle.addEventListener('click', handlers.toggleNav);
    window.addEventListener('scroll', utils.throttle(handlers.handleScroll, 100));

    // 过滤器事件
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => handlers.filterThinking(btn.dataset.filter));
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          elements.navLinks.classList.remove('open');
        }
      });
    });

    // 运行时间更新
    setInterval(() => {
      const elapsed = Date.now() - state.startTime;
      elements.uptime.textContent = utils.formatUptime(elapsed);
    }, 1000);

    // 隐藏加载动画
    setTimeout(() => {
      elements.loadingOverlay.classList.add('hidden');
    }, 800);

    // 初始滚动检查
    handlers.handleScroll();
  }

  // ==================== 启动 ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
