class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 更新状态使得下一次渲染能够显示备用UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 你也可以在这里记录错误到一个错误报告服务
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的备用UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
