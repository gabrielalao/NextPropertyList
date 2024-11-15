import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import PaginationItem from "./PaginationItem";
import OmitItem from "./OmitItem";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
}

export default function Pagination({
  totalPage,
  currentPage,
  onPageChanged,
}: PaginationProps) {
  const createPaginationArray = () => {
    const pages: (number | string)[] = [];

    if (totalPage <= 4) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }
    pages.push(1);

    const startPage = Math.max(currentPage - 1, 2);
    const endPage = Math.min(currentPage + 1, totalPage - 1);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPage - 1) {
      pages.push("...");
    }

    if (totalPage > 1) {
      pages.push(totalPage);
    }

    return pages;
  };

  const pages = createPaginationArray();

  const handlePageChanged = (_page: number) => {
    if (_page !== currentPage) {
      onPageChanged(_page);
    }
  };

  return (
    <div className="flex gap-1">
      <PrevButton
        disabled={currentPage === 1}
        onPrev={() => handlePageChanged(currentPage - 1)}
      />

      {pages.map((p, index) => {
        if (typeof p === "number") {
          return (
            <PaginationItem
              key={index}
              page={p}
              active={currentPage === p}
              onPageSelected={() => handlePageChanged(p)}
            />
          );
        } else {
          return <OmitItem key={index} />;
        }
      })}

      <NextButton
        disabled={currentPage === totalPage}
        onNext={() => handlePageChanged(currentPage + 1)}
      />
    </div>
  );
}
