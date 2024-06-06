import {
    Pagination
} from "@nextui-org/react";
import React, { useEffect } from 'react';

const PaginationCustom = (listItems: any, tabs: number) => {

    const [page, setPage] = React.useState(1);
    useEffect(() => {
        setPage(1);
    }, [tabs]);
    const rowsPerPage = 8;

    const pages = Math.ceil(listItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return listItems.slice(start, end);
    }, [page, listItems]);

    return (
        <div>
            {
                pages > 1 && (
                    <div className="flex w-full justify-center">
                        <Pagination
                            showControls
                            classNames={{
                                wrapper: "gap-0 overflow-visible h-8 ",
                                item: "w-8 h-8 text-small rounded-none bg-transparent",
                                cursor:
                                    "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                            }}
                            page={page}
                            total={pages}
                            onChange={(page: any) => setPage(page)}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default PaginationCustom