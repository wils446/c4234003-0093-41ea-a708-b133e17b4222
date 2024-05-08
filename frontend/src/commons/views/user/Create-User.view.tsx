import {
	EMAIL_ERROR_MAP,
	FIRSTNAME_ERROR_MAP,
	LASTNAME_ERROR_MAP,
	PHONE_ERROR_MAP,
	POSITION_ERROR_MAP,
} from "@/commons/constant";
import { useCreateUserSelector } from "./hooks";

export const CreateUserView: React.FC = () => {
	const {
		registerEmailInput,
		registerFirstNameInput,
		registerLastNameInput,
		registerPhoneInput,
		registerPositionInput,
		onSubmit,
		errors,
		router,
	} = useCreateUserSelector();

	return (
		<div className="flex justify-center py-10">
			<div className="w-[32rem]">
				<h1 className="text-3xl font-semibold mb-10">Create User</h1>
				<form onSubmit={onSubmit}>
					<div className="flex justify-between mb-2">
						<div className="w-2/5">
							<label className="text-sm" htmlFor="firstName">
								First Name
							</label>
							<input
								className={`w-full border border-neutral-400 px-1 ${
									errors.firstName && "border-red-500 outline-red-500"
								}`}
								type="text"
								id="firstName"
								{...registerFirstNameInput}
							/>
							{errors.firstName && (
								<h1 className="text-xs text-red-500">
									{
										FIRSTNAME_ERROR_MAP[
											errors.firstName.type as keyof typeof FIRSTNAME_ERROR_MAP
										]
									}
								</h1>
							)}
						</div>

						<div className="w-2/5">
							<label className="text-sm" htmlFor="lastName">
								Last Name
							</label>
							<input
								className={`w-full border border-neutral-400 px-1 ${
									errors.lastName && "border-red-500 outline-red-500"
								}`}
								type="text"
								id="lastName"
								{...registerLastNameInput}
							/>
							{errors.lastName && (
								<h1 className="text-xs text-red-500">
									{
										LASTNAME_ERROR_MAP[
											errors.lastName.type as keyof typeof LASTNAME_ERROR_MAP
										]
									}
								</h1>
							)}
						</div>
					</div>
					<div className="w-3/5 mb-2">
						<label className="text-sm" htmlFor="email">
							Email
						</label>
						<input
							className={`w-full border border-neutral-400 px-1 ${
								errors.email && "border-red-500 outline-red-500"
							}`}
							type="email"
							id="email"
							{...registerEmailInput}
						/>
						{errors.email && (
							<h1 className="text-xs text-red-500">
								{
									EMAIL_ERROR_MAP[
										errors.email.type as keyof typeof EMAIL_ERROR_MAP
									]
								}
							</h1>
						)}
					</div>
					<div className="w-3/5 mb-2">
						<label className="text-sm" htmlFor="position">
							Position
						</label>
						<input
							className={`w-full border border-neutral-400 px-1 ${
								errors.position && "border-red-500 outline-red-500"
							}`}
							type="text"
							id="position"
							{...registerPositionInput}
						/>
						{errors.position && (
							<h1 className="text-xs text-red-500">
								{
									POSITION_ERROR_MAP[
										errors.position.type as keyof typeof POSITION_ERROR_MAP
									]
								}
							</h1>
						)}
					</div>
					<div className="w-3/5 mb-8">
						<label className="text-sm" htmlFor="phone">
							Phone
						</label>
						<input
							className={`w-full border border-neutral-400 px-1 ${
								errors.phone && "border-red-500 outline-red-500"
							}`}
							type="text"
							id="phone"
							{...registerPhoneInput}
						/>
						{errors.phone && (
							<h1 className="text-xs text-red-500">
								{
									PHONE_ERROR_MAP[
										errors.phone.type as keyof typeof PHONE_ERROR_MAP
									]
								}
							</h1>
						)}
					</div>
					<input
						type="submit"
						value="Create"
						className="px-5 py-1 bg-green-500 text-white hover:bg-green-600 rounded hover:cursor-pointer"
					/>
				</form>
				<button
					onClick={() => router.push("/")}
					className="px-5 mt-2 py-1 bg-red-500 text-white hover:bg-red-600 rounded hover:cursor-pointer"
				>
					Back
				</button>
			</div>
		</div>
	);
};
