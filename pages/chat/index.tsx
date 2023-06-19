import React from 'react';
import { useRouter } from 'next/router';
import Chat from '@/app/ui/chat';

function ChatPage() {
  const router = useRouter();
  const { contactId } = router.query;

  return <Chat />;
}

export default ChatPage;
