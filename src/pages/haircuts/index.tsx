import { useContext, useState, ChangeEvent} from 'react'
import Head from 'next/head'
import { 
    Flex,
    Text,
    Heading,
    Box,
    Input,
    Button,
    Switch, 
    Stack,
    useMediaQuery,
} from '@chakra-ui/react';
import {IoMdPricetag} from 'react-icons/io';
import { Sidebar} from '../../components/sidebar';
import Link from 'next/link'


import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'


interface HaircutItem {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface HaircutsProps{
    haircuts: HaircutItem[];
}

export default function Haircuts({haircuts}: HaircutsProps){

    const [haircutList, setHaircutList] = useState<HaircutItem[]>(haircuts || [] )
    const [disableHaircut, setDisableHaircut] = useState("enabled")

    async function handleChangeStatus(e: ChangeEvent<HTMLInputElement>){
        const apiClient = setupAPIClient();
        

        if(e.target.value === "disabled"){
            setDisableHaircut("enabled")
            const response = await apiClient.get('/haircuts', {
                params: {
                    status: true
                }
            })

            setHaircutList(response.data)

        }else{
            setDisableHaircut("disabled")
            const response = await apiClient.get('/haircuts', {
                params: {
                    status: false
                }
            })

            setHaircutList(response.data)
        }
    }

    const [isMobile] = useMediaQuery('(max-width: 500px)')

    return(
        <>
            <Head>
                <title>BarberPRO - Meus Serviços</title>
            </Head>
            <Sidebar>
                <Flex  direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Flex 
                    w="100%"
                    direction={isMobile ? "column" : "row"} 
                    alignItems={isMobile ? "flex-start" : "center"}
                    justifyContent="flex-start"
                    mb={0}
                    >
                         
                        
                        <Heading 
                        fontSize={isMobile ? "28px" : "3xl"}
                        mt={4} 
                        mb={4}
                        mr={4}
                        color="orange.900"
                        >
                            Modelos de Serviços
                        </Heading>

                        <Link href="/haircuts/new">
                            <Button>
                                Cadastrar Serviço
                            </Button>
                        </Link>

                        <Stack ml="auto" align="center" direction="row" mb={4}>
                            <Text color="orange.900" fontWeight='bold'>ATIVOS</Text>
                            <Switch
                                colorScheme="green"
                                size='lg'
                                value={disableHaircut}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeStatus(e)}
                                isChecked={disableHaircut === "disabled" ? false : true}
                            />                          
                        </Stack>
                    </Flex>

                    {haircutList.map(haircut => (
                        <Link key={haircut.id} href={`/haircuts/${haircut.id}`} legacyBehavior>
                        <Flex 
                        cursor='pointer'
                        w='100%'
                        p={4}
                        bg="barber.400"
                        direction={isMobile ? "column" : "row"}
                        align={isMobile ? "flex-start" : "center"}
                        rounded="4"
                        mb={2}
                        justifyContent="space-between"
                        >
                            <Flex mb={isMobile ? 2 : 0 } direction="row" alignItems="center" justifyContent="center">
                                <IoMdPricetag size={28} color="#fba931"  />
                                <Text color="fonts.primary" fontWeight="bold" noOfLines={2}  ml={4}>
                                    {haircut.name}
                                </Text>
                            </Flex> 
                            <Text color="fonts.primary" fontWeight="bold">Preço: R$ {haircut.price}</Text>
                        </Flex>
                        </Link>
                    ))}

                    
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth ( async (context) => {

    try{
        const apiClient = setupAPIClient(context);
        const response = await apiClient.get('/haircuts',
            {
                params: {
                    status: true,
                }
            }
        )

        if(response.data === null){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return{
            props: {
                haircuts: response.data
            }
            
        }


    }catch(err){
        return{
            redirect:{
                destination: '/dashboard',
                permanent: false
            }
        }
    }


})