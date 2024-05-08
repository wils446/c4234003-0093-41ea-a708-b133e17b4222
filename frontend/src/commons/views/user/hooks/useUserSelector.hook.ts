import { SORTFIELD_QUERY_KEY, SORTTYPE_QUERY_KEY } from "@/commons/constant";
import { useApi, usePaginate, useQueryString } from "@/commons/hooks";
import { IUserResponse } from "@/commons/interfaces";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useUserSelector = () => {
	const router = useRouter();
	const api = useApi();
	const { createQueryString, searchParams, updateQueryUrl } = useQueryString();
	const [users, setUsers] = useState<IUserResponse[]>([]);
	const [totalUser, setTotalUser] = useState(0);
	const { page, nextPage, prevPage, totalPage } = usePaginate(totalUser, 20);

	const [onUpdateState, setOnUpdateState] = useState<Partial<IUserResponse>[]>(
		[]
	);

	const [editColumn, setEditColumn] = useState<[string, string] | null>();
	const [errorColumn, setErrorColumn] = useState<[string, string][] | null>(
		null
	);
	const [inputValue, setInputValue] = useState("");

	const fetchUser = () => {
		const query = createQueryString();
		api.client.get(`/users?${query}`).then((response) => {
			setUsers(response.data.users);
			setTotalUser(response.data.counts);
		});
	};

	const deleteUser = useCallback(
		async (userId: string) => {
			// remove from update data if want to delete
			const updateUserState = onUpdateState.find((user) => user.id === userId);
			if (updateUserState)
				setOnUpdateState((prev) =>
					prev.filter((updateUser) => updateUser.id !== userId)
				);

			try {
				await api.client.delete(`/users/${userId}`);
				setUsers((prev) => [...prev.filter((user) => userId !== user.id)]);
				alert("User Deleted!");
			} catch {
				alert("Action Failed, Try Again!");
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[onUpdateState]
	);

	useEffect(fetchUser, [searchParams]);

	const updateDataState = useCallback(
		(key: string, userId: string) => {
			if (!inputValue) return;
			const userData = users.find((user) => user.id === userId);
			if (!userData || userData[key as keyof typeof userData] === inputValue)
				return;

			setOnUpdateState((prev) => {
				let newUpdateData = { id: userId, [key]: inputValue };

				// if user object already exists add to it
				const updatedData = prev.find((data) => data.id === userId);
				if (updatedData)
					return prev.map((data) => {
						if (data.id === userId) return { ...data, ...newUpdateData };
						else return data;
					});

				return [...prev, newUpdateData];
			});
		},
		[users, inputValue]
	);

	const editData = useCallback(
		(key: string, user: IUserResponse) => {
			if (editColumn) updateDataState(editColumn[0], editColumn[1]);

			const updateData = onUpdateState.find((data) => data.id === user.id);
			if (updateData && updateData[key as keyof typeof updateData]) {
				setInputValue(updateData[key as keyof typeof updateData] || "");
			} else setInputValue(user[key as keyof typeof user]);

			setEditColumn([key, user.id]);
		},
		[editColumn, updateDataState, onUpdateState]
	);

	const onEditInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!editColumn) return;
		if (e.key !== "Enter") return;

		updateDataState(editColumn[0], editColumn[1]);
		setInputValue("");
		setEditColumn(null);
	};

	const onTableHeadClick = useCallback(
		(key: string) => {
			if (onUpdateState.length) {
				alert("Action cannot execute while changes data not updated");
				return;
			}

			if (searchParams.get(SORTFIELD_QUERY_KEY) === key) {
				if (searchParams.get(SORTTYPE_QUERY_KEY) === "asc")
					updateQueryUrl([SORTTYPE_QUERY_KEY, "desc"]);
				else if (searchParams.get(SORTTYPE_QUERY_KEY) === "desc")
					updateQueryUrl([SORTTYPE_QUERY_KEY, ""], [SORTFIELD_QUERY_KEY, ""]);

				return;
			}

			updateQueryUrl([SORTFIELD_QUERY_KEY, key], [SORTTYPE_QUERY_KEY, "asc"]);
		},
		[updateQueryUrl, searchParams, onUpdateState]
	);

	const onSearchInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
		if (onUpdateState.length) {
			alert("Action cannot execute while changes data not updated");
			return;
		}
		updateQueryUrl([key, e.target.value]);
	};

	const updateData = useCallback(async () => {
		if (!onUpdateState) return;
		if (editColumn) {
			setEditColumn(null);
			setInputValue("");
		}
		const body = {
			updateUsers: onUpdateState.map(({ id, ...updateData }) => ({
				id,
				updateData,
			})),
		};

		try {
			await api.client.patch("/users", body);
			alert("user updated!");
			setOnUpdateState([]);
			if (errorColumn) setErrorColumn(null);
			await fetchUser();
		} catch (err) {
			const message = ((err as AxiosError).response?.data as any)
				.message as string[];
			const userDetail: [string, string][] = message.map((message) => {
				const userData = message.split(" ")[0];
				const index = +userData.split(".")[1];
				const key = userData.split(".")[3];
				return [body.updateUsers[index].id as string, key];
			});
			setErrorColumn(userDetail);

			alert(((err as AxiosError).response?.data as any).error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onUpdateState, editColumn, errorColumn, updateDataState]);

	return {
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
		page,
		totalPage,
		nextPage,
		prevPage,
		router,
		updateData,
		errorColumn,
	};
};
