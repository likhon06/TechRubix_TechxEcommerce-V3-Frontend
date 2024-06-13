// // hooks/useToken.ts
// "use client"
// import { useEffect, useState } from "react";

// const useToken = (): string | null => {
//     const [token, setToken] = useState<string | null>(null);

//     useEffect(() => {
//         // Check if window is defined to ensure it's executed on the client-side
//         if (typeof window !== 'undefined') {
//             const storedToken = localStorage.getItem('Token');
//             if (storedToken) {
//                 setToken(storedToken);
//             }
//         }
//     }, []);

//     return token;
// };

// export default useToken;
