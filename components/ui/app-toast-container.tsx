'use client'

import { ToastContainer, type ToastContainerProps } from 'react-toastify'

export function AppToastContainer(props: ToastContainerProps) {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3500}
      closeOnClick
      draggable
      hideProgressBar={false}
      newestOnTop
      pauseOnFocusLoss
      pauseOnHover
      theme="dark"
      className="portfolio-toast-container"
      toastClassName="portfolio-toast"
      bodyClassName="portfolio-toast-body"
      progressClassName="portfolio-toast-progress"
      closeButton={false}
      {...props}
    />
  )
}