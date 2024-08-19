import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";

const ManageUser = () => {
    const [users, setUsers] = useState([
        {
            _id: "1",
            name: "Alice Johnson",
            email: "alice@example.com",
            role: "user",
            photo: "https://via.placeholder.com/50",
        },
        {
            _id: "2",
            name: "Bob Smith",
            email: "bob@example.com",
            role: "admin",
            photo: "https://via.placeholder.com/50",
        },
        {
            _id: "3",
            name: "Charlie Brown",
            email: "charlie@example.com",
            role: "user",
            photo: "https://via.placeholder.com/50",
        },
    ]);

    useEffect(() => {
        // Fetch users from the backend
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handlePromote = async (userId) => {
        // try {
        //     const response = await fetch(`${API_URL}/promote/${userId}`, {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     });
        //     if (response.ok) {
        //         setUsers((prevUsers) =>
        //             prevUsers.map((user) =>
        //                 user._id === userId ? { ...user, role: "admin" } : user
        //             )
        //         );
        //     }
        // } catch (error) {
        //     console.error("Error promoting user:", error);
        // }
    };

    const handleDemote = async (userId) => {
        // try {
        //     const response = await fetch(`${API_URL}/demote/${userId}`, {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     });
        //     if (response.ok) {
        //         setUsers((prevUsers) =>
        //             prevUsers.map((user) =>
        //                 user._id === userId ? { ...user, role: "user" } : user
        //             )
        //         );
        //     }
        // } catch (error) {
        //     console.error("Error demoting user:", error);
        // }
    };

    return (
        <div className="p-5 bg-gray-100  rounded-md">
            <div className="flex justify-between items-center flex-wrap mb-3">
                <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

                <input
                    type="text"
                    placeholder="Search users"
                    className="px-2 py-1 rounded-md shadow border-black "
                />
            </div>
            <div className="flex justify-start flex-wrap items-center gap-5">
                {users.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        onPromote={handlePromote}
                        onDemote={handleDemote}
                    />
                ))}
            </div>
        </div>
    );
};

export default ManageUser;
