import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig'; // Corrected the typo in the import path

function MyState(props) { // Renamed to start with a capital letter
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)";
        } else {
            setMode('light');
            document.body.style.backgroundColor = "white";
        }
    };

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProduct = async () => {
        if (!products.title || !products.price || !products.imageUrl || !products.category || !products.description) {
            return toast.error("All fields are required");
        }

        setLoading(true);

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products);
            toast.success("Product added successfully");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const [product, setProduct] = useState([]);

    const getProductData = async () => {
        setLoading(true);

        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const editHandle = (item) => {
        setProducts(item);
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', products.id), products);
            toast.success("Product updated successfully");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', item.id));
            toast.success('Product deleted successfully');
            getProductData();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(fireDB, "order"));
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false);
            });
            setOrder(ordersArray);
            console.log(ordersArray);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(fireDB, "users"));
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false);
            });
            setUser(usersArray);
            console.log(usersArray);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrderData();
        getUserData();
    }, []);

    const [searchKey, setSearchKey] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterPrice, setFilterPrice] = useState('');

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            products, setProducts, addProduct, product,
            editHandle, updateProduct, deleteProduct, order,
            user, searchKey, setSearchKey, filterType, setFilterType,
            filterPrice, setFilterPrice
        }}>
            {props.children}
        </MyContext.Provider>
    );
}

export default MyState;
