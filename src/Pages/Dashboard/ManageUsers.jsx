import UseAuth from '@/Hooks/UseAuth';
import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

const ManageUsers = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: users = [] } = useQuery({
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
                cell: () => (
                    <button className='bg-green-400 hover:bg-green-600 text-white px-3 py-1 rounded'>
                        Action
                    </button>
                )
            })
        ]
    )

    const table = useReactTable({
        data: users,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className='p-6'>
            <h2 className="text-xl font-bold text-white mb-4">Manage Users</h2>
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
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;