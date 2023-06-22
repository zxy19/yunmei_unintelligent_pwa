
import {createRouter,createWebHashHistory} from "vue-router"
import startPage from "./view/startPage.vue"
import loginPage from "./view/loginPage.vue"
import addLockPage from "./view/addlockPage.vue"
import lockList from "./view/lockList.vue"
import lockDetail from "./view/lockDetail.vue"
import lockQR from "./view/lockQR.vue"
const routes = [
    { path: '/', component: startPage },
    { path: '/login', component: loginPage },
    { path: '/locklist/', component: lockList },
    { path: '/lockDetail/:data', component: lockDetail },
    { path: '/lockinfo/:data', component: addLockPage },
    { path: '/lock_info/:data', component: addLockPage },
    { path: '/addlock/:data', component: addLockPage },
    { path: '/lockQR/:data', component: lockQR },
    // { path: '/about', component: About },
]

export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});
