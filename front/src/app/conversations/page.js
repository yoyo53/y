"use client"
import { useEffect, useState, Fragment } from 'react';
let token;
import Newconv from './newconvcomposant';
export function Conversations() {
  const [conversations, setConversations] = useState([]);
  
  function getRandomProfilePicture(username) {
    const hash = username.split('').reduce((acc, char) => {
      acc = ((acc << 5) - acc) + char.charCodeAt(0);
      return acc & acc;
    }, 0);
    return `https://picsum.photos/seed/${hash}/200`;
  }


  useEffect(() => {
    token = window.localStorage.getItem("token");
    // Utilisation de fetch pour récupérer les conversations depuis l'API
    fetch(`${process.env.ROOTAPI}/conversations/getconversations`,
    {
      method: 'GET',
      headers: {  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` },
    }
      )
      .then((response) => response.json())
      .then((data) => {
        console.log('Réponse reçue:', data);
        setConversations(data);
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite lors de la récupération des conversations:', error);
      });
  }, []);

  return (
<div className="h-screen">
  <div className="m-10 rounded-lg overflow-hidden">
  <Newconv 
    token={token}/>
    <ul className="bg-gray-100 shadow-md divide-y divide-gray-200 mt-4 rounded-lg">
      {conversations.map((conversation) => (
        <li key={conversation.id} className="p-8 hover:bg-gray-50">
          <a href={`/conversations/chatpage?id=${conversation.id}`} className="block cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-300">
                  <img src={getRandomProfilePicture(conversation.other_username)} alt="Profile Picture" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <p className="text-xl font-semibold">{conversation.other_username}</p>
                  <p className="text-gray-500">Conversation ID: {conversation.id}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500">ID: {conversation.id}</p>
                {true ? (
                  <p className="text-gray-500">
                    Last seen <time dateTime="1">1</time>
                  </p>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <p className="text-green-500 font-semibold">Online</p>
                  </div>
                )}
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </div>
</div>




  );
}

export default Conversations;
