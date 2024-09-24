import React, { ChangeEvent, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  TfiControlBackward,
  TfiControlForward,
  TfiControlSkipBackward,
  TfiControlSkipForward,
} from "react-icons/tfi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaSort, FaSortUp, FaSortDown, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { LuAlertCircle } from "react-icons/lu";
import { motion } from "framer-motion";
import { ICustomTable } from "@/types";
import { renderCellClassName } from "@/utils";
import { FaTrash } from "react-icons/fa6";

const CustomTable = ({
  header,
  pageSize,
  tableData,
  tableColumns,
  hasActions,
  handleDelete,
  handleEdit,
  // ? defaulted  to edit and delete as changing all tables to use custom actionIcons required lot of work.
  actionIcons = [
    { icon: FaEdit, handler: handleEdit as (data: any) => void },
    { icon: FaTrash, handler: handleDelete as (data: any) => void },
  ],
}: ICustomTable) => {
  const columnHelper = createColumnHelper<any>();
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRowData, setSelectedRowData] = useState<any>(null);

  const columnsWithActions = [
    ...tableColumns,
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <div className="flex justify-center gap-2">
          {actionIcons.map(({ icon: ActionIcon, handler }, index) => (
            <ActionIcon
              key={index}
              className="w-[1.125rem] cursor-pointer"
              onClick={() => {
                setSelectedRowData(props.row.original);
                handler(props.row.original);
              }}
            />
          ))}
        </div>
      ),
      header: () => <span>Actions</span>,
    }),
  ];

  const returnColumnsBasedOnActions = () => {
    if (hasActions) {
      return columnsWithActions;
    } else {
      return tableColumns;
    }
  };

  const globalFilterHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setGlobalFilter(event.target.value);
  };

  const table = useReactTable({
    data: tableData,
    columns: returnColumnsBasedOnActions(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    initialState: { pagination: { pageIndex: 0, pageSize: pageSize } },
    state: {
      globalFilter,
    },
  });

  const pageCount = table.getPageCount();
  const { pageIndex } = table.getState().pagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 4;
    let startPage = Math.max(pageIndex - Math.floor(maxPagesToShow / 2), 0);
    let endPage = Math.min(startPage + maxPagesToShow, pageCount);

    if (endPage - startPage < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow, 0);
    }

    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }
    return pages;
  };
  const pages = getPageNumbers();

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="flex flex-col tablet:flex-row justify-between items-start gap-4 tablet:gap-0 tablet:items-center ">
        <h1 className="font-caladea text-[1.25rem] text-nowrap tablet:text-[1.875rem] leading-[115%] font-bold">
          {header}
        </h1>
        <div className="flex gap-[0.38rem]">
          <button
            onClick={() =>
              toast("No filters present", {
                icon: <LuAlertCircle className="text-2xl text-app-purple" />,
              })
            }
            className=" bg-app-purple rounded-[0.3125rem] h-[2.0625rem] px-8  text-xs"
          >
            Filter
          </button>

          <input
            value={globalFilter ?? ""}
            onChange={globalFilterHandler}
            placeholder="Search all columns..."
            type="text"
            className={`rounded-[0.3125rem] h-[2.0625rem] focus:border-transparent focus:ring-0 bg-app-orange  w-full text-white 
         p-4   placeholder:italic placeholder:text-heading text-xs  `}
          />
        </div>
      </div>
      <div className="custom-scrollbar overflow-y-auto">
        <table className="w-full  mt-[3.38rem]  border-app-purple rounded-xl border border-separate  outline-none">
          <thead className="h-[4.625rem] bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="rounded-tl-sm " key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-center gap-[1.69rem]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {(header.column.id !== "actions" &&
                        {
                          asc: <FaSortUp />,
                          desc: <FaSortDown />,
                        }[header.column.getIsSorted() as string]) ?? <FaSort />}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                className={`h-[6.1875rem] text-center ${
                  index % 2 !== 0 && "bg-background"
                }`}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={renderCellClassName(cell)}>
                    <div className="flex items-center justify-center gap-[1.12rem] ">
                      <div className={`flex justify-center gap-4 `}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="flex justify-between items-center gap-[1.19rem] mt-4 rounded-full border border-input-text  p-2 ">
            <button
              className=" rounded-full bg-background p-2"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <TfiControlBackward />
            </button>
            <button
              className=" rounded-full bg-background p-2"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <TfiControlSkipBackward />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                className={` ${
                  table.getState().pagination.pageIndex === page &&
                  "bg-app-purple px-2  rounded-full flex items-center justify-center"
                }`}
                onClick={() => table.setPageIndex(page)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className=" rounded-full bg-background p-2"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <TfiControlSkipForward />
            </button>
            <button
              className=" rounded-full bg-background p-2"
              onClick={() => table.setPageIndex(pageCount - 1)}
            >
              <TfiControlForward />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomTable;
