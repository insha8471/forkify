import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import addRecipeView from "./views/addRecipeView.js";
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationViews.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if(module.hot) {
//     module.hot.accept;
// }


/////////////////////////////////////////////////////////

const controlRecipes = async function() {
    try { 
        
        const id = window.location.hash.slice(1);
        console.log(id)
        if(!id) return;

        //Render Spinner
        recipeView.renderSpinner();
        
        //0.. update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());
        bookmarksView.update(model.state.bookmarks);

        //1 Loading Recipe
        await model.loadRecipe(id);
        
        // 2 : Rendering Recipe
        recipeView.render(model.state.recipe);

    }
    catch(err) {
        // alert(err);
        recipeView.renderError();
    }
};

const controlSearchResults = async function() {
    try {
        // render spinner in search result
        resultsView.renderSpinner();
        // console.log(ResultsView);

        //1 get Search query
        const query = searchView.getQuery();
        console.log(query)
        if(!query) return;

        //2 load search
        await model.loadSearchResults(query);

        //3 render results
        // console.log(model.state.search.results);
        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultsPage());

        //render initial pagination
        paginationView.render(model.state.search);
        console.log(model.state.search)
    }catch(err) {
        console.log(err);
    }
}

const controlPagination = function(goToPage) {
    //1 render new results
    resultsView.render(model.getSearchResultsPage(goToPage));

    //2 render new pagination
    paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
    //update the recipe serving (in state)
    model.updateServings(newServings);

    //update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
    // 1 Add/remove bookmark
    if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else
        model.deleteBookmark(model.state.recipe.id);
    
    //2 Update recipe view
    // console.log(model.state.recipe);
    recipeView.update(model.state.recipe);

    // 3 Render bookmarks
    bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
    bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
    // console.log(newRecipe);
    try{
        //render spinner
        addRecipeView.renderSpinner();

        //upload the new recipe data
        await model.updloadRecipe(newRecipe);

        // Render recipe 
        recipeView.render(model.state.recipe);

        //success message
        addRecipeView.renderMessage();

        //render bookmark view
        bookmarksView.render(model.state.bookmarks);

        //change id in url
        window.history.pushState(null, '', `#${model.state.recipe.id}`);

        //close form window
        setTimeout(function() {
            addRecipeView.toggleWindow();
        }, MODAL_CLOSE_SEC*1000)
    }
    catch(err) {
        console.error('👹👹',err);
        addRecipeView.renderError(err.message);
    }
}


const init = function() {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerclick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);