import HInputText from '../src/components/HInputText.vue'

import CodeBlock from './views/CodeBlock.vue'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.component('CodeBlock', CodeBlock)
app.component('HInputText', HInputText)

app.mount('#app')
console.log(app)
