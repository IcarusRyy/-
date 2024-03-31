# 如何实现图片的懒加载，有几种方式

1、使用原生的 HTML5 属性 loading

```js
<img src="example.jpg" loading="lazy" alt="example image">
```

但是会有兼容性问题

2、使用 IntersectionObserver API 交叉观察器

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entries) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      observer.unobserve(img)
      console.log("图片加载完成")
      img.onload = () => {
        console.log("图片加载完成")
      }
    }
  })
})

document.querySelectorAll("img[data-src]").forEach((img) => {
  observer.observe(img)
})
```
