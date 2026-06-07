/*
 * @File: 
 * @Description: 
 * @Author: guyawei (1972065889@qq.com)
 * @Date: 2026-05-30 20:47:57
 * @LastEditTime: 2026-06-07 18:15:38
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
        { text: '常见笔试题', link: '/interview/writentest' },
        { text: 'JS基础面试题', link: '/interview/jsbasic' },
        { text: 'React面试题', link: '/interview/react' },
        { text: '微前端', link: '/interview/micro' },
      ],
      '/react/': [
        { text: 'React 事件原理', link: '/react/reacteventprinciple' },
        { text: 'Fiber架构以及如何实现增量渲染', link: '/react/fiber' },
        { text: 'useState和useEffect的实现原理', link: '/react/stateeffect' },
        { text: 'React18新特性-transition', link: '/react/transition' },
      ],
      '/vue/': [
        { text: '响应式原理', link: '/vue/reactivity' },
        { text: 'Vue3 Composition API', link: '/vue/composition' },
      ],
      '/ai/': [
        { text: 'Claude注意事项', link: '/ai/claude' },
        { text: 'LLM大模型', link: '/ai/llm' },
        { text: 'RAG-检索增强生成', link: '/ai/search' },
        { text: '向量数据库', link: '/ai/database' },
        { text: '文本分块', link: '/ai/promptsplit' },
        { text: '检索语句解析', link: '/ai/queryparse' },
        { text: '检索结果重排', link: '/ai/resultresort' },
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