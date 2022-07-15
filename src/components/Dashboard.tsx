import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import CreateChannel from "./CreateChannel";
import DirectMessage from "./DirectMessage";
import RealTimeChat from "./RealTimeChat";
import logo from '../assets/logo-white.png';
import sendMessage from "../utilities/sendMessage";
import retrieveMessage from "../utilities/retrieveMessage";

interface sendMessageTypes {
    receiver_id: number
    receiver_class: "User" | "Class"
    body: string
    access_token: string,
    client: string,
    expiry: string,
    uid: string,
}

function Dashboard () {
    const [whoToChat, setWhoToChat] = useState({
        uid: '',
        id: 0
    })
    const [usersListOfUID, setUsersListOfUID] = useState({
        // this is for the channels
    })
    const [message, setMessage] = useState('')

    // return (
    //     <div className="flex flex-col justify-center items-center">
    //         <CreateChannel />
    //         <div>{whoToChat.uid}</div>
    //         <DirectMessage setWhoToChat={setWhoToChat}/>
            
    //     </div>
    // )

    function handleChatChange (e: ChangeEvent<HTMLTextAreaElement>) {
        setMessage(e.target.value)
	}

    async function handleSendMessage (e: MouseEvent<HTMLElement>){
        const userData = JSON.parse(localStorage.getItem('userLogIn')  || '{}')
        const sendMessageResponse = await sendMessage({
            receiver_id: whoToChat.id,
            receiver_class: "User",
            body: message,
            access_token: userData.access_token,
            client: userData.client,
            expiry: userData.expiry,
            uid: userData.uid,
        })

        if(sendMessageResponse.success){
            setMessage('')
            const retrieveMessageResponse = await retrieveMessage({
                receiver_id: whoToChat.id,
                receiver_class: "User",
                access_token: userData.access_token,
                client: userData.client,
                expiry: userData.expiry,
                uid: userData.uid,
            })

            console.log(retrieveMessageResponse)
        }

    }


    return (
		<div className="w-screen h-screen grid grid-rows-7 grid-cols-8 bg-white">
			<div className="grid grid-cols-3 place-content-around text-white row-span-1 col-span-8 bg-fuchsia-900 border border-t-0 border-b-0 border-l-0 border-solid border-white">
				<div className="ml-10 place-self-start">
					<img src={logo} className="w-32" alt="Slack Logo White" />
				</div>
				<div className="place-self-center text-black text-sm">
					<input
						type="text"
						placeholder="Search"
						className="p-2 w-80 bg-fuchsia-200 placeholder-gray-500 rounded-lg focus:outline-none focus:ring focus:ring-fuchsia-600"
					/>
				</div>
				<div className="flex flex-row-reverse">
					<div className="mr-10 place-self-end text-yellow-300 hover:text-yellow-600 cursor-pointer transition-all">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
					</div>
					<div className="mr-4 place-self-end">User ID</div>
				</div>
			</div>
			<div className="row-span-2 col-span-1 bg-fuchsia-800 border border-solid border-b-0 border-l-0 border-white">
				<div className="flex items-center">
					<div className="flex justify-left mt-4 ml-6 text-white text-md font-medium">Channels</div>
					<div className="flex justify-right mt-4 ml-2 text-yellow-300 text-2xl font-black hover:text-yellow-600 cursor-pointer transition-all">
						&#43;
					</div>
				</div>
			</div>
			<div className="row-span-5 col-span-7 border border-solid border-white bg-white">
				<div className="bg-white border border-zinc-400 border-solid border-b-1 border-t-0 border-l-0 border-r-0">
					<div className="ml-6 pt-4 pb-4 text-lg font-bold">{whoToChat.uid ? `Send to ${whoToChat.uid}` : "Send to User or Chat"}</div>
				</div>
				<div className="mt-4 ml-6">Chat Field</div>
			</div>

			<div className="row-span-4 col-span-1 bg-fuchsia-800 border border-solid border-l-0 border-white">
				<div className="flex items-center">
					<div className="flex justify-left mt-4 ml-6 text-white text-md font-medium">Direct Message</div>
					<div className="flex flex-row-reverse mt-4 ml-2 text-yellow-300 text-2xl font-black hover:text-yellow-600 cursor-pointer transition-all">
						&#43;
					</div>
				</div>
                <div>
                <DirectMessage setWhoToChat={setWhoToChat} />
                </div>
			</div>
			<div className="w-full col-span-7 relative mb-4">
				<textarea
					placeholder="Message username/channel"
					className="rounded-2xl w-full h-full bg-white col-span-7 border-2 border-gray-200 transition-all p-3 align-top focus:outline-none focus:ring ring-1 focus:ring-gray-600"
                    value={message}
                    onChange={handleChatChange}
                />
				<button className="bg-fuchsia-700 absolute top-0 right-0 h-full transition-all hover:bg-fuchsia-900 text-white font-semibold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline" onClick={handleSendMessage}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);


}

export default Dashboard;