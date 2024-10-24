import View from "./View";
import icons from 'url:../../img/icons.svg';

class paginationViews extends View {
    
    _parentElement = document.querySelector('.pagination');

    addHandlerclick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const goto = +btn.dataset.goto;

            console.log(goto);
            
            console.log(btn);
            handler(goto);
        })
    }

    _generateMarkup() {
        const currPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);

        // page 1 and there are other pages
        if(currPage === 1 && numPages > 1) {
            return `
                <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currPage+1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        //last page 
        if(currPage === numPages && numPages > 1){
            return `
                <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage-1}</span>
                </button>
            `;

        }

        // other pages
        if(currPage < numPages) {
            return `
                <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage-1}</span>
                </button>

                <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currPage+1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        //page 1 and there are no other pages
        return '';
    }
}

export default new paginationViews();