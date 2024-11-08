import { ReactNode } from "react";
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    Drawer,
    DrawerContent,
    useColorModeValue,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps
} from '@chakra-ui/react'

import {
    FiScissors,
    FiClipboard,
    FiSettings,
    FiMenu
 } from 'react-icons/fi'

 import { IconType } from "react-icons";
 import Link from "next/link";

 interface LinkItemsProps{
    name: string;
    icon: IconType;
    route: string;
 }

 const LinkItems: Array<LinkItemsProps> = [
    {name: 'Agenda', icon: FiScissors, route: '/dashboard'},
    {name: 'Cortes', icon: FiClipboard, route: '/haircuts'},
    {name: 'Minha conta', icon: FiSettings, route: '/profile'},
 ]



 export function Sidebar({children}: {children: ReactNode}){

    const {isOpen, onClose, onOpen } = useDisclosure();
    
    return(
        
         <Box minH="100vh" bg="barber.900">
            <SidebarContent
                onClose={() => onClose} display={{ base: 'none', md: "block"}} />

                <Drawer
                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    returnFocusOnClose={false}
                    onOverLayClick={onClose}
                    size="full"
                    onClose={onClose}
                >
                    <DrawerContent>
                        <SidebarContent  onClose={() => onClose()} />
                    </DrawerContent>
                </Drawer>

                <MobileNav display={{base: "flex", md: 'none'}}  onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
            {children}
            </Box>
        </Box>
        
       
    )
 }

 interface SidebarProps extends BoxProps {
    onClose: () => void;
 }

 const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    return(
        <Box
        bg="barber.400"
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
        >
            <Flex h="20" alignItems="center" justifyContent="space-between" mx="8">
                <Link href="/dashboard">
                    <Flex cursor="pointer" userSelect="none" flexDirection="row">
                        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="barber.100">Barber</Text>
                        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="orange">PRO</Text>
                    </Flex>
                </Link>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose} color="button.default" ></CloseButton>
            </Flex>

            {LinkItems.map(link => (
                <NavItem icon={link.icon} route={link.route} key={link.name}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
 }

 interface NavItemProps extends FlexProps{
    icon: IconType;
    children: ReactNode;
    route: string;
 }

 const NavItem = ({icon, children, route, ...rest}: NavItemProps) => {
   return(
    <Link href={route} style={{ textDecoration: 'none'}}>
    <Flex 
    align="center"
    p="4"
    mx="4"
    color="barber.100"
    borderRadius="lg"
    role="group"
    cursor="pointer"
    _hover={{
       bg: "barber.900",
       color: 'white'
    }}
    {...rest}
    >
        {icon && (
            <Icon mr={4} fontSize="16" as={icon} _groupHover={{ color: 'white'}}/>    
        )}
        {children}
    </Flex>
</Link>
   )
 }

 interface MobileProps extends FlexProps{
    onOpen: () => void;
 }

 const MobileNav = ({onOpen, ...rest}: MobileProps) => {
    return(
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 24}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}
        >
            <IconButton 
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Flex
                flexDirection="row"
            >
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="barber.100" ml={4}>Barber</Text>
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="orange">PRO</Text>
            </Flex>
        </Flex>
    )
 }