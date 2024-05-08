import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type PaginationProps = {
	currentPage: number;
	totalPage: number;
	nextPage: () => void;
	prevPage: () => void;
};

export const Pagination: React.FC<PaginationProps> = (props) => {
	return (
		<div className="flex items-center justify-center gap-3">
			<button
				onClick={props.prevPage}
				className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
			>
				<FaArrowLeft />
			</button>

			<p className="text-xs text-gray-900">
				{props.currentPage}
				<span className="mx-0.25">/</span>
				{props.totalPage}
			</p>

			<button
				onClick={props.nextPage}
				className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
			>
				<FaArrowRight />
			</button>
		</div>
	);
};
