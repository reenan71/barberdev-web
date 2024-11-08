import {useState, ChangeEvent} from 'react'
import Head from 'next/head';
import {Sidebar} from '../../components/sidebar';
import { 
    Flex,
    Text,
    Heading,
    Box,
    Input,
    Button,
    useMediaQuery,
    Stack,
    Switch
} from '@chakra-ui/react';

import Link from 'next/link'
import Router from 'next/router'
import {FiChevronLeft} from 'react-icons/fi'

// Autenticador de usuario logado
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'


interface HaircutProps{
    id: string;
    name: string;
    price: string | number;
    status: boolean;
    user_id: string;
}

interface SubscriptionsProps {
    id: string;
    status: string;
}

interface EditHaircutProps{
    haircut: HaircutProps;
    subscription: SubscriptionsProps | null;
    count: number;
}


export default function EditHaircut({subscription , haircut, count}: EditHaircutProps){

    const [name, setName] = useState(haircut?.name)
    const [price, setPrice] = useState(haircut?.price)
    const [status, setStatus] = useState(haircut?.status)
    const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? "disabled" : "enabled")

    function handleChangeStatus(e: ChangeEvent<HTMLInputElement>){
        if(e.target.value === 'disabled'){
            setDisableHaircut("enabled");
            setStatus(false);
        }else{
            setDisableHaircut("disabled");
            setStatus(true);
        }
    }

    async function handleUpdate(){
        if(name === '' || price === ''){
            return;
        }

        try{
            const apiClient = setupAPIClient();
            await apiClient.put('/haircut', {
                name: name,
                price: Number(price),
                status: status,
                haircut_id: haircut?.id
            })
            alert("Modelo atualizado com sucesso")
            Router.push('/haircuts')

        }catch(err){
            console.log(err);
            alert("Erro ao editar o modelo")
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
                        Modelos de Cortes
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
                        Editar Modelo
                    </Heading>

                    <Flex w="85%" direction="column">
                    <Input 
                    placeholder="Nome do corte ou serviço"
                    size="lg"
                    type='text'
                    bg="gray.900"
                    color="fonts.primary"
                    mb={4}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />

                    <Input 
                    placeholder="Valor do corte ou serviço 'ex 40.00'"
                    size="lg"
                    type='text'
                    bg="gray.900"
                    color="fonts.primary"
                    mb={4}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />

                    <Stack mb={6} align="center" direction="row">
                        <Text fontWeight="bold" color="fonts.primary">Desativar corte</Text>
                        <Switch 
                        value={disableHaircut}
                        isChecked={disableHaircut === 'disabled' ? false : true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeStatus(e)}
                        size="lg"
                        colorScheme="red"
                        />
                    </Stack>

                    <Button
                    size="lg"
                    color="gray.900"
                    bg="button.cta"
                    mb={6}
                    _hover={{bg: '#ffb13e'}}
                    fontWeight="bold"
                    disabled={subscription?.status !== "active"}
                    onClick={handleUpdate}
                    >
                        Salvar
                    </Button>

                    {subscription?.status !== "active"  && count >= 3 && (
                      <Flex direction="row" align="center" justify="center">
                        <Link href="/planos">
                            <Text color="#31fb6a" fontWeight="bold" cursor='pointer' mr={1}>Seja Premium</Text>
                        </Link>
                        <Text color="fonts.primary">e tenha acesso a todas as funcionalidades.</Text>
                        </Flex>
                    )}
                    </Flex>
                </Flex>
            </Flex>
        </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(context) => {
    const { id } = context.params
    
    try{
        const apiClient = setupAPIClient(context);
        const check = await apiClient.get('/haircut/check')
        const count = await apiClient.get('/haircut/count')
        const response = await apiClient.get('/haircut/detail', {
            params:{
                haircut_id: id,
            }
        })

        return {
            props: {
                haircut: response.data,
                subscription: check.data?.subscriptions,
                count: count.data
            }
        }
   
    }catch(err){
        return{
            redirect:{
                destination: '/haircuts', 
                permanent: false
            }
        }
    }
})