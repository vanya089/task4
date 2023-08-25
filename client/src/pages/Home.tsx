import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../redux/slices/users/types';
import UserBlock from '../components/UserBlock';
import { AppDispatch } from '../redux/store';
import {
    blockAllUsers,
    blockUser,
    checkAllUsers,
    checkUser,
    deleteCheckedUsers, deleteOneUser,
    fetchUsers,
} from "../redux/slices/users/asyncActions";
import { usersSelector } from "../redux/slices/users/userSlice";

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, status, error } = useSelector(usersSelector);

    useEffect(() => {
        dispatch(fetchUsers());
    });

    const handleBlockUser = (userId: string) => {
        dispatch(blockUser(userId));
    };
    const handleBlockAllUser = () => {
        dispatch(blockAllUsers());
    };


    const handleDeleteUser = (userId: string ) => {
        dispatch(deleteOneUser(userId));
    };

    const handleCheckUser = (userId: string, complete: boolean) => {
        dispatch(checkUser({ userId, complete }));
    };

    const handleCheckAllUsers = () => {
        dispatch(checkAllUsers());
    };

    const handleDeleteCheckedUsers = () => {
        dispatch(deleteCheckedUsers());
    };

    const tableUsers = users.map((user: UserType) => (
        <UserBlock
            key={user._id}
            {...user}
            onBlock={() => handleBlockUser(user._id)}
            onDelete={() => handleDeleteUser(user._id)}
            onCheck={(complete: boolean) => handleCheckUser(user._id, complete)}
        />
    ));

    return (
        <div className="m-2 p-2">
            <div className="border rounded m-0 p-5 flex justify-end gap-4 ">
                <button className="p-2 hover:bg-red-500 transition ease-in-out border-2 rounded" onClick={handleDeleteCheckedUsers}>Delete Checked</button>
                <button className="p-2 hover:bg-red-800 transition ease-in-out border-2 rounded" onClick={handleBlockAllUser}>Block ALL</button>
                <button className="p-2 hover:bg-blue-600 transition ease-in-out border-2 rounded" onClick={handleCheckAllUsers}>Check ALL</button>
            </div>
            {status === 'error' ? (
                <div className="p-6 w-[300px] h-[120px] bg-red-950">
                    <h2>ERROR!</h2>
                    <p>{error}</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? (
                        <div className="p-6 w-[300px] h-[120px] bg-blue-950">Loading...</div>
                    ) : (
                        tableUsers
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
