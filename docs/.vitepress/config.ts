/*
 * @File: 
 * @Description: 
 * @Author: guyawei (1972065889@qq.com)
 * @Date: 2026-05-30 20:47:57
 * @LastEditTime: 2026-06-02 19:06:28
 * @LastEditors: guyawei (1972065889@qq.com)
 * @FilePath: \blog\docs\.vitepress\config.ts
 */
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'GYW 的前端博客',
  description: '前端技术、面试题、AI 实践与项目总结',
  lang: 'zh-CN',
  base: '/', // 部署到子路径需要改

  appearance: true, // 支持暗黑模式
  lastUpdated: true, // 显示文章最后更新时间

  head: [
    ['meta', { name: 'keywords', content: '前端,React,Vue,JavaScript,面试,AI,RAG' }],
    ['meta', { name: 'author', content: 'Yawei Gu' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '前端面试', link: '/interview/' },
      { text: 'React', link: '/react/' },
      { text: 'Vue', link: '/vue3/' },
      { text: 'AI About', link: '/ai/' },
      { text: '项目实战', link: '/projects/' },
    ],

    sidebar: {
      '/interview/': [
        { text: '数组', link: '/interview/array' },
        { text: '性能优化', link: '/interview/performance' },
      ],
      '/react/': [
        { text: 'React 源码解析', link: '/react/source' },
        { text: 'React 性能优化', link: '/react/performance' },
      ],
      '/vue3/': [
        { text: '响应式原理', link: '/vue3/reactive' },
        { text: '组合式 API', link: '/vue3/composition' },
      ],
      '/ai/': [
        { text: 'Claude注意事项', link: '/ai/claude' },
        { text: 'LLM大模型', link: '/ai/llm' },
        { text: 'RAG-检索增强生成', link: '/ai/search' },
        { text: '向量数据库', link: '/ai/database' },
      ],
      '/projects/': [
        { text: 'Electron 跨平台', link: '/projects/electron' },
        { text: '微前端', link: '/projects/microfrontend' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/foxcorrect' },
    ],
    outline: 'deep'
  }
})