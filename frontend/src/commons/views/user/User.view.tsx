import React from "react";
import { useUserSelector } from "./hooks";
import {
	FaTrashAlt,
	FaSave,
	FaPlus,
	FaArrowUp,
	FaArrowDown,
} from "react-icons/fa";
import {
	SORTFIELD_QUERY_KEY,
	SORTTYPE_QUERY_KEY,
	USER_TITLE_MAP,
} from "@/commons/constant";
import { Pagination } from "@/commons/components";

export const UserView: React.FC = () => {
	const {
		users,
		deleteUser,
		editColumn,
		inputValue,
		editData,
		setInputValue,
		onUpdateState,
		onEditInputKeyDown,
		onTableHeadClick,
		onSearchInput,
		searchParams,
		nextPage,
		page,
		prevPage,
		totalPage,
		router,
		updateData,
		errorColumn,
	} = useUserSelector();

	return (
		<div className="flex flex-col items-center py-10 space-y-1">
			<div className="w-[72rem] flex justify-between py-1 space-x-3">
				<h3 className="text-sm">Note : press enter to apply update</h3>
				<div className="flex px-2 py-1 space-x-3">
					<button onClick={() => router.push("/create-user")}>
						<FaPlus />
					</button>
					<button onClick={updateData}>
						<FaSave />
					</button>
				</div>
			</div>
			<table className="table-fixed w-[72rem] divide-neutral-800 divide-y-2 border-2 border-neutral-800 ">
				<thead>
					<tr>
						{Object.keys(USER_TITLE_MAP).map((value, index) => {
							const field =
								USER_TITLE_MAP[value as keyof typeof USER_TITLE_MAP];
							const isSort = searchParams.get(SORTFIELD_QUERY_KEY) === field;
							const isAscSort =
								isSort && searchParams.get(SORTTYPE_QUERY_KEY) === "asc";
							const isDescSort =
								isSort && searchParams.get(SORTTYPE_QUERY_KEY) === "desc";
							return (
								<th
									className="text-start text-sm px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
									key={`${value}${index}`}
									onClick={() => onTableHeadClick(field)}
								>
									<div className="flex items-center space-x-1">
										<span>{value}</span>
										{isAscSort ? (
											<FaArrowUp />
										) : isDescSort ? (
											<FaArrowDown />
										) : null}
									</div>
								</th>
							);
						})}
						<th className="text-sm px-2 py-1 w-24">Action</th>
					</tr>
				</thead>
				<thead>
					<tr>
						{Object.keys(USER_TITLE_MAP).map((value, index) => (
							<th className="text-start" key={`${value}${index}`}>
								<input
									type="text"
									className="border text-sm border-black font-light px-2"
									onChange={(e) =>
										onSearchInput(
											e,
											USER_TITLE_MAP[value as keyof typeof USER_TITLE_MAP]
										)
									}
									placeholder={`Search ${
										USER_TITLE_MAP[value as keyof typeof USER_TITLE_MAP]
									}`}
								/>
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y-2 divide-neutral-700">
					{users.map((user) => (
						<tr key={user.id}>
							{Object.values(USER_TITLE_MAP).map((key, index) => {
								const isEdit =
									editColumn &&
									editColumn[0] === key &&
									editColumn[1] === user.id;

								const userOnUpdateState = onUpdateState.find(
									(updateUser) => updateUser.id === user.id
								);

								const isUpdated =
									userOnUpdateState &&
									userOnUpdateState[key as keyof typeof userOnUpdateState];

								const isError = errorColumn?.find(
									(error) => error[0] === user.id && error[1] === key
								);

								return (
									<td
										className={`px-2 py-2 hover:bg-gray-100 hover:cursor-pointer text-xs  ${
											isUpdated && "bg-green-200 hover:bg-green-300"
										} ${isError && "bg-red-200 hover:bg-red-200"}
										`}
										key={`${key}${index}`}
										onClick={() => editData(key, user)}
									>
										{isEdit ? (
											<input
												value={inputValue}
												onChange={(e) => setInputValue(e.target.value)}
												className="outline-none border px-1 border-black"
												onKeyDown={onEditInputKeyDown}
											/>
										) : isUpdated ? (
											userOnUpdateState[key as keyof typeof userOnUpdateState]
										) : (
											user[key as keyof typeof user]
										)}
									</td>
								);
							})}
							<td className="text-center">
								<button onClick={() => deleteUser(user.id)}>
									<FaTrashAlt color="red" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				currentPage={page}
				nextPage={nextPage}
				prevPage={prevPage}
				totalPage={totalPage}
			/>
		</div>
	);
};
