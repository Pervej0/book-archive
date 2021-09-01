// searchClick: click on search button-
const searchClick = () => {
  document.getElementById("search-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const searchContainer = document.getElementById("search-input");
    const spinnerContainer = document.getElementById("spinner");
    if (searchContainer.value === "") {
      console.log("Please input vaild text!");
      return;
    }
    // showing spinner
    spinnerContainer.classList.remove("d-none");
    spinnerContainer.classList.add("d-block");
    loadData(searchContainer.value, spinnerContainer);
    searchContainer.value = "";
  });
};
// searchClick: function activated-
searchClick();

// loadData: to fetch API data-
const loadData = async (input, spinner) => {
  const url = `http://openlibrary.org/search.json?q=${input}`;
  const response = await fetch(url);
  const data = await response.json().catch((error) => console.log(error));
  setLoadData(data, spinner);
};

// setLoadData: to show books item on HTML DOC-
const setLoadData = (info, spinner) => {
  let errorContainer = document.getElementById("error");
  const booksContainer = document.getElementById("books-araea");
  booksContainer.textContent = "";

  // error handling for unfounded result-
  if (info.numFound === 0 || info.docs.length === 0) {
    errorContainer.classList.remove("d-none");
    errorContainer.classList.add("d-block");
    spinner.classList.add("d-none");
    return;
  }

  // Total result found set-
  const totalFound = document.getElementById("total-found");
  console.log(info.numFound);
  totalFound.innerText = `About ${info.numFound} rsults found, here's ${info.docs.length}`;

  // create & append books item-
  info.docs.forEach((elem) => {
    console.log(errorContainer);

    let { title, cover_i, first_publish_year, publisher, author_name } = elem;
    const div = document.createElement("div");
    div.classList.add("col-md-3", "col-sm-6", "col-12");
    div.innerHTML = `<div class="card">
                      <div class="h-25 w-100">
                        <img class="img-fluid h-100 w-100"  src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top" alt="cover-img">
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="mb-1">Author: <small class='text-success'>${author_name}</small></p>
                        <p class="mb-1">First Publish year : <small class='text-success'>${first_publish_year}</small></p>
                        <p class="mb-1">Publisher: <small class='text-success'>${publisher}</small></p>
                      </div>
                    </div>
  `;
    booksContainer.appendChild(div);
  });
  spinner.classList.add("d-none");
  errorContainer.classList.remove("d-block");
  errorContainer.classList.add("d-none");
};
