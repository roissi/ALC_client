import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex } from "@chakra-ui/react";
import Agenda from '../components/Agenda';
import Interests from '../components/Interests';
import ConsultTheCoach from '../components/ConsultTheCoach';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Home() {
  const [currentView, setCurrentView] = useState('agenda');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box bg="#343440" minH="100vh" p={4}>
      <Flex justify="center" width="80%" mx="auto">
        {isClient && (  // Condition pour afficher les icônes seulement côté client
          <>
            <Heading
          size="xl"
          cursor="pointer"
          color={currentView === 'agenda' ? '#ffcf25' : 'white'}
          _hover={{ color: "#ffcf25" }}
          onClick={() => setCurrentView('agenda')}
          mx={12}
        >
          <FontAwesomeIcon icon="calendar-days" style={{ marginRight: "15px" }} />
          My amazing week
        </Heading>
        <Heading
          size="xl"
          cursor="pointer"
          color={currentView === 'interests' ? '#ffcf25' : 'white'}
          _hover={{ color: "#ffcf25" }}
          onClick={() => setCurrentView('interests')}
          mx={12}
        >
          <FontAwesomeIcon icon="thumbs-up" style={{ marginRight: "15px" }} />
          My interests
        </Heading>
        <Heading
          size="xl"
          cursor="pointer"
          color={currentView === 'coach' ? '#ffcf25' : 'white'}
          _hover={{ color: "#ffcf25" }}
          onClick={() => setCurrentView('coach')}
          mx={12}
        >
          <FontAwesomeIcon icon="comments" beatFade style={{ marginRight: "15px" }} />
          Consult the coach
          </Heading>
          </>
        )}
      </Flex>

      {currentView === 'agenda' && <Agenda />}
      {currentView === 'interests' && <Interests />}
      {currentView === 'coach' && <ConsultTheCoach />}
    </Box>
  );
}