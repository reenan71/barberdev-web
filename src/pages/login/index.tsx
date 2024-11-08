import { useContext, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import logoImg from '../../../public/images/logo.svg'
import { Center, Flex, Text, Input, Button} from '@chakra-ui/react'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'
import { canSSRGuest} from '../../utils/canSSRGuest'

export default function Login(){
  const { signIn } = useContext(AuthContext)


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(){

    if(email === '' || password === ''){
      return;
    }

    await signIn({
      email,
      password,
    })
  }
  return(
    <>
      <Head>
        <title>BarberPRO - Faça o login para acessar</title>
      </Head>
      <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center">
        <Flex width={640} direction="column" p={14} rounded={8}>
            <Center p={4}>
                <Image
                    src={logoImg}
                    quality={100}
                    objectFit='fill'
                    width={240}
                    alt="logo-BarberPRO"
                />
            </Center>
            <Input 
                    background="barber.400"
                    variant="filled"
                    size="lg"
                    color="barber.100"
                    placeHolder="email@email.com"
                    type="email"
                    mb={3}
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />
            <Input 
                    background="barber.400"
                    variant="filled"
                    size="lg"
                    color="barber.100"
                    placeHolder="********"
                    type="password"
                    mb={3}
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                />

            <Button
                background="button.cta"
                mb={6}
                color="gray.900"
                size="lg"
                _hover={{ bg: '#ffb13e   '}}
                onClick={handleLogin}
            >
                Acessar
            </Button>
            <Center mt={30}>
                <Link href="/register">
                    <Text 
                    cursor="pointer" 
                    color="fonts.primary" 
                    _hover={{color: '#c7c7c7'}}
                    >
                        Ainda não possui uma conta? <strong>Cadastre-se</strong>
                    </Text>
                </Link>
            </Center>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {

    }
}
})