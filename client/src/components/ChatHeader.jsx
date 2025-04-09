import { X } from 'lucide-react'
import React from 'react'
import { chatStore } from '../store/ChatStore';

const ChatHeader = () => {
    const {selectedUser, isLoadingMessages, setSelectedUser} = chatStore();
    return (
        <div
        className="flex justify-between items-center p-6 border-b-1 border-gray-400">
            <div className="flex gap-5 rounded-[14px] items-center">
                <img src={`${selectedUser.profilePic || "../../assets/avatar.png"}`} alt="" className="size-12 object-cover rounded-full"/>
                <h1 className="font-semibold text-white text-[18px]">{selectedUser.fullName || "----"}</h1>
            </div>
            <X color='#fff' className='cursor-pointer' onClick={() => setSelectedUser(null)}/>
        </div>
    )
}
export default ChatHeader