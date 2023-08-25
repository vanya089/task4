import React from 'react';
import {UserType} from "../redux/slices/users/types";
import {BiUserCheck, BiLock} from "react-icons/bi";
import {AiOutlineDelete} from "react-icons/ai";


interface UserActions {
    onBlock: () => void;
    onDelete: () => void;
    onCheck: (complete: boolean) => void;
}

type UserBlockProps = UserType & UserActions;

const UserBlock: React.FC<UserBlockProps> = ({
                                                 _id,
                                                 email,
                                                 username,
                                                 registrationDate,
                                                 lastLoginDate,
                                                 onBlock,
                                                 status,
                                                 onDelete,
                                                 onCheck
                                             }) => {
    const CheckUser = () => {
      
    }
    
    return (
        <div>
            <div className="border rounded m-0 p-10 grid  justify-items-center grid-cols-6 ">
                <div>{email}</div>
                <div>{username}</div>
                <div>{registrationDate}</div>
                <div>{lastLoginDate}</div>
                <div className="flex justify-between gap-2">
                    <div>{status}</div>
                </div>
                <div className="flex flex-row">
                    <input onClick={() => onCheck(true)} type="checkbox"/>
                    <BiUserCheck size={25} />
                    <AiOutlineDelete size={25} onClick={onDelete}/>
                    <BiLock className="transform-cpu" size={25} onClick={onBlock}/>

                </div>
            </div>
        </div>
    );
};

export default UserBlock;