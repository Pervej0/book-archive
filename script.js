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
  const url = `https://openlibrary.org/search.json?q=${input}`;
  const response = await fetch(url);
  const data = await response.json().catch((error) => console.log(error));

  setLoadData(data, spinner);
};

// setLoadData: to show books item on HTML DOC-
const setLoadData = (info, spinner) => {
  const booksContainer = document.getElementById("books-area");
  const totalFound = document.getElementById("total-found");
  const errorContainer = document.getElementById("error");
  booksContainer.textContent = "";

  // error handling for unfounded result-
  if (info.numFound === 0 || info.docs.length === 0) {
    errorContainer.classList.remove("d-none");
    errorContainer.classList.add("d-block");
    spinner.classList.add("d-none");
    totalFound.textContent = "";
    return;
  }
  // Total result found set-
  totalFound.innerText = `About ${info.numFound} rsults found, here's ${info.docs.length}`;

  // create & append books item-
  info.docs.forEach((elem) => {
    let { title, cover_i, first_publish_year, publisher, author_name } = elem;

    cover_i = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

    // for multiple publisher & author_name slice in:1--
    if (author_name?.length > 1) {
      author_name = author_name.slice(0, 1) + " and more..";
    }
    if (publisher?.length > 1) {
      publisher = publisher.slice(0, 1) + " and more..";
    }

    // converting into string-
    author_name?.toString();
    publisher?.toString();

    // handle null & undefined value-
    if (!author_name) {
      author_name = "Sorry, Don't found ";
    }
    if (!first_publish_year) {
      first_publish_year = "Sorry, Don't found ";
    }
    if (!publisher) {
      publisher = "Sorry, Don't found ";
    }
    const div = document.createElement("div");
    div.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12");
    div.innerHTML = `<div class="card">
                      <div class="h-25 w-100">
                        <img class="img-fluid h-100 w-100"  src="${cover_i}" class="card-img-top" alt="cover-img">
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
