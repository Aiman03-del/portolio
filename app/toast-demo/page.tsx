'use client';

import { ToastProvider, useToast } from '@/components/ui/toast-1';

function PageContent() {
  const { showToast } = useToast();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 px-6 py-16 text-white">
      <button
        onClick={() => showToast('Operation successful.', 'success', 'top-right')}
        className="rounded-full bg-neutral-100 px-4 py-2 font-medium text-black hover:bg-opacity-90"
      >
        Show Success Toast
      </button>

      <button
        onClick={() => showToast('There was an error.', 'error', 'bottom-left')}
        className="rounded-full bg-neutral-100 px-4 py-2 font-medium text-black hover:bg-opacity-90"
      >
        Show Error Toast
      </button>

      <button
        onClick={() => showToast('Check this warning.', 'warning', 'top-left')}
        className="rounded-full bg-neutral-100 px-4 py-2 font-medium text-black hover:bg-opacity-90"
      >
        Show Warning Toast
      </button>

      <button
        onClick={() => showToast('Here is some info.', 'info', 'bottom-right')}
        className="rounded-full bg-neutral-100 px-4 py-2 font-medium text-black hover:bg-opacity-90"
      >
        Show Info Toast
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <ToastProvider>
      <PageContent />
    </ToastProvider>
  );
}