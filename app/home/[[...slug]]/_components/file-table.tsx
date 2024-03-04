'use client'
import React, { HTMLProps } from 'react'
import ReactDOM from 'react-dom/client'

// import './index.css'
import './style.css'
import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
    Table,
    createColumnHelper,
    Row,

    RowSelectionState,
} from '@tanstack/react-table'
import { FileMetadata } from './file-grid'
import { Checkbox, Table as ChakraTable, Tbody, Thead, Tr, TableContainer, Th, Td, Box, useColorModeValue, } from '@chakra-ui/react'
import Image from 'next/image'
import { formatBytes } from '@/util/byte-format'
import { TableRow } from '@/app/(components)/custom-chakra/table-row'

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}
const columnHelper = createColumnHelper<FileMetadata>();
// const defaultColumns: ColumnDef<FileMetadata>[] = [
//   columnHelper.accessor(({row}) => row, {
//     cell: info => (<div>1</div>),
//     id: "isDIr"
//   }),
//   columnHelper.accessor(row => row.name, {
//     cell: info => info.getValue(),
//     id: "name"
//   }),
//   columnHelper.accessor(row => row.size, {
//     cell: info => info.getValue(),
//     id: "size"
//   })
// ];



export interface FileTableProps {
    files: FileMetadata[],
    selection: RowSelectionState,
    selectionCallback?: any
}

export default function FileTable({ files, selection, selectionCallback = (index: number) => { } }: FileTableProps) {
    const [renderAsGrid, setRenderAsGrid] = React.useState<boolean>(false)

    const columns = React.useMemo<ColumnDef<FileMetadata>[]>(
        () => [
            {
                id: 'name',
                accessorKey: 'name',
                header: 'Name',
                cell: ({ row, cell, table }) => (
                    <span className='name-cell'>
                        {tableCell(row)}
                    </span>
                )
            },
            {
                id: 'size',
                accessorKey: 'size',
                header: 'Size',
                cell: ({ row, cell, table }) => {
                    const formatted_split = formatBytes(cell.getValue<number>()).split(" ");

                    const size = formatted_split[0];
                    const format = formatted_split[1];
                    return (
                        <span className="size-cell">
                            <span className="size-cell-size">{size}</span>
                            <span className="size-cell-format">{format}</span>
                        </span>
                    )
                }
            },
            {
                id: 'modified',
                accessorKey: 'lastModified',
                header: 'Last modified',
                cell: ({ row, cell, table }) => (
                    cell.getValue<Date>().toLocaleString()
                )
            },

        ], []);

    const [data, _setData] = React.useState(files);
    const [columnVisibility, setColumnVisibility] = React.useState({})

    const rerender = React.useReducer(() => ({}), {})[1]
    // const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(selection)


    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection: selection,
            columnVisibility
        },
        onColumnVisibilityChange: setColumnVisibility,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
        onRowSelectionChange: selectionCallback,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    /**
     * Instead of calling `column.getSize()` on every render for every header
     * and especially every data cell (very expensive),
     * we will calculate all column sizes at once at the root table level in a useMemo
     * and pass the column sizes down as CSS variables to the <table> element.
     */
    const columnSizeVars = React.useMemo(() => {
        const headers = table.getFlatHeaders()
        const colSizes: { [key: string]: number } = {}
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i]!
            colSizes[`--header-${header.id}-size`] = header.getSize()
            colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
        }
        return colSizes
    }, [table.getState().columnSizingInfo])

    //demo purposes
    const [enableMemo, setEnableMemo] = React.useState(true)

    return (
        <div style={{ maxWidth: '600px' }}>

            {/* <div className="inline-block border border-black shadow rounded">
        {table.getAllLeafColumns().map((column, index) => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),

                  }}
                />{' '}
                {column.id}
              </label>
            </div>
          )
        })}
      </div> */}

            {/* Here in the <table> equivalent element (surrounds all table head and data cells), we will define our CSS variables for column sizes */}
            <table
                {...{
                    className: 'divTable',
                    style: {
                        ...columnSizeVars, //Define column sizes on the <table> element
                        width: table.getTotalSize(),
                    },
                }}
            >
                <thead  >
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow
                            key={"headerGroup.id"}
                            className={'tr'}
                            _hover={
                                {
                                    background:useColorModeValue('blackAlpha.100','whiteAlpha.100')
                                }
                            }
                        >
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    {...{
                                        className: `th ${header.id}-header`,
                                        style: {
                                            // width: `calc(var(--header-${header?.id}-size) * 1px)`,
                                            width: header.getSize(),
                                            position: 'relative',
                                        },
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    <Box
                                        {...{
                                            onDoubleClick: () => header.column.resetSize(),
                                            onMouseDown: header.getResizeHandler(),
                                            onTouchStart: header.getResizeHandler(),
                                            className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''
                                                }`,
                                        }}
                                        background={useColorModeValue('black', 'whiteAlpha.600')}
                                    />
                                </th>
                            ))}
                        </TableRow>
                    ))}
                </thead>
                {/* When resizing any column we will render this special memoized version of our table body */}
                {table.getState().columnSizingInfo.isResizingColumn && enableMemo ? (
                    <MemoizedTableBody table={table} isGrid={renderAsGrid} />
                ) : (
                    <TableBody table={table} isGrid={renderAsGrid} />
                )}
            </table>
        </div>
    )
}

//un-memoized normal table body component - see memoized version below
function TableBody({ table, isGrid }: { table: Table<FileMetadata>, isGrid: boolean }) {
    return !isGrid ? (
        <tbody
            {...{
                className: 'tbody',
            }}
        >
            {table.getRowModel().rows.map(row => (
                <TableRow
                    key={row.id}
                    
                    {...{
                        className: 'tr',
                    }}
                    _hover={
                        {
                            background:useColorModeValue('blackAlpha.100','whiteAlpha.100')
                        }
                    }
                >
                    {row.getVisibleCells().map(cell => {
                        //simulate expensive render
                        return (
                            <td
                                key={cell.id}

                                {...{
                                    className: 'td',
                                    style: {
                                        width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                                        // width: cell.column.getSize()
                                    },
                                }}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}

                            </td>
                        )
                    })}
                </TableRow>
            ))}
        </tbody>
    ) :
        (
            <div className="wrapper" id="wrapper">
                {table.getRowModel().rows.map(row => (
                    <div
                        key={row.id}

                        {...{
                        }}
                    >
                        {row.getVisibleCells().map(cell => {
                            //simulate expensive render
                            return (
                                <div
                                    key={cell.id}

                                    {...{

                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}

                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        )
}

//special memoized wrapper for our table body that we will use during column resizing
export const MemoizedTableBody = React.memo(
    TableBody,
    (prev, next) => prev.table.options.data === next.table.options.data
) as typeof TableBody


function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}

function tableCell(row: Row<FileMetadata>) {
    return (
        <>
            <IndeterminateCheckbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
            {row.original.name}
        </>
    )
}

function gridCell(row: Row<FileMetadata>) {
    const file: FileMetadata = row.original;
    return (
        <div className="col folder" style={{ cursor: 'pointer' }}>
            <Checkbox type="checkbox" />
            <div className="file-name">
                <Image alt="Folder icon" className="folder-icon" width={100} height={100} src={file.isDirectory ? "/folder.svg" : "/file.svg"}>
                </Image> {file.name}</div>
            <div className="file-modified">{file.lastModified.toLocaleDateString()}</div>
            <div className="file-size">{file.size}</div>
        </div>
    )
}