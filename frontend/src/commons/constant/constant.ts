export const USER_TITLE_MAP = {
	"First Name": "firstName",
	"Last Name": "lastName",
	Position: "position",
	Phone: "phone",
	Email: "email",
};

export const SORTFIELD_QUERY_KEY = "sortField";
export const SORTTYPE_QUERY_KEY = "sortType";
export const PAGE_QUERY_KEY = "page";

export const FIRSTNAME_ERROR_MAP = {
	required: "first name is required!",
	minLength: "first name minimum length is 3.",
};

export const LASTNAME_ERROR_MAP = {
	required: "last name is required!",
	minLength: "last name minimum length is 3.",
};

export const EMAIL_ERROR_MAP = {
	required: "email is required!",
	pattern: "invalid email pattern.",
};

export const PHONE_ERROR_MAP = {
	required: "phone is required!",
};

export const POSITION_ERROR_MAP = {
	required: "position is required!",
};
