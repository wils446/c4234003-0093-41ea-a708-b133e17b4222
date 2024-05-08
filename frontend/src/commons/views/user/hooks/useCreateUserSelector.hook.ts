import { useApi } from "@/commons/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormState = {
	firstName: string;
	lastName: string;
	email: string;
	position: string;
	phone: string;
};

export const useCreateUserSelector = () => {
	const router = useRouter();
	const api = useApi();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormState>();

	const registerFirstNameInput = register("firstName", {
		required: true,
		minLength: 3,
	});

	const registerLastNameInput = register("lastName", {
		required: true,
		minLength: 3,
	});

	const registerEmailInput = register("email", {
		required: true,
		pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
	});

	const registerPositionInput = register("position", { required: true });

	const registerPhoneInput = register("phone", { required: true });

	const onSubmit = handleSubmit(async (data) => {
		try {
			await api.client.post("/users", data);
			router.push("/");
		} catch {
			alert("something went wrong, try again later");
		}
	});

	return {
		registerEmailInput,
		registerFirstNameInput,
		registerLastNameInput,
		registerPositionInput,
		registerPhoneInput,
		onSubmit,
		errors,
		router,
	};
};
