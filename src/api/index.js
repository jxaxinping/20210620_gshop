/*
*/
import ajax from './ajax'
/*** 获取地址信息(根据经纬度串) */
export const reqAddress=(geohash)=>ajax(`/position/${geohash}`)


/*** 获取 msite 页面食品分类列表 */
export const reqFoodsTypes=(geohash)=>ajax('/index_category')


/*** 获取 msite 商铺列表(根据经纬度) */ 
export const reqShops = ({latitude, longitude}) => ajax('/shops', {latitude, longitude})
/*** 账号密码登录 */ 
export const reqPwdLogin = (name, pwd, captcha) => ajax('/login_pwd', { name, pwd, captcha }, 'POST') 
/*** 获取短信验证码 */ 
export const reqSendCode = phone => ajax('/sendcode', {phone})
 /*** 手机号验证码登录 */
 export const reqSmsLogin = (phone, code) => ajax('/login_sms', {phone, code}, 'POST')
  /*** 获取用户信息(根据会话) */ 
export const reqUser = () => ajax('/userinfo')
/** 请求登出 */
export const reqLogout = () => ajax('/api/logout')