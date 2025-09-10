import UseAuth from '@/Hooks/UseAuth';
import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'
import UpdateRoleModal from '@/components/Modal/UpdateRoleModal';

const ManageUsers = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const [globalFilter, setGlobalFilter] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectUser, setSelectUser] = useState(null);

    const { data: users = [] , refetch} = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`)
            return data
        }
    })

    const columnHelper = createColumnHelper();

    const columns = useMemo(
        () => [
            columnHelper.accessor('photo', {
                header: 'image',
                cell: (info) => (
                    <img src={info.getValue()}
                        alt=""
                        className='w-10 h-10 rounded-full object-cover'
                    />
                )
            }),
            columnHelper.accessor("name", {
                header: 'Name',
                cell: (info) => <span>{info.getValue()}</span>
            }),
            columnHelper.accessor('email', {
                header: 'Email',
                cell: (info) => <span>{info.getValue()}</span>
            }),
            columnHelper.accessor('role', {
                header: "Role",
                cell: (info) => <span>{info.getValue()}</span>
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: (info) => (
                    <span className={`px-2 py-1 rounded-sm text-sm ${info.getValue() === 'Approved' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
                        {info.getValue() ? info.getValue() : "Unavailable"}
                    </span>
                )
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: (info) => (
                    <button
                        onClick={() => {
                            setSelectUser(info.row.original)
                            setIsOpen(true)
                        }}
                        className='bg-green-400 hover:bg-green-600 text-white px-3 py-1 rounded cursor-pointer'
                    >
                        Update
                    </button>
                )
            })
        ]
    )

    const table = useReactTable({
        data: users,
        columns: columns,
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel({
            filterFn: (row, filterValue) => {
                const name = row.getValue('name')?.toLowerCase() ?? '';
                const email = row.getValue('email')?.toLowerCase() ?? '';

                return (
                    name.includes(filterValue.toLowerCase()) ||
                    email.includes(filterValue.toLowerCase())
                )
            }
        })
    })

    const closeModal = () => {
        return setIsOpen(false)
    }

    const handleUpdateRole = async selectedRole => {
        if (selectUser?.role === selectedRole) {
            return
        }
        try {
            axiosSecure.patch(`/users/role/${selectUser?.email}`,{
                role: selectedRole
            });
            refetch();
        }catch(error){
            console.log(error);
        }finally{
            closeModal()
        }
    }

    return (
        <div className='p-6'>
            <h2 className="text-xl font-bold text-white mb-4">Manage Users</h2>
            {/* Search bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-80 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                />
            </div>
            <table className='min-w-full border border-gray-700 bg-gray-800 text-white rounded-lg overflow-hidden'>
                <thead className='bg-gray-700'>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        className="px-4 py-2 text-left border-b border-gray-600"
                                        key={header.id}
                                    >
                                        {
                                            header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </th>
                                ))}
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className='hover:bg-gray-700'>
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className='px-4 py-2 border-b border-gray-600'>
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    {/* Search result */}
                    {table.getRowModel().rows.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center py-4 text-gray-400"
                            >
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <UpdateRoleModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectUser={selectUser}
                closeModal={closeModal}
                handleUpdateRole={handleUpdateRole}
            ></UpdateRoleModal>
        </div>
    );
};

export default ManageUsers;