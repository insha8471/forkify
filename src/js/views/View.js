import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    /**
     * Render the recieved object to the DOM 
     * @param {Object | Object[]} data The data to be render {e.g. recipe}
     * @param {boolean} [render=true] if false, create a markup string instead of rendering to the DOM
     * @returns {undefined | String} A markup String is return if render=false
     * @this {Object} View instance 
     */

    render(data, render = true) {
        
        // render error if the recipe is not there for that value
        if(!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();

        this._data = data;
        // console.log(data)
        const markup = this._generateMarkup();
        
        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        // console.log(newDOM);
        const newElement = Array.from(newDOM.querySelectorAll('*'));
        const currElement = Array.from(this._parentElement.querySelectorAll('*'));

        newElement.forEach((newEl, i) => {
            const currEl = currElement[i];
            if(!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                currEl.textContent = newEl.textContent; 
            }

            //updates change attributes
            if(!newEl.isEqualNode(currEl)) 
                Array.from(newEl.attributes).forEach(attr => {
                    currEl.setAttribute(attr.name, attr.value);
                })
        })

    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
    
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderError(message = this._errorMessage) {
        const markup = 
        `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        const markup = 
        `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}