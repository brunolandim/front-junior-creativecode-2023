import React, { useContext, useState } from 'react'
import {
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
	TextField
} from '@material-ui/core'
import { Box } from '@mui/material'
import { authApi } from '@/provider/authProvider'
import { useRouter } from 'next/router'
import Toastify from 'toastify-js'
import AuthContextProvider, { AuthContext } from '@/context/AuthContext'

export default function LoginPage() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('');
	const router = useRouter();
	const { setUserEmail } = useContext(AuthContext);

	const userAuthentication = () => {
		const user = authApi.login(email, password)

		if (user === 'Email ou senha inválidos') {
			Toastify({
				text: user,
				duration: 5000
			}).showToast();
			return;
		}

		Toastify({
			text: 'Login realizado com sucesso =D',
			duration: 5000
		}).showToast();
		router.push('/lista_telefonica')
		setUserEmail(email)

		return user
	}

	return (
		<Box
			width='100vw'
			height='100vh'
			display='flex'
			alignItems='center'
			justifyContent='center'
		>
			<Card style={{ border: '1px solid blue' }}>
				<CardContent>
					<Box
						color='white'
						display='flex'
						flexDirection='column'
						gap={2}
						width={400}
					>
						<Typography style={{ color: 'blue' }} variant='h6' align='center'>Login</Typography>
						<TextField
							fullWidth
							variant='outlined'
							label="Email"
							type='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							fullWidth
							variant='outlined'
							label="Senha"
							type='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Box>
				</CardContent>
				<CardActions>
					<Box width='100%' display='flex' justifyContent='center'>
						<Button
							color='primary'
							variant='contained'
							onClick={() => userAuthentication()}
						>
							Entrar
						</Button>
					</Box>
				</CardActions>
			</Card>
		</Box>
	)
}
