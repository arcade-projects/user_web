"use client";

import { useRouter } from 'next/navigation';
import RequestService from "@/app/services/RequestService";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const HotPotatoJoinPage = () => {

    const router = useRouter();

    const [name, setName] = useState(String);
    const [pincode, setPincode] = useState(String);
    const [room, setRoom] = useState(String);

    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onChangePincodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPincode(e.target.value);
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            name: name,
            pincode: pincode
        }

        const player = new RequestService('/room/player');
        const data = await player.post(payload);

        if (data) {
            localStorage.setItem('room_id', data.room_id);
            localStorage.setItem('player_id', data.id);
            localStorage.setItem('player_name', data.player_name);
            router.push('/hotpotato/' + data.room_id);
        }
    }

    useEffect(() => {

        const getRoom = async () => {
            const room = new RequestService('/room/' + pincode);
            const data = await room.get();
        }

        getRoom();

    }, []);

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    onChange={onChangeNameHandler} 
                />
                <input 
                    type="text" 
                    name="pincode" 
                    placeholder="Pin Code" 
                    onChange={onChangePincodeHandler}
                />

                <button
                    type="submit"
                >
                    Join
                </button>
            </form>
        </>
    );
}

export default HotPotatoJoinPage;