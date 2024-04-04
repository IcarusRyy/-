# 使用 createPortal 创建 Modal 弹窗

createPortal 允许你将 JSX 作为 children 渲染至 DOM 的不同部分。
使用 ReactDOM.createPortal(component, document.body)

```jsx
import React, { useState } from "react"
import ReactDOM from "react-dom"

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null

  // 使用createPortal渲染到body的子节点
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          background: "white",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
        }}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body // 这里假设你的应用挂载点是在body内部
  )
}

const TestModal = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <div>
      <h1>My Modal</h1>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Modal Title</h2>
        <p>Modal content.</p>
      </Modal>
    </div>
  )
}

export default TestModal
```
