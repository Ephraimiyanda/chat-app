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
    <div className='h--[89] overflow-auto pl-3 pr-1 pb-16'>
      <ul>
        {contacts.map((contact) => (
          <li className=' cursor-pointer' key={contact.id} onClick={() => handleContactClick(contact.id)}>
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
