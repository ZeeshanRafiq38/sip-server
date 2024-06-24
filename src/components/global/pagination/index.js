import "./styles.css";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import NextBtn from "assets/svgs/Dashboard/NextBtn";
import PrevBtn from "assets/svgs/Dashboard/PrevBtn";

const Pagination = ({ pageCount, setPage, currentPage }) => {
    const dispatch = useDispatch();
    const handlePageClick = ({ selected }) => {
        dispatch(setPage(selected + 1));
    };

    return (
        <div className="max-w-full flex py-4 relative bg-[#F5F5F5] px-2">
            <ReactPaginate
                breakLabel="..."
                nextLabel={<NextBtn />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={<PrevBtn />}
                className="flex items-center gap-4 pagination"
                forcePage={currentPage - 1}
            />
        </div>
    );
};

export default Pagination;
