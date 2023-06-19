import React from 'react';

interface ContactsProps {
  onContactSelect: (contactId: string) => void;
}

function Contacts({ onContactSelect }: ContactsProps) {
  const contacts = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Jane' },
    { id: '3', name: 'Alice' },
  ];

  const handleContactClick = (contactId: string) => {
    onContactSelect(contactId);
  };

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} onClick={() => handleContactClick(contact.id)}>
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
