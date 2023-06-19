import React from 'react';
import { useRouter } from 'next/router';
import Message from '@/app/ui/Message';

function ChatPage() {
  const router = useRouter();
  const { contactId } = router.query;

  return <Message contactId={contactId as string} />;
}

export default ChatPage;
