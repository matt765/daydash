'use client';

import { Notepad } from '@/components/views/notepad/Notepad';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function NotepadPage() {
  return (
    <ProtectedRoute>
      <Notepad />
    </ProtectedRoute>
  );
}
