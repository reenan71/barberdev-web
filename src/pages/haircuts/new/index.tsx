import {useState} from 'react'
import Head from 'next/head';
import {Sidebar} from '../../../components/sidebar';
import { 
    Flex,
    Text,
    Heading,
    Box,
    Input,
    Button,
    useMediaQuery
} from '@chakra-ui/react';

import Link from 'next/link'
import Router from 'next/router'
import {FiChevronLeft} from 'react-icons/fi'

// Autenticador de usuario logado
import { canSSRAuth } from '../../../utils/canSSRAuth'
import { setupAPIClient } from '../../../services/api'


interface NewHaircutProps{
    subscription: boolean;
    count: number;
}

export default function NewHaircut({subscription, count}: NewHaircutProps){

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    async function handleRegister(){
        if(name === '' || price === ''){
            return;
        }

        try{
            const apiClient = setupAPIClient();
            await apiClient.post('/haircut', {
                name: name,
                price: Number(price),
            })

            Router.push('/haircuts')

        }catch(err){
            console.log(err);
            alert("Erro ao cadastrar o modelo")
        }
    }

    const [isMobile] = useMediaQuery("(max-width: 500px)")
    return(
        <>
        <Head>
            <title>BarberPRO - Novo modelo de corte</title>
        </Head>
        <Sidebar>
            <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                <Flex 
                direction={isMobile ? "column" : "row"} 
                w="100%" 
                alignItems={isMobile ? "flex-start" : "center"}
                mb={isMobile ? 4 : 0}
                >
                    <Link href="/haircuts" legacyBehavior>
                        <Button p={4} display="flex" alignItems="center" justifyContent="center" mr={4}>
                            <FiChevronLeft size={24} />
                            Voltar
                        </Button>
                    </Link>
                    <Heading
                    fontSize={isMobile ? "28px" : "3xl"}
                    mt={4} 
                    mb={4}
                    mr={4}
                    color="orange.900"
                    >
                        Cadastro de Serviços
                    </Heading>
                </Flex>

                <Flex 
                direction="column"
                maxW="700px"
                bg="barber.400"
                w="100%"
                align="center"
                justify="center"
                pt={8}
                pb={8}
                >
                    <Heading 
                    color="fonts.primary"
                    fontSize={isMobile ? "22px" : "3xl"}
                    mb={4}
                    >
                        Cadastrar Modelo
                    </Heading>
                    <Input 
                    placeholder="Nome do corte ou serviço"
                    size="lg"
                    type='text'
                    w="85%"
                    bg="gray.900"
                    color="fonts.primary"
                    mb={4}
                    disabled={!subscription && count >= 3}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />

                    <Input 
                    placeholder="Valor do corte ou serviço 'ex 40.00'"
                    size="lg"
                    type='text'
                    w="85%"
                    bg="gray.900"
                    color="fonts.primary"
                    mb={4}
                    disabled={!subscription && count >= 3}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />

                    <Button
                    w="85%"
                    size="lg"
                    color="gray.900"
                    bg="button.cta"
                    mb={6}
                    _hover={{bg: '#ffb13e'}}
                    fontWeight="bold"
                    disabled={!subscription && count >= 3}
                    onClick={handleRegister}
                    >
                        Cadastrar
                    </Button>

                    {!subscription && count >= 3 && (
                        <Flex direction="row" align="center" justify="center">
                            <Text color="fonts.primary">Você atingiu seu limite de serviço.</Text>
                        <Link href="/planos">
                            <Text color="#31fb6a" fontWeight="bold" cursor='pointer' ml={1}>Seja Premium</Text>
                        </Link>
                        </Flex>
                        
                    )}
                </Flex>
            </Flex>
        </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth ( async (context) => {

    try{
        const apiClient = setupAPIClient(context);

        const response = await apiClient.get('/haircut/check')

        const count = await apiClient.get('/haircut/count')

        return{
            props: {
                subscription: response.data?.subscriptions?.status === "active" ? true : false,
                count: count.data
            }
        }


    }catch(err){
        redirect:{
            destination: '/dashboard'
            permanent: false
        }
    }


})
    