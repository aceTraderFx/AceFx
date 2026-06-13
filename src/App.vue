<template>
  <div class="app-shell">
    <header class="navbar">
      <div class="navbar__container">
        <router-link class="navbar__brand" to="/">PropFirm交易圈</router-link>

        <nav class="navbar__menu" aria-label="主导航">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            class="navbar__link"
            :to="item.to"
            active-class="is-active"
          >
            {{ item.label }}
          </router-link>
        </nav>

        <div class="navbar__right" aria-label="社交入口">
          <button class="icon-btn wechat-btn" type="button" aria-label="微信"><i class="fab fa-weixin"></i></button>
          <button class="icon-btn bilibili-btn" type="button" aria-label="哔哩哔哩"><i class="fab fa-bilibili"></i></button>
          <button class="icon-btn youtube-btn" type="button" aria-label="YouTube"><i class="fab fa-youtube"></i></button>
          <button class="icon-btn discord-btn" type="button" aria-label="Discord"><i class="fab fa-discord"></i></button>
        </div>
      </div>
    </header>

    <main class="page-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { label: '首页', to: '/' },
  { label: '规则介绍', to: '/rule' },
  { label: '基础知识', to: '/basic' },
  { label: '软件使用', to: '/software' },
   { label: '出金激活', to: '/withdrawal' },
  { label: '教学分享', to: '/freecourse' },
]
</script>

<style scoped>
:global(body) {
  margin: 0;
  font-family: 'Poppins', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #071a1a 0%, #114848 45%, #0e2d2d 100%);
  color: #fff;
}

:global(*) { box-sizing: border-box; }

:global(a) { text-decoration: none; color: inherit; }

.app-shell {
  min-height: 100vh;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(10, 25, 25, 0.72);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
}

/* 关键修改：使用 Grid 布局实现左中右三栏，中间菜单自动居中 */
.navbar__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
}

.navbar__brand {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
}

.navbar__menu {
  display: flex;
  justify-content: center;  /* 菜单内部居中 */
  flex-wrap: wrap;
  gap: 8px;
}

.navbar__right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 增大图标按钮尺寸和字体大小 */
.icon-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.35rem;      /* 明确图标大小 */
  transition: transform 0.2s ease, filter 0.2s ease;
}

.icon-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.wechat-btn { background: #07c160; }
.bilibili-btn { background: #00a1d6; }
.youtube-btn { background: #ff0000; }
.discord-btn { background: #5865f2; }

.navbar__link {
  padding: 8px 10px;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.88);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.navbar__link:hover,
.navbar__link.is-active {
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* 移动端适配：如果窗口过小，可换行或压缩间距 */
@media (max-width: 760px) {
  .navbar__container {
    grid-template-columns: 1fr auto; /* 品牌和右侧一行，菜单换行？实际更好是保持三列但允许菜单换行 */
    row-gap: 12px;
  }
  .navbar__menu {
    grid-column: 1 / -1; /* 让菜单占满整行，并且居中 */
    order: 1;
  }
  /* 调整按钮大小，避免拥挤 */
  .icon-btn {
    width: 38px;
    height: 38px;
    font-size: 1.2rem;
  }
}
</style>