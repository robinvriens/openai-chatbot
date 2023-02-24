import { useState } from 'react';

import Form from './chat/Form';
import Head from './chat/Head';
import Messages from './chat/Messages';
import Chip from './chat/Chip';
import BotConfig from '../../public/configs/bot-config.json';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [personas, setPersonas] = useState(BotConfig.Personas);
  const [selectedPersona, setSelectedPersona] = useState(BotConfig.Personas.find(x => x.active));
  const onPersonaClick = (persona) => {
    setSelectedPersona(persona);
    const updatedPersonas = personas.map(x => ({ ...x, active: x.key == persona.key }));
    setPersonas(updatedPersonas);
  }

  return (
    <div className="bg-[#2F343C] rounded-3xl p-12">
      <Head />
      <div className="w-full h-[1px] my-8 bg-[#4F5361]" />
      <div className='flex flex-row place-content-around'>
        {personas.map(persona =>
          <Chip onChipClick={() => onPersonaClick(persona)} active={persona.active} key={persona.key}>{persona.name}</Chip>
        )}
      </div>
      <div className="w-full h-[1px] my-8 bg-[#4F5361]" />
      <Messages messages={messages} />
      <div className="w-full h-[1px] my-8 bg-[#4F5361]" />
      <Form setMessages={setMessages} persona={selectedPersona?.key}/>
    </div>
  );
}
