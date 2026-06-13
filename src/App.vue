<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

const menuItems = [
  { label: '首页', to: '/' },
  { label: '规则介绍', to: '/rule' },
  { label: '基础知识', to: '/basic' },
  { label: '软件使用', to: '/software' },
  { label: '出金相关', to: '/withdrawal' },
  { label: '学习资料', to: '/material' },
  { label: '免费教学', to: '/freecourse' },
]

const handleRedPacket = () => {
  mobileMenuOpen.value = false
  router.push('/test')
}

const handleDiscord = () => {
  mobileMenuOpen.value = false
  if (confirm('🎮 加入官方 Discord 交易社区？\n与上千交易者交流心得、获取每日信号。')) {
    alert('✨ 演示模式：正式版将跳转 Discord 邀请链接。')
  }
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div id="app">
    <div class="navbar">
      <div class="nav-container">
        <div class="nav-left">
          <button class="menu-toggle" type="button" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="展开菜单">☰</button>
        </div>

        <nav class="nav-menu desktop-nav">
          <router-link v-for="item in menuItems" :key="item.to" :to="item.to" class="nav-link" @click="closeMenu">{{ item.label }}</router-link>
        </nav>

        <div class="nav-right">
          <button class="icon-btn-redpack" @click="handleRedPacket">🧧</button>
          <button class="icon-btn-discord" @click="handleDiscord"><i class="fab fa-discord"></i></button>
        </div>
      </div>

      <div v-if="mobileMenuOpen" class="mobile-nav-panel">
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
.nav-left,
.nav-right {
  display: flex;
  align-items: center;
}

.menu-toggle {
  display: none;
  border: 1px solid #dbe4ee;
  background: #fff;
  color: #0f172a;
  border-radius: 999px;
  width: 40px;
  height: 40px;
  font-size: 1.1rem;
  cursor: pointer;
}

.desktop-nav {
  display: flex;
  align-items: center;
}

.nav-dropdown {
  position: relative;
}

.nav-dropdown-toggle {
  background: transparent;
  border: 0;
  cursor: pointer;
  font: inherit;
}

.nav-dropdown-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 180px;
  display: none;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e5eef7;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
  padding: 6px;
  z-index: 1100;
}

.nav-dropdown:hover .nav-dropdown-panel,
.nav-dropdown:focus-within .nav-dropdown-panel {
  display: flex;
}

.drop-link {
  padding: 8px 10px;
  border-radius: 10px;
}

.drop-link:hover {
  background: #f1f5f9;
}

.mobile-nav-panel {
  display: none;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px 12px;
  border-top: 1px solid #edf2f7;
  background: rgba(255, 255, 255, 0.98);
}

.mobile-link {
  padding: 10px 12px;
  border-radius: 12px;
  background: #f8fafc;
}

@media (max-width: 980px) {
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

  .nav-left,
  .nav-right {
    width: auto;
    flex: 0 0 auto;
  }
}
</style>
