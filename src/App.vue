<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const handleRedPacket = () => {
  router.push('/test')
}

const handleDiscord = () => {
  if (confirm('🎮 加入官方 Discord 交易社区？\n与上千交易者交流心得、获取每日信号。')) {
    alert('✨ 演示模式：正式版将跳转 Discord 邀请链接。')
  }
}
</script>

<template>
  <div id="app">
    <div class="navbar">
      <div class="nav-container">
        <div class="nav-left"></div>
        <div class="nav-menu">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/rule" class="nav-link">规则介绍</router-link>
          <router-link to="/basic" class="nav-link">基础知识</router-link>
          <router-link to="/software" class="nav-link">软件使用</router-link>
          <router-link to="/withdrawal" class="nav-link">出金相关</router-link>
          <router-link to="/material" class="nav-link">学习资料</router-link>
          <router-link to="/freecourse" class="nav-link">免费教学</router-link>
        </div>
        <div class="nav-right">
          <button class="icon-btn-redpack" @click="handleRedPacket">🧧</button>
          <button class="icon-btn-discord" @click="handleDiscord"><i class="fab fa-discord"></i></button>
        </div>
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
