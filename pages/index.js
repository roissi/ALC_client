import React, { useState, useEffect } from 'react';
import { Heading, Flex, Link, Text, IconButton, Drawer, DrawerOverlay, DrawerContent, Image, DrawerCloseButton, DrawerBody } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Agenda from '../components/Agenda';
import Interests from '../components/Interests';
import ConsultTheCoach from '../components/ConsultTheCoach';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GradientBox from '../themes/animations.js'; 


export default function Home() {
  const [currentView, setCurrentView] = useState('agenda');
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <GradientBox borderRadius="md" p={4}>
      <Flex justify="center" width="100%" mx="auto">
        {isClient && (
          <>
            <IconButton 
              icon={<HamburgerIcon />} 
              display={["block", "block", "block", "none", "none"]}
              onClick={openMenu} 
            />
            <Drawer isOpen={isMenuOpen} placement="top" onClose={closeMenu}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerBody>
                    {/* Votre menu ici sous forme de liste ou de Flex, par exemple */}
                    <Flex direction="column">
                      <Heading onClick={() => setCurrentView('agenda')}>My amazing week</Heading>
                      <Heading onClick={() => setCurrentView('interests')}>My interests</Heading>
                      <Heading onClick={() => setCurrentView('coach')}>Consult the coach</Heading>
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
            
            {/* Ceci est votre menu actuel, masqué pour sm et md */}
            <Flex direction="row" display={["none", "none", "none", "flex", "flex"]}>

            <Heading
              size={["sm", "md", "lg", "xl", "xl"]}
              cursor="pointer"
              color={currentView === 'agenda' ? 'quaternary' : 'white'}
              _hover={{ color: "quinary" }}
              onClick={() => setCurrentView('agenda')}
              mx={["3", "6", "9", "12", "12"]}
            >
              My amazing week
            </Heading>
            <Heading
              size={["sm", "md", "lg", "xl", "xl"]}
              cursor="pointer"
              color={currentView === 'interests' ? 'quaternary' : 'white'}
              _hover={{ color: "quinary" }}
              onClick={() => setCurrentView('interests')}
              mx={["3", "6", "9", "12", "12"]}
            >
              My interests
            </Heading>
            <Heading
              size={["sm", "md", "lg", "xl", "xl"]}
              cursor="pointer"
              color={currentView === 'coach' ? 'quaternary' : 'white'}
              _hover={{ color: "quinary" }}
              onClick={() => setCurrentView('coach')}
              mx={["3", "6", "9", "12", "12"]}
            >
              <FontAwesomeIcon icon="comments" beatFade style={{ marginRight: "15px" }} />
              Consult the coach
            </Heading>
            </Flex>
          </>
          )}
        </Flex>

      {currentView === 'agenda' && <Agenda />}
      {currentView === 'interests' && <Interests />}
      {currentView === 'coach' && <ConsultTheCoach />}

      <Flex
            justifyContent="center"
            alignItems="center"
            as="footer"
            p={4}
            mx={4}
            borderRadius="md"
            mt={1}
          >
            <Link isExternal textDecoration="none" _hover={{ textDecoration: "none" }} color="white" mx={8}>À propos</Link>
            <Link isExternal textDecoration="none" _hover={{ textDecoration: "none" }} color="white" mx={8}>Contacts</Link>
            <Link isExternal textDecoration="none" _hover={{ textDecoration: "none" }} color="white" mx={8}>Mentions Légales</Link>
            <Link isExternal textDecoration="none" _hover={{ textDecoration: "none" }} color="white" mx={8}>Politique de confidentialité</Link>
            <Image src="/img/brain_dark.png" alt="Logo ALC" width="80px" mr={7} />
            <Text fontSize="md" color="white">&copy; roissi / 2023</Text>
          </Flex>


    </GradientBox>
  );
}