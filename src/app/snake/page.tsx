'use client';

import { SnakeGame } from '@/components/views/snake/Snake';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function SnakePage() {
  return (
    <ProtectedRoute>
      <SnakeGame />
    </ProtectedRoute>
  );
}
