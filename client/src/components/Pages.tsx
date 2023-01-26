import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../styles/Pages.scss';

interface PageProps {
  totalPages: number,
  currentPage: number, 
  setCurrentPage: (number:number) => void,
}

const Pages = ({totalPages, currentPage, setCurrentPage}: PageProps) => {

  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const onPageClick = (e:any) => {
    e.preventDefault()
    setCurrentPage(e.target.innerText)
  }

  console.log(currentPage)

  return (
    <Pagination>
      <PaginationItem className={'paginationChangePage'}>
        <PaginationLink
          className={'previous'}
          onClick={() => {currentPage === 1 ? null : setCurrentPage(currentPage - 1)}}
          previous/>
      </PaginationItem>
      {pageNumbers.map((number, key) => (
        <PaginationItem
          key={key}
          className={'paginationItemStyle'}
          active={currentPage == (number)}>
          <PaginationLink onClick={onPageClick} className={'paginationLinkStyle'}>
            {number}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem className={'paginationChangePage'}>
        <PaginationLink
          className={'next'}
          onClick={() => {currentPage === totalPages ? null : setCurrentPage(currentPage + 1)}}
          next/>
      </PaginationItem>
    </Pagination> 
  )

}

export default Pages