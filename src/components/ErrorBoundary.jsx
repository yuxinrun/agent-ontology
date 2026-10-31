import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught', error, info)
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback || (
          <div className="my-6 rounded-2xl border border-warning/30 bg-warning/[0.06] p-5 text-sm text-muted">
            This section failed to render. The rest of the page is still usable.
          </div>
        )
      )
    }
    return this.props.children
  }
}
