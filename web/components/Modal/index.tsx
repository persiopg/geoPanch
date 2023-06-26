import React from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="z-50 w-64 rounded bg-white p-4 shadow-md">
        {children}
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  )
}

export default Modal
