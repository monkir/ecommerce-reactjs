import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [productData, setProductData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [serarchParams, setSearchParams]=useSearchParams();
  const pageNo = serarchParams.get('page') ? serarchParams.get('page') : 1;
  console.log(pageNo);

  const loadData = async () => {
    try {
        const skip = (pageNo-1)*10;
      const res = await axios.get("https://dummyjson.com/products?skip="+skip+"&take=10");
      console.log(res.data.products);
      console.log(Math.ceil(res.data.total / 10));
      setProductData(res.data.products);
      setPageCount(Math.ceil(res.data.total / 10));
    } catch (ex) {
      console.log(ex);
    }
  };
  const pagination = (
    <div class="w-full bg-white p-4 flex items-center flex-wrap justify-center">
      <nav aria-label="Page navigation">
        <ul class="inline-flex">
          <li>
            <button class="h-10 px-5 text-green-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-green-100">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {[...Array(pageCount).keys()].map((pg) => (
            <a href={"/?page="+(pg+1)} className="text-sm font-medium text-gray-900">
              <li>
                <button
                  class={
                    pg+1 == pageNo
                      ? "h-10 px-5 text-green-600 transition-colors duration-150 focus:shadow-outline bg-green-200 hover:bg-green-300"
                      : "h-10 px-5 text-white transition-colors duration-150 bg-green-600 border border-r-0 border-green-600 hover:bg-green-300 focus:shadow-outline"
                  }
                >
                  {pg+1}
                </button>
              </li>
            </a>
          ))}
          <li>
            <button class="h-10 px-5 text-green-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-green-100">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      {productData.length === 0 ? (
        <>Loading data</>
      ) : (
        <>
          <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
                {pagination}
              {/* <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}

              <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {productData.map((p) => (
                  <>
                    <div class="group relative">
                      <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={p.thumbnail}
                          alt="Front of men&#039;s Basic Tee in black."
                          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div class="mt-4 flex justify-between">
                        <div>
                          <h3 class="text-sm text-gray-700">
                            <a href={"/details/" + p.id}>
                              <span
                                aria-hidden="true"
                                class="absolute inset-0"
                              ></span>
                              {p.title}
                            </a>
                          </h3>
                          <p class="mt-1 text-sm text-gray-500">{p.category}</p>
                        </div>
                        <p class="text-sm font-medium text-gray-900">
                          ${p.price}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
                {pagination}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
