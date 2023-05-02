import AuthProvider, { AuthContext } from '@/context/AuthContext';
import {
    Typography,
    TextField,
    Button,
    Grid,
    Card
} from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Toastify from 'toastify-js'


type Contact = {
    name: string;
    phone: string;
}


export default function PhonePage() {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [phoneList, setPhoneList] = useState<Contact[]>([]);
    const { name: userName } = useContext(AuthContext)


    useEffect(() => {
        const phoneList = localStorage.getItem('phoneList')
        if (phoneList) {
            setPhoneList(JSON.parse(phoneList))
        }
    }, [])

    const registerNumber = () => {
        const formatPhone = phone.replace(/(\d{2})?(\d{5})?(\d{4})/, "($1)$2-$3")
        const newContact = {
            name,
            phone: formatPhone
        };
        if (newContact.phone.length < 10) {
            Toastify({
                text: 'O numero deve ter pelo menos 10 caractéres',
                duration: 5000
            }).showToast();
            return;
        }
        setPhoneList([...phoneList, newContact]);
        localStorage.setItem('phoneList', JSON.stringify([...phoneList, newContact]));
        Toastify({
            text: 'Telefone Cadastrado com sucesso',
            duration: 5000
        }).showToast();

        setName('');
        setPhone('');
    }

    const handleDeleteContact = (index: number): void => {
        const storedList = JSON.parse(localStorage.getItem('phoneList') || '[]') as Contact[];
        const updatedList = [...storedList];
        updatedList.splice(index, 1);
        setPhoneList(updatedList);
        localStorage.setItem('phoneList', JSON.stringify(updatedList));
    }

    return (
        <Box
            width='100vw'
            height='100vh'
            display='flex'
            flexDirection='column'
            alignItems='center'
        >
            <Box width='50vw'>
                <Typography style={{ color: 'blue' }} variant='h6' align='center'>
                    {`Lista Telefonica de ${userName}`}
                </Typography>
                <Grid
                    container
                    spacing={1}
                    alignItems='center'
                >
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label="Nome do amigo"
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label="Número"
                            type='tel'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button
                            style={{ padding: 15 }}
                            fullWidth
                            color='primary'
                            variant='contained'
                            onClick={() => registerNumber()}
                        >
                            Cadastrar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {phoneList && phoneList.map(({ name, phone }, index) => (
                <Box
                    width='50vw'
                    justifyContent='space-around'
                    alignItems='baseline'
                    display='flex'
                    bgcolor='blue'
                    borderRadius={1}
                    padding='5px 0'
                    marginTop={1}
                    key={index}
                >
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{name}</span>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{phone}</span>
                    <DeleteIcon style={{ cursor: 'pointer' }} color='inherit' onClick={() => handleDeleteContact(index)} />

                </Box>
            ))}

        </Box >
    )
}
