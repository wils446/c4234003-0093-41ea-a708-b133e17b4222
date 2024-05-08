import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryString = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(...args: [string, string][]) => {
			const params = new URLSearchParams(searchParams.toString());
			if (args)
				args.forEach((arg) => {
					if (arg[1] === "") params.delete(arg[0]);
					else params.set(arg[0], arg[1]);
				});

			return params.toString();
		},
		[searchParams]
	);

	const updateQueryUrl = useCallback(
		(...args: [string, string][]) => {
			const params = createQueryString(...args);

			router.push(pathname + "?" + params);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[createQueryString, pathname]
	);

	return { searchParams, createQueryString, updateQueryUrl };
};
