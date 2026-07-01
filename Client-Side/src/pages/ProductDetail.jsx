
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts, getSingleProduct } from "../features/slice/productSlice";
import { addItem } from "../features/slice/cartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const ProductDetail = () => {
  const { pid } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { product, products } = useSelector((store) => store.product);

  const defaultImage =
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500";

  const [selectedImage, setSelectedImage] = useState("");
  const [showImagePopup, setShowImagePopup] = useState(false);

  useEffect(() => {
    dispatch(getSingleProduct(pid));
    dispatch(getProducts());
  }, [dispatch, pid]);

  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image);
    }
  }, [product]);

  const productImages = product?.images?.length
    ? product.images
    : [
        product?.image || defaultImage,
        product?.image || defaultImage,
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        product?.image || defaultImage,
      ];

  const similarProducts = products
    ?.filter(
      (item) =>
        item.category === product?.category &&
        item._id !== product?._id
    )
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-blue-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <div
              className="cursor-zoom-in"
              onClick={() => setShowImagePopup(true)}
            >
              <img
                src={selectedImage || defaultImage}
                alt={product?.name}
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </div>

            <div className="flex gap-3 mt-4 flex-wrap">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`product-${index}`}
                  onClick={() => {
                    setSelectedImage(img);
                    setShowImagePopup(true);
                  }}
                  className={
                    "w-20 h-20 object-cover rounded-md border-2 cursor-pointer transition border-blue-400"
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3">
              {product?.category}
            </span>

            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              {product?.name}
            </h1>

            <p className="text-3xl font-bold text-green-600 mb-4">
              ₹{product?.price}
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product?.description}
            </p>

            <p className="mb-2">
              <span className="font-semibold text-blue-800">Availability:</span>
              <span className="text-green-600 ml-2">
                In Stock ({product?.stock} items)
              </span>
            </p>

            <p className="mb-6">
              <span className="font-semibold text-blue-800">Product ID:</span>
              <span className="text-gray-600 ml-2">
                {product?._id?.slice(-8)}
              </span>
            </p>

            {user?.role === "user" && (
              <div className="flex gap-4">
                <button
                  onClick={() => dispatch(addItem(product?._id))}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition cursor-pointer"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => dispatch(addItem(product?._id))}
                  className="flex-1 bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                  <Link to="/cart">Buy Now</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 relative">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Similar Products
        </h2>
        <div className="p-8">
          <button className="similar-prev absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 cursor-pointer">
            <ChevronLeft size={24} />
          </button>

          <button className="similar-next absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 cursor-pointer">
            <ChevronRight size={24} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".similar-prev",
              nextEl: ".similar-next",
            }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {similarProducts.map((item) => (
              <SwiperSlide key={item._id}>
                <Link
                  to={`/product/${item._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden block"
                >
                  <img
                    src={item?.image || defaultImage}
                    alt={item?.name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2">{item?.name}</h3>

                    <p className="text-green-600 font-bold mt-2">
                      ₹{item?.price}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {showImagePopup && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImagePopup(false)}
        >
          <div
            className="relative bg-white rounded-xl p-4 max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImagePopup(false)}
              className="absolute top-2 right-4 text-4xl font-bold text-gray-700 hover:text-red-500"
            >
              ×
            </button>

            <img
              src={selectedImage || defaultImage}
              alt={product?.name}
              className="w-full h-[80vh] object-contain rounded-lg"
            />

            <div className="flex justify-center gap-3 mt-4 flex-wrap">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`popup-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer border-blue-300`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;