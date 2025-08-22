"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const [cartAdd, setCartAdd] = useState([])
  // console.log(count", cartAdd);
  const [searchQuery, setSearchQuery] = useState("");
  const [allData, setAllData] = useState([])
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  // const [filterData, setFilterData] = useState([])
  const [showFilters, setShowFilters] = useState(false);

  //update count state
  useEffect(() => {
    setCartAdd(cart?.length)
  }, [cart])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setProducts(data);
        // unique category  store here
        const uniqueCategories = ["all", ...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    let filtered = [...allData];

    // search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // sorting
    if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setProducts(filtered);
  }, [searchQuery, selectedCategory, sortOption, allData]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className=" mb-4 w-100 position-relative">
      <div className="d-flex flex-wrap justify-content-between headerList align-items-center mb-4">
        <div className="">
          <h2 className="mb-0 listsize">Product Listing</h2>
        </div>
        <div className="d-flex align-items-center gap-3  sm:mt-0 mt-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Close Filters" : "Filters"}
          </button>
          <Link href="/cart" className="text-decoration-none">
            <div className="position-relative d-inline-block">
              <BsFillCartPlusFill size={24} className="text-primary" />
              <span className="position-absolute top-0   translate-middle badge rounded-pill bg-danger">
                {cartAdd}
              </span>
            </div>
          </Link>
        </div>
        {/*all Filter Sectioncrender here */}
        {showFilters && (
          <div className="mt-3 filterTab">
            <div className="card card-body shadow-sm">
              {/* Search */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <select
                  className="form-select form-select-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting */}
              <div>
                <select
                  className="form-select form-select-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Sort</option>
                  <option value="low-high">Price: Low → High</option>
                  <option value="high-low">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="row height-container px-4">
        {products.map((item) => (
          <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.image}
                className="card-img-top p-3"
                alt={item.title}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{item.title}</h6>
                <p className="text-muted mb-1">{item.category}</p>
                <p className="fw-bold text-success">${item.price}</p>
                <p className="small text-secondary mb-2 d-flex align-items-center">
                  <FaStar className="me-1 text-warning" />
                  {item.rating.rate} ({item.rating.count} reviews)
                </p>
                <button className="btn btn-primary mt-auto" onClick={() => addToCart(item)}
                >Add to Cart
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
