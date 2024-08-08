| 值             | 描述                                                         | 同站(一方cookie) | 跨站(三方cookie) |
| -------------- | ------------------------------------------------------------ | ---------------- | ---------------- |
| `Strict`       | 浏览器仅`对同一站点`发送cookie，即请求来自设置 cookie 的站点 | ✅               | ❌               |
| `Lax` (默认值) | 浏览器对`符合同站域名`发送cookie                             | ✅               | 部分会[携带cookie](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)   |
| `None`         | 浏览器在`跨站`和`同站`请求中均会发送cookie,必须设置 Secure   | ✅               | ✅               |