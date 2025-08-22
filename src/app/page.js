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
  // const [filterData, setFilterData] = useState([])

  //update count state
  useEffect(() => {
    setCartAdd(cart?.length)
  }, [cart])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAllData(data)
        // setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //  filter here
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filtered = allData.filter((item) =>
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(allData);
    }
  }, [searchQuery, allData])
  
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <div className=" mb-4  w-100 position-relative">
      <div className="d-flex flex-wrap justify-content-between headerList align-items-center mb-4">
        <div className="col-sm-auto col-12">
          <h2 className="mb-0 listsize">Product Listing</h2>
        </div>
        <div className="d-flex align-items-center gap-3 col-sm-auto col-12 sm:mt-0 mt-2">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="filter by category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link href="/cart" className="text-decoration-none">
            <div className="position-relative d-inline-block">
              <BsFillCartPlusFill size={24} className="text-primary" />
              <span className="position-absolute top-0   translate-middle badge rounded-pill bg-danger">
                {cartAdd}
              </span>
            </div>
          </Link>
        </div>
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
