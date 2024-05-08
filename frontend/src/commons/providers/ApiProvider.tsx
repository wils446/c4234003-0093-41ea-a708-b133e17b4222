import axios, { AxiosInstance } from "axios";
import React, { createContext } from "react";

type ApiContextStore = {
	client: AxiosInstance;
};

export const ApiContext = createContext<ApiContextStore>({} as ApiContextStore);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = (props) => {
	const client = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URI,
	});

	return (
		<ApiContext.Provider value={{ client }}>
			{props.children}
		</ApiContext.Provider>
	);
};
