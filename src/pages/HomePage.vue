<template>
  <section class="page-card">
    <div class="rows-list">
      <div v-for="(item, idx) in rowsData" :key="idx" class="list-row">
        <!-- 第一列：图片（统一使用 imgUrl） -->
        <div class="row-image">
          <img :src="item.imgUrl" :alt="item.imgAlt" class="row-img" />
        </div>
        
        <!-- 第二列 -->
        <div class="row-content">
          <a :href="item.titleLink" class="row-title" target="_blank" rel="noopener noreferrer">
            {{ item.title }}
          </a>
          <div class="row-desc">{{ item.shortDesc }}</div>
        </div>

        <!-- 第三列：折扣码 + 复制 -->
        <div class="row-discount">
          <span class="discount-label">折扣码：</span>
          <span class="discount-code" @click="copyDiscountCode(item.discountCode, idx)">{{ item.discountCode }}</span>
          <i class="far fa-copy copy-icon" @click="copyDiscountCode(item.discountCode, idx)"></i>
          <span class="copy-tip" v-if="copiedIndex === idx">已复制!</span>
        </div>

        <!-- 第四列：购买 -->
        <div class="row-buy">
          <button class="action-btn buy-btn" @click="handleBuy(item)">购买</button>
        </div>

        <!-- 第五列：详细规则 -->
        <div class="row-rules">
          <button class="action-btn rules-btn" @click="handleRules(item)">详细规则</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const rowsData = [
  {
    imgUrl: 'https://takeprofittrader.com/assets/mobile-logo.svg',
    imgAlt: 'takeprofittrader',
    title: 'TPT（takeprofittrader）',
    titleLink: 'https://takeprofittrader.com/control-center/test',
    shortDesc: '90%分成, 出入出金',
    discountCode: 'CDCD',
    buyLink: 'https://takeprofittrader.com/control-center/test',
    rulesLink: 'https://takeprofittrader.com/control-center/test'
  },
  {
    imgUrl: '/img/lucid.png',
    imgAlt: 'Lucid',
    title: 'Lucid',
    titleLink: 'https://lucidtrading.com/#plans',
    shortDesc: '90%分成, 规则友好',
    discountCode: 'SAVE20',
    buyLink: 'https://lucidtrading.com/#plans',
    rulesLink: 'https://lucidtrading.com/#plans'
  },
  {
    imgUrl: '/img/alpha.png',
    imgAlt: 'Alpha',
    title: 'Alpha',
    titleLink: 'https://app.alpha-futures.com/Assessments',
    shortDesc: '90%分成, 规则友好',
    discountCode: 'FLEX30',
    buyLink: 'https://app.alpha-futures.com/Assessments',
    rulesLink: 'https://app.alpha-futures.com/Assessments'
  },
  {
    imgUrl: '/img/topstep.png',
    imgAlt: 'TOPSTEP',
    title: 'TOPSTEP',
    titleLink: 'https://dashboard.topstep.com/dashboard/accounts/new?step=Account/4',
    shortDesc: '90%分成, 规则友好',
    discountCode: 'RISK5',
    buyLink: 'https://dashboard.topstep.com/dashboard/accounts/new?step=Account',
    rulesLink: 'https://dashboard.topstep.com/dashboard/accounts/new?step=Account'
  },
  {
    imgUrl: '/img/fn.png',
    imgAlt: 'FundedNext',
    title: 'FundedNext',
    titleLink: 'https://app.fundednext.com/pricing',
    shortDesc: '90%分成, 规则友好',
    discountCode: 'LEARN24',
    buyLink: 'https://app.fundednext.com/pricing',
    rulesLink: 'https://app.fundednext.com/pricing'
  }
]

const copiedIndex = ref(null)

const copyDiscountCode = async (code, idx) => {
  try {
    await navigator.clipboard.writeText(code)
    copiedIndex.value = idx
    setTimeout(() => {
      copiedIndex.value = null
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
    alert('无法复制，请手动复制')
  }
}

const handleBuy = (item) => {
  if (item.buyLink && item.buyLink !== '#') {
    window.open(item.buyLink, '_blank')
  } else {
    alert('暂无购买链接')
  }
}

const handleRules = (item) => {
  if (item.rulesLink && item.rulesLink !== '#') {
    window.open(item.rulesLink, '_blank')
  } else {
    alert('暂无规则链接')
  }
}
</script>

<style scoped>
.page-card {
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 18px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.rows-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list-row {
  display: grid;
  grid-template-columns: 80px 1.2fr 1fr 100px 100px;
  align-items: center;
  gap: 16px;
  background: rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 12px 16px;
  transition: all 0.2s ease;
}

.list-row:hover {
  background: rgba(255,255,255,0.12);
  transform: translateX(4px);
}

.row-image {
  display: flex;
  justify-content: center;
  align-items: center;
}
.row-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.row-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.row-title {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.row-title:hover {
  opacity: 0.8;
}
.row-desc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-discount {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  position: relative;
}
.discount-label {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
}
.discount-code {
  font-weight: bold;
  font-family: monospace;
  font-size: 1rem;
  background: rgba(255,215,0,0.2);
  padding: 4px 8px;
  border-radius: 20px;
  color: #ffd966;
  cursor: pointer;
  transition: background 0.2s;
}
.discount-code:hover {
  background: rgba(255,215,0,0.4);
}
.copy-icon {
  cursor: pointer;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.8);
  transition: transform 0.1s;
}
.copy-icon:hover {
  transform: scale(1.1);
  color: #fff;
}
.copy-tip {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 12px;
  white-space: nowrap;
  pointer-events: none;
}

.row-buy, .row-rules {
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-btn {
  border: none;
  border-radius: 40px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: auto;
  min-width: 70px;
  text-align: center;
  white-space: nowrap;
}
.buy-btn {
  background: #2ecc71;
  color: white;
}
.buy-btn:hover {
  background: #27ae60;
  transform: translateY(-2px);
}
.rules-btn {
  background: #3498db;
  color: white;
}
.rules-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

@media (max-width: 850px) {
  .list-row {
    grid-template-columns: 1fr;
    gap: 12px;
    text-align: center;
  }
  .row-image {
    justify-content: center;
  }
  .row-content {
    text-align: center;
  }
  .row-discount {
    justify-content: center;
  }
  .action-btn {
    width: 80%;
    margin: 0 auto;
  }
  .row-desc {
    white-space: normal;
  }
}
</style>