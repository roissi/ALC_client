import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useBreakpointValue, Heading, Flex, Link, Text, Image, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Agenda from '../components/Agenda';
import Interests from '../components/Interests';
import ConsultTheCoach from '../components/ConsultTheCoach';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GradientBox from '../themes/animations.js';
import LegalNoticesModal from '../components/LegalNotices';
import PrivacyPolicyModal from '../components/PrivacyPolicy';

export default function Home() {
  const [currentView, setCurrentView] = useState('agenda');
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLegalNoticesOpen, setIsLegalNoticesOpen] = useState(false);
  const openLegalNotices = () => setIsLegalNoticesOpen(true);
  const closeLegalNotices = () => setIsLegalNoticesOpen(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const openPrivacyPolicy = () => setIsPrivacyPolicyOpen(true);
  const closePrivacyPolicy = () => setIsPrivacyPolicyOpen(false);

  const headingSize = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' });
  const displayMenu = useBreakpointValue({ base: 'none', md: 'none', lg: 'flex', xl: 'flex' });
  const displayButton = useBreakpointValue({ base: 'block', md: 'block', lg: 'none', xl: 'none' });
  const footerDirection = useBreakpointValue({ base: 'column', md: 'column', lg: 'row' });
  const footerItemSpacing = useBreakpointValue({ base: 1, md: 1, lg: 0 });
  const footerItemSpacingImg = useBreakpointValue({ base: 3, md: 3, lg: 0 });
  const footerSpacing = useBreakpointValue({ base: 0, md: 4, lg: 6, xl: 8 });
  const imageSize = useBreakpointValue({ base: "60px", md: "60px", lg: "80px" });
  const imageSpacing = useBreakpointValue({ base: 0, md: 0, lg: 7 });

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
              display={displayButton}
              onClick={openMenu} 
            />
            <Drawer isOpen={isMenuOpen} placement="top" onClose={closeMenu}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerBody>
                    <Flex direction="column">
                      <Heading onClick={() => setCurrentView('agenda')}>My amazing week</Heading>
                      <Heading onClick={() => setCurrentView('interests')}>My interests</Heading>
                      <Heading onClick={() => setCurrentView('coach')}>Consult the coach</Heading>
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
            <Flex direction="row" display={displayMenu}>
              <Heading
                size={headingSize}
                cursor="pointer"
                color={currentView === 'agenda' ? 'quaternary' : 'white'}
                _hover={{ color: "quinary" }}
                onClick={() => setCurrentView('agenda')}
                mx={{ lg: 5, xl:10 }}
              >
                My amazing week
              </Heading>
              <Heading
                size={headingSize}
                cursor="pointer"
                color={currentView === 'interests' ? 'quaternary' : 'white'}
                _hover={{ color: "quinary" }}
                onClick={() => setCurrentView('interests')}
                mx={{ lg: 5, xl:10 }}
              >
                My interests
              </Heading>
              <Heading
                size={headingSize}
                cursor="pointer"
                color={currentView === 'coach' ? 'quaternary' : 'white'}
                _hover={{ color: "quinary" }}
                onClick={() => setCurrentView('coach')}
                mx={{ lg: 5, xl:10 }}
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
  flexDirection={footerDirection}
  justifyContent="center"
  alignItems="center"
  as="footer"
  p={4}
  mx={4}
  borderRadius="md"
  mt={1}
>
  <Link
    href="https://portfolio-roissi.vercel.app/"
    isExternal textDecoration="none"
    _hover={{ textDecoration: "none" }}
    color="white"
    mx={footerSpacing}
    my={footerItemSpacing}>
      About
  </Link>
  <Link
    href="https://www.linkedin.com/in/cyril-de-graeve/"
    isExternal
    textDecoration="none"
    _hover={{ textDecoration: "none" }}
    color="white"
    mx={footerSpacing}
    my={footerItemSpacing}>
      Contact
    </Link>
    <Link onClick={openLegalNotices} textDecoration="none" _hover={{ textDecoration: "none" }} color="white" mx={footerSpacing} my={footerItemSpacing}>Legal Notices</Link>
    <Link onClick={openPrivacyPolicy} textDecoration="none" _hover={{ textDecoration: "none" }} color="white" mx={footerSpacing} my={footerItemSpacing}>Privacy Policy</Link>
  <Image src="/img/brain_dark.png" alt="Logo ALC" width={imageSize} mr={imageSpacing} my={footerItemSpacingImg}/>
  <Text fontSize="md" color="white">&copy; roissi / 2023</Text>
</Flex>

<LegalNoticesModal isOpen={isLegalNoticesOpen} onClose={closeLegalNotices} />
<PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={closePrivacyPolicy} />

</GradientBox>
);
}