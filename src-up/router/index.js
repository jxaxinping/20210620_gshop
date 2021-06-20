import Vue from 'vue'
import Router from 'vue-router'
import Upload from '../views/upload.vue'
import Uploaddetail from '../views/uploaddetail.vue'

Vue.use(Router)

/* //获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
} */

export default new Router({



	routes: [{
			path: '/upload',
			component: Upload,
			children: [
			{
				path: '/uploaddetail',
				component: Uploaddetail
			}]
		},
		
		{
			path: '/',
			redirect: '/upload'

		}
	]
})
