import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import NoPage from "./pages/nopage/NoPage";
import Admin from "./pages/admin/dashboard/Dashboard";
import Allproducts from "./pages/allproducts/Allproduct";
import Mystate from "./context/data/myState";
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/Productinfo.js';
import Cart from "./pages/cart/Cart.js";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AddProduct from "./pages/admin/pages/AddProduct.js";
import UpdateProduct from "./pages/admin/pages/UpdateProduct.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Productcard from "./components/productCard/Productcard.js";


export default function App() {
  return (
    <Mystate>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/order" element={
            <ProtectedRoute>
              <Order /> 
            </ProtectedRoute>
          }></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/productcard" element={<Productcard />}></Route>

          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/allproducts" element={<Allproducts />}></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/signup" element={<Signup />} ></Route>
          <Route path="/nopage" element={<NoPage />}></Route>
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard/>
            </ProtectedRouteForAdmin>
          } ></Route>
          <Route path="addproduct" element={<ProtectedRouteForAdmin><AddProduct/></ProtectedRouteForAdmin>}></Route>
          <Route path="updateproduct" element={<ProtectedRouteForAdmin><UpdateProduct/></ProtectedRouteForAdmin>}></Route>

        </Routes>
       <ToastContainer/>

      </Router>
    </Mystate>
  );
}

// for user
 export const ProtectedRoute = ({children})=>{
  const user = localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to="/login"/>
  }
 }


 //for admin

 const ProtectedRouteForAdmin = ({children}) =>{
  const admin = JSON.parse( localStorage.getItem('user'))

  if(admin.user.email === 'parthajyoti2003@gmail.com'){
   return children
  }
  else{
    return <Navigate to="/"/>
  }
 }


