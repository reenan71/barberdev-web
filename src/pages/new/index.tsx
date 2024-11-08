import { useState, ChangeEvent} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { Sidebar } from '../../components/sidebar'
import { ImAddressBook } from "react-icons/im";
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
    Select
} from '@chakra-ui/react';
import {FiChevronLeft} from 'react-icons/fi'

//Permite que somente pessoas autorizadas acessem a rota
import { canSSRAuth } from '../../utils/canSSRAuth'
//Comunicaçao com APIREST
import { setupAPIClient } from '../../services/api'


interface HaircutProps{
    id: string;
    name: string;
    price: string | number;
    status: boolean;
    user_id: string;
}

interface NewProps{
    haircuts: HaircutProps[];
}

export default function New({haircuts}: NewProps){

    const [ customer, setCustomer] = useState('');
    const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);
    const router = useRouter();

    function handleChangeSelect(id: string){
        const haircutItem = haircuts.find(item => item.id === id)

        setHaircutSelected(haircutItem)
    }

    async function handleRegister(){
        if(customer === ''){
            alert("Preencha o nome do cliente")
            return;
        }

        try{
            const apiClient = setupAPIClient()
            await apiClient.post('/schedule', {
                customer: customer,
                haircut_id: haircutSelected?.id,
            })

            router.push('/dashboard')

        }catch(err){
            console.log(err)
            alert("Erro ao registrar")
        }
    }
    

    return(
        <>
            <Head>
                <title>BarberPro - Novo agendamento</title>
            </Head>
            <Sidebar>
                <Flex direction="column" align="flex-start" justify="flex-start">
                    <Flex
                    direction="row"
                    w="100%"
                    align="center"
                    justify="flex-start"
                    >
                        <Link href="/dashboard" legacyBehavior>
                        <Button p={4} display="flex" alignItems="center" justifyContent="center" mr={4}>
                            <FiChevronLeft size={24} />
                            Voltar
                        </Button>
                        </Link>
                        <Heading direction="row" fontSize="3xl" mb={4} mt={4} mr={4} color="orange.900">
                            Agendamento
                        </Heading>
                        </Flex>

                        <Flex
                        maxW="700px"
                        pt={8}
                        pb={8}
                        w="100%"
                        direction="column"
                        align="center"
                        justify="center"
                        bg="barber.400"
                        >
                            <Input 
                            placeholder="Nome do Cliente"
                            w="85%"
                            mb={3}
                            size="lg"
                            type="text"
                            bg="barber.900"
                            color="barber.100"
                            value={customer}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
                            />

                            <Select
                            w="85%"
                            mb={3}
                            size="lg"
                            type="text"
                            color="barber.100"
                            bg="barber.900"
                            onChange={(e => handleChangeSelect(e.target.value))}
                            >
                                {haircuts?.map(item => (
                                    <option key={item?.id} value={item?.id}>{item?.name}</option>
                                ))}
                            </Select>

                            <Button
                            w="85%"
                            size="lg"
                            color="gray.900"
                            bg="button.cta"
                            _hover={{bg: "#ffb13e"}}
                            onClick={handleRegister}
                            >
                                Cadastrar
                            </Button>
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(context) =>{
    try{
        const apiClient = setupAPIClient(context)
        const response = await apiClient.get('/haircuts', {
            params:{
                status: true,
            }
        })

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