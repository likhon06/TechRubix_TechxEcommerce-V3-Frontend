"use client"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
const UserDashboardPage = () => {

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [totalCartData, setTotalCartData] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('Token');
    if (storedToken) {
      try {
        const decodedToken: {
          email: string;
          role: string;
        } = jwtDecode(storedToken);
        setUserEmail(decodedToken.email);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);
  console.log(userEmail);
  useEffect(() => {
    if (userEmail) {
      try {
        const fetchCartData = async () => {
          const res = await fetch(`https://tr-ecom-backend.vercel.app/cart/${userEmail}`, {
            next: {
              revalidate: 1
            }
          })
          const resultData = await res.json();
          console.log(resultData);
          setTotalCartData(resultData);
        }
        fetchCartData();
      } catch (err) {
        console.log(err);
        toast.error('something went wrong!')
      }
    }
  }, [userEmail])

  return (
    <div className="px-4 mt-8">
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="bg-green-400 p-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" /></svg>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Items in you Cart</h3>
          <p className="text-3xl">{totalCartData?.length} (items)</p>
        </div>
      </div>
    </div>
  );
}


export default UserDashboardPage;