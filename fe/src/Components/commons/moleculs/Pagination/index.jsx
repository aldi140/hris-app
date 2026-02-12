import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../../ui/pagination"

const Paginations = ({ lastPage, page, onPageChange }) => {

    const paginationRange = () => {
        const start = Math.max(1, page - 1);
        const end = Math.min(lastPage, page + 1);
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }

    const scrollToTop = () => {
        scrollTo({
            behavior: 'smooth',
            top: 180
        });
    }
    const handleOnPageChange = (page) => {
        onPageChange(page);
        scrollToTop();
    }
    const handlePrevious = () => {
        if (page === 1) return;
        onPageChange(page - 1);
        scrollToTop();
    }
    const handleNext = () => {
        if (page === lastPage) return
        onPageChange(page + 1);
        scrollToTop();
    }

    // console.log('page: ', page)
    return (
        <Pagination className="my-4">
            <PaginationContent>
                <PaginationItem >
                    <PaginationPrevious onClick={handlePrevious} disabled={page === 1} />
                </PaginationItem>
                {
                    lastPage > 3 &&
                    <PaginationItem disabled={page === lastPage}>
                        <PaginationLink href="#">{lastPage}</PaginationLink>
                    </PaginationItem>
                }
                {
                    lastPage > 1 ?
                        paginationRange().map((item) => (
                            <PaginationItem key={item} >
                                <PaginationLink onClick={() => handleOnPageChange(item)} isActive={item === page}>
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        )) :
                        <PaginationItem>
                            <PaginationLink onClick={() => handleOnPageChange(1)} isActive={page === 1}>
                                {1}
                            </PaginationLink>
                        </PaginationItem>
                }

                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                {
                    lastPage > 3 &&
                    <PaginationItem disabled={page === lastPage}>
                        <PaginationLink href="#">{lastPage}</PaginationLink>
                    </PaginationItem>
                }
                <PaginationItem>
                    <PaginationNext
                        onClick={handleNext}
                        disabled={page === lastPage}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}

export default Paginations