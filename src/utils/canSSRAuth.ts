import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import {AuthTokenError} from '../services/errors/AuthTokenError'


export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context);

        const token = cookies['@barber.token'];

        if(!token){
            return{
                redirect:{
                    destination: '/login',
                    permanent: false,
                }
            }
        }

        try {
            return await fn(context)
        } catch (error) {
            if(error instanceof AuthTokenError){
                destroyCookie(context, '@barber.token', { path: '/'})

                return{
                    redirect:{
                        destination: '/',
                        permanent: false,
                    }
                }
            }
        }


    }
}
