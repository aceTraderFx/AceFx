<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const menuItems = [
  { label: '首页', to: '/' },
  { label: '规则介绍', to: '/rule' },
  { label: '基础知识', to: '/basic' },
  { label: '软件使用', to: '/software' },
  { label: '出金相关', to: '/withdrawal' },
  { label: '学习资料', to: '/material' },
  { label: '免费教学', to: '/freecourse' },
]

const closeMenu = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    mobileMenuOpen.value = false
  }, 200)
}

const openMenu = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  mobileMenuOpen.value = true
}

const cancelClose = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const toggleMenu = () => {
  if (mobileMenuOpen.value) {
    closeMenu()
  } else {
    openMenu()
  }
}
</script>

<template>
  <div id="app">
    <div class="navbar">
      <div class="nav-container">
        <div class="nav-left">
          <button
            class="menu-toggle"
            type="button"
            @click="toggleMenu"
            @pointerenter="openMenu"
            @pointerleave="closeMenu"
            aria-label="菜单"
          >
            ☰
          </button>
        </div>

        <nav class="nav-menu desktop-nav">
          <router-link v-for="item in menuItems" :key="item.to" :to="item.to" class="nav-link" @click="closeMenu">{{ item.label }}</router-link>
        </nav>

        <div class="nav-right"></div>
      </div>

      <div
        v-if="mobileMenuOpen"
        class="mobile-nav-panel"
        @pointerenter="cancelClose"
        @pointerleave="closeMenu"
        @click.self="closeMenu"
      >
        <router-link v-for="item in menuItems" :key="item.to" :to="item.to" class="nav-link mobile-link" @click="closeMenu">{{ item.label }}</router-link>
      </div>
    </div>
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, #44BDEF 0%, #1e88e5 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px rgba(14, 79, 179, 0.25);
  z-index: 1000;
  overflow: visible;
  height: 96px;
  display: flex;
  align-items: center;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  width: 72px;
}

.desktop-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  height: 100%;
}

/* PC端导航链接样式 */
.nav-link {
  color: #eff6ff;
  font-size: 1.4rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  height: 100%;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

/* PC端悬浮：加粗 + 白色下划线，颜色变白 */
.nav-link:hover,
.nav-link.router-link-active:hover {
  color: #ffffff;
  font-weight: 700;
  border-bottom-color: #ffffff;
}

/* PC端激活状态无特殊样式 */
.nav-link.router-link-active {
  color: #eff6ff;
  font-weight: 500;
  border-bottom-color: transparent;
}

/* 汉堡菜单按钮基础样式 */
.menu-toggle {
  display: none;
  border: 1px solid #ffffffcc;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 999px;
  width: 44px;
  height: 44px;
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.menu-toggle:hover {
  background: #ffffff;
  color: #1e88e5;
  transform: scale(1.08);
  border-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.menu-toggle:active {
  transform: scale(0.96);
}

/* 移动端菜单面板 */
.mobile-nav-panel {
  display: none;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.98);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1001;
  backdrop-filter: blur(8px);
}

/* 移动端菜单项默认样式 */
.mobile-link {
  padding: 12px 20px;
  border-radius: 12px;
  background: transparent;
  color: #0f172a;          /* 深色 */
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.1rem;
}

/* 移动端悬浮：只加粗 + 蓝色下划线，颜色不变（仍为深色） */
.mobile-link:hover {
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: #1e88e5;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  background: transparent;
  transform: none;
  box-shadow: none;
  color: #0f172a;         /* 显式保持深色，不变 */
}

/* 移动端激活样式：完全移除特殊背景和边框，与普通状态一致 */
.mobile-link.router-link-active {
  background: transparent;
  color: #0f172a;
  border-left: none;
  font-weight: 500;
  text-decoration: none;
}

/* 响应式：移动端显示汉堡菜单，隐藏桌面导航 */
@media (max-width: 980px) {
  .navbar {
    height: 72px;
  }
  .nav-container {
    padding: 0 16px;
  }
  .menu-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .desktop-nav {
    display: none;
  }
  .mobile-nav-panel {
    display: flex;
  }
  .nav-right {
    display: none;
  }
}
</style>