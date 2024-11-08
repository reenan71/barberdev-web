import {useState} from 'react'
import Head from 'next/head';
import { 
    Flex,
    Text,
    Heading,
    Button,
    Link as ChakraLink,
    useMediaQuery,
    useDisclosure
} from '@chakra-ui/react';
import Link from 'next/link'
import { IoMdPerson } from 'react-icons/io';
//Permite que somente pessoas autorizadas acessem a rota
import { canSSRAuth } from '@/utils/canSSRAuth';
//Comunicaçao com APIREST
import { setupAPIClient } from '../../services/api'
import { Sidebar } from '../../components/sidebar'
import { ModalInfo } from '@/components/modal';


export interface ScheduleItem{
  id: string;
  customer: string;
  haircut:{
    name: string;
    id: string;
    price: string | number;
    user_id: string;
  }
}


interface DashboardProps {
  schedule: ScheduleItem[]
}




export default function Dashboard({schedule}: Readonly<DashboardProps>) {

  const [listHaircut, setListHaircut] = useState(schedule)
  const [service, setService] = useState<ScheduleItem>()
  const { isOpen, onClose, onOpen} = useDisclosure()

  function handleOpenModal(item: ScheduleItem){
    setService(item);
    onOpen()
  }




    const [isMobile] = useMediaQuery("(max-width: 500px)")
    return(
        <>
        <Head>
            <title>BarberPRO - Minha barbearia</title>
        </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex w="100%" direction="row" align="center" justify="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange.900">
              Agenda
            </Heading>
            <Link href="/new">
              <Button fontSize="3xl" alignItems="center" justifyContent="center">+</Button>
            </Link>
          </Flex>

        {listHaircut.map(item => (
              <ChakraLink
              onClick={ () => handleOpenModal(item)}
              key={item?.id}
              w="100%"
              m={0}
              p={0}
              mt={1}
              bg="transparent" 
              style={{ textDecoration: 'none' }}                     
            >
              <Flex 
              w="100%"
              direction={isMobile ? "column" : "row"}
              p={4}
              rounded={4}
              mb={2}
              bg="barber.400"
              justify="space-between"
              align={isMobile ? "flex-start" : "center"}
              >
                <Flex direction="row" mb={isMobile ? 2 : 0} align="center" justify="center">
                  <IoMdPerson size={28} color="#fba931" />
                  <Text fontWeight="bold" ml={4} noOfLines={1} color="fonts.primary">{item?.customer}</Text>
                </Flex>
  
                <Text fontWeight="bold" mb={isMobile ? 2 : 0} color="fonts.primary">{item?.haircut?.name}</Text>
                <Text fontWeight="bold" mb={isMobile ? 2 : 0} color="fonts.primary"> R$ {item?.haircut?.price} </Text>
              </Flex>
            </ChakraLink>
        ))}


        </Flex>
      </Sidebar>
      <ModalInfo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={service}
        finishService={ async () => {}}
      />
        </>
    )
}

//Permite que somente usuarios com token acessem a rota
export const getServerSideProps = canSSRAuth(async (context) =>{
    try{
      const apiClient = setupAPIClient(context);
      const response = await apiClient.get('/schedule')

      return{
        props:{
          schedule: response.data,
        }
      }



    }catch(err){
      console.log(err)
      return {
        props: {
          prop:{
            schedule: []
          }
        }
    }
    }
})